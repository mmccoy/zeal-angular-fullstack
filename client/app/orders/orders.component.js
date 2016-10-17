'use strict';
// const angular = require('angular');
// const uiRouter = require('angular-ui-router');

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routes from './orders.routes';

export class OrdersComponent {

  /*@ngInject*/
  constructor($stateParams, $http, $scope, socket) {
    // this.order = {};
    this.orderId  = $stateParams.orderId;
    this.stick = $stateParams.stick;
    this.$http = $http;
    this.order = {};
  }

  $onInit() {
    this.$http.get('/api/checkouts/' + this.orderId)
      .then(response => {
        console.log(response.data);
        this.order = response.data[0];
        console.log(this.order);
      });
  }
}
OrdersComponent.$inject = ["$stateParams", "$http", "$scope"];

export default angular.module('customizerApp.orders', [uiRouter])
  .config(routes)
  .component('orders', {
    template: require('./orders.pug'),
    controller: OrdersComponent,
    controllerAs: 'ordersCtrl'
  })
  .name;
