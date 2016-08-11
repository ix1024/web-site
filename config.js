'use strict';

var config = {
	site: {
		name: 'Front-end laboratory',
		host: ''
	},
	nav: [{
		text: '首页',
		url: '/'
	}, {
		text: 'HTML',
		url: '/web/html'
	}, {
		text: 'CSS',
		url: '/web/css'
	}, {
		text: 'Javascript',
		url: '/web/js'
	}, {
		text: 'Mongodb',
		url: '/web/mongodb'
	}, {
		text: '工具',
		url: '/web/tools'
	}],
	//nav: ['HTML', 'CSS3', 'SASS', 'Javascript', 'Nodejs', 'BigPipe', 'Backbone', 'Mongondb', 'Grunt'],
	response: function(options) {
		var Response = function(options) {
			var ops = options || {};
			this.result = null;
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
					'20003': '查找失败',
					'20004': '存在相同项',
					/* 登录 */
					'30001': '登录失败',
					'30002': '用户名不对',
					'30003': '密码失败',
					'30004': '用户名已经存在',
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