/*!
 * SuperWedding - controllers/api.js
 */

'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');
var formidable = require('formidable');
var utility = require('utility');
var config = require('../config');
var user = require('../proxy/user');
var uploader = require('../common/uploader');

function badRequest(res, filePath) {
  res.statusCode = 400;
  if (filePath) {
    fs.unlink(filePath, utility.noop);
  }
  return res.end();
}

exports.upload = function (req, res, next) {

  var form = new formidable.IncomingForm();
  var ret = {};

  form.uploadDir = config.uploadDir;
  form.maxFieldsSize = 8 * 1024 * 1024;

  // Parse uploaded file.
  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    }
    var upload = files.upload || {};
    var filePath = upload.path;
    var fileName = upload.name;
    // console.log(upload);
    if (!upload.size) {
      return badRequest(res, filePath);
    }
    // Ensure is a image file.
    if (upload.type.substring(0, 5) !== 'image') {
      return badRequest(res, filePath);
    }
    uploader(filePath, fileName, function (err, result) {
      if (err) {
        return next(err);
      }
      result = result || {};
      // TODO: Insert a record to MySQL.
      res.statusCode = 200;
      return res.json(result);
    });
  });
};

exports.sign = function (req, res, next) {
  var query = req.body || {};
  var name = query.name || '';
  var openId = query.openId || '';
  if (!name || !openId) {
    return badRequest(res);
  }
  user.add(openId, name, function (err) {
    if (err) {
      return next(err);
    }
    res.statusCode = 200;
    return res.json({name: name, openId: openId});
  });
};

exports.userInfo = function (req, res, next) {
  var query = req.query || {};
  var openId = query.openId || '';
  if (!openId) {
    return badRequest(res);
  }
  user.getByOpenId(openId, function (err, row) {
    if (err) {
      return next(err);
    }
    row = row || {};
    if (!row.name) {
      res.statusCode = 404;
      return res.end();
    }
    res.statusCode = 200;
    return res.json(row);
  });
};

