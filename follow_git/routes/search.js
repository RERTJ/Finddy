var express = require('express');
var fs = require('fs');
var router = express.Router();
var DBconnect = require('../models/DBconnect.js');
var checkNotLogin = require('../middlewares/check').checkNotLogin;
// var toTime = require('../models/public.js');


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
  var endtimestamp= edate+' '+ehour+":"+emin+':00';

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
        for(i=0;i<result.length;i++){
          var date = new Date(result[i].START_TIME);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = date.getFullYear();
            var month = months[date.getMonth()];
            var date1 = date.getDate();
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          var formattedTime = year+" "+month+" "+date1+" "+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
           result[i].START_TIME=formattedTime;
        }
        var myjson=JSON.stringify(result);
        console.log(myjson);
        // fs.writeFile('public/data/searchResult.json',myjson,'utf8');
        res.render('searchResult_pure',
          {result: myjson
           } );
        }


  });
  });
});


module.exports = router;
