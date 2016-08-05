(function(window, undefined) {

	var dom = function(options) {

		var Dom = function(options) {};

		Dom.prototype = {
			getId: function() {},
			html: function() {},
			text: function() {},
			append: function() {},
			after: function() {},
			before: function() {},
			remove: function() {},

		};
		Dom.prototype.constructor = Dom;

		return new Dom(options);
	};
	window.dom = dom;

	if (typeof define === 'function' && define.amd) {
		define('dom', [], function() {
			return dom;
		});
	}

})(this);