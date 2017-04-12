/*module.exports = Activity;

function Activity(Id, type, description, location, startTime, creatorId, postTime, expireTime, quota, activityStatus)
{
    this.Id = Id;
    this.type = type;
    this.description = description;
    this.location = location;
    this.startTime = startTime;
    this.rating = 0;
<<<<<<< HEAD
    this.creatorId = creatorId;
=======
    this.creator = creator;
>>>>>>> 1982542c0fb2433b0c95a43673e6e0404d09b080
    this.postTime = postTime;
    this.expireTime = expireTime;
    this.quota = quota;
    this.joiners =[];
    this.joiners[0] = creatorId;
    this.activityStatus = activityStatus;
    this.comments = [];

    this.postActivity = function(){
        // some user post this activity
    }
    this.viewActivity = function(){
        // make the activity be viewed
    }
<<<<<<< HEAD
    this.updateActivity = function(type, description, location, startTime, postTime, expireTime, quota){
        this.type = type;
        this.description = description;
        this.location = location;
        this.startTime = startTime;
        this.expireTime = expireTime;
        this.quota = quota;
    }
    this.deleteActivity = function(){
        
    }
    this.joinActivity = function(joinerId){
        this.joiners[this.joiners.length] = joinerId;
    }
    this.quitActivity = function(quitId){
        for(var i = 0; i < this.joiners.length; i++)
        {
            if (this.joiners[i] === quitId)
            {
                this.joiners[i] === this.joiners[this.joiners.length - 1];
                this.joiners[this.joiners.length - 1] === 0;
                console.log("User" + quitId + " quit the activity " + this.Id + " successfully!");
            }
        }
    }
    this.getComments = function(){
        for(var i = 0; i < this.comments.length; i++)
        {
            //use commentId to get comments from database and print the corresponding content
        }
=======
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
>>>>>>> 1982542c0fb2433b0c95a43673e6e0404d09b080
    }
}

Activity.prototype.getAll = function(){
<<<<<<< HEAD
    
=======
    console.log("create Activity!")；
    // 0315: write classes activity, comment and update. Functions need implementation.
>>>>>>> 1982542c0fb2433b0c95a43673e6e0404d09b080
}
*/
