var express = require('express');
var fs = require('fs');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var DBconnect = require('../models/DBconnect.js');
var Update = require('../models/update.js');

router.get('/create', checkLogin, function(req, res, next) {
  res.render('createNew');
});
router.post('/create', checkLogin, function(req, res, next) {
  var uid = req.session.user;
  var type = req.fields.type;
  var description = req.fields.description;
  var location = req.fields.location;
  var location_id = req.fields.locationID;
  var quota = req.fields.quota;
  var start_time = timestamp(req.fields.start_date, req.fields.start_hour, req.fields.start_min);
  var expire_time = timestamp(req.fields.expire_date, req.fields.expire_hour, req.fields.expire_min);

  var sql = 'INSERT INTO ACTIVITIES (TYPE, DESCRIPTION, LOCATION, LOCATION_ID, START_TIME, EXPIRE_TIME, QUOTA, NO_OF_JOINERS, RATING, CREATOR_ID, CREATE_TIME) VALUES ';
      sql += '(?, ?, ?, ?, ?, ?, ?, 0, 0, ?, CURRENT_TIMESTAMP())';
  var sql_joiner = 'INSERT INTO JOINERS (ACTIVITY_ID, JOINER_ID, CREATE_TIME) VALUES (?, ?, CURRENT_TIMESTAMP())';
  var sqlParam = [type, description, location, location_id, start_time, expire_time, quota, uid];
  var sqlParam_joiner;
  console.log("???")
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
    }
    connection.query(sql, sqlParam, function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        sqlParam_joiner = [result.insertId, uid];
        console.log(sqlParam_joiner);
        connection.query(sql_joiner, sqlParam_joiner, function(err, result) {
          if (err) {console.log(err)} else {
            console.log('New activity added success, AID = ' + sqlParam_joiner[0]);
            res.redirect('/activity/' + sqlParam_joiner[0]);
          }
        });
      }
    });
  });
});

router.get('/:id', checkLogin, function(req, res, next) {
  var sql_detail = 'SELECT AID, TYPE, ACTIVITIES.DESCRIPTION, LOCATION, LOCATION_ID, START_TIME, QUOTA, NO_OF_JOINERS, RATING, EXPIRE_TIME, USERNAME, UID ';
      sql_detail += 'FROM ACTIVITIES JOIN USERS ON CREATOR_ID = UID WHERE AID = ?';
  var sql_joiner = 'SELECT JOINER_ID, USERNAME, PHONE_NO FROM JOINERS JOIN USERS ON JOINER_ID = UID WHERE ACTIVITY_ID = ? ORDER BY CREATE_TIME'
  var detail;
  var actionButton;
  var activity_id = req.params.id;
  var admin = req.session.admin;
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
  }
    connection.query(sql_detail, activity_id, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        result[0].START_TIME = toTime(result[0].START_TIME);
        result[0].EXPIRE_TIME = toTime(result[0].EXPIRE_TIME);
        detail = result[0];
      }
    });
    connection.query(sql_joiner, activity_id, function(err, result){
      if (err) {
        console.log(err);
      } else {
        detail.JOINERS = result;
        var obj = result.filter(function ( obj ) {
          return obj.JOINER_ID === req.session.user;
        })[0];
        if (detail.UID == req.session.user) {
          actionButton = 'creator';
        } else if (obj != undefined) {
          actionButton = 'joined';
        } else if (detail.QUOTA == detail.JOINERS.length) {
          actionButton = 'full';
        } else {
          actionButton = 'available';
        }
        console.log("Get Activity Detail Success, AID = " + req.params.id);
        res.render('activityDetail',
          {detail: JSON.stringify(detail),
           actionButton: actionButton,
           admin: admin });
      }
    });
    connection.release();
  });
});

router.get('/:id/edit',checkLogin, function(req, res, next) {
  var sql = 'SELECT CREATOR_ID, AID, TYPE, DESCRIPTION, LOCATION, LOCATION_ID, START_TIME, QUOTA, EXPIRE_TIME FROM ACTIVITIES WHERE AID = ?';
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
  }
    connection.query(sql, req.params.id, function(err, result) {
      if (err) {
        console.log(err);
      } else {
          if (result.length && result[0].CREATOR_ID == req.session.user) {
              result[0].START_DATE = toTimeDate(result[0].START_TIME);
              result[0].START_HOUR = toTimeHour(result[0].START_TIME);
              result[0].START_MIN = toTimeMin(result[0].START_TIME);
              result[0].EXPIRE_DATE = toTimeDate(result[0].EXPIRE_TIME);
              result[0].EXPIRE_HOUR = toTimeHour(result[0].EXPIRE_TIME);
              result[0].EXPIRE_MIN = toTimeMin(result[0].EXPIRE_TIME);
              result[0].QUOTA = result[0].QUOTA.toString();

            res.render('editActivity', {detail: JSON.stringify(result[0])});
          }
          else {
            res.render('message', {message: 'Invalid Access.'});
          }
      }
    });
    connection.release();
  });
});

