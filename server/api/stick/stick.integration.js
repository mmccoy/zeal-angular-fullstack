'use strict';

var app = require('../..');
import request from 'supertest';

var newStick;

describe('Stick API:', function() {
  describe('GET /api/sticks', function() {
    var sticks;

    beforeEach(function(done) {
      request(app)
        .get('/api/sticks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sticks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sticks).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/sticks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sticks')
        .send({
          name: 'New Stick',
          info: 'This is the brand new stick!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStick = res.body;
          done();
        });
    });

    it('should respond with the newly created stick', function() {
      expect(newStick.name).to.equal('New Stick');
      expect(newStick.info).to.equal('This is the brand new stick!!!');
    });
  });

  describe('GET /api/sticks/:id', function() {
    var stick;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sticks/${newStick._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          stick = res.body;
          done();
        });
    });

    afterEach(function() {
      stick = {};
    });

    it('should respond with the requested stick', function() {
      expect(stick.name).to.equal('New Stick');
      expect(stick.info).to.equal('This is the brand new stick!!!');
    });
  });

  describe('PUT /api/sticks/:id', function() {
    var updatedStick;

    beforeEach(function(done) {
      request(app)
        .put(`/api/sticks/${newStick._id}`)
        .send({
          name: 'Updated Stick',
          info: 'This is the updated stick!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedStick = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStick = {};
    });

    it('should respond with the original stick', function() {
      expect(updatedStick.name).to.equal('New Stick');
      expect(updatedStick.info).to.equal('This is the brand new stick!!!');
    });

    it('should respond with the updated stick on a subsequent GET', function(done) {
      request(app)
        .get(`/api/sticks/${newStick._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let stick = res.body;

          expect(stick.name).to.equal('Updated Stick');
          expect(stick.info).to.equal('This is the updated stick!!!');

          done();
        });
    });
  });

  describe('PATCH /api/sticks/:id', function() {
    var patchedStick;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/sticks/${newStick._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Stick' },
          { op: 'replace', path: '/info', value: 'This is the patched stick!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedStick = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedStick = {};
    });

    it('should respond with the patched stick', function() {
      expect(patchedStick.name).to.equal('Patched Stick');
      expect(patchedStick.info).to.equal('This is the patched stick!!!');
    });
  });

  describe('DELETE /api/sticks/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/sticks/${newStick._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when stick does not exist', function(done) {
      request(app)
        .delete(`/api/sticks/${newStick._id}`)
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
