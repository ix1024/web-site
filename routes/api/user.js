var express = require('express');
var router = express.Router();
var config = require('../../config');
var response = config.response;
var utils = require('npm-utils-kingwell');

var User = require('../../routes/model/user');

//获取列表
router.get('/get-user-list', function(req, res, next) {
	User.find({}, function(err, docs) {
		res.send(docs);
	});
});
//删除
router.delete('/user/:id', function(req, res, next) {
	var id = req.params.id,
		result = {};
	User.remove({
		_id: id
	}, function(err, doc) {
		if (err) {
			result = {
				status: '20001'
			};
		}
		res.send(config.response(result));
	});
});
//更新操作
router.put('/user/:id', function(req, res, next) {
	var id = req.params.id;
	var userName = req.body.userName;
	var nickname = req.body.nickname;
	var password = req.body.password;
	var sex = req.body.sex;
	var age = req.body.age;
	var email = req.body.email;
	var permission = req.body.permission;
	//var ip = req.ip;
	User.update({
		_id: id
	}, {
		userName: userName,
		nickname: nickname,
		password: password,
		sex: sex,
		age: age,
		email: email,
		permission: permission
	}, function(err, doc) {
		utils.log(err, 'red');
		utils.log(err, 'yellow');
		res.send({
			status: '00000'
		});
	});
});
//添加操作
router.post('/user', function(req, res, next) {
	var userName = req.body.userName;
	var nickname = req.body.nickname;
	var password = req.body.password;
	var sex = req.body.sex;
	var age = req.body.age;
	var email = req.body.email;
	//var eid = req.body.eid;
	var ip = req.ip;
	var user = new User({
		userName: userName,
		nickname: nickname,
		password: password,
		sex: sex,
		age: age,
		email: email,
		ip: ip
	});
	var rs;
	user.save(function(err, doc) {
		console.log(err, doc);
		if (err) {
			rs = {
				status: '20000'
			};
		} else {
			//rs={}
		}
		res.send(rs);
	});
});


module.exports = router;