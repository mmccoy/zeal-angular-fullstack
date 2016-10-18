'use strict';

describe('Component: checkout', function() {
  // load the component's module
  beforeEach(module('customizerApp.checkout'));

  var checkoutComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    checkoutComponent = $componentController('checkout', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
