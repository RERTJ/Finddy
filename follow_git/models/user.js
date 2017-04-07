var DBconnect = require('../models/DBconnect.js');

module.exports = User;

function User(id, username, email, password, contact, introduction)
{
  this.id=id;
  this.username=username;
  this.email=email;
  this.password=password;
  this.contact=contact;
  this.introduction=introduction;
  this.blacklist=[];
  this.whitelist=[];
  this.updates=[];

  this.getAll = function()
  {
    console.log('get_all activity~');
  };

  this.updateinformation = function(username, email, password, contact, introduction, blacklist, whitelist, updates)
  {
    this.id=id;
    this.username=username;
    this.email=email;
    this.password=password;
    this.contact=contact;
    this.introduction=introduction;
    this.blacklist=blacklist;
    this.whitelist=whitelist;
    this.updates=[];
    this.activities=[];

    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };

  this.changePassword = function(oldPassword, newPassword){
    if (oldPassword=this.password){
      this.password=newPassword
      console.log("password renewed!")
    }
    else {
      console.log("wrong password!")
    }

    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };

  this.getInforFromOthers = function(id){
    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };


  this.getActivities = function(id1){
    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };

  this.getBlacklist= function(id1){
    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };

  this.addBlacklist= function(id1,id2){
    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };

  this.deleteBlacklist= function(id1,id2){
    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };

  this.getWhitelist= function(id1){
    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };

  this.addwhitelist= function(id1,id2){
    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };

  this.deleteWhitelist= function(id1,id2){
    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };

  this.getUpdates= function(id1){
    var sql = ''
    DBconnect.getConnection(function(err, connection) {
      if (err) {
        console.log('Error connecting to Db');
        return;
      }
      connection.query(sql, function(err, results) {
        if (err) throw err;
      });
    });
  };

}
