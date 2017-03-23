module.exports = Activity;

function Activity(Id, type, description, location, startTime, creator, postTime, expireTime, quota, activityStatus)
{
    this.Id = Id;
    this.type = type;
    this.description = description;
    this.location = location;
    this.startTime = startTime;
    this.rating = 0;
    this.creator = creator;
    this.postTime = postTime;
    this.expireTime = expireTime;
    this.quota = quota;
    this.joiners =[];
    this.joiners[0] = creator;
    this.activityStatus = activityStatus;
    this.comments = [];

    this.postActivity = function(){
        // some user post this activity
    }
    this.viewActivity = function(){
        // make the activity be viewed
    }
    this.updateActivity = function(description, location, startTime, postTime, expireTime, quota, activityStatus)
    {
        this.description = description;
        this.location = location;
        this.startTime = startTime;
        this.postTime = postTime;
        this.expireTime = expireTime;
        this.quota = quota;
        this.activityStatus = activityStatus;
    }
    this.deleteActivity = function(){
        // delete this activity in db
    }
    this.joinActivity = function(people){
        this.joiners[this.joiners.length] = people;
    }
    this.quitActivity = function(people){
        // delete that person in joiners
    }
    this.getComments = function(){
        // show the comments of this activity
    }
}

Activity.prototype.getAll = function(){
    console.log("create Activity!")；
    // 0315: write classes activity, comment and update. Functions need implementation.
}

