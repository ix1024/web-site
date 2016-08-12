var express = require('express');
var router = express.Router();
var User = require('../model/user');
var config = require('../../config');
var utils = require('npm-utils-kingwell');
var response = config.response;
var fs = require("fs");

router.get('/:name', function(req, res, next) {
	var path = './uploads/';
	var name = req.params.name;
	var datas = '';
	//res.send(req.params.name);
	fs.exists(path, function(status) {
		utils.log(status, 'yellow');
		if (status) {
			fs.readFile(path + name, function(err, data) {
				// console.log('err', err);
				// console.log('data', data);
				// var readerStream = fs.createWriteStream(data);
				// readerStream.pipe(writerStream);
				// res.send(readerStream);
				res.writeHead(200, {
					'Content-Type': 'image/jpg'
				});
				res.end(data);
			});
		} else {
			res.send(name);
		}
	});

});


module.exports = router;