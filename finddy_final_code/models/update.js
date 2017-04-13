var DBconnect = require('./DBconnect.js');

var Update = function(type, actor, activity_id) {
  this.type = type;
  this.actor = actor;
  this.activity_id = activity_id;

  Update.prototype.storeUpdateMessage = function() {
    var activity_id = this.activity_id;
    var type = this.type;
    var actor = this.actor;
    var updateContent = '';
    var url = '';
    var activity_id = activity_id;
    console.log(type);
    console.log("aid" + activity_id);
    if (type == 'change' || type == 'cancel') {
      if (type == 'change') {
        updateContent = actor + ' changed the activity you joined';
      } else if (type == 'cancel') {
        updateContent = actor + ' cancelled the activity you joined';
      }
      url = '/activity/' + activity_id;
      var sql_getActivityJoiners = 'SELECT JOINER_ID FROM JOINERS WHERE ACTIVITY_ID = ?';
      var sql_insertUpdate = 'INSERT INTO UPDATES (USER_ID, UPDATECONTENT, URL, CREATE_TIME) VALUES ';
          sql_insertUpdate += '(?, ?, ?, CURRENT_TIMESTAMP())';
      var sqlParam = [];
      DBconnect.getConnection(function(err,connection) {
        if (err) { console.log('Error connecting to DB.'); }
        connection.query(sql_getActivityJoiners, activity_id, function(err, result) {
          if (err) {console.log(err);} else {
            for (var i in result) {
              sqlParam = [result[i].JOINER_ID, updateContent, url];
              console.log("param: " + sqlParam);
              connection.query(sql_insertUpdate, sqlParam, function(err) {
                if (err) {console.log(err);}
              });
            }
            console.log('update stored success');
          }

        });
      });
    } else {
      if (type == 'join') {
        updateContent = actor + ' joined your activity';
      } else if (type == 'comment') {
        updateContent = actor + ' commented your activity';
      } else if (type == 'quit') {
        updateContent = actor + ' quit your activity';
      }
      url = '/activity/' + activity_id;

      var sql = 'INSERT INTO UPDATES (USER_ID, UPDATECONTENT, URL, CREATE_TIME) VALUES ';
          sql += '((SELECT CREATOR_ID FROM ACTIVITIES WHERE AID = ?), ?, ?, CURRENT_TIMESTAMP())';
      var sqlParam = [activity_id, updateContent, url];

      DBconnect.getConnection(function(err, connection) {
        if (err) { console.log('Error connecting to DB.'); }
        connection.query(sql, sqlParam, function(err, result) {
          if (err) {console.log(err);}
          else {
            console.log('update stored');
          }
        });
      });
    }
  }
}

module.exports = Update;
