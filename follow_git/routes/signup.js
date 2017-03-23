var express = require('express');
var router = express.Router();

var Activity = require("../models/activity");

var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signin');//Decide which view to load in
});

router.post('/', checkNotLogin, function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;
