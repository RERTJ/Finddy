var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var checkLogin = require('../middlewares/check').checkLogin;
var DBconnect = require('../models/DBconnect.js');

/* GET users listing. */
router.get('/',checkLogin, function(req, res, next) {
  res.render('profile');
  //console.log(req.session.id);
  //console.log(req.session.cookie);
  console.log(req.session.user);
});

router.get('/manageProfile', checkLogin, function(req,res,next){
  res.render('manageProfile'); 
});

router.post('/manageProfile', checkLogin, function(req,res,next){
  var uid = req.session.uid;
  var new_username = req.fields.username;
  var new_phone_number = req.fields.phone_number;
  var new_pwd = req.fields.pwd;
  var new_pwd_confirm = req.fields.pwd_confirm;
  var new_self_intro = req.fields.self_intro;
  var sql_select_user = "SELECT * FROM USERS WHERE UID = ?";
  var sql_update = "UPDATE USERS SET USERNAME = ?, PHONE_NO = ?, PASSWORD =? WHERE UID = ?";
  var sql_change_desc = "UPDATE USERS SET DESCRIPTION = ? WHERE UID = ?";
  var username,phone_number,self_intro;
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
        username = result[0].USERNAME;
        phone_number = result[0].PHONE_NO;
        self_intro = result[0].DESCRIPTION;
      })
  });

  //change password, username, phone number
  if(new_pwd === new_pwd_confirm){
    DBconnect.getConnection(function(err,connection){
      if(err){
        console.log("DB ERROR!");
        return;
      }
      connection.query(sql_update,[new_username,new_phone_number,new_pwd,uid],function(err,result){
        if(err){
          console.log("ERROR WHEN UPDATE BASIC MESSAGE!");
          return;
        }
        console.log("update successful!");
        res.redirect('/users/manageProfile');
      })
    });
  }
  else{
    console.log("please check your password!");
  }

  //change description
    DBconnect.getConnection(function(err,connection){
      if(err){
        console.log('Error happens when connect to db');
        return;
      }
      connection.query(sql_change_desc,[new_self_intro,uid],function(err,result){
        if(err)
        {
          console.log('ERROR-',err.message);
          return;
        }
        console.log('description changed');
        res.redirect('/users/manageProfile');
      })
    });
  

});

router.get('/contactlist', checkLogin, function(req,res,next){
  res.render('contactlist');
  var email =req.session.user;
  var username,pwd,description,phone_no,uid;
});

router.get('/activityPosted',checkLogin, function(req,res,next)
{
  var uid = req.session.uid;
  var uid;
  var sql_select_user = "SELECT * FROM USERS WHERE UID = ?";
  DBconnect.getConnection(function(err,connection){
      if(err){
        console.log('Error happens when connect to db' + err);
        return;
      }
      connection.query(sql_select_user,[email],function(err,result){
        if(err)
        {
          console.log('ERROR-',err.message);
          return;
        }
        uid = result[0].UID;
        console.log("UID is " + uid);
      })
  });
  /*var a_description=[];
  var a_location=[];
  var a_type = [];
  var a_quota = [];
  var a_rating = [];
  var a_status=[];
  var a_expiretime = [];
  var a_starttime=[];
  var a_no_of_joiners =[];*/
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
        console.log(result[0]);
        if(result.length)
        {
          result = JSON.stringify(result);
          fs.writeFile('public/activities_json/activities.json',result,'utf8');
        }
        else{
          console.log("You have not create activities!");
        }
        
      })
  });
  res.render('activityPosted');

});

module.exports = router;
//profile.html
//manageProfile.html
//contactlist
//activityPosted