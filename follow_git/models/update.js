module.exports = Update;

function Update(updateId, content, userId)
{
    this.updateId = updateId;
    this.content = content;
    this.readStatus = false;
    this.userId = userId;
    this.markasRead = function(){
        this.readStatus = true;
    }
}

Update.prototype.getAll(){
    // output details of this update
}