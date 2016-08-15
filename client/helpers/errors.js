// 新建一个存在客户端的Error集合
Errors = new Mongo.Collection(null);

throwError = function(message) {
    Errors.insert({ message: message })
}
