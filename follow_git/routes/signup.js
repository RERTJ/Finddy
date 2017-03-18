var express = require('express');
var router = express.Router();
var user = require('../models/user')
var checkNotLogin = require('../middlewares/check').checkNotLogin;

var tester= new user(1, "handsomeman", "handsomeman@gamil.com", "xxx", "65611000", "Nice to meet you");
tester.getAll();

router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signup');//Decide which view to load in
});

router.post('/', checkNotLogin, function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;
