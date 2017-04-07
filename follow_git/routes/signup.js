var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
<<<<<<< HEAD
var DBconnect = require('../models/DBconnect.js');
=======
>>>>>>> 1982542c0fb2433b0c95a43673e6e0404d09b080

router.get('/', checkNotLogin, function(req, res, next) {
  res.render('register');
});

router.post('/', checkNotLogin, function(req, res, next) {
  var username = req.fields.username;
  var email = req.fields.email;
  var pwd = req.fields.pwd;
  var confirm_pwd = req.fields.confirm_pwd;
  var sql = 'INSERT INTO USERS (USERNAME,EMAIL,PASSWORD,PHONE_NO,DESCRIPTION) VALUES(?,?,?,00000000,?)';
  var description = 'I am a new user';
  console.log(username +" "+ email + " " + pwd + " " + confirm_pwd);
  if(confirm_pwd === pwd)
  {
    DBconnect.getConnection(function(err,connection){
      if(err){
        console.log('Error happens when connect to db');
        return;
      }
      connection.query(sql,[username,email,pwd,description],function(err,result){
        if(err)
        {
          console.log('ERROR-',err.message);
          return;
        }
        console.log('-------------------INSERT----------------');
        console.log('INSERT--',result);
        console.log('------------------------------------------');
        res.redirect('/signin');
      })
      console.log("connected to db");
    });
  }
  else{
    console.log("please check your password!");
  }
});

module.exports = router;

//register.html