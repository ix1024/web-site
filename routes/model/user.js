var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
var UserSchema = new Schema({
	id: ObjectId,
	userName: String,
	password: {
		type: String,
		default: ''
	},
	nickname: {
		type: String,
		default: ''
	},
	sex: Number,
	age: Number,
	email: String,
	ip: String,
	permission: {
		type: String,
		default: 'user'
	},
	eid: {
		type: String,
		default: 0
	},
	position: {
		type: String,
		default: '0'
	},
	lastLoginTime: {
		type: Date,
		default: '0'
	},
	date: {
		type: Date,
		default: Date.now
	},
	updateDate: {
		type: Date,
		default: '0'
	}
});
var User = mongoose.model('User', UserSchema);
module.exports = User;