var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
//declare separate apps here
//var routes = require('./routes/index');
//var users = require('./routes/users');
var test_button = require('./routes/test_button');
var videos = require('./routes/videos');
var contact = require('./routes/contact');
var index = require('./routes/index');
var howitworks = require('./routes/howitworks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// register your apps
app.use('/test_button', test_button);

app.use('/videos', videos);

app.use('/contact', contact);

app.use('/howitworks', howitworks);

app.use('/', index);

//app.use('/users', users);

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
