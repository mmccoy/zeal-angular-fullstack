'use strict';

export default function routes($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  });
}
