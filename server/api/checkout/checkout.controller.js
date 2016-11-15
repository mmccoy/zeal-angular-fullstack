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
// var BT_ENVIRONMENT='Sandbox'
// var BT_MERCHANT_ID='8xckn8z7n2nbjnx3'
// var BT_PUBLIC_KEY='c33zskmxg3x2w73m'
// var BT_PRIVATE_KEY='b7e5fb979d22f37fde49b872846696c5'

// Zeal Production
var BT_ENVIRONMENT='Production'
var BT_MERCHANT_ID='7hhdq8qffbmmdrjc'
var BT_PUBLIC_KEY='8zj5dpbwf82hp9jq'
var BT_PRIVATE_KEY='b9321cf408ddda7d5cf559343ade2687'

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

function createOrder(data, transaction) {

  var client = new postmark.Client("53f7ddd2-f777-40df-b9b4-2f0db0848923");

  var stick = data.cartData.items[0]._data;
  var customerData = {};
  data.formData.forEach(function (entry) {
    customerData[entry.name] = entry.value;
  });

  // Customer order confirmation email
  client.sendEmailWithTemplate({
    "From": "orders@zealhockey.com",
    "To": customerData.email,
    "TemplateId": 1008382,
    "TemplateModel": {
      "firstName": customerData.firstName,
      "stickModel": data.cartData.items[0]._data.name,
      "orderNumber": transaction.id
    }
  }, function(error, success) {
    if(error) {
      console.error("Unable to send via postmark: " + error.message);
      return;
    }
    console.info("Custom order confirmation email sent to postmark for delivery");
  });

  // Send Zeal order info so they can make the stick.
  client.sendEmailWithTemplate({
    "From": "orders@zealhockey.com",
    "To": "marc@zealhockey.com, zealhockeyorders@gmail.com, pernilla@zealhockey.com, mmccoy@gmail.com",
    "TemplateId": 1008542,
    "TemplateModel": {
      "orderNumber": transaction.id,
      "stick": data.cartData.items[0]._data,
      "profile": stick.category,
      "model": stick.series + ' ' + stick.name,
      "orientation": stick.orientation,
      "colorShaft": stick.customColor.shaft,
      "colorAccent": stick.customColor.accent,
      "colorLogo": stick.customColor.logo,
      "flex": stick.flex,
      "blade": stick.pattern,
      "coating": stick.finish,
      "playerName": stick.player.name,
      "playerNumber": stick.player.number,
      "name": customerData.firstName + ' ' + customerData.lastName,
      "phone": customerData.phone,
      "email": customerData.email,
      "addressA": customerData.addressA,
      "addressB": customerData.addressB,
      "city": customerData.city,
      "state": customerData.state,
      "zipcode": customerData.zipcode,
      "country": customerData.country
    }
  }, function(error, success) {
    if(error) {
      console.error("Unable to send via postmark: " + error.message);
      return;
    }
    console.info("Production order email sent to postmark for delivery");
  })

  Checkout.create({
    orderId: transaction.id,
    orderTotal: data.totalCost,
    firstName: customerData.firstName,
    lastName: customerData.lastName,
    email: customerData.email,
    addressA: customerData.addressA,
    addressB: customerData.addressB,
    stick: data.cartData.items[0]._data
  })
    .then(function(res) {
      // Successful order creation
      // console.log(res);
    })
    .catch(function(res) {
      // Error
    });
}

// Gets a list of Checkouts
export function index(req, res) {
  return Checkout.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Checkouts
export function getToken(req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
}

// Gets a single Checkout from the DB
export function show(req, res) {
  return Checkout.find({orderId: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Checkout in the DB
export function create(req, res) {

  var nonce = req.body.payload.nonce;
  var amount = req.body.totalCost;
  var formData = req.body.formData;
  var cartData = req.body.cartData;
  var transactionErrors;
  
  var customerData = {};
  formData.forEach(function (entry) {
    customerData[entry.name] = entry.value;
  });

  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonce,
    customer: {
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      phone: customerData.phone,
      email: customerData.email
    },
    billing: {
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      streetAddress: customerData.addressA,
      extendedAddress: customerData.addressB,
      locality: customerData.city,
      region: customerData.state,
      postalCode: customerData.zipcode
    },
    shipping: {
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      streetAddress: customerData.addressA,
      extendedAddress: customerData.addressB,
      locality: customerData.city,
      region: customerData.state,
      postalCode: customerData.zipcode
    },
    descriptor: {
      name: "zealhockeyus*cstomstik",
      phone: "401-861-9325",
      url: "zealhockeycom"
    },
    customFields: {
      stick_model: cartData.items[0]._data.series + ' ' + cartData.items[0]._data.name + ' (' + cartData.items[0]._data.profile.toUpperCase() + ')',
      stick_colors: 'Shaft: ' + cartData.items[0]._data.customColor.shaft + ', Logo: ' + cartData.items[0]._data.customColor.logo + ', Accents: ' + cartData.items[0]._data.customColor.accent,
      stick_orientation: cartData.items[0]._data.orientation + ' handed', 
      stick_flex: cartData.items[0]._data.flex, 
      stick_pattern: cartData.items[0]._data.pattern,
      stick_coating: cartData.items[0]._data.finish,
      stick_personalize: 'Player Name: ' + cartData.items[0]._data.player.name.toUpperCase() + ', Player Number: ' + cartData.items[0]._data.player.number
    },
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    console.log('err:', err);
    if (result.success && result.transaction && !result.errors) {
      createOrder(req.body, result.transaction);
      // res.status = 200;
      var responseObj = { transaction: result.transaction, items: cartData.items };
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(responseObj);
    } else {
      console.log(result);
      // res.status = 500;
      console.log('result: ', result);
      var responseObj = {}
      responseObj.errorMsg = result.message;
      res.status(500).send(responseObj);
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
