var express = require('express');
var router = express.Router();
// var User = require('../models/User')
var DBconnect = require('../models/DBconnect.js');
var checkNotLogin = require('../middlewares/check').checkNotLogin;


router.get('/', checkNotLogin, function(req, res, next) {
  res.render('searchResult_pure');//Decide which view to load in

});




module.exports = router;
