'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('orders', {
      url: '/orders/:orderId',
      template: '<orders></orders>',
      params: {
        stick: {}
      }
    });
}
