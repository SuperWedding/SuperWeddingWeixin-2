/*!
 * SuperWedding - common/uploader.js
 */

'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');
var utility = require('utility');
var qn = require('qn');
var config = require('../config');
var utils = require('./utils');

var qnClient = qn.create(config.qn);

module.exports = function (filePath, fileName, callback) {

  var result = {};

  // Save to qiniu.
  var randName = utils.getUniqFileName(fileName);
  randName = [utility.YYYYMMDD(), randName].join('/');
  var args = {key: randName};
  qnClient.uploadFile(filePath, args, function (err, res) {
    if (err) {
      return callback(err);
    }
    fs.unlink(filePath, utility.noop);
    result.image = {url: res.url};
    return callback(null, result);
  });
};
