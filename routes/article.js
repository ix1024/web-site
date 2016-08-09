var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config');
var fn = require('../fn');
var response = config.response;
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

//var Article = require('../acticle'); //mongoose.model('Article', {});
var Article = require('../routes/model/acticle'); 
/* GET home page. */
router.get('/:id', function(req, res, next) {
	//console.log(req.params);
	//res.send({name:req.params.id});
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
			//console.log(data[0], data[1]);
			// var article = new Article({
			// 	read: 1
			// });

			Article.update({
					_id: id
				}, {
					read: articleData[0].read + 1,
					//author: '逍遥子'
				},
				function(err) {
					console.log('update ', err);
				});

			if (req.query.debug === 'true') {
				res.send(data);
			} else {
				res.render('article', {
					title: config.site.name,
					fn: fn,
					data: {
						user: req.session.user || '',
						articelCount: data[0],
						result: articleData
					}
				});
			}


		})
		.catch(function(reason) {
			console.log(reason);
			next();
		});


});

module.exports = router;