var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var DBconnect = require('../models/DBconnect.js');

// GET /signin
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('login');

});

// POST /signin
router.post('/', checkNotLogin, function(req, res, next) {
  var password = req.fields.password;
  var mail = req.fields.email;

  var sql = 'SELECT PASSWORD FROM USERS WHERE EMAIL = '+"'"+mail+"'";
  console.log(sql);

  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db when check password');
      // return;
    }
    connection.query(sql, function(err, result) {
      if (err)
      {
        console.log('Error about query when check password');
      }
      else{
        if(result.length){
          if(result[0].PASSWORD!=password){
            console.log('wrong password!');
          }
          else{
            res.redirect('/');
          }
        }
        else{
          console.log('this mail is not valid!')
        }
  }
  });
  });

});

module.exports = router;
