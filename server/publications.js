Meteor.publish('posts', function() {
    return Posts.find({}, { fields: { date: false } });
});

Meteor.publish('comments', function(postId) {
	check(postId, String);
    return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId, read: false});
})
