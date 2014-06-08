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

  // 静态页面
  app.get('/pages/:page', pages.dispatch);

  // 从页面上上传图片
  app.post('/api/upload', api.upload);
  // 用户署名
  app.post('/api/sign', api.sign);
  app.get('/api/user', api.userInfo);
  app.all('/weixin', weixin.dispatch);
};
