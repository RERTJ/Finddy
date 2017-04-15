var express = require('express');
var router = express.Router();
var DBconnect = require('../models/DBconnect.js');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var crypto = require('crypto');

router.get('/', function(req, res, next) {
  res.render('register');//Decide which view to load in
});

router.post('/', function(req, res, next) {
  var name = req.fields.username;
  var password = req.fields.password;
  var hmac = crypto.createHash('sha256');
  hmac.update(password);
  var mail = req.fields.email;
  var confirm_password = req.fields.confirm_password;
  hmac.update(confirm_password);
  var sql = 'SELECT UID FROM USERS WHERE EMAIL = ?';
  var sql2 = 'SELECT UID FROM USERS WHERE USERNAME =?';
  var sql3 = 'INSERT INTO USERS (USERNAME,EMAIL,PASSWORD,PHONE_NO,DESCRIPTION) VALUES(?,?,?,0,?)';
  var description = "";
  console.log(sql3 + name + mail + password);

  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db when check mail');
      return;
    }
    connection.query(sql, [mail],function(err, result) {
      if (err)
      {
        console.log('Error about query when check mail');
        return;
      } else if (result.length){
        res.send("email_exist");
      }
      else if(password != confirm_password){
        res.send("pwd_not_match");
      }
      else{
        connection.query(sql2,[name],function(err,result){
          if(err){
            console.log('Error when search name');
            return;
          } else if(result.length){
            res.send("username_exist");
          }
          else{
            connection.query(sql3,[name,mail,password,description],function(err,result){
              if(err){
                console.log('Error when insert user');
                return;
              } else {
                res.send('success');
              }
            });
          }
        });
      }
    });
  });

});

module.exports = router;

//register.html
