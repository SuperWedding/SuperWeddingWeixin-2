/*!
 * SuperWedding - proxy/user.js
 */

'use strict';

/**
 * Module dependencies.
 */

var db = require('../common/mysql');

// 通过 Open ID 获取用户信息
var GET_BY_OPENID = 'SELECT uid, openid, name FROM users \
                      WHERE openid = ? LIMIT 1';
exports.getByOpenId = function (openId, callback) {
  db.queryOne(GET_BY_OPENID, [openId], callback);
};

// 添加一个用户
var ADD_USER = 'INSERT INTO users\
                (openid, name, gmt_created, gmt_modified) \
                VALUES\
                (?, ?, NOW(), NOW()) \
                ON DUPLICATE KEY UPDATE \
                name = ?, gmt_modified = NOW()';
exports.add = function (openId, name, callback) {
  db.query(ADD_USER, [openId, name, name], callback);
};

