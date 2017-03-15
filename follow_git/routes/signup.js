var express = require('express');
var router = express.Router();

var Activity = require("../models/activity");

var checkNotLogin = require('../middlewares/check').checkNotLogin;

var activity = new Activity(001, "test", "this is for test", "Shaw can", "8:30", "Admin", "8:00", "8:20", 5, "open");
activity.getAll();

router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signin');//Decide which view to load in
});

router.post('/', checkNotLogin, function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;
