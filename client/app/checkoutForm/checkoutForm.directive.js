'use strict';
const angular = require('angular');

export default angular.module('customizerApp.checkoutForm', [])
  .directive('checkoutForm', function($http) {
    return {
      templateUrl: 'app/checkoutForm/checkoutForm.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {
        $http({
          method: 'GET',
          url: '/api/checkouts/token'
        }).then(function successCallback(response) {
            console.log('Success');
            scope.clientToken = response.data;
            braintree.client.create({
              authorization: scope.clientToken
            }, function(err, clientInstance) {
              if (err) {
                console.error(err);
                return;
              }
              braintree.hostedFields.create({
                  client: clientInstance,
                  styles: {
                    'input': {
                      'font-size': '14pt'
                    },
                    'input.invalid': {
                      'color': 'red'
                    },
                    'input.valid': {
                      'color': 'green'
                    }
                  },
                  fields: {
                    number: {
                      selector: '#card-number',
                      placeholder: '4111 1111 1111 1111'
                    },
                    cvv: {
                      selector: '#cvv',
                      placeholder: '123'
                    },
                    expirationDate: {
                      selector: '#expiration-date',
                      placeholder: '10/2019'
                    }
                  }
                }, function (hostedFieldsErr, hostedFieldsInstance) {
                  var submit = document.querySelector('input[type="submit"]');
                  if (hostedFieldsErr) {
                    // Handle error in Hosted Fields creation
                    return;
                  }

                  submit.removeAttribute('disabled');
                });
            })
          }, function errorCallback(response) {
            console.log('Error' + response)
          });
      }
    }
  })
  .name;
