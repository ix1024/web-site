var express = require('express');
var router = express.Router();
var pub = require('../pub/pub');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express',
		pub: pub
	});
});

module.exports = router;