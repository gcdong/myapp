Posts = new Mongo.Collection('posts');

Posts.allow({
    update: function(userId, post) {
        // 只允许修改自己的文章
        return ownsDocument(userId, post);
    },
    remove: function(userId, post) {
        // 只允许修改自己的文章
        return ownsDocument(userId, post);
    }
});
Posts.deny({
    update: function(userId, post, fieldNames, modifier) {
        // 需要完成修改的时候不允许修改为已经存在的url
        var rs = Posts.findOne({ url: modifier.$set.url, _id: { $ne: post._id } });
        if (rs) {
            return true;
        }
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});
Posts.deny({
    update: function(userId, post, fieldNames, modifier) {
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
});

validatePost = function(post) {
    var errors = {};
    if (!post.title)
        errors.title = "请填写标题";
    if (!post.url)
        errors.url = "请填写URL";
    return errors;
}

Meteor.methods({
    postInsert: function(postAttributes) {
        check(this.userId, String);
        check(postAttributes, {
            title: String,
            url: String
        });

        var errors = validatePost(postAttributes);
        if (errors.title || errors.url)
            throw new Meteor.Error('invalid-post', "你必须为你的帖子填写标题和 URL");
        

        var postWithSameLink = Posts.findOne({ url: postAttributes.url });
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            commentsCount: 0
        });

        var postId = Posts.insert(post);

        return {
            _id: postId
        };
    }
});
