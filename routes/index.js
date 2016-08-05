var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config');
var response = config.response;
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('open');
});

var Article = db.model('Article', {});
/* GET home page. */
router.get('/', function(req, res, next) {


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
			//res.send(data);
			res.render('index', {
				title: 'Express',
				data: {
					user: req.session.user || '',
					articelCount: data[0],
					articelList: data[1]
				}
			});
		})
		.catch(function(reason) {
			console.log(reason);
		});


});

module.exports = router;