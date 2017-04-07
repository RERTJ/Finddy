var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
//var bodyParser = require('body-parser');
var DBconnect = require('../models/DBconnect.js');

//router.use(bodyParser.urlencoded({ extended: true }));
//router.use(bodyParser.json());

// GET /signin
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('login');
});

// POST /signin
router.post('/', checkNotLogin, function(req, res, next) {
    var email = req.fields.email;
    var password = req.fields.password;
    console.log(email + ": " + password);
    var sql = 'SELECT PASSWORD FROM USERS WHERE EMAIL = ?';
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
        if(result.length)
        {
          if(result[0].PASSWORD!=password)
          {
            console.log('wrong password!');
            res.redirect('/signin');
          }
          else
          {
            //cookie!
            console.log('sign in success!');
            req.session.user=email;
            console.log(result[0]);
            res.redirect('/users');
          
          }
        }
        else{
          console.log('this email is invalid!');
          res.redirect('/signin');
        }
      })
    });
    
});

module.exports = router;

//login.html
