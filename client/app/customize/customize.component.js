'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customize.routes';
import md5 from 'js-md5';

export class CustomizeComponent {
  sticks = [];
  userStick = {};

  /*@ngInject*/
  constructor($http, $scope, socket, $state, $rootScope, ngCart) {
    this.$http = $http;
    this.$state = $state;
    this.ngCart = ngCart;

    this.socket = socket;
    this.optionStage = 'color';
    this.activeOption = 'color';


    // Default cart configurations
    ngCart.setShipping(14.99);

    if ($state.is('customize')) {
      $state.go('customize.player');
    }

    if ($state.is('customize.options') || $state.is('customize.review')) {
      $scope.westFlex = 1;
      $scope.eastFlex = .6;
    } else {
      $scope.westFlex = 1;
      $scope.eastFlex = .7;
    }

    // Stick defaults
    this.userStick.orientation = 'Right';
    this.userStick.pattern = 'Z28';
    this.userStick.flex = '77';
    this.userStick.finish = 'Grip';

    this.accordionOptions = {
      oneAtATime: true,
      isFirstOpen: true
    };

    this.patternSlider = {
      value: this.userStick.pattern,
      options: {
        id: 'patternChoice',
        showTicksValues: true,
        stepsArray: this.userStick.patterns
      }
    };

    this.flexSlider = {
      value: this.userStick.flex,
      options: {
        id: 'flexChoice',
        showTicksValues: true,
        stepsArray: this.userStick.flexes
      }
    };

    this.finishSlider = {
      value: this.userStick.finish,
      options: {
        id: 'finishChoice',
        showTicksValues: true,
        stepsArray: [
          {value: "Matte"},
          {value: "Glossy"},
          {value: "HighTac"},
          {value: "Sandblast"},
          {value: "MatteGrip"}
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
      if (toState.data) {
        $scope.westFlex = toState.data.westFlex;
        $scope.eastFlex = toState.data.eastFlex;
        $scope.navTitle = toState.data.navTitle;
      }
    });

    $scope.$on("slideEnded", function(e) {
      console.log(e);
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

    this.patternSlider.options.stepsArray = this.userStick.patterns;
    this.flexSlider.options.stepsArray = this.userStick.flexes;
    this.userStick.customHash = md5(this.userStick.toString()) + new Date().toString();
    // console.log(this.userStick);
  };

  setOptionStage (stage) {
    this.optionStage = stage;
    this.activeOption = stage;

    console.log(this.optionStage);
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
