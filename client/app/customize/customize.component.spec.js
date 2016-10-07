'use strict';

describe('Component: CustomizeComponent', function() {
  // load the controller's module
  beforeEach(module('customizerApp.customize'));

  var CustomizeComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CustomizeComponent = $componentController('customize', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
