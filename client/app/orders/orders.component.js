'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './orders.routes';

export class OrdersComponent {
  /*@ngInject*/
  constructor($stateParams) {
    console.log($stateParams);
    this.orderId  = $stateParams.orderId;
  }
}
OrdersComponent.$inject = ["$stateParams"];

export default angular.module('customizerApp.orders', [uiRouter])
  .config(routes)
  .component('orders', {
    template: require('./orders.pug'),
    controller: OrdersComponent,
    controllerAs: 'ordersCtrl'
  })
  .name;
