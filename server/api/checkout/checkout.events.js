/**
 * Checkout model events
 */

'use strict';

import {EventEmitter} from 'events';
import Checkout from './checkout.model';
var CheckoutEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CheckoutEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Checkout.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CheckoutEvents.emit(event + ':' + doc._id, doc);
    CheckoutEvents.emit(event, doc);
  };
}

export default CheckoutEvents;
