var express = require('express');
var router = express.Router();
var User = require('../models/User')
var DBconnect = require('../models/DBconnect.js');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function(req, res, next) {
  res.render('register');//Decide which view to load in
});

router.post('/', checkNotLogin, function(req, res, next) {
  var name = req.fields.username;
  var password = req.fields.password;
  var mail = req.fields.email;
  var sql = 'SELECT UID FROM USERS WHERE EMAIL = '+"'"+mail+"'";
  console.log(sql);

  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db when check mail');
      return;
    }
    connection.query(sql, function(err, result) {
      if (err)
      {
        console.log('Error about query when check mail');
      }
      else{
        if (result.length){
          console.log(result[0].UID);
          res.redirect('/signin');
          //在前端弹出一个窗口，然后回到signin
        }
        else{
          console.log('Good name'+name);
          // password=sha1(password);
    }
  }
});
  });

    var sql2 = 'INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES ('+"'"+name+"'"+','+ "'"+mail+"'"+','+ "'"+password+"'"+')'
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db when create user');
        return;
      }
      connection.query(sql2, function(err, result) {
        if (err)
          {
            console.log('Error about query when create user');
          }else{
            console.log('Created successfully!');
            res.redirect('/');

              }
    });
  });
});

module.exports = router;
