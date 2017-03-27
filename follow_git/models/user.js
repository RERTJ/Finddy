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
};
  this.changePassword = function(oldPassword, newPassword)
  {
    // if oldPassword==this.password
    // {
    //   this.password=newPassword
    //   console.log("password renewed!")
    // }
    // else {
    //   console.log("wrong password!")
    // }
  };
  this.getInforFromOthers = function(id){

  };
  this.getActivities = function(id){

  };
  this.getBlacklist = function(id){

  };
  this.addBlacklist = function(id1,id2){

  };
  this.deleteBlacklist = function(id,id){

  };
  this.getWhitelist = function(id){

  };
  this.addwhitelist = function(id1,id2){

  };
  this.deleteWhitelist = function(id1,id2){

  };
  this.getUpdates =function(id){
    //Call database
  };
}
