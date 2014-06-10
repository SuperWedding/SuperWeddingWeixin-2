/*!
 * SuperWedding - controllers/weixin.js
 */

'use strict';

/**
 * Module dependencies.
 */
var wechat = require('wechat');
var config = require('../config');
var plug = {
  image: require('../pulgins/weixin_img')
};

var token = config.weixin.token;

function sendGreeting(res, openId) {
  res.reply([{
    title: '周宁奕&余晓瑞婚礼进行时',
    description: '点击查看详情',
    picurl: 'http://swtest.qiniudn.com/getimgdata.jpeg',
    url: config.serverHost + '/pages/index?openId=' + openId
  }]);
}

exports.dispatch = wechat(token)
.event(function (message, req, res, next) {
  var openId = message.FromUserName || '';
  if (message.Event === 'subscribe') {
    return sendGreeting(res, openId);
  }
  if (message.Event === 'unsubscribe') {
    return res.reply('Bye!');
  }
  res.reply('尚未支持！');
})
.text(function (message, req, res, next) {
  var openId = message.FromUserName || '';
  var content = message.Content;
  if (content === 'ping') {
    return res.reply('pong');
  }
  return sendGreeting(res, openId);
})
.image(function (message, req, res, next) {
  var openId = message.FromUserName || '';
  var picUrl = message.PicUrl || '';
  var params = {
    openId: openId,
    imageUrl: picUrl
  };
  plug.image(params);
})
.middlewarify();
