var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var DBconnect = require('../models/DBconnect.js');
var crypto = require('crypto');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// GET /signin
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('login');
});

// POST /signin
router.post('/', checkNotLogin, function(req, res, next) {
    var email = req.fields.email;
    var password = req.fields.password;
    var hmac = crypto.createHash('sha256');
    hmac.update(password);
    var uid;
    console.log(email + ": " + password);
    var sql = 'SELECT UID,PASSWORD,USERNAME,admin FROM USERS WHERE EMAIL = ?';
    console.log(sql);
    DBconnect.getConnection(function(err,connection){
      if(err){
        console.log('Error happens when connect to db' + err);
        return;
      }
      connection.query(sql,[email],function(err,result){
        if(err)
        {
          console.log('ERROR-',err,message);
          return;
        }
        if(result.length && result[0].PASSWORD===password)
        {
            console.log('sign in success!');
            req.session.user=result[0].UID;
            req.session.username=result[0].USERNAME;
            req.session.admin=result[0].admin;
            console.log(req.session.user);
            res.send(true);
        }
        else{
          console.log('this email is invalid!');
          res.send(false);
        }
      })
    });

});

module.exports = router;

//login.html
