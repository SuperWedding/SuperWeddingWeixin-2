/**!
 * SuperWedding - config/index.js
 */

'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var os = require('os');
var mkdirp = require('mkdirp');
var copy = require('copy-to');

fs.existsSync = fs.existsSync || path.existsSync;
var version = require('../package.json').version;

var root = path.dirname(__dirname);

var config = {
  version: version,
  port: 7001,
  // bindingHost: '127.0.0.1',
  enableCluster: false,
  numCPUs: os.cpus().length,
  debug: true,
  logdir: path.join(root, '.tmp', 'logs'),
  viewCache: false,
  // mysql config
  mysqlServers: [
    {
      host: '58.100.85.65',
      port: 3306,
      user: 'root',
      password: ''
    }
  ],
  mysqlDatabase: 'sw_test',
  mysqlMaxConnections: 4,
  mysqlQueryTimeout: 5000,

  sessionSecret: 'SuperWedding test session secret',
  redis: {
    // host: '58.100.85.65',
    // port: 6379,
    // pass: 'sw_dev',
    // speedFirst: true,
    // prefix: 'sw_dev:'
  },
  jsonLimit: '10mb', // max request json body size
  uploadDir: path.join(root, '.upload'),
  qn: {
    accessKey: 'lTcPDs5KvSr4xZWTLROEapmAlkD70xYvAm0LGGVD',
    secretKey: 'iwzTpCM-Fr0_x2NflYfjNmFu6rccJjyBwypcAtU6',
    bucket: 'swtest',
    domain: 'swtest.qiniudn.com'
  }
};

// Load config/config.js, everything in config.js will cover the same key in index.js
var customConfig = path.join(root, 'config/config.js');
if (fs.existsSync(customConfig)) {
  copy(require(customConfig)).override(config);
}

mkdirp.sync(config.logdir);
mkdirp.sync(config.uploadDir);

module.exports = config;

config.loadConfig = function (customConfig) {
  if (!customConfig) {
    return;
  }
  copy(customConfig).override(config);
};
