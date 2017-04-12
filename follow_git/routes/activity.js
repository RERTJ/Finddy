var express = require('express');
var fs = require('fs');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var public = require('../public/js/publicFunction.js').checkLogin;
var DBconnect = require('../models/DBconnect.js');


/* GET users listing. */
router.get('/',function(req, res, next) {
  res.render('search');
});

router.post('/', function(req, res, next) {
  var type = req.fields.type;
  var key =req.fields.key;
  var hour =req.fields.hour;
  var year =req.fields.year;
  var month =req.fields.month;
  var date =req.fields.date;
  var ehour =req.fields.ehour;
  var eyear =req.fields.eyear;
  var emonth =req.fields.emonth;
  var edate =req.fields.edate;
  var starttimestamp="'"+year+'-'+month+'-'+date+' '+hour+':00:00';
  var estarttimestamp="'"+eyear+'-'+emonth+'-'+edate+' '+ehour+':00:00';

  res.render('searchresult');
});
router.get('/contact', function(req, res, next) {
  res.render('activityDetail');
});

router.get('/create', checkLogin, function(req, res, next) {
  res.render('createNew');
});
router.post('/create', checkLogin, function(req, res, next) {
  console.log("received");
  var uid = req.session.user;
  var type = req.fields.type;
  var description = req.fields.description;
  var location = req.fields.location;
  var start_time = req.fields.start_time;
  var expire_time = req.fields.expire_time;
  var quota = req.fields.quota;

  var sql = 'INSERT INTO ACTIVITIES (TYPE, DESCRIPTION, LOCATION, START_TIME, EXPIRE_TIME, QUOTA, NO_OF_JOINERS, RATING, CREATOR_ID, CREATE_TIME) VALUES ';
      sql += '(?, ?, ?, STR_TO_DATE(?,"%Y-%m-%d %H:%i:%s"), STR_TO_DATE(?,"%Y-%m-%d %H:%i:%s"), ?, 0, 0, ?, CURRENT_TIMESTAMP())';

  var sqlParam = [type, description, location, start_time, expire_time, quota, uid];

  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
    }
    connection.query(sql, sqlParam, function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("success");
        res.send("success");
      }
    });
  });
});

router.get('/:id', checkLogin, function(req, res, next) {
  var sql1 = 'SELECT AID, TYPE, ACTIVITIES.DESCRIPTION, LOCATION, START_TIME, QUOTA, NO_OF_JOINERS, RATING, EXPIRE_TIME, USERNAME, UID ';
      sql1 += 'FROM ACTIVITIES JOIN USERS ON CREATOR_ID = UID WHERE AID = ?';
  var sql2 = 'SELECT JOINER_ID, USERNAME FROM JOINERS JOIN USERS ON JOINER_ID = UID WHERE ACTIVITY_ID = ?'
  var detail;
  var actionButton;
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
  }
    connection.query(sql1, req.params.id, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
        detail = result[0];
      }
    });
    connection.query(sql2, req.params.id, function(err, result){
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
        console.log(detail.NO_OF_JOINERS);
        console.log(detail.JOINERS.length);
        console.log(actionButton);
        res.render('activityDetail',
          {detail: JSON.stringify(detail),
           actionButton: actionButton} );
      }
    });
    connection.release();
  });
});

router.get('/:id/edit', checkLogin, function(req, res, next) {
  var sql = 'SELECT AID, TYPE, DESCRIPTION, LOCATION, START_TIME, QUOTA, EXPIRE_TIME FROM ACTIVITIES WHERE AID = ?';
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
  }
    connection.query(sql, req.params.id, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        for (var i in result) {
          result[i].START_TIME = toTime(result[i].START_TIME);
        }
        res.render('editActivity', {detail: JSON.stringify(result[0])});
      }
    });
    connection.release();
  });
});

