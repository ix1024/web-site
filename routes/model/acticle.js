var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
var BlogPost = new Schema({
	id: ObjectId,
	author: {
		type: String,
		default: 'admin'
	},
	title: String,
	body: String,
	tag: {
		type: String,
		default: ''
	},
	read: {
		type: Number,
		default: 1
	},
	image: {
		type: String,
		default: ''
	},
	date: {
		type: Date,
		default: Date.now
	}
});
var Article = mongoose.model('Article', BlogPost);
module.exports = Article;