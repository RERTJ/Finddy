var express = require('express');
var fs = require('fs');
var router = express.Router();
var DBconnect = require('../models/DBconnect.js');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var public = require('../public/js/publicFunction.js').checkNotLogin;


router.get('/', checkNotLogin, function(req, res, next) {
  res.render('search');//Decide which view to load in
});

router.post('/', checkNotLogin, function(req, res, next) {
  var type = req.fields.type;

  var hour =req.fields.shour;
  var min =req.fields.sminute;
  var date =req.fields.start;
  date= date.substring(6,10)+"-"+date.substring(3,5)+"-"+date.substring(0,2)

  var emin =req.fields.eminute;
  var ehour =req.fields.ehour;
  var edate =req.fields.finish;
  edate= edate.substring(6,10)+"-"+edate.substring(3,5)+"-"+edate.substring(0,2)
  var starttimestamp= date+' '+hour+":"+min+':00';
  var starttimestamp= edate+' '+ehour+":"+emin+':00';

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
        for(i=0;i<=myjson.length;i++){
          myjson[i].START_TIME=public.toTime(myjson[i].START_TIME);
        }
        console.log(myjson);

        fs.writeFile('public/data/searchResult.json',myjson,'utf8');
        res.redirect('searchResult');


  }
  });
  });
});


module.exports = router;
