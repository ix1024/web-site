requirejs.config({
	baseUrl: '/javascripts/',
	paths: {
		jquery: 'lib/jquery.min',
		kindeditor: 'plugins/kindeditor-4.1.10/kindeditor-min'
	},
	shim: {
		jquery: {
			exports: '$'
		}, //deps
		kindeditor: {
			exports: 'KindEditor'
		}
	}
});
requirejs(['jquery', 'kindeditor'], function($, KindEditor) {

	var editor = KindEditor.create('textarea[name="content"]', {
		width: '400px',
		height: '200px',
		allowFileManager: true
	});
});