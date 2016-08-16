Notifications = new Mongo.Collection('notifications');

Notifications.allow({
    update: function(userId, doc, fieldNames) {
        //必须是自己的文档而且是在更新的是read这一个字段的时候
        return ownsDocument(userId, doc) && fieldNames.length === 1 && fieldNames[0] === 'read';
    }
});

createCommentNotification = function(comment) {
    var post = Posts.findOne(comment.postId);
    //非自己的评论的时候
    if (comment.userId !== post.userId) {
        Notifications.insert({
            userId        : post.userId,
            postId        : post._id,
            commentId     : comment._id,
            commenterName : comment.author,
            read          : false
        });
    }
}
