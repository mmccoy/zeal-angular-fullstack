'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var checkoutCtrlStub = {
  index: 'checkoutCtrl.index',
  show: 'checkoutCtrl.show',
  create: 'checkoutCtrl.create',
  upsert: 'checkoutCtrl.upsert',
  patch: 'checkoutCtrl.patch',
  destroy: 'checkoutCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var checkoutIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './checkout.controller': checkoutCtrlStub
});

describe('Checkout API Router:', function() {
  it('should return an express router instance', function() {
    expect(checkoutIndex).to.equal(routerStub);
  });

  describe('GET /api/checkouts', function() {
    it('should route to checkout.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'checkoutCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/checkouts/:id', function() {
    it('should route to checkout.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'checkoutCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/checkouts', function() {
    it('should route to checkout.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'checkoutCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/checkouts/:id', function() {
    it('should route to checkout.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'checkoutCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/checkouts/:id', function() {
    it('should route to checkout.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'checkoutCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/checkouts/:id', function() {
    it('should route to checkout.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'checkoutCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
