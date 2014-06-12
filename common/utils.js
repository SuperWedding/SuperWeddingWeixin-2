/*!
 * SuperWedding - common/utils.js
 */

'use strict';

/**
 * Module dependencies.
 */
var crypto = require('crypto');

exports.getUniqFileName = function (fileName) {
  var extName = fileName.split('.')[1];
  var rand = crypto.randomBytes(16).toString('hex');
  if (extName) {
    var ext = '.' + extName;
    return fileName.replace(ext, '.' + rand + ext);
  } else {
    return fileName + rand;
  }
};

exports.getFileFromUrl = function (url) {
  if (!url) {
    return false;
  }
  var fields = url.split('/');
  var fileName = fields[fields.length - 1];
  return fileName;
};
