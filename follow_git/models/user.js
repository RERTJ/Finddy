
// <<<<<<< HEAD
// var DBconnect = require('../models/DBconnect.js');
//
// =======
// >>>>>>> 0eb59aef1b0abfe237d96f8dac59af7617bbbca2
// module.exports = User;
//
// function User(id, username, email, password, contact, introduction)
// {
//   this.id=id;
//   this.username=username;
//   this.email=email;
//   this.password=password;
//   this.contact=contact;
//   this.introduction=introduction;
//   this.blacklist=[];
//   this.whitelist=[];
//   this.updates=[];
//
// <<<<<<< HEAD
//   this.creatUser = function(username, email, password)
//   {
//     this.username=username;
//     this.email=email;
//     this.password=password;
//     this.contact=contact;
//     this.introduction=introduction;
//     this.blacklist=blacklist;
//     this.whitelist=whitelist;
//     this.updates=[];
//     this.activities=[];
//
//     var sql = 'INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES ('+username+','+ email+','+ passward+')'
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, result) {
//         if (err)
//           {
//             console.log('Error about query');
//           }else{
//             console.log('Created successfully!');
//               }
//       });
//     });
// =======
//   this.getAll = function()
//   {
//     console.log('get_all activity~');
// >>>>>>> 0eb59aef1b0abfe237d96f8dac59af7617bbbca2
//   };
//
//   this.updateinformation = function(username, email, password, contact, introduction, blacklist, whitelist, updates)
//   {
// <<<<<<< HEAD
// =======
//     this.id=id;
// >>>>>>> 0eb59aef1b0abfe237d96f8dac59af7617bbbca2
//     this.username=username;
//     this.email=email;
//     this.password=password;
//     this.contact=contact;
//     this.introduction=introduction;
//     this.blacklist=blacklist;
//     this.whitelist=whitelist;
//     this.updates=[];
//     this.activities=[];
// <<<<<<< HEAD
//
//     var sql = 'INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES (username, email, passward, ?, ?)'
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
//   this.changePassword = function(oldPassword, newPassword){
//     if (oldPassword=this.password){
// =======
// };
//   this.changePassword = function(oldPassword, newPassword)
//   {
//     if oldPassword=this.password{
// >>>>>>> 0eb59aef1b0abfe237d96f8dac59af7617bbbca2
//       this.password=newPassword
//       console.log("password renewed!")
//     }
//     else {
//       console.log("wrong password!")
//     }
// <<<<<<< HEAD
//
//     var sql = ''
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
//   this.getInforFromOthers = function(id){
//     var sql = ''
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
//
//   this.getActivities = function(id1){
//     var sql = ''
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
//   this.getBlacklist= function(id1){
//     var sql = ''
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
//   this.addBlacklist= function(id1,id2){
//     var sql = ''
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
//   this.deleteBlacklist= function(id1,id2){
//     var sql = ''
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
//   this.getWhitelist= function(id1){
//     var sql = ''
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
//   this.addwhitelist= function(id1,id2){
//     var sql = ''
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
//   this.deleteWhitelist= function(id1,id2){
//     var sql = ''
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
//   this.getUpdates= function(id1){
//     var sql = ''
//     DBconnect.getConnection(function(err, connection) {
//       if (err) {
//         console.log('Error connecting to Db');
//         return;
//       }
//       connection.query(sql, function(err, results) {
//         if (err) throw err;
//       });
//     });
//   };
//
// =======
//   };
//   this.getInforFromOthers(id){
//
//   };
//   this.getActivities(this.id){
//
//   };
//   this.getBlacklist(this.id){
//
//   };
//   this.addBlacklist(this.id,id){
//
//   };
//   this.deleteBlacklist(this.id,id){
//
//   };
//   this.getWhitelist(this.id){
//
//   };
//   this.addwhitelist(this.id,id){
//
//   };
//   this.deleteWhitelist(this.id,id){
//
//   };
//   this.getUpdates(this.id){
//     //Call database
//   };
// >>>>>>> 0eb59aef1b0abfe237d96f8dac59af7617bbbca2
// }

