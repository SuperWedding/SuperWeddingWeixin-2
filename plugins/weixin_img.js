/*!
 * SuperWedding - plugins/weixin_img.js
 */

'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var fs = require('fs');
var request = require('request');
var config = require('../config');
var utils = require('../common/utils');
var uploader = require('../common/uploader');

module.exports = function (params, callback) {
  params = params || {};
  var imageUrl = params.imageUrl || '';
  if (!imageUrl) {
    return callback(null);
  }

  var tempFileName = utils.getUniqFileName('temp_image');
  var tempFilePath = path.join(config.uploadDir, tempFileName);
  request(imageUrl).pipe(fs.createWriteStream(tempFilePath));
  uploader(tempFilePath, 'temp_image', function (err, result) {
    if (err) {
      console.log('~~~~~~~~~~~~');
      console.log(err);
      return callback(err);
    }
    console.log(result);
  });
};

module.exports({
  imageUrl: 'http://www.keydiary.com/assets/img/index.png'
}, function (err, result) {
  console.log(err, result);
});