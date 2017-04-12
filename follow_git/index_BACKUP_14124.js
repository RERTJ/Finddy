var path = require('path');
var express = require('express');
var session = require('express-session');
<<<<<<< HEAD
<<<<<<< HEAD
var mysql = require('mysql');
=======
>>>>>>> 1982542c0fb2433b0c95a43673e6e0404d09b080
=======
var mysql = require("mysql");
>>>>>>> ec1d2e10c9022d030af05e89d3d198d0c98beae5
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');
var app = express();
<<<<<<< HEAD
var bodyParser = require('body-parser');
var formidable = require('express-formidable');
var cookieParser = require('cookie-parser');
var fs = require('fs');
=======
var formidable = require('express-formidable');
var sha1 = require('sha1');//Password security
require('events').EventEmitter.prototype._maxListeners = 100;

>>>>>>> ec1d2e10c9022d030af05e89d3d198d0c98beae5

<<<<<<< HEAD
// path set
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//egine set
var cons = require('consolidate');
<<<<<<< HEAD
app.engine('html', cons.swig);
=======
app.engine('html', cons.swig)
>>>>>>> ec1d2e10c9022d030af05e89d3d198d0c98beae5
app.set('view engine', 'html');


// session 中间件
=======
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

>>>>>>> 1982542c0fb2433b0c95a43673e6e0404d09b080
app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge
  },
  
}));
<<<<<<< HEAD
// 设置模板全局常量
app.locals.finddy = {
=======

app.use(flash());


app.locals.blog = {
>>>>>>> 1982542c0fb2433b0c95a43673e6e0404d09b080
  title: pkg.name,
  description: pkg.description
};

<<<<<<< HEAD
=======
app.use(formidable());


// 添加模板必需的三个变量
>>>>>>> ec1d2e10c9022d030af05e89d3d198d0c98beae5
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

<<<<<<< HEAD
//app.use(cookieParser);
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(fs());
app.use(formidable());


// 路由
=======
>>>>>>> 1982542c0fb2433b0c95a43673e6e0404d09b080
routes(app);

app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`);
});
