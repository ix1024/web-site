var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config');
var utils = require('npm-utils-kingwell');
var response = config.response;

var Article = require('../routes/model/article');
var Comment = require('../routes/model/comment');
router.get('/', function(req, res, next) {
	var type = req.query.type || '';
	var typeQuery = type ? '(' + type + ')' : '';
	var queryObj = type ? {
		classification: type
	} : {};
	Article
		.find()
		.where(queryObj)
		.limit(10)
		.sort({
			date: -1
		})
		.exec(function(err, docs) {
			res.render('article/list', {
				title: config.site.name,
				user: req.session.user,
				utils: utils,
				nav: config.nav,
				breadCrunmbs: [{
					text: 'article',
					url: '/article'
				}, {
					text: type,
					url: '/article?type=' + type
				}, {
					text: '文章列表'
				}],
				data: {
					//articelCount: docs,
					articelList: docs
				}
			});
		});

});
/* GET home page. */
router.get('/:id', function(req, res, next) {

	var id = req.params.id;

	//获取评论
	var getComment = function() {
		return new Promise(function(resolve, reject) {
			Comment
				.find({
					id: id
				}, function(err, docs) {
					if (err) {
						reject(err);
					} else {
						resolve(docs);
					}

				})
				.sort({
					date: -1
				})
				.limit(5);
		});
	};
	//获取评论数量
	var getCommentCount = function() {
		return new Promise(function(resolve, reject) {
			Comment
				.find({
					id: id
				})
				.count(function(err, docs) {
					utils.log(docs, 'yellow');
					if (err) {
						reject(err);
					} else {
						resolve(docs);
					}

				});
		});
	};
	//获取文章数量
	var getArticleCount = function() {
		return new Promise(function(resolve, reject) {
			Article.count({}, function(err, num) {
				//console.log(num);
				if (err) {
					reject(err);
				} else {
					resolve(num);
				}

			});
		});
	};
	//获取文章列表
	var getArticleList = function() {
		return new Promise(function(resolve, reject) {
			Article.find({
				_id: req.params.id
			}, function(err, docs) {
				if (err) {
					reject(err);
				} else {
					resolve(docs);
				}
			});
		});
	};

	var result = function() {
		return Promise.all([
			getArticleCount(),
			getArticleList(),
			getComment(),
			getCommentCount()
		]);
	};
	result()
		.then(function(data) {
			var articleData = JSON.parse(JSON.stringify(data[1]));
			var commentList = JSON.parse(JSON.stringify(data[2]));

			Article.update({
					_id: id
				}, {
					read: articleData[0].read + 1
				},
				function(err) {
					if (err) {
						utils.log(err, 'red');
					} else {}

				});

			if (req.query.debug === 'true') {
				res.send(data);
			} else {
				res.render('article/article', {
					title: config.site.name,
					utils: utils,
					user: req.session.user,
					nav: config.nav,
					breadCrunmbs: [{
						text: 'article',
						url: '/article'
					}, {
						text: utils.slice(articleData[0].title, 100)
					}],
					data: {
						id: id,
						articelCount: data[0],
						result: articleData,
						commentCount: data[3],
						commentList: commentList
					}
				});
			}

		})
		.catch(function(reason) {
			utils.log(reason, 'red');
			next();
		});

});

module.exports = router;