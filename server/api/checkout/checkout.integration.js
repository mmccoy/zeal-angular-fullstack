'use strict';

var app = require('../..');
import request from 'supertest';

var newCheckout;

describe('Checkout API:', function() {
  describe('GET /api/checkouts', function() {
    var checkouts;

    beforeEach(function(done) {
      request(app)
        .get('/api/checkouts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          checkouts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(checkouts).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/checkouts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/checkouts')
        .send({
          name: 'New Checkout',
          info: 'This is the brand new checkout!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCheckout = res.body;
          done();
        });
    });

    it('should respond with the newly created checkout', function() {
      expect(newCheckout.name).to.equal('New Checkout');
      expect(newCheckout.info).to.equal('This is the brand new checkout!!!');
    });
  });

  describe('GET /api/checkouts/:id', function() {
    var checkout;

    beforeEach(function(done) {
      request(app)
        .get(`/api/checkouts/${newCheckout._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          checkout = res.body;
          done();
        });
    });

    afterEach(function() {
      checkout = {};
    });

    it('should respond with the requested checkout', function() {
      expect(checkout.name).to.equal('New Checkout');
      expect(checkout.info).to.equal('This is the brand new checkout!!!');
    });
  });

  describe('PUT /api/checkouts/:id', function() {
    var updatedCheckout;

    beforeEach(function(done) {
      request(app)
        .put(`/api/checkouts/${newCheckout._id}`)
        .send({
          name: 'Updated Checkout',
          info: 'This is the updated checkout!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCheckout = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCheckout = {};
    });

    it('should respond with the original checkout', function() {
      expect(updatedCheckout.name).to.equal('New Checkout');
      expect(updatedCheckout.info).to.equal('This is the brand new checkout!!!');
    });

    it('should respond with the updated checkout on a subsequent GET', function(done) {
      request(app)
        .get(`/api/checkouts/${newCheckout._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let checkout = res.body;

          expect(checkout.name).to.equal('Updated Checkout');
          expect(checkout.info).to.equal('This is the updated checkout!!!');

          done();
        });
    });
  });

  describe('PATCH /api/checkouts/:id', function() {
    var patchedCheckout;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/checkouts/${newCheckout._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Checkout' },
          { op: 'replace', path: '/info', value: 'This is the patched checkout!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCheckout = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCheckout = {};
    });

    it('should respond with the patched checkout', function() {
      expect(patchedCheckout.name).to.equal('Patched Checkout');
      expect(patchedCheckout.info).to.equal('This is the patched checkout!!!');
    });
  });

  describe('DELETE /api/checkouts/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/checkouts/${newCheckout._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when checkout does not exist', function(done) {
      request(app)
        .delete(`/api/checkouts/${newCheckout._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
