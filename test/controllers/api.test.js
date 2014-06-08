/*!
 * SuperWedding - test/controllers/api.test.js
 */

'use strict';

/**
 * Module dependencies.
 */

var mm = require('mm');
var should = require('should');
var request = require('supertest');
var user = require('../../proxy/user');
var app = require('../../app');

describe('controllers/api.test.js', function () {

  afterEach(function () {
    mm.restore();
  });

  describe('/api/sign', function () {
    it('should 400 when invalid param', function (done) {
      request(app)
      .post('/api/sign')
      .send({
        name: 'unit test'
      })
      .expect(400, done);
    });
    it('should 500 when mysql error', function (done) {
      mm.error(user, 'add', 'mock error');
      request(app)
      .post('/api/sign')
      .send({
        name: 'unit test',
        openId: 'mock Open ID'
      })
      .expect(500, done);
    });
    it('should 200', function (done) {
      mm.empty(user, 'add');
      request(app)
      .post('/api/sign')
      .send({
        name: 'unit test 23333',
        openId: 'mock Open ID'
      })
      .expect(200, done);
    });
  });

  describe('/api/user', function () {
    it('should 400 when invalid param', function (done) {
      request(app)
      .get('/api/user?name=hello')
      .expect(400, done);
    });
    it('should 500 when mysql error', function (done) {
      mm.error(user, 'getByOpenId', 'mock error');
      request(app)
      .get('/api/user?openId=test')
      .expect(500, done);
    });
    it('should 404 when user not exists', function (done) {
      mm.empty(user, 'getByOpenId');
      request(app)
      .get('/api/user?openId=test')
      .expect(404, done);
    });
    it('should 200', function (done) {
      mm.data(user, 'getByOpenId', {openId: 'test', name: 'mock'});
      request(app)
      .get('/api/user?openId=test')
      .expect(200, done);
    });
  });
});