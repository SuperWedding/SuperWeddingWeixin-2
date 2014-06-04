/**!
 * SuperWedding - app.js
 */

'use strict';

/**
 * Module dependencies.
 */

require('response-patch');
var path = require('path');
var fs = require('fs');
var connect = require('connect');
var render = require('connect-render');
var urlrouter = require('urlrouter');
// var session = require('../common/session');
var routes = require('./routes');
var logger = require('./common/logger');
var config = require('./config');
// var auth = require('./middleware/auth');

var app = connect();

app.use(function (req, res, next) {
  res.req = req;
  next();
});
app.use(connect.query());
app.use(connect.json({
  strict: true, // json body must use strict mode.
}));
app.use(connect.urlencoded());
app.use(connect.cookieParser());
app.use('/assets', connect.static(path.join(__dirname, 'assets')));
// app.use(connect.csrf());
app.use(render({
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: '.html',
  cache: false,
  helpers: {
    version: config.version,
    config: config,
    // _csrf: function (req, res) {
    //   return req.csrfToken() || '';
    // }
  }
}));

/**
 * Routes
 */
app.use(urlrouter(routes));

/**
 * Error handler
 */
app.use(function (err, req, res, next) {
  err.url = err.url || req.url;
  console.log(err.stack);
  logger.error(err);
  res.end();
});

/**
 * Page not found handler
 */
app.use(function (req, res, next) {
  res.statusCode = 404;
  res.end();
});

module.exports = app;

