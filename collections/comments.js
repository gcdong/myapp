Comments = new Mongo.Collection('comments');

// 更新帖子的评论数

Meteor.methods({
    commentInsert: function(commentAttribute) {
        check(this.userId, String);
        check(commentAttribute, {
            postId: String,
            body: String
        });
        var user = Meteor.user();
        // 找出文章
        var post = Posts.findOne(commentAttribute.postId);
        if (!post)
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');
        comment = _.extend(commentAttribute, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
		Posts.update(comment.postId, { $inc: { commentsCount: 1 } });


        comment._id = Comments.insert(comment);
        //创建一个notic用户提醒
        createCommentNotification(comment);

        return comment._id;
    }
});
