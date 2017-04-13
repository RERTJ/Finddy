var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var checkLogin = require('../middlewares/check').checkLogin;
var DBconnect = require('../models/DBconnect.js');
var fs = require('fs');
var crypto = require('crypto');

/* GET users listing. */
router.get('/',checkLogin, function(req, res, next) {
  var uid = req.session.user;
  var sql_select_upcoming_activities = "SELECT LOCATION,DESCRIPTION,AID,START_TIME FROM ACTIVITIES WHERE AID IN(SELECT ACTIVITY_ID FROM JOINERS WHERE JOINER_ID=?) AND START_TIME > CURRENT_TIMESTAMP() AND STATUS IS NULL";
  var result;
  DBconnect.getConnection(function(err,connection){
      if(err){
        console.log('Error happens when connect to db');
        return;
      }
      connection.query(sql_select_upcoming_activities,[uid],function(err,result){
        if(err)
        {
          console.log('ERROR-',err.message);
          return;
        }
        for(var i=0; i<result.length;i++){
          result[i].START_TIME = toTime(result[i].START_TIME);
        }
         res.render('profile',{
            activities: JSON.stringify(result)
          });

      })

  });

});

router.get('/manageProfile', checkLogin, function(req,res,next){
  var uid = req.session.user;
  var sql_select_user = "SELECT USERNAME,PHONE_NO,DESCRIPTION FROM USERS WHERE UID = ?";
  DBconnect.getConnection(function(err,connection){
      if(err){
        console.log('Error happens when connect to db');
        return;
      }
      connection.query(sql_select_user,[uid],function(err,result){
        if(err)
        {
          console.log('ERROR-',err.message);
          return;
        }
        console.log(result[0]);
        res.render('manageProfile',{
          user: JSON.stringify(result[0])
        });
      })
  });

});

router.post('/users/password', checkLogin, function(req,res,next){
  var uid = req.session.user;
  var new_pwd = req.fields.pwd;
  var new_pwd_confirm = req.fields.pwd_confirm;
  var hmac = crypto.createHash('sha256');
  if(new_pwd){hmac.update(new_pwd);}
  if(new_pwd_confirm){hmac.update(new_pwd_confirm);}
  var sql_update = "UPDATE USERS SET PASSWORD = ? WHERE UID = ?";

  if(new_pwd === new_pwd_confirm){
    DBconnect.getConnection(function(err,connection){
      if(err){
        console.log('Error happens when connect to db');
        return;
      }
      connection.query(sql_update,[new_pwd,uid],function(err,result){
        if(err)
        {
          console.log('ERROR-',err.message);
          return;
        }
        res.send("password");
      })
    });
  }
  else{
    res.send("notMatch");
  }

});

router.post('/manage', checkLogin, function(req,res,next){
  var uid = req.session.user;
  var new_username = req.fields.USERNAME;
  var new_phone_number = req.fields.PHONE_NO;
  var new_self_intro = req.fields.DESCRIPTION;
  var sql_update = "UPDATE USERS SET USERNAME = ?, PHONE_NO = ?, DESCRIPTION =? WHERE UID = ?";
  DBconnect.getConnection(function(err,connection){
      if(err){
        console.log("DB ERROR!");
        return;
      }
      connection.query(sql_update,[new_username,new_phone_number,new_self_intro,uid],function(err,result){
        if(err){
          console.log(err);
          return;
        }
        console.log("update successful!");
        res.send("manage");
      })
    });
});

router.get('/contactList', checkLogin, function(req,res,next){
 res.render('contactList');
});

