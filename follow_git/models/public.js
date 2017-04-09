module.exports = toTime;

function toTime(time){
  var date = new Date(time);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var date1 = date.getDate();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = year+" "+month+" "+date1+" "+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;

};
