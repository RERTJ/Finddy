var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;



router.get('/', function(req, res, next) {
  res.send();
});

//Post an activity
router.post('/', checkLogin, function(req, res, next) {
  res.send();
});
router.get('/create', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

//Certain activity
router.get('/:postId', function(req, res, next) {
  res.send(req.flash());
});
//Edit Certain activity
router.get('/:postId/edit', checkLogin, function(req, res, next) {
  res.send(req.flash());
});
router.post('/:postId/edit', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;
