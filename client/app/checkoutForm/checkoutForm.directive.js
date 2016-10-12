'use strict';
const angular = require('angular');

export default angular.module('customizerApp.checkoutForm', ['ngCart'])
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
            var form = document.querySelector('#checkout-form');
            var submit = document.querySelector('input[type="submit"]');

            braintree.client.create({
              authorization: scope.clientToken
            }, function (clientErr, clientInstance) {
              if (clientErr) { return; }

              braintree.hostedFields.create({
                client: clientInstance,
                styles: {
                  'input': { 'font-size': '14pt' },
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
                form.addEventListener('submit', function (event) {
                  event.preventDefault();

                  hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
                    if (tokenizeErr) { return; }

                    // Put `payload.nonce` into the `payment-method-nonce` input, and then
                    // submit the form. Alternatively, you could send the nonce to your server
                    // with AJAX.
                    document.querySelector('input[name="payment-method-nonce"]').value = payload.nonce;
                    form.submit();
                  });
                }, false);
              })
            });
        });

      }
    }
  })
  .name;
