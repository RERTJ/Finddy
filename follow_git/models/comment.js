/*module.exports = Comment;

function Comment(Id, posterId, content, postTime, notificationStatus){
    this.Id = Id;
    this.posterId = posterId;
    this.content = content;
    this.postTime = postTime;
    this.notificationStatus = notificationStatus;
    this.commentDeleted = false;
    this.deleteComment = function(){
        this.commentDeleted = true;
        // delete this comment in db
    }
<<<<<<< HEAD
    this.postComment = function(activity){
        activity.comments[activity.comments.length] = this.Id;
=======
    this.postComment = function(){
        //show the comment
>>>>>>> 1982542c0fb2433b0c95a43673e6e0404d09b080
    }
}

Comment.prototype.getAll = function()
{
    //output details of this comment
}*/