router.post('/contactList',checkLogin, function(req,res,next){
  var uid = req.session.user;
  var username = req.fields.username;
  var relationship;
  var target_id;
  var sql_select_user = "SELECT USERNAME,DESCRIPTION,UID,PHONE_NO,EMAIL FROM USERS WHERE USERNAME = ?";
  var sql_select_bl = "SELECT RELATIONSHIP FROM USERRELATIONSHIP WHERE HOSTID=? AND USERID=?";
  var sql_set_bl = "UPDATE USERRELATIONSHIP SET HOSTID=?, USERID=?,RELATIONSHIP=?";
  console.log(sql_select_user);
  DBconnect.getConnection(function(err,connection){
      if(err){
        console.log('Error happens when connect to db');
        return;
      }
      connection.query(sql_select_user,[username],function(err,result){
        if(err)
        {
          console.log('ERROR-',err.message);
          return;
        }
        if(!result.length){
          res.send("no_user");
        }
        else if(req.session.username == result[0].USERNAME){
          res.send("same_user");
        }
        else{
          var result1 = result[0];
          target_id = result[0].UID;
          console.log("search!");
          connection.query(sql_select_bl,[uid,result[0].UID],function(err,result){
            if(err){
              console.log("Error when select userrelationship!");
              return;
            }
            if(!result.length)
            {
              relationship = "";
              res.send([JSON.stringify(result1),""]);
              console.log(JSON.stringify(result1));
            }
            else{
              relationship = result[0].RELATIONSHIP;
              res.send([JSON.stringify(result1),result[0].RELATIONSHIP]);
            }
          });
        }
      })
    });

})

router.get('/black', checkLogin, function(req,res,next){
  var target_id = req.query.target_id;
  var uid = req.session.user;
  var sql_select_bl = "SELECT RELATIONSHIP FROM USERRELATIONSHIP WHERE HOSTID=? AND USERID=?";
  var sql_create_bl ="INSERT INTO USERRELATIONSHIP (HOSTID, USERID, RELATIONSHIP) VALUES(?,?,?)";
  var sql_update_bl ="UPDATE USERRELATIONSHIP SET RELATIONSHIP=? WHERE HOSTID=? AND USERID=?";
  var relationship;
  DBconnect.getConnection(function(err,connection){
    if(err){
      console.log('Error happens when connect to db');
      return;
    }
    connection.query(sql_select_bl,[uid,target_id],function(err,result){
      if(err){
        console.log('Error when select relationship');
        return;
      }
      if(!result.length){
        relationship = "N";
      }
      else{
        relationship = result[0].RELATIONSHIP;
      }
      console.log(relationship + "isbefore");
      if(relationship === "B"){
      var new_relation = "";
      connection.query(sql_update_bl,[new_relation,uid,target_id],function(err,result){
        if(err){
          console.log('Error when select relationship');
          return;
        }
        console.log(result);
        res.send("remove");
      })
      }
      else if(relationship === "W"){
          res.send('in_whitelist');
      }
      else if(relationship === ""){
        var new_relation = "B";
      connection.query(sql_update_bl,[new_relation,uid,target_id],function(err,result){
        if(err){
          console.log('Error when select relationship');
          return;
        }
        console.log(result);
        res.send("add");
      })
    }
      else if(relationship === "N"){
        var new_relation = "B";
      connection.query(sql_create_bl,[uid,target_id,new_relation],function(err,result){
        if(err){
          console.log('Error when select relationship');
          return;
        }
        console.log(result);
        res.send("add");
      })
      }
    })
  });
});


