var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
var UserSchema = new Schema({
	id: ObjectId,
	userName: String,
	password: String,
	nickname: String,
	sex: Boolean,
	age: Number,
	email: String,
	date: {
		type: Date,
		default: Date.now
	}
});
var User = mongoose.model('User', UserSchema);
module.exports = User;