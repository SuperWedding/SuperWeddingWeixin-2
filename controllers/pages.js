/*!
 * SuperWedding - controllers/pages.js
 */

'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');

var root = path.dirname(__dirname);
var viewDir = path.join(root, 'views');
var pagesList = {};
fs.readdirSync(viewDir).forEach(function (file) {
  // Filter temp file
  if (path.extname(file) !== '.html') {
    return;
  }
  var name = file.replace(/\.html$/, '');
  pagesList[name] = true;
});

exports.dispatch = function (req, res, next) {
  var params = req.params || {};
  var page = params.page || '';
  if (pagesList[page]) {
    return res.render(page, {
      viewname: page,
      current: new Date()
    });
  }
  next();
};
