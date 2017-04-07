module.exports = Comment;

function Comment(Id, posterId, content, postTime, notificationStatus){
    this.Id = Id;
    this.posterId = posterId;
    this.content = content;
    this.postTime = postTime;
    this.notificationStatus = notificationStatus;
    this.commentDeleted = false;
    this.deleteComment = function(){
        this.commentDeleted = true;
    }
    this.postComment = function(activity){
        activity.comments[activity.comments.length] = this.Id;
    }
}

Comment.prototype.getAll = function()
{
    //output details of this comment
}