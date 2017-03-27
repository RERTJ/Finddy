var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user');
});
router.get('/:postId/profile', function(req, res, next) {
  res.send('xxx');
});
router.post('/:postId/profile', function(req, res, next) {
  res.send('xxx');
});
module.exports = router;
