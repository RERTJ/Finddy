module.exports = Activity;

function Activity(Id, type, description, location, startTime, creatorId, postTime, expireTime, quota, activityStatus)
{
    this.Id = Id;
    this.type = type;
    this.description = description;
    this.location = location;
    this.startTime = startTime;
    this.rating = 0;
    this.creatorId = creatorId;
    this.postTime = postTime;
    this.expireTime = expireTime;
    this.quota = quota;
    this.joiners =[];
    this.joiners[0] = creatorId;
    this.activityStatus = activityStatus;
    this.comments = [];

    this.postActivity = function(){
        
    }
    this.viewActivity = function(){

    }
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
    }
}

Activity.prototype.getAll = function(){
    
}

