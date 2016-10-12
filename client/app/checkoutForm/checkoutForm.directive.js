'use strict';
const angular = require('angular');

export default angular.module('customizerApp.checkoutForm', [])
  .directive('checkoutForm', function() {
    return {
      templateUrl: 'app/checkoutForm/checkoutForm.html',
      restrict: 'EA',
      link: function(scope, element, attrs) {

        braintree.client.create({
          authorization: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJlNzEzZjkzY2JlNzVhMDU0MDI5MjkzYzVlYzI2MzA0YzEwYmM2ZmM1YjVmYTEyMzA5M2I1ZWUzYTBhMjM2N2VifGNyZWF0ZWRfYXQ9MjAxNi0xMC0xMlQwMDo0ODoyNC45NzA1NTc1MzkrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTh4Y2tuOHo3bjJuYmpueDNcdTAwMjZwdWJsaWNfa2V5PWMzM3pza214ZzN4Mnc3M20iLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvOHhja244ejduMm5iam54My9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzh4Y2tuOHo3bjJuYmpueDMvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzh4Y2tuOHo3bjJuYmpueDMifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiRGV2aXNpb24gTWVkaWEiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJkZXZpc2lvbm1lZGlhIiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sImNvaW5iYXNlRW5hYmxlZCI6ZmFsc2UsIm1lcmNoYW50SWQiOiI4eGNrbjh6N24ybmJqbngzIiwidmVubW8iOiJvZmYifQ=='
        }, function (err, clientInstance) {
          if (err) {
            console.error(err);
            return;
          }

          braintree.hostedFields.create({
            client: clientInstance,
            styles: {
              'input': {
                'font-size': '14px',
                'font-family': 'helvetica, tahoma, calibri, sans-serif',
                'color': '#3a3a3a'
              },
              ':focus': {
                'color': 'black'
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
              expirationMonth: {
                selector: '#expiration-month',
                placeholder: 'MM'
              },
              expirationYear: {
                selector: '#expiration-year',
                placeholder: 'YY'
              },
              postalCode: {
                selector: '#postal-code',
                placeholder: '90210'
              }
            }
          }, function (err, hostedFieldsInstance) {
            if (err) {
              console.error(err);
              return;
            }

            hostedFieldsInstance.on('validityChange', function (event) {
              var field = event.fields[event.emittedBy];

              if (field.isValid) {
                if (event.emittedBy === 'expirationMonth' || event.emittedBy === 'expirationYear') {
                  if (!event.fields.expirationMonth.isValid || !event.fields.expirationYear.isValid) {
                    return;
                  }
                } else if (event.emittedBy === 'number') {
                  $('#card-number').next('span').text('');
                }

                // Apply styling for a valid field
                $(field.container).parents('.form-group').addClass('has-success');
              } else if (field.isPotentiallyValid) {
                // Remove styling  from potentially valid fields
                $(field.container).parents('.form-group').removeClass('has-warning');
                $(field.container).parents('.form-group').removeClass('has-success');
                if (event.emittedBy === 'number') {
                  $('#card-number').next('span').text('');
                }
              } else {
                // Add styling to invalid fields
                $(field.container).parents('.form-group').addClass('has-warning');
                // Add helper text for an invalid card number
                if (event.emittedBy === 'number') {
                  $('#card-number').next('span').text('Looks like this card number has an error.');
                }
              }
            });

            hostedFieldsInstance.on('cardTypeChange', function (event) {
              // Handle a field's change, such as a change in validity or credit card type
              if (event.cards.length === 1) {
                $('#card-type').text(event.cards[0].niceType);
              } else {
                $('#card-type').text('Card');
              }
            });

            $('.panel-body').submit(function (event) {
              event.preventDefault();
              hostedFieldsInstance.tokenize(function (err, payload) {
                if (err) {
                  console.error(err);
                  return;
                }

                // This is where you would submit payload.nonce to your server
                var transactionErrors;
                var amount = "10.00"; // In production you should not take amounts directly from clients
                var nonce = payload.nonce;
                console.log(nonce);

                // gateway.transaction.sale({
                //   amount: amount,
                //   paymentMethodNonce: nonce,
                //   options: {
                //     submitForSettlement: true
                //   }
                // }, function (err, result) {
                //   if (result.success || result.transaction) {
                //     console.log(result);
                //     // res.redirect('checkouts/' + result.transaction.id);
                //   } else {
                //     transactionErrors = result.errors.deepErrors();
                //     console.log(formatErrors(transactionErrors));
                //     // req.flash('error', {msg: formatErrors(transactionErrors)});
                //     // res.redirect('checkouts/new');
                //   }
                // });
                // alert('Submit your nonce to your server here!');
              });
            });
          });
        });

      }
    }
  })
  .name;
