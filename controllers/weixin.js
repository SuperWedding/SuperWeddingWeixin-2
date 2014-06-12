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
  image: require('../plugins/weixin_img')
};
var user = require('../proxy/user');

var token = config.weixin.token;

function sendGreeting(res, openId) {
  res.reply([{
    title: '周宁奕&余晓瑞婚礼进行时',
    description: '点击查看详情',
    picurl: 'http://swtest.qiniudn.com/getimgdata.jpeg',
    url: config.serverHost + '/pages/index?openId=' + openId
  }]);
}

function sendErrorMsg(res, tryAgain) {
  var msg = '哎呀, 好像出了点问题.';
  if (tryAgain) {
    msg += ' 请再发一次.';
  }
  res.reply(msg);
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
  if (content[0] === '@') {
    var name = content.split('@')[1].split(' ')[0];
    user.add(openId, name, function (err) {
      if (err) {
        return sendErrorMsg(res, true);
      }
      return res.reply('收到! 谢谢您@' + name + '!');
    });
    return;
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
  plug.image(params, function (err) {
    if (err) {
      return sendErrorMsg(res, true);
    }
    return res.reply('收到! 非常感谢!');
  });
  user.getByOpenId(openId, function (err, row) {
    if (err) {
      return sendErrorMsg(res);
    }
    if (!row || !row.name) {
      return res.reply('我们还不知道您是谁, 请输入「@您的名字」告诉我们吧!');
    }
  });
})
.middlewarify();
