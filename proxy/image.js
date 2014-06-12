/*!
 * SuperWedding - proxy/image.js
 */

'use strict';

/**
 * Module dependencies.
 */

var db = require('../common/mysql');

// 添加一张图片
var ADD_IMG = 'INSERT INTO upload_images\
                (openid, image_path, gmt_created, gmt_modified) \
                VALUES\
                (?, ?, NOW(), NOW())';
exports.add = function (openId, imagePath, callback) {
  db.queryOne(ADD_IMG, [openId, imagePath], callback);
};

