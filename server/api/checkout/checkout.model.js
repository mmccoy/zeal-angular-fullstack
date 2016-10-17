'use strict';

import mongoose from 'mongoose';

var CheckoutSchema = new mongoose.Schema({
  orderId: String,
  firstName: String,
  lastName: String,
  email: String,
  addressA: String,
  addressB: String,
  city: String,
  zipcode: String,
  country: String,
  stick: Object,
  orderTotal: Number
});

export default mongoose.model('Checkout', CheckoutSchema);
