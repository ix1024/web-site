var express = require('express');
var router = express.Router();
var config = require('../../config');
var response = config.response;
var fn = require('../../fn');

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;



var Article = require('../../routes/model/acticle'); //mongoose.model('Article', {});
var User = require('../../routes/model/user'); //mongoose.model('Article', {});

router.all('*', function(req, res, next) {
	console.log('req.session.user', req.session.user);
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('admin/home', {
		user: req.session.user,
		title: 'admin'
	});

});
router.get('/user-list', function(req, res, next) {

	res.render('admin/user', {
		title: 'admin'
	});

});
router.get('/list', function(req, res, next) {

	// res.send({});
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
				//console.log('docs', docs);
				// docs.forEach(function(item) {
				// 	Article.remove({
				// 		_id: item._id
				// 	}, function(error) {
				// 		if (error) {
				// 			console.log('error');
				// 		} else {
				// 			console.log('ok');
				// 		}

				// 	});
				// });
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
			//console.log(data);
			res.render('admin/list', {
				title: 'Express',
				fn: fn,
				list: data[1]
			});
		})
		.catch(function(reason) {
			console.log(reason);
		});

});
router.get('/index', function(req, res, next) {
	//res.redirect('/admin');
	//res.send('5555');
	res.render('admin/index');
});
router.get('/add', function(req, res, next) {
	//res.redirect('/admin');
	res.render('admin/add');
});

//删除
router.get('/delete', function(req, res, next) {
	var id = req.query.id;
	console.log(id);

	Article.remove({
		_id: id
	}, function(error) {
		var rs;
		if (error) {
			rs = {
				status: -1,
				message: '删除失败'
			};
			console.log('删除失败');
		} else {
			rs = {
				result: true,
				message: '删除成功'
			};
			console.log('删除成功');
		}
		res.send(response(rs));
	});

});
//添加
router.post('/add', function(req, res, next) {

	var title = req.body.title || '';
	var body = req.body.body || '';

	//var Article = db.model('Article', BlogPost);
	var article = new Article({
		author: req.session.user,
		title: req.body.title,
		body: req.body.body,
	});
	var rs;
	if (title && body) {
		article.save(function(error, item) {

			if (error) {
				rs = {
					status: '20000'
				};
			} else {
				rs = {
					result: item._id
				};
			}

		});
	} else {
		rs = {
			status: '10000'
		};
	}
	res.send(response(rs));

});


module.exports = router;