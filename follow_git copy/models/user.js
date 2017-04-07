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
    if oldPassword=this.password{
      this.password=newPassword
      console.log("password renewed!")
    }
    else {
      console.log("wrong password!")
    }
  };
  this.getInforFromOthers(id){

  };
  this.getActivities(this.id){

  };
  this.getBlacklist(this.id){

  };
  this.addBlacklist(this.id,id){

  };
  this.deleteBlacklist(this.id,id){

  };
  this.getWhitelist(this.id){

  };
  this.addwhitelist(this.id,id){

  };
  this.deleteWhitelist(this.id,id){

  };
  this.getUpdates(this.id){
    //Call database
  };
}
