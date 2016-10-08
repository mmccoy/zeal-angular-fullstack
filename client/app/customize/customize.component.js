'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customize.routes';

export class CustomizeComponent {
  sticks = [];
  userStick = {};

  /*@ngInject*/
  constructor($http, $scope, socket, $state, $rootScope, ngCart) {
    this.$http = $http;
    this.$state = $state;

    this.socket = socket;
    this.optionStage = 'color';

    // Cart configurations
    ngCart.setTaxRate(7.5);
    ngCart.setShipping(14.99);
    // console.log($rootScope);

    if ($state.is('customize')) {
      $state.go('customize.player');
    }

    if ($state.is('customize.options') || $state.is('customize.review')) {
      $scope.stageLeftSpan = 8;
      $scope.stageRightSpan = 3;
    } else {
      $scope.stageLeftSpan = 6;
      $scope.stageRightSpan = 5;
    }

    this.accordionOptions = {
      oneAtATime: true,
      isFirstOpen: true
    };

    this.patternSlider = {
      value: this.userStick.pattern,
      options: {
        id: 'patternChoice',
        showTicksValues: true,
        stepsArray: [
          {value: "Z28", legend: 'Toe'},
          {value: "Z39"},
          {value: "Z11"},
          {value: "Z9C"},
          {value: "ZM83"},
          {value: "Z20", legend: 'Heel'}
        ]
      }
    };

    this.flexSlider = {
      value: this.userStick.flex,
      options: {
        id: 'flexChoice',
        showTicksValues: true,
        stepsArray: [
          {value: "77", legend: 'Flexible'},
          {value: "87"},
          {value: "102"},
          {value: "112", legend: 'Stiff'}
        ]
      }
    };

    $rootScope.$on('ngCart:itemAdded', function(event, message) {
      console.log('added item');
      $state.go('customize.cart');
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('stick');
    });

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      $scope.stageLeftSpan = toState.data.stageLeftSpan;
      $scope.stageRightSpan = toState.data.stageRightSpan;
    });

    $scope.$on("slideEnded", function(e) {
      // console.log(e);
    });
  };

  $onInit() {
    this.$http.get('/api/sticks')
      .then(response => {
        this.sticks = response.data;
        this.socket.syncUpdates('stick', this.sticks);
      });
  };

  updateUserStick(propertyObj) {
    for (var prop in propertyObj) {
      if ({}.hasOwnProperty.call(propertyObj, prop)) {
        this.userStick[prop] = propertyObj[prop];
      }
    }
  };

  setOptionStage (stage) {
    this.optionStage = stage;
  };

  addToCartAndCheckout (stick) {
    console.log(stick);
  };
}


export default angular.module('customizerApp.customize', [uiRouter])
  .config(routes)
  .component('customize', {
    template: require('./customize.pug'),
    controller: CustomizeComponent,
    controllerAs: 'customize'
  })
  .name;