router.get('/api/saveChange', function(req, res, next) {
  var id = req.query.AID;
  var type = req.query.TYPE;
  var description = req.query.DESCRIPTION;
  var location = req.query.LOCATION;
  var quota = req.query.QUOTA;
  var start_time = timestamp(req.query.START_DATE, req.query.START_HOUR, req.query.START_MIN);
  var expire_time = timestamp(req.query.EXPIRE_DATE, req.query.EXPIRE_HOUR, req.query.EXPIRE_MIN);
  var sql = 'UPDATE ACTIVITIES SET TYPE = ?, DESCRIPTION = ?, LOCATION = ?, START_TIME = ?, EXPIRE_TIME = ?, QUOTA = ? WHERE AID = ?';
  var sqlParam = [type, description, location, start_time, expire_time, quota, id];
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
    }
    connection.query(sql, sqlParam, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Change is saved, AID = " + id);
        res.send(true);
      }
    });
    connection.release();
  });
});

router.get('/api/join', function(req, res, next) {
  var sql1 = 'INSERT INTO JOINERS (ACTIVITY_ID, JOINER_ID, CREATE_TIME) VALUES (?, ?, CURRENT_TIMESTAMP())';
  var sqlParam = [req.query.activity_id, req.session.user];
  var sql2 = 'UPDATE ACTIVITIES SET NO_OF_JOINERS = NO_OF_JOINERS + 1 WHERE AID = ?';
  var url = '/activity/' + req.query.activity_id;

  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
  }
    connection.query(sql1, sqlParam, function(err, result) {
      if (err) {console.log(err);}
    connection.query(sql2, req.query.activity_id, function(err, result) {
      if (err) {console.log(err);}
      else {
        var update = new Update('join', req.session.username, req.query.activity_id);
        update.storeUpdateMessage();
        console.log(req.session.username + "joined activity, AID = " + req.query.activity_id);
        res.send(true);
      }
    });
    });
    connection.release();
  });
});

router.get('/api/quit', function(req, res, next) {
  var username = req.session.username;
  var sql1 = 'DELETE FROM JOINERS WHERE ACTIVITY_ID = ? AND JOINER_ID = ?';
  var sqlParam = [req.query.activity_id, req.session.user];
  var sql2 = 'UPDATE ACTIVITIES SET NO_OF_JOINERS = NO_OF_JOINERS - 1 WHERE AID = ?';
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
  }
    connection.query(sql1, sqlParam, function(err, result) {
      if (err) {
        console.log(err);
      }
    connection.query(sql2, req.query.activity_id, function(err, result) {
      if (err) {console.log(err)}
      else {
        var update = new Update('quit', req.session.username, req.query.activity_id);
        update.storeUpdateMessage();
        console.log(req.session.username + "quit activity, AID = " + req.query.activity_id);
        res.send(true);
      }
    })
    });
    connection.release();
  });
});

router.get('/api/delete', function(req, res, next) {
  var sql = 'UPDATE ACTIVITIES SET STATUS = "C" WHERE AID = ?';
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
  }
    connection.query(sql, req.query.activity_id, function(err, result) {
      if (err) {console.log(err);}
      else {
        var update = new Update('cancel', req.session.username, req.query.activity_id);
        update.storeUpdateMessage();
        console.log(req.session.username + "delete activity, AID = " + req.query.activity_id);
        res.send(true);
      }
    });
    connection.release();
  });
});

router.get('/api/getComments', function(req, res, next) {
  var activity_id = req.query.activity_id;
  var joiner_id = req.session.user;
  var sql_get = 'SELECT COMMENTS.CONTENT, USERS.USERNAME, JOINERS.RATING, COMMENTS.CREATE_TIME ';
      sql_get +=' FROM COMMENTS JOIN JOINERS ON COMMENTS.ACTIVITY_ID = JOINERS.ACTIVITY_ID ';
      sql_get += 'JOIN USERS ON COMMENTS.CREATOR_ID = USERS.UID WHERE COMMENTS.ACTIVITY_ID = ? ORDER BY COMMENTS.CREATE_TIME DESC';
  var sql_rate = 'SELECT JOINERS.RATING FROM JOINERS JOIN ACTIVITIES ON ACTIVITY_ID = AID WHERE ';
      sql_rate += 'ACTIVITY_ID = ? AND JOINER_ID = ? AND START_TIME < CURRENT_TIMESTAMP()';
  var sqlParam_rate = [activity_id, joiner_id];
  var rateSet = 'false';
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
    }
    connection.query(sql_rate, sqlParam_rate, function(err, result) {
      if (err) {console.log(err);}
      else {
        if (result.length && result[0].RATING == null) {
          rateSet = 'true';
        }
    connection.query(sql_get, activity_id, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        for (var i in result) {
          result[i].CREATE_TIME = toTime(result[i].CREATE_TIME);
        }
        console.log("Get Comments success, AID = " + activity_id);
        res.send([JSON.stringify(result), rateSet]);
      }
    });
    }
    });
    connection.release();
  });
});

