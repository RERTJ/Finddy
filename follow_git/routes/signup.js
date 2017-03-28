var express = require('express');
var router = express.Router();
var user = require('../models/user')
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
      console.log('Error connecting to Db');
      return;
    }
    connection.query(sql, function(err, result) {
      if (err)
      {
        console.log('Error about query');
      }else{
        console.log(result[0].UID);

      }

    });
  });

});

module.exports = router;
