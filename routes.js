/*!
 * SuperWedding - routes.js
 */

'use strict';

/**
 * Module dependencies.
 */
var pages = require('./controllers/pages');
var api = require('./controllers/api');
var weixin = require('./controllers/weixin');

module.exports = function (app) {

  app.get('/pages/upload', pages.upload);

  app.post('/api/upload', api.upload);
  app.all('/weixin', weixin.dispatch);
};
