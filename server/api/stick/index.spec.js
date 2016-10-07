'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var stickCtrlStub = {
  index: 'stickCtrl.index',
  show: 'stickCtrl.show',
  create: 'stickCtrl.create',
  upsert: 'stickCtrl.upsert',
  patch: 'stickCtrl.patch',
  destroy: 'stickCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var stickIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './stick.controller': stickCtrlStub
});

describe('Stick API Router:', function() {
  it('should return an express router instance', function() {
    expect(stickIndex).to.equal(routerStub);
  });

  describe('GET /api/sticks', function() {
    it('should route to stick.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'stickCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/sticks/:id', function() {
    it('should route to stick.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'stickCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/sticks', function() {
    it('should route to stick.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'stickCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/sticks/:id', function() {
    it('should route to stick.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'stickCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/sticks/:id', function() {
    it('should route to stick.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'stickCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/sticks/:id', function() {
    it('should route to stick.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'stickCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
