var express = require('express');
var router = express.Router();
var User = require('./model/user'); //mongoose.model('Article', {});
var config = require('../config');
var fn = require('../fn');
var response = config.response;

router.get('/backbone', function(req, res, next) {
	res.send('backbone');
});

module.exports = router;