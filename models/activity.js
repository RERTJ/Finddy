module.exports = Activity;

function Activity(Id, type, description, location, startTime, creator, postTime, expireTime, quota, activityStatus)
{
    this.Id = Id;
    this.type = type;
    this.description = description;
    this.location = location;
    this.startTime = startTime;
    this.rating = 0.0;
    this.creator = creator;
    this.postTime = postTime;
    this.expireTime = expireTime;
    this.quota = quota;
    this.joiners =[];
    this.joiners[0] = creator;
    this.activityStatus = activityStatus;
    this.comments = [];

    this.postActivity = function(){
        
    }
    this.viewActivity = function(){

    }
    this.updateActivity = function(){

    }
    this.deleteActivity = function(){

    }
    this.joinActivity = function(){

    }
    this.quitActivity = function(){

    }
    this.getComments = function(){
        
    }
}

Activity.prototype.getAll = function(){
    console.log("create Activity!");
    console.log("The activity Id is " + this.Id + " This activity will " + this.description + " It will start at " + this.startTime + " at " + this.location + " and the quota is " + this.quota);
    //alert("I am an activity!");
    // 0315: write classes activity, comment and update. Functions need implementation.
}

