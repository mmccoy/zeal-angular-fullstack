'use strict';

describe('Directive: checkoutForm', function() {
  // load the directive's module and view
  beforeEach(module('zealCustomizerFullApp.checkoutForm'));
  beforeEach(module('app/checkoutForm/checkoutForm.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<checkout-form></checkout-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the checkoutForm directive');
  }));
});
