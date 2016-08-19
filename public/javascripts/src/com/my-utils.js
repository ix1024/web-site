define([], function() {
	return {
		getQueryValue: function(name) { //获取URL参数
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = location.search.substr(1).match(reg);
			if (r !== null) {
				return unescape(r[2]);
			}
			return null;
		}
	};
});