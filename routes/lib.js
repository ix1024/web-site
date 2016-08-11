var express = require('express');
var router = express.Router();
var User = require('./model/user'); //mongoose.model('Article', {});
var config = require('../config');
var utils = require('npm-utils-kingwell');
var response = config.response;

router.get('/web/:id', function(req, res, next) {
	var id = req.params.id;
	utils.log(id);
	if (-1 !== utils.inArray(id, config.nav)) {
		//res.send(id);
		res.render('article/list', {
			title: config.site.name,
			utils: utils,
			nav: config.nav
		});
	} else {
		next();
	}

});

module.exports = router;