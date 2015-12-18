var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

///Compression and minifications
if (app.get('env') === 'development') {
}
else {
  var compression = require('compression');
  var minify = require('express-minify');
  app.use(compression());
  app.use(minify({ cache: path.join(__dirname, 'cache') }));
}

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));

var authenticator = require('./app/tools/authenticator');
app.use(authenticator.midleware);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
var settings = require('./app/tools/settings');
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', settings.extended(req, {
      exception: {
        message: err.message,
        error: err
      }
    }));
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', settings.extended(req, {
      exception: {
        message: err.message,
        error: {}
      }
    }));
  });
}


module.exports = app;
