var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
var CommentSchema = new Schema({
	id: String,
	who: {
		type: String,
		default: '匿名'
	},
	content: String,
	updateDate: {
		type: Date,
		default: '2015'
	},
	date: {
		type: Date,
		default: Date.now
	}
});
var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;