var express = require('express');
var router = express.Router();
var pub = require('../pub/pub');
var db = require('../pub/db');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.find('documents', {}, function(docs) {
		//res.send(docs);
		res.render('index', {
			title: 'Express',
			pub: pub,
			articleList: docs
		});
	}, function(err) {
		res.send(err);
	});

});
router.get('/article-detail', function(req, res, next) {
	var id = req.query.id;
	console.log(id);
	//res.send({})
	db.find('documents', {
		_id: db.ObjectID(id)
	}, function(docs) {
		//res.send(docs[0]);
		res.render('article-detail', {
			title: 'Express',
			pub: pub,
			doc: docs[0]
		});
	}, function(err) {
		res.send(err);
	});

});

module.exports = router;