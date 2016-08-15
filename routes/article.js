var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config');
var utils = require('npm-utils-kingwell');
var response = config.response;

var Article = require('../routes/model/article');
router.get('/', function(req, res, next) {
	Article
		.find()
		.limit(10)
		.sort({
			date: -1
		})
		.exec(function(err, docs) {
			res.render('article/list', {
				title: config.site.name,
				utils: utils,
				nav: config.nav,
				breadCrunmbs: [{
					text: 'article',
					url: '/article'
				}, {
					text: '文章列表'
				}],
				data: {
					user: req.session.user || '',
					//articelCount: docs,
					articelList: docs
				}
			});
		});

});
/* GET home page. */
router.get('/:id', function(req, res, next) {

	var id = req.params.id;
	var count = function() {
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
	var find = function() {
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
			count(),
			find()
		]);
	};
	result()
		.then(function(data) {
			var articleData = JSON.parse(JSON.stringify(data[1]));

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
					nav: config.nav,
					breadCrunmbs: [{
						text: 'article',
						url: '/article'
					}, {
						text: utils.slice(articleData[0].title, 100)
					}],
					data: {
						user: req.session.user || '',
						articelCount: data[0],
						result: articleData
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