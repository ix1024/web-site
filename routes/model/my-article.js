// var Article = require('../../routes/model/acticle');
// var MyActicle = function(options) {
// 	var _this = this,
// 		ops = options || {};
// 	_this.query = {};
// 	_this.options = {};
// 	_this.model = null;
// 	for (var key in ops) {
// 		_this[key] = ops[key];
// 	}
// 	console.log();
// };
// MyActicle.prototype = {
// 	find: function(callback) {
// 		var _this = this;
// 		_this.model.find(
// 			_this.query,
// 			this.options,
// 			function(err, docs) {
// 				callback(err, docs);
// 			});
// 	},
// 	update: function() {
// 		var _this = this;

// 	},
// 	save: function() {
// 		var _this = this;

// 	},
// 	delete: function() {
// 		var _this = this;

// 	},
// 	count: function() {
// 		var _this = this;
// 	}
// };
// MyActicle.prototype.constructor = MyActicle;
// var acticle = new MyActicle({
// 	model: Article
// });
// acticle.find(function(err, docs) {
// 	console.log(err, docs);
// });
//module.exports = MyActicle;