var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../../config');
var utils = require('npm-utils-kingwell');
var response = config.response;

var Article = require('../../routes/model/article');
var Comment = require('../../routes/model/comment');
var User = require('../../routes/model/user');
router.all('/get-comment/:id', function(req, res, next) {
	Comment.find({
			id: req.params.id
		}, function(err, docs) {

			var list = [];
			docs.forEach(function(item) {
				list.push({
					who: item.who,
					date: item.date,
					content: item.content
				});
			});
			res.send(list);
		})
		.sort({
			date: -1
		})
		.limit(5);
});
router.all('/remove-comment', function(req, res, next) {
	Comment.remove({}, function(err, docs) {
		console.log('del');
		console.log(err, docs);
		res.send(docs);
	});
})
router.all('/send-comment/:id', function(req, res, next) {
	var id = req.params.id; //req.body.id;
	var user = req.session.user || {};
	var who = user.userName || req.body.who;
	var content = req.body.content;

	var rs;
	// Comment.remove({}, function(err, docs) {
	// 	console.log('del');
	// 	console.log(err, docs);
	// });

	//保存评论
	var saveComment = function() {
		return new Promise(function(resolve, reject) {
			var comment = new Comment({
				id: id,
				who: who,
				content: content
			});
			comment.save(function(err, docs) {
				if (err) {
					reject(err);
				} else {
					resolve(docs);
				}
			});
		});
	};
	utils.log(id, 'yellow');
	utils.log(who, 'yellow');
	utils.log(content, 'yellow');
	if (id && who && content) {
		saveComment()
			.then(function(data) {
				res.send(response({
					result: data.id
				}));
			})
			.catch(function(err) {
				utils.log(err, 'red');
			})
	} else {
		res.send(response({
			status: '10000'
		}));
	}

});

module.exports = router;