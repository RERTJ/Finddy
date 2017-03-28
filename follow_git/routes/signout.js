var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// GET /signout
router.get('/', checkLogin, function(req, res, next) {
  req.session.user = null;
  req.flash('successfully signed out!', '登出成功');
  res.redirect('/signin');});

module.exports = router;
