(function(window, undefined) {

	var ajax = function(options) {

		var Ajax = function(options) {
			var _this = this,
				ops = options || {},
				xmlhttp = _this.xmlhttp = _this.__getXMR();

			_this.sync = true;
			_this.url = '';
			_this.timeout = 0;
			_this.type = 'get';
			_this.data = null;
			_this.headers = {};
			_this.headers['Content-Type'] = 'application/x-www-form-urlencoded';

			for (var key in ops) {
				_this[key] = ops[key];
			}

			//监听事件
			xmlhttp.onreadystatechange = function() {
				_this.__readystatechange();
			};

			//进度
			try {
				//下载
				xmlhttp.onprogress = _this.__progress.bind(_this);
				//上传
				xmlhttp.upload.onprogress = _this.__progress.bind(_this);
			} catch (ev) {}

			xmlhttp.open(_this.type, _this.url, _this.sync);

			for (var header in _this.headers) {
				xmlhttp.setRequestHeader(header, _this.headers[header]);
			}
			if (_this.timeout) {
				setTimeout(function() {
					xmlhttp.abort();
				}, _this.timeout);
			}
			xmlhttp.send(_this.data);

		};
		Ajax.prototype = {
			__readystatechange: function() {
				var xmlhttp = this.xmlhttp;
				if (xmlhttp.readyState === 4) {
					if (xmlhttp.status === 200) {
						this.success.call(xmlhttp, xmlhttp.responseText);
					} else {
						this.error.call(xmlhttp, xmlhttp.statusText);
					}
				}
			},
			__getXMR: function() {
				var xml;
				if (window.XMLHttpRequest) {
					xml = new XMLHttpRequest();
				} else if (window.ActiveXObject) {
					xml = new window.ActiveXObject('Microsoft.XMLHTTP');
				}
				return xml;
			},
			success: function() {},
			error: function() {},
			progress: function() {},
			abort: function() {
				_this.xmlhttp.abort();
			},
			__progress: function(event) {　
				var _this = this;
				if (event.lengthComputable) {　　　　　　
					var percentComplete = event.loaded / event.total;
					_this.progress.call(_this.xmlhttp, percentComplete);
				}
			}

		};
		Ajax.prototype.constructor = Ajax;

		return new Ajax(options);
	};
	window.ajax = ajax;

	if (typeof define === 'function' && define.amd) {
		define('ajax', [], function() {
			return ajax;
		});
	}

})(this);