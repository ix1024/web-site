var express = require('express');
var router = express.Router();
var config = require('../../config');
var response = config.response;
var utils = require('npm-utils-kingwell');

var Article = require('../../routes/model/acticle');
var findArticle = function(callback) {
	Article.find({}, function(err, docs) {
		callback(err, docs);
	});
};
router.all('*', function(req, res, next) {


	if (req.session.user) {
		utils.log('已经登录', 'green');
	} else {
		utils.log('未登录', 'red');
	}
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
		title: config.site.name
	});

});
router.get('/user-list', function(req, res, next) {

	res.render('admin/user', {
		title: config.site.name
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
				title: config.site.name,
				utils: utils,
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
			utils.log('删除失败', 'red');
		} else {
			rs = {
				result: true,
				message: '删除成功'
			};
			utils.log('删除成功', 'green');
		}
		res.send(response(rs));
	});

});

router.get('/add', function(req, res, next) {
	//res.redirect('/admin');
	res.render('admin/add', {
		nav: config.nav
	});
});
//添加
router.post('/add', function(req, res, next) {

	var title = req.body.title || '';
	var body = req.body.body || '';
	var classification = req.body.classification || '';
	var tag = req.body.tag || '';
	tag = tag.split(',');
	var article = new Article({
		author: req.session.user && req.session.user.userName,
		title: req.body.title,
		body: req.body.body,
		classification: classification,
		tag: tag
	});
	var rs;
	if (title && body && classification) {
		findArticle(function(err, docs) {
			var status = true;
			if (err) {
				rs = {
					status: '20003'
				};
				utils.log(response(rs), 'red');
			} else {
				for (var d = 0, len = docs.length; d < len; d++) {
					if (docs[d].title === title) {
						status = false;
						break;
					}
				}
				if (status) {
					article.save(function(error, item) {

						if (error) {
							rs = {
								status: '20000'
							};
							utils.log(error, 'red');
						} else {
							rs = {
								result: item._id
							};
							utils.log('添加成功', 'green');

						}
						res.send(response(rs));

					});
				} else {
					rs = {
						status: '20004'
					};
					utils.log(response(rs), 'red');
					res.send(response(rs));
				}
			}
		});

	} else {
		rs = {
			status: '10000'
		};
		utils.log(response(rs), 'red');
		res.send(response(rs));
	}



});


module.exports = router;