'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const tinycolor = require("tinycolor2");

import routes from './customize.routes';
import md5 from 'js-md5';
import $ from "jquery";

export class CustomizeComponent {
  sticks = [];
  userStick = {};

  /*@ngInject*/
  constructor($http, $scope, socket, $state, $rootScope, ngCart) {
    if (!this.userStick.length && !$state.is('customize.player')) {
      $state.go('customize.player');
    };

    $scope.ctrl = this;
    this.$http = $http;
    this.$state = $state;
    this.ngCart = ngCart;
    this.$scope = $scope;

    this.socket = socket;
    this.activeOption = 'color';
    $scope.optionStage = 'color';
    $scope.openStage = 'color';

    $scope.viewClass = 'default';
    $scope.isColorOpen = ($scope.openStage == 'color');
    $scope.isOrientationOpen = ($scope.openStage == 'orientation');
    $scope.isPatternOpen = ($scope.openStage == 'pattern');
    $scope.isFlexOpen = ($scope.openStage == 'flex');
    $scope.isFinishOpen = ($scope.openStage == 'finish');
    $scope.isPersonalizeOpen = ($scope.openStage == 'personalize');
    
    
    // Default cart configurations
    ngCart.setShipping(14.99);

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
    this.userStick.name = 'PK100';
    this.userStick.customColor = {};

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
      // console.log('added item');
      $state.go('customize.cart');
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('stick');
    });

    $scope.$on('$stateChangeSuccess', function(
      event, toState, toParams, fromState, fromParams) {
      // console.log(toState);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      
      if (toState.data) {
        $scope.westFlex = toState.data.westFlex;
        $scope.eastFlex = toState.data.eastFlex;
        $scope.navTitle = toState.data.navTitle;
        $scope.viewClass = toState.data.viewClass;
      }

      if(toState.name === 'customize.model') {
        // Set default stick once user has selected a profile (senior, int, jr)
        var defaultStickId;
        switch($scope.ctrl.userStick.profile) {
          case 'senior':
            defaultStickId = 'pk100-senior'; 
            break;
          case 'intermediate':
            defaultStickId = 'pk100-int';
            break;
          case 'junior':
            defaultStickId = 'pk100-jr';
            break;
          default:
            defaultStickId = 'pk100-senior'
            break;
        }

        var defaultStick = $scope.ctrl.sticks.filter(function(stick) {
          return stick.id === defaultStickId;
        });

        $scope.ctrl.updateUserStick(defaultStick[0]);
      }

      if(toState.name === 'customize.options') {
        if (toParams.stage) {
          $scope.ctrl.resetOptionsState();
          switch(toParams.stage) {
            case 'color':
              $scope.isColorOpen = !$scope.isColorOpen;
              break;
            case 'orientation':
              $scope.isOrientationOpen = !$scope.isOrientationOpen;
              break;
            case 'pattern':
              $scope.isPatternOpen = !$scope.isPatternOpen;
              break;
            case 'flex':
              $scope.isFlexOpen = !$scope.isFlexOpen;
              break;
            case 'finish':
              $scope.isFinishOpen = !$scope.isFinishOpen;
              break;
            case 'personalize':
              $scope.isPersonalizeOpen = !$scope.isPersonalizeOpen;
              break;
          }
          $scope.$broadcast('rzSliderForceRender');
          $scope.openStage = toParams.stage;
          $scope.ctrl.setOptionStage(toParams.stage);
          // console.log($scope);
        }
      }
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

  stickOptionsComplete() {
    return (this.userStick.customColor &&
            this.userStick.customColor.shaft &&
            this.userStick.customColor.accent &&
            this.userStick.customColor.logo);
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

  updateUserStickColor(segment, color) {
    this.userStick.customColor[segment] = color;
    // console.log(color);
  }

  setOptionStage (stage) {
    this.optionStage = stage;
    this.activeOption = stage;
    this.$scope.openStage = stage;
    this.$scope.$broadcast('rzSliderForceRender');
  };

  checkColorContrast(color) {
    // console.log(tinycolor(color).getBrightness());
    if (tinycolor(color).getBrightness() < 155) {
      this.$scope.shaftTextColor = '#fff';
    } else {
      this.$scope.shaftTextColor = '#000'; 
    }
  };

  resetOptionsState() {
    this.$scope.isColorOpen = false; 
    this.$scope.isOrientationOpen = false;
    this.$scope.isPatternOpen = false;
    this.$scope.isFlexOpen = false;
    this.$scope.isFinishOpen = false;
    this.$scope.isPersonalizeOpen = false;
    console.log('Options state reset');
  };

  toggleMobileStickList(event) {
    document.body.scrollTop = event.currentTarget.offsetTop;
    event.currentTarget.classList.toggle('selected');
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
