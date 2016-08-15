Meteor.publish('posts', function() {
  	return Posts.find({}, {fields: {date: false}});
});