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
var image = require('../proxy/image');

module.exports = function (params, callback) {
  params = params || {};
  var imageUrl = params.imageUrl || '';
  var openId = params.openId || '';
  if (!imageUrl || !openId) {
    return callback(null);
  }

  var imageFileName = utils.getFileFromUrl(imageUrl);
  var tempFileName = utils.getUniqFileName(imageFileName);
  var tempFilePath = path.join(config.uploadDir, tempFileName);

  var ws = fs.createWriteStream(tempFilePath);
  request(imageUrl).pipe(ws);
  ws.on('error', callback);
  ws.on('close', function () {
    uploader(tempFilePath, imageFileName, function (err, result) {
      result = result || {};
      if (err || !result.image) {
        var imageSavePath = imageUrl;
        console.log(err.stack);
      } else {
        var imageSavePath = result.image.url;
      }
      image.add(openId, imageSavePath, callback);
    });
  });
};
