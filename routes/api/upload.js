var express = require('express');
var router = express.Router();
var User = require('../model/user');
var config = require('../../config');
var utils = require('npm-utils-kingwell');
var response = config.response;
var fs = require("fs");
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.slice(6));
	}
});

var upload =
	multer({
		dest: 'uploads/',
		storage: storage,
	})
	.single('image');

router.get('/', function(req, res, next) {
	res.render('demo');
});
router.post('/', function(req, res, next) {
	//utils.log(req.file, 'yellow');
	//res.send({});
	upload(req, res, function(err) {
		console.log(req.body);
		console.log(req.file);
		if (err) {
			res.send({
				error: 0,
				url: ''
			});
		} else {
			res.send({
				error: 0,
				url: '/file/' + req.file.filename
			});
		}
	});
});

// router.post('/', function(req, res, next) {
// 	//utils.log(req.file, 'yellow');
// 	// utils.log(req, 'yellow');
// 	// var path = '../upload';
// 	// fs.exists(path, function(status) {
// 	// 	if (status) {
// 	// 		//console.log('存在');
// 	// 	} else {
// 	// 		fs.mkdir(path, function(err) {
// 	// 			if (err) {
// 	// 				return console.error(err);
// 	// 			}
// 	// 			console.log("目录创建成功。");
// 	// 		});
// 	// 	}
// 	// });


// 	res.send({
// 		error: 0,
// 		url: 'http://127.0.0.1:3000/images/logo_JavaScript.png'
// 	});
// });

module.exports = router;