var express = require('express');
var router = express.Router();
var User = require('./model/user'); //mongoose.model('Article', {});
var config = require('../config');
var utils = require('npm-utils-kingwell');
var response = config.response;
var Article = require('../routes/model/acticle');

router.get('/web/:id', function(req, res, next) {
	var id = req.params.id;
	utils.log(id);
	res.render('article/list', {
		user: req.session.user,
		title: config.site.name,
		utils: utils,
		nav: config.nav
	});
});
router.get('/tag/:id', function(req, res, next) {
	var id = req.params.id;
	utils.log(id);
	var r = '' + id + '';
	var reg = RegExp(r, 'ig');
	Article
		.find({})
		.where('tag', reg)
		.exec(function(err, docs) {
			res.render('article/list', {
				user: req.session.user,
				title: config.site.name,
				utils: utils,
				data: {
					articelList: docs
				},
				nav: config.nav
			});
		});

});

module.exports = router;