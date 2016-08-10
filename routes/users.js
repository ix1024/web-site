var express = require('express');
var router = express.Router();
var User = require('./model/user'); //mongoose.model('Article', {});
var config = require('../config');
var fn = require('../fn');
var response = config.response;

/* GET users listing. */
router.get('*', function(req, res, next) {

	if (req.session.user) {
		res.redirect('/admin');
	} else {
		next();
	}

});

//登录页面
router.get('/login', function(req, res, next) {
	res.render('user/login', {
		title: 'LOGIN'
	});
});
//获取登录
router.get('/get-login', function(req, res, next) {
	var query = req.query || {},
		userName = query.userName,
		password = query.password,
		rs;
	if (userName && password) {
		User.find({}, function(err, docs) {
			var list = docs || [];
			var status = false;
			var user = null;
			for (var d = 0, len = docs.length; d < len; d++) {
				var item = docs[d];
				if (item.userName === userName && item.password === password) {
					status = true;
					console.log(item);
					user = {
						userName: userName,
						nickname: item.nickname
					}
					break;
				}
			}

			if (status) {
				req.session.user = user;
			} else {
				rs = {
					status: '30001'
				};
			}
			res.send(response(rs));
		});
	} else {
		rs = {
			status: '10000'
		};
		res.send(response(rs));
	}


});

//注册页面
router.get('/register', function(req, res, next) {
	// User.find({}, function(err,docs) {
	// 	res.send(docs);
	// });

	res.render('user/register', {
		title: 'LOGIN'
	});
});
//注册
router.post('/register', function(req, res, next) {
	var body = req.body || '';
	var rs;
	var user = new User({
		userName: body.userName,
		password: body.password,
		sex: body.sex,
		age: body.age,
		email: body.email
	});
	if (body.userName && body.password) {
		user.save(function(error, item) {

			if (error) {
				rs = {
					status: '20000'
				};
			} else {
				rs = {
					result: item._id
				};
			}
			res.send(response(rs));

		});
	} else {
		rs = {
			status: '10000'
		};
		res.send(response(rs));
	}

});
// router.get('/logout', function(req, res, next) {
// 	console.log(0);
// 	req.session = null;
// });
module.exports = router;