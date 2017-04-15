var mysql = require('mysql');

var DBconnect = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "CSCI3100-Finddy"
});

module.exports = Pool;
