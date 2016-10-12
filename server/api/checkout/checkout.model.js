'use strict';

import mongoose from 'mongoose';

var CheckoutSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Checkout', CheckoutSchema);
