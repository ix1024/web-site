var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
	dest: 'uploads/'
});
/* GET home page. */
router.get('/', function(req, res, next) {
	//res.send({});
	res.render('demo', {
		title: 'Express'
	});
});

router.post('/xhr', upload.single('avatar'), function(req, res, next) {
	//console.log('body-content', req.body);
	res.send({});
	//res.send(req.body);
});
module.exports = router;