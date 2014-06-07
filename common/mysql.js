/*!
 * SuperWedding - common/mysql.js
 */

'use strict';

/**
 * Module dependencies.
 */
var mysql = require('mysql');
var config = require('../config');

var server = config.mysqlServers[0];

// TODO: query timeout
var pool = mysql.createPool({
  host: server.host,
  port: server.port,
  user: server.user,
  password: server.password,
  database: config.mysqlDatabase,
  connectionLimit: config.mysqlMaxConnections,
  multipleStatements: true,
});

exports.pool = pool;

exports.query = function (sql, values, cb) {
  if (typeof values === 'function') {
    cb = values;
    values = null;
  }
  pool.query(sql, values, function (err, rows) {
    cb(err, rows);
  });
};

exports.queryOne = function (sql, values, cb) {
  if (typeof values === 'function') {
    cb = values;
    values = null;
  }
  exports.query(sql, values, function (err, rows) {
    if (rows) {
      rows = rows[0];
    }
    cb(err, rows);
  });
};

exports.escape = function (val) {
  return pool.escape(val);
};
