'use strict';

export function routeConfig($urlRouterProvider, $locationProvider) {
  'ngInject';
  $urlRouterProvider.when('/', '/customize');
  $locationProvider.html5Mode({enabled: true, requireBase: false});
}
