var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',function(req, res, next) {
  res.render('search');
});

router.post('/', function(req, res, next) {
  var type = req.fields.type;
  var key =req.fields.key;
  var hour =req.fields.hour;
  var year =req.fields.year;
  var month =req.fields.month;
  var date =req.fields.date;
  var ehour =req.fields.ehour;
  var eyear =req.fields.eyear;
  var emonth =req.fields.emonth;
  var edate =req.fields.edate;
  var starttimestamp="'"+year+'-'+month+'-'+date+' '+hour+':00:00';
  var estarttimestamp="'"+eyear+'-'+emonth+'-'+edate+' '+ehour+':00:00';

  res.render('searchresult');
});
router.get('/contact', function(req, res, next) {
  res.render('activityDetail');
});

router.get('/:postId/profile', function(req, res, next) {
  res.send('xxx');
});
router.post('/:postId/profile', function(req, res, next) {
  res.send('xxx');
});
module.exports = router;
