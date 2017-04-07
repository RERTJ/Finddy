var mysql = require('mysql');

var DBconnect = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "o4ym4xpk",
	database: "CSCI3100_Finddy"
});

module.exports = DBconnect;
