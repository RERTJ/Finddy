var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('profile');
});

router.get('/contact', function(req, res, next) {
  res.render('contactList');
});

router.get('/:postId/profile', function(req, res, next) {
  res.send('xxx');
});
router.post('/:postId/profile', function(req, res, next) {
  res.send('xxx');
});
module.exports = router;
