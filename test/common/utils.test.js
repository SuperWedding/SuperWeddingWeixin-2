/*!
 * SuperWedding - test/common/utils.test.js
 */

'use strict';

/**
 * Module dependencies.
 */

var mm = require('mm');
var should = require('should');
var utils = require('../../common/utils');

describe('common/utils.test.js', function () {

  afterEach(function () {
    mm.restore();
  });

  describe('getFileFrmUrl()', function () {
    it('should return false when no url', function () {
      utils.getFileFrmUrl().should.equal(false);
    });
    it('should return file name from url', function () {
      var url = 'http://www.keydiary.com/assets/img/index.png';
      utils.getFileFrmUrl(url).should.equal('index.png');
    });
  });

});
