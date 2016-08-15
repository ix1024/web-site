var express = require('express');
var router = express.Router();
var User = require('./model/user'); //mongoose.model('Article', {});
var config = require('../config');
var utils = require('npm-utils-kingwell');
var response = config.response;
var Article = require('../routes/model/article');

router.get('/', function(req, res, next) {
	res.render('components/components', {
		title: config.site.name,
		user: req.session.user,
		utils: utils,
		breadCrunmbs: [{
			text: 'Components',
			url: '/components'
		}, {
			text: 'jQuery'
		}],
		nav: config.nav,
	});
	//res.send('plugins');
});
module.exports = router;