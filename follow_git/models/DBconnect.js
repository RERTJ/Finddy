var mysql = require('mysql');

var DBconnect = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "396x^^qj",
	database: "CSCI3100_Finddy"
});

module.exports = DBconnect;
