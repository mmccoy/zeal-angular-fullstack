'use strict';

import '../../bower_components/ngCart/dist/ngCart.min.js';

const angular = require('angular');
var template = require('ngtemplate!html!./checkoutForm.html');

export default angular.module('customizerApp.checkoutForm', ['ngCart'])
  .directive('checkoutForm', function($http, ngCart) {
    return {
      templateUrl: template,
      restrict: 'EA',
      link: function(scope, element, attrs) {
        $http({
          method: 'GET',
          url: '/api/checkouts/token'
        }).then(function successCallback(response) {
            console.log('Success');

            scope.clientToken = response.data;
            scope.totalCost = ngCart.totalCost();

            // var form = document.querySelector('#checkout-form');
            var form = $('#checkout-form');
            var submit = document.querySelector('button[type="submit"]');
            var nonce = document.querySelector('input[name="payment-method-nonce"]');

            braintree.client.create({
              authorization: scope.clientToken
            }, function (clientErr, clientInstance) {
              if (clientErr) { return; }

              braintree.hostedFields.create({
                client: clientInstance,
                styles: {
                  'input': { 'font-size': '14px' },
                  'input.invalid': { 'color': 'red' },
                  'input.valid': { 'color': 'green' }
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
                if (hostedFieldsErr) {
                  // Handle error in Hosted Fields creation
                  return;
                }

                submit.removeAttribute('disabled');

                form.on('submit', function(event) {
                  event.preventDefault();
                  hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
                    if (tokenizeErr) { return; }
                    // Put `payload.nonce` into the `payment-method-nonce` input, and then
                    // submit the form. Alternatively, you could send the nonce to your server
                    // with AJAX.
                    var formData = JSON.parse(JSON.stringify(form.serializeArray()));

                    var req = {
                      method: 'POST',
                      url: '/api/checkouts',
                      data: {
                        formData: formData,
                        totalCost: ngCart.totalCost(),
                        payload: payload,
                        cartData: ngCart.getItems()._data
                      }
                    }
                    $http(req).then(function(response){
                      console.log(response);
                    }, function(response){
                      console.log(response);
                    });
                  });
                });
              })
            });
        });

      }
    }
  })
  .name;
