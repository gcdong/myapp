Template.header.helpers({
	activeRouteClass: function() {
		// 将参数转成真数组
		var args = Array.prototype.slice.call(arguments, 0);
		var active = _.any(args, function(name) {
			return Router.current() && Router.current().route.getName() === name;
		});

		return active && 'active';
	}
});