router.get('/white', checkLogin, function(req,res,next){
  var target_id = req.query.target_id;
  var uid = req.session.user;
  var sql_select_wl = "SELECT RELATIONSHIP FROM USERRELATIONSHIP WHERE HOSTID=? AND USERID=?";
  var sql_create_wl ="INSERT INTO USERRELATIONSHIP (HOSTID, USERID, RELATIONSHIP) VALUES(?,?,?)";
  var sql_update_wl ="UPDATE USERRELATIONSHIP SET RELATIONSHIP=? WHERE HOSTID=? AND USERID=?";
  var relationship;
  DBconnect.getConnection(function(err,connection){
    if(err){
      console.log('Error happens when connect to db');
      return;
    }
    connection.query(sql_select_wl,[uid,target_id],function(err,result){
      if(err){
        console.log('Error when select relationship');
        return;
      }
      if(!result.length){
        relationship = "N";
      }
      else{
        relationship = result[0].RELATIONSHIP;
      }
      if(relationship === "W"){
      var new_relation = "";
      connection.query(sql_update_wl,[new_relation,uid,target_id],function(err,result){
        if(err){
          console.log('Error when select relationship');
          return;
        }
        console.log(result);
        res.send("remove");
      })
      }
      else if(relationship === "B"){
          res.send('in_blacklist');
      }
      else if(relationship === ""){
        var new_relation = "W";
      connection.query(sql_update_wl,[new_relation,uid,target_id],function(err,result){
        if(err){
          console.log('Error when select relationship');
          return;
        }
        console.log(result);
        res.send("add");
      })
    }
          else if(relationship === "N"){
        var new_relation = "W";
      connection.query(sql_create_wl,[uid,target_id,new_relation],function(err,result){
        if(err){
          console.log('Error when select relationship');
          return;
        }
        console.log(result);
        res.send("add");
      })
      }
    })
  });
});

router.get('/activityPosted',checkLogin, function(req,res,next)
{
  var uid = req.session.user;
  var sql_select_posted_activity = "SELECT * FROM ACTIVITIES WHERE CREATOR_ID=?";
  var result;
  console.log(sql_select_posted_activity);
  DBconnect.getConnection(function(err,connection){
      if(err){
        console.log('Error happens when connect to db');
        return;
      }
      connection.query(sql_select_posted_activity,[uid],function(err,result){
        if(err)
        {
          console.log('ERROR-',err.message);
          return;
        }
        for(var i=0; i<result.length;i++){
          result[i].START_TIME = toTime(result[i].START_TIME);
        }
        console.log(result[0]);
          res.render('activityPosted',{
            activities: JSON.stringify(result)
          });

      })
  });

});

router.get('/api/getUpdates', checkLogin, function(req, res, next) {
  console.log("received update request");
  var sql = 'SELECT UPDATECONTENT, URL, CREATE_TIME FROM UPDATES WHERE USER_ID = ? ORDER BY CREATE_TIME DESC LIMIT 5';
  DBconnect.getConnection(function(err, connection) {
    console.log("get connection");
    if (err) {
      console.log('Error connecting to Db.');
    }
    connection.query(sql, req.session.user, function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        for(var i=0; i<result.length;i++){
          result[i].CREATE_TIME = toTime(result[i].CREATE_TIME);
        }
        res.send(JSON.stringify(result));
      }
    });
    connection.release();
  });
});

router.get('/profileForOthers/:id',checkLogin,function(req,res,next){
    var target_id = req.params.id;
    var sql_select_activities = "SELECT LOCATION,DESCRIPTION,AID,START_TIME FROM ACTIVITIES WHERE AID IN(SELECT ACTIVITY_ID FROM JOINERS WHERE JOINER_ID=?)";
    var sql = "SELECT USERNAME,EMAIL,PHONE_NO,DESCRIPTION FROM USERS WHERE UID =?";
    var result1;
    DBconnect.getConnection(function(err,connection){
      if(err){
        console.log('Error happens when connect to db');
        return;
      }
      connection.query(sql_select_activities,[target_id],function(err,result){
        if(err)
        {
          console.log('ERROR-',err.message);
          return;
        }
        if(!result.length){
          result1 = "";
        }
        else{
          for(var i=0; i<result.length;i++){
          result[i].START_TIME = toTime(result[i].START_TIME);
        }
          result1 = result;
        }
        connection.query(sql,[target_id],function(err,result){
          if(err){
            console.log(err);
            return;
          }
          res.render("profileForOthers",{
            activities : JSON.stringify(result1),
            user: JSON.stringify(result[0])
          })
        })
      })

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

module.exports = router;
//profile.html
//manageProfile.html
//contactlist
//activityPosted
