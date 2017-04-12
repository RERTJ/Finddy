var mysql = require('mysql');

var DBconnect = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "396x^^qj",
	database: "CSCI3100_Finddy"
});

module.exports = DBconnect;
// var mysql = require('mysql');
//
// var DBconnect = mysql.createPool({
// 	host: "ftp.j6xhrswrm4c4ut2f.nipaiyi.com:643",
// 	user: "root",
// 	password: "396x^^qj",
// 	database: "a0410175443"
// });
//
// module.exports = DBconnect;
