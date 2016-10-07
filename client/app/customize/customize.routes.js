'use strict';

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
          templateUrl: 'app/customize/partials/html/customize-player-west.html'
        },
        'stage-right': {
          templateUrl: 'app/customize/partials/html/customize-player-east.html'
        }
      },
      data: {
        stageLeftSpan: 6,
        stageRightSpan: 5
      }
    })

    .state('customize.profile', {
      url: '/profile',
      views: {
        'stage-left': {
          templateUrl: 'app/customize/partials/html/customize-profile-west.html'
        },
        'stage-right': {
          templateUrl: 'app/customize/partials/html/customize-profile-east.html'
        }
      },
      data: {
        stageLeftSpan: 6,
        stageRightSpan: 5
      }
    })

    .state('customize.model', {
      url: '/model',
      views: {
        'stage-left': {
          templateUrl: 'app/customize/partials/html/customize-model-west.html'
        },
        'stage-right': {
          templateUrl: 'app/customize/partials/html/customize-model-east.html'
        }
      },
      data: {
        stageLeftSpan: 6,
        stageRightSpan: 5
      }
    })

    .state('customize.options', {
      url: '/options',
      views: {
        'stage-left': {
          templateUrl: 'app/customize/partials/html/customize-options-west.html'
        },
        'stage-right': {
          templateUrl: 'app/customize/partials/html/customize-options-east.html'
        }
      },
      data: {
        stageLeftSpan: 8,
        stageRightSpan: 3
      }
    })

    .state('customize.review', {
      url: '/review',
      views: {
        'stage-left': {
          templateUrl: 'app/customize/partials/html/customize-review-west.html'
        },
        'stage-right': {
          templateUrl: 'app/customize/partials/html/customize-review-east.html'
        }
      },
      data: {
        stageLeftSpan: 8,
        stageRightSpan: 3
      }
    })

    .state('customize.cart', {
      url: '/cart',
      views: {
        'stage-left': {
          templateUrl: 'app/customize/partials/html/customize-cart-west.html'
        },
        'stage-right': {
          templateUrl: 'app/customize/partials/html/customize-cart-east.html'
        }
      },
      data: {
        stageLeftSpan: 11,
        stageRightSpan: 0
      }
    })

    .state('customize.checkout', {
      url: '/checkout',
      views: {
        'stage-left': {
          templateUrl: 'app/customize/partials/html/customize-checkout-west.html'
        },
        'stage-right': {
          templateUrl: 'app/customize/partials/html/customize-checkout-east.html'
        }
      },
      data: {
        stageLeftSpan: 11,
        stageRightSpan: 0
      }
    });
}
