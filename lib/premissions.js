// 检查是否是改用户的文章
ownsDocument = function(userId, doc) {
	return doc && doc.userId === userId;
}