router.get('/api/createCommentRating', function(req, res, next) {
  var rating = req.query.rating;
  var activity_id = req.query.activity_id;
  var user_id = req.session.user;
  var username = req.session.username;
  var content = req.query.content;
  var sql1 = 'UPDATE JOINERS SET RATING = ? WHERE ACTIVITY_ID = ? AND JOINER_ID = ?';
  var sqlParam1 = [rating, activity_id, user_id];
  var sql2 = 'INSERT INTO COMMENTS (ACTIVITY_ID, CONTENT, CREATOR_ID, CREATE_TIME) VALUES (?, ?, ?, CURRENT_TIMESTAMP())';
  var sqlParam2 = [activity_id, content, user_id];
  var sum, count, rating;
  var sql3 = 'SELECT SUM(RATING) AS SUM FROM `JOINERS` WHERE ACTIVITY_ID = ? AND RATING IS NOT NULL';
  var sql4 = 'SELECT COUNT(RATING) AS COUNT FROM JOINERS WHERE ACTIVITY_ID = ? AND RATING IS NOT NULL';
  var sql5 = 'UPDATE ACTIVITIES SET RATING = ? WHERE AID = ?'

  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
  }
    connection.query(sql1, sqlParam1, function(err, result) {
      if (err) { console.log(err) }
    connection.query(sql2, sqlParam2, function(err, result) {
      if (err) { console.log(err) }
    connection.query(sql3, activity_id, function(err, result) {
      if (err) { console.log(err) } else {
        sum = result[0].SUM;
      }
    connection.query(sql4, activity_id, function(err, result) {
      if (err) { console.log(err) } else {
        count = result[0].COUNT;
        rating = sum / count;
        var sqlParam5 = [rating, activity_id];
      }
    connection.query(sql5, sqlParam5, function(err, result) {
      if (err) { console.log(err) } else {
        var update = new Update('comment', username, activity_id);
        update.storeUpdateMessage();
        console.log("Comment and Rating posted AID = " + activity_id);
        res.send(true);
      }
    });
    });
    });
    });
    });
    connection.release();
  });
});

router.get('/api/createComment', function(req, res, next) {
  var sql = 'INSERT INTO COMMENTS (ACTIVITY_ID, CONTENT, CREATOR_ID, CREATE_TIME) VALUES (?, ?, ?, CURRENT_TIMESTAMP())';
  var sqlParam = [req.query.activity_id, req.query.content, req.session.user];
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
  }
    connection.query(sql, sqlParam, function(err, result) {
      if (err) { console.log(err) } else {
        var update = new Update('comment', req.session.username, req.query.activity_id);
        update.storeUpdateMessage();
        console.log("Comment posted for AID = req.query.activity_id");
        res.send(true);
      }
    });
    connection.release();
  });
});

function toTime(time){
	var objDate = new Date(time);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  	var year = objDate.getFullYear();
  	var month = months[objDate.getMonth()];
  	var date = objDate.getDate();
	var hours = "0" + objDate.getHours();
	var minutes = "0" + objDate.getMinutes();
	var seconds = "0" + objDate.getSeconds();
	var formattedTime = year + "-" + month +"-" + date +" " + hours.substr(-2) + ':' + minutes.substr(-2);
	return formattedTime;
}

function timestamp(date, hour, min) {
  return date.substr(-4) + '-' + date.substr(3,2) + '-' + date.substr(0,2) + ' ' + hour + ':' + min +':00';
}

function toTimeDate(time) {
  var objDate = new Date(time);
  var year = objDate.getFullYear();
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var month = months[objDate.getMonth()];
  var date = "0" + objDate.getDate();
  return date.substr(-2) + '.' + month.substr(-2) + '.' + year;
}

function toTimeHour(time) {
  var objDate = new Date(time);
  var hours = "0" + objDate.getHours();
  return hours.substr(-2);
}

function toTimeMin(time) {
  var objDate = new Date(time);
  var min = "0" + objDate.getMinutes();
  return min.substr(-2);
}

module.exports = router;
