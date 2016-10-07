/**
 * Stick model events
 */

'use strict';

import {EventEmitter} from 'events';
import Stick from './stick.model';
var StickEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StickEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Stick.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StickEvents.emit(event + ':' + doc._id, doc);
    StickEvents.emit(event, doc);
  };
}

export default StickEvents;
