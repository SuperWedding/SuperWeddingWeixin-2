/*!
 * SuperWedding - controllers/pages.js
 */

'use strict';

/**
 * Module dependencies.
 */

exports.upload = function (req, res, next) {
  return res.render('upload', {
    viewname: 'upload',
    current: new Date()
  });
};
