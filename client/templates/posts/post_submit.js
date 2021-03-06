Template.postSubmit.onCreated(function() {
	Session.set('postSubmitErrors', {});
})

Template.postSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
})

Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		var errors = validatePost(post);
		if (errors.title || errors.url) 
			return Session.set('postSubmitErrors', errors);

		Meteor.call('postInsert', post, function(err, res) {
			// 显示错误信息并退出
			if (err) {
				Errors.throw(err.message);
			}

			// 显示结果，跳转页面
			if (res.postExists) {
				throwError('该链接已经存在！');
			}
			Router.go('postPage', {_id: res._id});
		});

	}
})