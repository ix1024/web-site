/*
  Requirejs配置文件
  Last Updated:2016-08-09 11:08:02  
*/
var fileVersion = {
    'jquery': '//static.huizecdn.com/js/libs/jquery/1.8.0/jquery.min',
    'underscore': '//static.huizecdn.com/js/libs/underscore/1.8.3/underscore.min',
    'require-text': '//static.huizecdn.com/js/plugins/require-text/text.min',
    'require-css': '//static.huizecdn.com/js/plugins/require-css/css.min',
    'jquery-tab': '//static.huizecdn.com/js/plugins/jquery-tab/build/jquery-tab',
    'jquery-placeholder': '//static.huizecdn.com/js/plugins/placeholder/build/jquery-placeholder',
    'base': '//static.huizecdn.com/js/base/src/base',
    'layer':'//static.huizecdn.com/js/plugins/layer/2.3.0/layer',
    'jquery-prompt':'//static.huizecdn.com/js/plugins/jquery-prompt/build/jquery-prompt',
    'kkpager':'//static.huizecdn.com/js/plugins/kkpager/kkpager.min',
    'es5-shim':'//static.huizecdn.com/js/plugins/es5-shim/es5-shim.min',
    'my-calendar':'//static.huizecdn.com/js/plugins/my-calendar/build/my-calendar.min',
    'message':'//static.huizecdn.com/js/plugins/message/build/message',
    'webuploader':'http://static.huizecdn.com/js/plugins/webuploader/webuploader',
    "admin": "/javascripts/src/admin.js?v=5f535a665bb73baa9508523129c2fa6d",
    "demo": "/javascripts/src/demo.js?v=53174a48ba549c9ded0832486ed61461",
    "index": "/javascripts/src/index.js?v=d41d8cd98f00b204e9800998ecf8427e",
    "ajax": "/javascripts/src/kw/ajax.js?v=7afe35bd5fcb72c486f34eb84f61f9be",
    "css": "/javascripts/src/kw/css.js?v=d41d8cd98f00b204e9800998ecf8427e",
    "date": "/javascripts/src/kw/date.js?v=d41d8cd98f00b204e9800998ecf8427e",
    "dom": "/javascripts/src/kw/dom.js?v=ce134060c47628bb23257a3faae58661",
    "events": "/javascripts/src/kw/events.js?v=772cc004b563e9f24113e17d97a26f33",
    "utils": "/javascripts/src/kw/utils.js?v=d41d8cd98f00b204e9800998ecf8427e",
    "require": "/javascripts/src/lib/require.js?v=6bd2f88aafdbf67d47f03d6eac64ddc7",
    "tab": "/javascripts/src/tab.js?v=94855c03b670b8c3c8cea8f711758c2a",
    "user": "/javascripts/src/user.js?v=d41d8cd98f00b204e9800998ecf8427e"
};
requirejs.config({
    baseUrl: '',
    urlArgs: '0.0.1',
    paths: fileVersion,
    waitSeconds: 0, //超时时间
    shim: { //deps依赖关系
        jquery: {
            exports: '$'
        },
        ajax: {
            exports: 'ajax'
        },
        message: {
            exports: 'Message',
            deps: ['css!message-css']
        },
        'jquery-placeholder': {
            deps: ['jquery']
        },
        'jquery-plugins': {
            deps: ['jquery']
        },
        'jquery-prompt': {
            deps: ['jquery', 'css!jquery-prompt-css']
        },
        'layer': {
            exports: 'layer',
            deps: ['jquery', 'css!layer-css']
        },
        'my-calendar': {
            exports: 'MyCalendar',
            deps: ['css!my-calendar-css']
        },
        'kkpager': {
            deps: ['css!kkpager-css']
        },
        'webuploader': {
            deps: ['jquery', 'css!webuploader-css']
        },
        'jquery-bxslider': {
            deps: ['jquery', 'css!jquery-bxslider-css']
        },
        'fixed-tool-float': {
            deps: ['css!sidetool-css']
        }
    },
    map: {
        '*': {
            'css': 'require-css',
            'layer-css': '//static.huizecdn.com/js/plugins/layer/1.9.3/skin/layer',
            'kkpager-css': '//static.huizecdn.com/js/plugins/kkpager/kkpager_blue',
            'jquery-bxslider-css': '//static.huizecdn.com/js/plugins/jquery-bxslider',
            'my-calendar-css': '//static.huizecdn.com/js/plugins/my-calendar/stylesheets/calendar',
            'message-css': '//static.huizecdn.com/js/plugins/message/stylesheets/message',
            'webuploader-css': 'http://static.huizecdn.com/js/plugins/webuploader/webuploader',
            'jquery-prompt-css': 'http://static.huizecdn.com/js/plugins/jquery-prompt/stylesheets/jquery-prompt',
            'sidetool-css': 'http://static.huizecdn.com/css/hz/www/build/sidetool'
        }
    }
});