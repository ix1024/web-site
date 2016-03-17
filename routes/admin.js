var express = require('express');
var router = express.Router();
var pub = require('../pub/pub');
var db = require('../pub/db');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('admin/index', {
		title: 'Express',
		pub: pub
	});
});
router.get('/add', function(req, res, next) {
	res.render('admin/index', {
		pub: pub
	});
});
router.post('/add', function(req, res, next) {
	var title = req.body.title;
	var content = req.body.content;
	var dateTime = new Date();
	var author = 'Kingwell Leng';

	if (!title || !content) {
		res.send('出错了');
		return;
	}
	res.send({
		title: title,
		content: content,
		dateTime: dateTime,
		author: author
	});
	db.insert('documents', [{
		title: title,
		content: content,
		dateTime: dateTime,
		author: author
	}], function(docs) {
		if (docs.result.ok) {
			//res.send(docs.ops);
			res.send('添加成功');
		} else {
			res.send('出错了');
		}

	}, function(err) {
		res.send(err);
	});
	// db.find('documents', {}, function(docs) {
	// 	res.send(docs);
	// }, function(err) {
	// 	res.send(err);
	// });

});
module.exports = router;