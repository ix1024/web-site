var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config');
var utils = require('npm-utils-kingwell');
var response = config.response;
var Article = require('../routes/model/acticle');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.user) {
		utils.log(req.session.user, 'yellow');
	} else {
		utils.log('未登录', 'red');
	}

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
			Article.find({}, function(err, docs) {
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
			//console.log(data[0], data[1]);
			if (req.query.debug === 'true') {
				res.send(data);
			} else {
				//utils.log(data, 'yellow');
				res.render('index', {
					title: config.site.name,
					user: req.session.user,
					utils: utils,
					data: {
						user: req.session.user || '',
						articelCount: data[0],
						articelList: JSON.parse(JSON.stringify(data[1]))
					}
				});
			}


		})
		.catch(function(reason) {
			utils.log(reason, 'red');
		});


});

module.exports = router;