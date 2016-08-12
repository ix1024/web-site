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
	var id = req.query.id;
	Article.find({
		_id: id
	}, function(err, docs) {
		var data = {};
		utils.log(docs, 'yellow');
		if (err) {

		} else {
			data = docs;
		}
		res.render('admin/add', {
			classification: config.classification,
			editType: id,
			data: data[0]
		});
	});

});
//添加
router.post('/add', function(req, res, next) {

	var type = req.body.type || '',
		title = req.body.title || '',
		body = req.body.body || '',
		classification = req.body.classification || '',
		tag = req.body.tag || '',
		id = req.body.id || '',
		rs, article;

	tag = tag.split(',');

	article = new Article({
		author: req.session.user && req.session.user.userName,
		title: req.body.title,
		body: req.body.body,
		classification: classification,
		tag: tag
	});

	utils.log(req.body, 'green');

	if (title && body && classification) {

		if ('update' === type && id) {
			Article.update({
					_id: id
				}, {
					title: title,
					body: body,
					tag: tag,
					classification: classification,
					updateDate: Date.now()
				}, {
					multi: true
				},
				function(err, info) {
					if (err) {
						rs = {
							status: '20002'
						};
					}
					res.send(response(rs));
				});
			return;
		}

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

//分类管理
router.get('/classification', function(req, res, next) {
	res.render('admin/classification');
});
router.post('/classification', function(req, res, next) {
	res.render('admin/classification');
});

//导航管理
router.get('/nav', function(req, res, next) {
	res.render('admin/nav');
});
router.post('/nav', function(req, res, next) {
	res.render('admin/nav');
});

module.exports = router;