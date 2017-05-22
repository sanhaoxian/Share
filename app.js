var express = require('express');
var path = require('path');         
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');     
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');

var _ = require('underscore');  //引入这个模块可以用里面的extend方法更新数据库里面的信息
var Article = require('./models/article');

var routes = require('./routes/index');
var users = require('./routes/users');

var ueditor = require('ueditor');


var app = express();

app.locals.moment = require('moment');

app.use(session({
    secret: 'secret',
    cookie:{
        maxAge: 1000*60*30
}
}));
/*------连接数据库的代码，并且把连接数据库的变量设置为全局变量-------*/
global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://127.0.0.1:27017/nodedb");

mongoose.connection.on('connected',function(){
  console.log('mongoose connection to'+global.db);
});

mongoose.connection.on('error',function(err){
  console.log('mongoose connection error'+err);
});
// view engine setup 浏览器视图渲染引擎的设置
// 默认为ejs文件app.set('view engine', 'ejs');
app.set('views', './views');
app.engine("html",require("ejs").renderFile);//app.engine("html",require("ejs").renderFile);
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(multer());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

app.use("/ueditor/ue",ueditor(path.join(__dirname,'public'),function(req,res,next){
//ueditor 客户发起上传图片请求； 
    if (req.query.action === 'uploadimage') {
      var foo = req.ueditor;
    

      var imgname = req.ueditor.filename;
      var img_url = '/images/ueditor/';
      res.ue_up(img_url); 
    }
    //客户端发起图片列表请求
    else if(req.query.action === 'listimage'){
      var dir_url = '/images/ueditor/';
      res.ue_list(dir_url);//客户端会列出dir_url目录下的所有图片
    }
    else{
      res.setHeader('Content-Type','application/json');
      res.redirect('/ueditor/ueditor.config.json');
    }
}));
/*app.use('/', routes);
app.use('/users', users);

app.use('/login',routes);
app.use('/home',routes);

app.use(function(req,res,next){
  res.locals.user = req.session.user;   // 从session 获取 user对象
  var err = req.session.error;   //获取错误信息
  delete req.session.error;
  res.locals.message = "";   // 展示的信息 message
  if(err){
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
  }
  next();  //中间件传递
});*/

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
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
});*/
routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
