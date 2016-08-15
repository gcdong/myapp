Template.postsList.helpers({
	posts: function() {
		// 按照提交时间降序排列
		return Posts.find({}, {sort: {submitted: -1}});
	}
});