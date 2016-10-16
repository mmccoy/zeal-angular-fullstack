/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/checkouts              ->  index
 * GET     /api/checkouts/token        ->  getToken
 * POST    /api/checkouts              ->  create
 * GET     /api/checkouts/:id          ->  show
 * PUT     /api/checkouts/:id          ->  upsert
 * PATCH   /api/checkouts/:id          ->  patch
 * DELETE  /api/checkouts/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Checkout from './checkout.model';
import braintree from 'braintree';
import postmark from 'postmark';

var environment, gateway;
// require('dotenv').load();

// Devision sandbox
var BT_ENVIRONMENT='Sandbox'
var BT_MERCHANT_ID='8xckn8z7n2nbjnx3'
var BT_PUBLIC_KEY='c33zskmxg3x2w73m'
var BT_PRIVATE_KEY='b7e5fb979d22f37fde49b872846696c5'

// Zeal Production
// var BT_ENVIRONMENT='Production'
// var BT_MERCHANT_ID='7hhdq8qffbmmdrjc'
// var BT_PUBLIC_KEY='8zj5dpbwf82hp9jq'
// var BT_PRIVATE_KEY='b9321cf408ddda7d5cf559343ade2687'

environment = BT_ENVIRONMENT.charAt(0).toUpperCase() + BT_ENVIRONMENT.slice(1);

gateway = braintree.connect({
  environment: braintree.Environment[environment],
  merchantId: BT_MERCHANT_ID,
  publicKey: BT_PUBLIC_KEY,
  privateKey: BT_PRIVATE_KEY
});

var TRANSACTION_SUCCESS_STATUSES = [
  braintree.Transaction.Status.Authorizing,
  braintree.Transaction.Status.Authorized,
  braintree.Transaction.Status.Settled,
  braintree.Transaction.Status.Settling,
  braintree.Transaction.Status.SettlementConfirmed,
  braintree.Transaction.Status.SettlementPending,
  braintree.Transaction.Status.SubmittedForSettlement
];

function formatErrors(errors) {
  var formattedErrors = '';

  for (var i in errors) { // eslint-disable-line no-inner-declarations, vars-on-top
    if (errors.hasOwnProperty(i)) {
      formattedErrors += 'Error: ' + errors[i].code + ': ' + errors[i].message + '\n';
    }
  }
  return formattedErrors;
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function createOrder(data) {
  // postmark.send({
  //   "From": "orders@zealhockey.com",
  //   "To": "mmccoy@gmail.com",
  //   "Subject": "Your Custom Zeal Stick",
  //   "TextBody": "Its gonna be awesome!",
  // }, function(error, success) {
  //     if(error) {
  //         console.error("Unable to send via postmark: " + error.message);
  //        return;
  //     }
  //     console.info("Sent to postmark for delivery")
  // });

  Checkout.create(data);
}

// Gets a list of Checkouts
export function index(req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
}

// Gets a list of Checkouts
export function getToken(req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
}

// Gets a single Checkout from the DB
export function show(req, res) {
  return Checkout.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Checkout in the DB
export function create(req, res) {

  createOrder(req.body);

  var nonce = req.body.payload.nonce;
  var amount = req.body.totalCost;
  var formdata = req.body.formData;

  var transactionErrors;

  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    if (result.success || result.transaction) {
      // console.log(result);
      res.send(result.transaction)
      // result.setHeader('Content-Type', 'application/json');
      // res.send(JSON.stringify({ a: 1 }, null, 3));
      // res.redirect('../orders/' + result.transaction.id);
    } else {
      transactionErrors = result.errors.deepErrors();
      console.log(formatErrors(transactionErrors))
      // req.flash('error', {msg: formatErrors(transactionErrors)});
      // res.redirect('checkouts/new');
    }
  });
}

// Upserts the given Checkout in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Checkout.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Checkout in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Checkout.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Checkout from the DB
export function destroy(req, res) {
  return Checkout.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
