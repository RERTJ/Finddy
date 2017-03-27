var DBconnect = require('../modules/DBconnect.js');

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

  this.changePassword = function(oldPassword, newPassword)
  {
    if oldPassword=this.password{
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

  this.getInforFromOthers(id){
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

  this.getActivities(this.id){
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

  this.getBlacklist(this.id){
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

  this.addBlacklist(this.id,id){
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

  this.deleteBlacklist(this.id,id){
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

  this.getWhitelist(this.id){
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

  this.addwhitelist(this.id,id){
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

  this.deleteWhitelist(this.id,id){
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

  this.getUpdates(this.id){
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
