/*!
 * SuperWedding - common/uploader.js
 */

'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');
var utility = require('utility');
var eventproxy = require('eventproxy');
var qn = require('qn');
var exif = require('exif').ExifImage;
var config = require('../config');
var utils = require('./utils');

var qnClient = qn.create(config.qn);

module.exports = function (filePath, fileName, callback) {

  var result = {};

  var ep = eventproxy.create();
  ep.fail(callback);

  // Read Exif metadata from this image.
  try {
    new exif({image: filePath}, function (err, res) {
      console.log
      // ep.doneLater('exif')
    });
  } catch (ex) {
    return callback(ex);
  }
  // Save to qiniu.
  var randName = utils.getUniqFileName(fileName);
  randName = [utility.YYYYMMDD(), randName].join('/');
  qnClient.uploadFile(filePath, {key: randName}, ep.doneLater('qn'));

  ep.all('exif', 'qn', function (exifData, qnResult) {
    fs.unlink(filePath, utility.noop);
    result.image = {url: qnResult.url};
    result.gps = exifData.gps || {};
    return callback(null, result);
  });
};
