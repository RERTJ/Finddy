var express = require('express');
var fs = require('fs');

var router = express.Router();
// var User = require('../models/User')
var DBconnect = require('../models/DBconnect.js');
var checkNotLogin = require('../middlewares/check').checkNotLogin;


router.get('/', checkNotLogin, function(req, res, next) {
  res.render('search');//Decide which view to load in
});

router.post('/', checkNotLogin, function(req, res, next) {

  // res.render('search');//Decide which view to load in
  var type = req.fields.type;
  // var key =req.fields.key;
  var hour =req.fields.hour;
  var year =req.fields.year;
  var month =req.fields.month;
  var date =req.fields.date;
  var ehour =req.fields.ehour;
  var eyear =req.fields.eyear;
  var emonth =req.fields.emonth;
  var edate =req.fields.edate;
  var starttimestamp=year+'-'+month+'-'+date+' '+hour+':00:00';
  var endtimestamp=eyear+'-'+emonth+'-'+edate+' '+ehour+':00:00';

  var sql = 'SELECT * FROM ACTIVITIES WHERE TYPE='+"'"+type+"' AND START_TIME>='"+starttimestamp+"' AND START_TIME<='"+endtimestamp+"'";
  console.log(sql);

  DBconnect.getConnection(function(err, connection) {
    if (err) {
      console.log('Error connecting to Db when search');
      // return;
    }
    connection.query(sql, function(err, result) {
      if (err)
      {
        console.log('Error about query when search');
      }
      else{
        var myjson=JSON.stringify(result);
        console.log(myjson);
        fs.writeFile('public/data/searchResult.json',myjson,'utf8');

        res.redirect('searchResult');


  }
  });
  });
});






module.exports = router;
