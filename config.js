'use strict';

var config = {

	response: function(options) {
		var Response = function(options) {
			var ops = options || {};
			this.result = '';
			this.status = '00000';
			this.time = new Date().getTime();
			for (var key in ops) {
				this[key] = ops[key];
			}
			this.message = this.message || this.code(this.status);
		};
		Response.prototype = {
			code: function(key) {
				return {
					'-1': '未知错误',
					'00000': '操作成功',
					/* 1xxxx内容相关 */
					'10000': '缺少必填内容',
					'10001': '内空不能为空',
					/* 数据操作 */
					'20000': '保存失败',
					'20001': '删除失败',
					'20002': '更新失败',
				}[key] || '';
			},
			toString: function() {
				return {
					status: this.status,
					result: this.result,
					message: this.message,
					time: this.time
				};
			}
		};
		return new Response(options).toString();
	}
};
module.exports = config;