var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config');
var utils = require('npm-utils-kingwell');
var response = config.response;
var Article = require('../routes/model/acticle');
var findArticle = function(callback) {
	Article.find({}, function(err, docs) {
		callback(err, docs);
	});
};
/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.user) {
		utils.log(req.session.user, 'yellow');
	} else {
		utils.log('未登录', 'red');
	}

	var tag = function() {
		return new Promise(function(resolve, reject) {
			findArticle(function(err, docs) {
				if (err) {
					reject(err);
				} else {
					resolve(docs);
				}

			});
		});
	};
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
			findArticle(function(err, docs) {
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
			find(),
			tag()
		]);
	};
	result()
		.then(function(data) {

			//tags
			var tags = [];
			data[2].forEach(function(item) {
				var tag = item.tag || '';
				if (tag) {
					tags.push(tag);
				}
			});
			tags = tags.join('').split(',');
			tags = utils.toDenseArray(tags);
			tags = utils.delArray(tags);


			if (req.query.debug === 'true') {
				res.send(data);
			} else {
				res.render('index', {
					title: config.site.name,
					user: req.session.user,
					utils: utils,
					nav: config.nav,
					data: {
						user: req.session.user || '',
						articelCount: data[0],
						articelList: JSON.parse(JSON.stringify(data[1])),
						tags: tags
					}
				});
			}
		})
		.catch(function(reason) {
			utils.log(reason, 'red');
		});
});

module.exports = router;