router.get('/api/saveChange', checkLogin, function(req, res, next) {
  var id = req.query.AID;
  var type = req.query.TYPE;
  var description = req.query.DESCRIPTION;
  var location = req.query.LOCATION;
  var start_time = req.query.START_TIME;
  var expire_time = req.query.EXPIRE_TIME;
  var quota = req.query.QUOTA;
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
        res.send(true);
      }
    });
    connection.release();
  });
});

router.get('/api/join', checkLogin, function(req, res, next) {
  console.log("received");
  var sql1 = 'INSERT INTO JOINERS (ACTIVITY_ID, JOINER_ID, CREATE_TIME) VALUES (?, ?, CURRENT_TIMESTAMP())';
  var sqlParam = [req.query.activity_id, req.session.user];
  var sql2 = 'UPDATE ACTIVITIES SET NO_OF_JOINERS = NO_OF_JOINERS + 1 WHERE AID = ?';
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
        res.send(true);
      }
    })
    });
    connection.release();
  });
});

router.get('/api/quit', checkLogin, function(req, res, next) {
  console.log("received");
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
        res.send(true);
      }
    })
    });
    connection.release();
  });
});

router.get('/api/getComments', checkLogin, function(req, res, next) {
  var sql = 'SELECT COMMENTS.CONTENT, USERS.USERNAME, JOINERS.RATING, COMMENTS.CREAT_TIME '
      sql +=' FROM COMMENTS JOIN JOINERS ON COMMENTS.ACTIVITY_ID = JOINERS.ACTIVITY_ID '
      sql += 'JOIN USERS ON COMMENTS.CREATOR_ID = USERS.UID WHERE COMMENTS.ACTIVITY_ID = ? ORDER BY COMMENTS.CREAT_TIME DESC';
  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
    }
    connection.query(sql, req.query.activity_id, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(JSON.stringify(result));
      }
    });
    connection.release();
  });
});

router.get('/api/createComment', checkLogin, function(req, res, next) {
  console.log("received");
  var sql1 = 'UPDATE JOINERS SET RATING = ? WHERE ACTIVITY_ID = ? AND JOINER_ID = ?';
  var sqlParam1 = [req.query.rating, req.query.activity_id, req.session.user];
  var sql2 = 'INSERT INTO COMMENTS (ACTIVITY_ID, CONTENT, CREATOR_ID, CREAT_TIME) VALUES (?, ?, ?, CURRENT_TIMESTAMP())';
  var sqlParam2 = [req.query.activity_id, req.query.content, req.session.user];
  var sum, count, rating;
  var sql3 = 'SELECT SUM(RATING) AS SUM FROM `joiners` WHERE ACTIVITY_ID = ? AND RATING IS NOT NULL';
  var sql4 = 'SELECT COUNT(RATING) AS COUNT FROM JOINERS WHERE ACTIVITY_ID = 1 AND RATING IS NOT NULL';
  var sql5 = 'UPDATE ACTIVITIES SET RATING = ? WHERE AID = ?'

  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db.');
  }
    connection.query(sql1, sqlParam1, function(err, result) {
      if (err) { console.log(err) }
    connection.query(sql2, sqlParam2, function(err, result) {
      if (err) { console.log(err) }
    connection.query(sql3, req.query.activity_id, function(err, result) {
      if (err) { console.log(err) } else {
        sum = result[0].SUM;
        console.log("sum = " + sum);
      }
    connection.query(sql4, req.query.activity_id, function(err, result) {
      if (err) { console.log(err) } else {
        count = result[0].COUNT;
        console.log("count = " + count);
        rating = sum / count;
        console.log("rating = " + rating);
        var sqlParam5 = [rating, req.query.activity_id];
      }
    connection.query(sql5, sqlParam5, function(err, result) {
      if (err) { console.log(err) } else {
        console.log(" rate success~ ");
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

function toTime(time){
	var date = new Date(time);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  	var year = date.getFullYear();
  	var month = months[date.getMonth()];
  	var date1 = date.getDate();
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	var formattedTime = year+" "+month+" "+date1+" "+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return formattedTime;
}

module.exports = router;
