var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var utils = require('npm-utils-kingwell');
var mongoose = require('mongoose');
var config = require('./config');
//var MyArticle = require('./routes/model/my-article');


/**
 ** ==========
 ** ===路由===
 ** ==========
 */
var routes = {
  index: require('./routes/index'), //首页
  article: require('./routes/article'), //文章
  users: require('./routes/users'), //用户-登录，注册
  demo: require('./routes/demo'),
  web: require('./routes/web'), //web
  search: require('./routes/search'), //search
  components: require('./routes/components'), //components
  upload: require('./routes/api/upload'), //上传
  file: require('./routes/api/file'), //上传
  admin: require('./routes/admin/admin') //后台
};

var app = express();
mongoose.connect('mongodb://localhost/kingwell');
var Store = require('express-session').Store;
var MongooseStore = require('mongoose-express-session')(Store);
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  rolling: false,
  saveUninitialized: true,
  store: new MongooseStore({
    connection: mongoose
      /* configuration */
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//退出登录
app.use('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

app.use('/', routes.index);
app.use('/article', routes.article);
app.use('/components', routes.components);
app.use('/search', routes.search);
app.use('/admin', routes.admin);
app.use('/', routes.web);
app.use('/', routes.users);
app.use('/demo', routes.demo);
app.use('/api/upload', routes.upload);
app.use('/file', routes.file);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: config.site.name,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;