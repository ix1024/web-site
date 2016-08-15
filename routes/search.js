var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config');
var utils = require('npm-utils-kingwell');
var response = config.response;
var Article = require('../routes/model/article');
router.get('/', function(req, res, next) {
	var keyword = req.query.keyword || '';
	var typeQuery = keyword ? '(' + keyword + ')' : '';
	var reg = new RegExp(keyword, 'ig');
	var queryObj = keyword ? {
		title: reg
	} : {};
	Article
		.find()
		.where(queryObj)
		.limit(10)
		.sort({
			date: -1
		})
		.exec(function(err, docs) {
			var list = [];
			docs.forEach(function(item) {
				var title = item.title || '';
				var reg = new RegExp(keyword, 'ig');
				item.title = utils.slice(item.title, 50);
				if (keyword) {
					item.title = item.title.replace(reg, function(i) {
						return '<mark>' + keyword + '</mark>';
					});
				}

				list.push(item);
			});
			res.render('article/list', {
				title: config.site.name,
				user: req.session.user,
				utils: utils,
				keyword: keyword,
				nav: config.nav,
				breadCrunmbs: [{
					text: '搜索',
					url: '/search?keyword=' + keyword
				}, {
					text: '搜索结果'
				}],
				data: {
					//articelCount: docs,
					articelList: list
				}
			});
		});

});
module.exports = router;