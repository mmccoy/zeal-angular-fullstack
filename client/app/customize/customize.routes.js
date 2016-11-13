'use strict';

var playerWest = require('ngtemplate!html!./partials/html/customize-player-west.html');
var playerEast = require('ngtemplate!html!./partials/html/customize-player-east.html');
var profileWest = require('ngtemplate!html!./partials/html/customize-profile-west.html');
var profileEast = require('ngtemplate!html!./partials/html/customize-profile-east.html');
var modelWest = require('ngtemplate!html!./partials/html/customize-model-west.html');
var modelEast = require('ngtemplate!html!./partials/html/customize-model-east.html');
var optionsWest = require('ngtemplate!html!./partials/html/customize-options-west.html');
var optionsEast = require('ngtemplate!html!./partials/html/customize-options-east.html');
var reviewWest = require('ngtemplate!html!./partials/html/customize-review-west.html');
var reviewEast = require('ngtemplate!html!./partials/html/customize-review-east.html');
var cartWest = require('ngtemplate!html!./partials/html/customize-cart-west.html');
var cartEast = require('ngtemplate!html!./partials/html/customize-cart-east.html');
var checkoutWest = require('ngtemplate!html!./partials/html/customize-checkout-west.html');
var checkoutEast = require('ngtemplate!html!./partials/html/customize-checkout-east.html');

export default function($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('customize', {
      url: '/customize',
      template: '<customize></customize>'
    })

    .state('customize.player', {
      url: '/player',
      views: {
        'stage-left': {
          templateUrl: playerWest
        },
        'stage-right': {
          templateUrl: playerEast
        }
      },
      data: {
        westFlex: 1,
        eastFlex: .7,
        navTitle: 'Player Info',
        viewClass: 'player-select-view'
      }
    })

    .state('customize.profile', {
      url: '/profile',
      views: {
        'stage-left': {
          templateUrl: profileWest
        },
        'stage-right': {
          templateUrl: profileEast
        }
      },
      data: {
        westFlex: 1,
        eastFlex: .7,
        navTitle: 'Player Info',
        viewClass: 'profile-select-view'
      }
    })

    .state('customize.model', {
      url: '/model',
      views: {
        'stage-left': {
          templateUrl: modelWest
        },
        'stage-right': {
          templateUrl: modelEast
        }
      },
      data: {
        westFlex: 1,
        eastFlex: .7,
        navTitle: 'Pick a Stick',
        viewClass: 'stick-select-view'
      }
    })

    .state('customize.options', {
      url: '/options/:stage',
      views: {
        'stage-left': {
          templateUrl: optionsWest
        },
        'stage-right': {
          templateUrl: optionsEast
        }
      },
      data: {
        westFlex: 1,
        eastFlex: .4,
        navTitle: 'Customize',
        viewClass: 'options-view'
      }
    })

    .state('customize.review', {
      url: '/review',
      views: {
        'stage-left': {
          templateUrl: reviewWest
        },
        'stage-right': {
          templateUrl: reviewEast
        }
      },
      data: {
        westFlex: 1,
        eastFlex: .4,
        navTitle: 'Review',
        viewClass: 'review-view'
      }
    })

    .state('customize.cart', {
      url: '/cart',
      views: {
        'stage-left': {
          templateUrl: cartWest
        },
        'stage-right': {
          templateUrl: cartEast
        }
      },
      data: {
        westFlex: 1,
        eastFlex: .4,
        navTitle: 'Checkout',
        viewClass: 'checkout-view'
      }
    });
}
