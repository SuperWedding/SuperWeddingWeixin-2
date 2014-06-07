/*!
 * SuperWedding - controllers/weixin.js
 */

'use strict';

/**
 * Module dependencies.
 */
var wechat = require('wechat');
var config = require('../config');

var token = config.weixin.token;

exports.dispatch = wechat(token, function (req, res, next) {
  var message = req.weixin;
  var content = message.Content;
  if (content === 'ping') {
    return res.reply('pong');
  }
  res.reply([{
    title: '周宁奕&余晓瑞婚礼进行时',
    description: '点击查看详情',
    picurl: 'http://swtest.qiniudn.com/getimgdata.jpeg',
    url: config.serverHost + '/pages/upload'
  }]);
});