'use strict';

import mongoose from 'mongoose';

var StickSchema = new mongoose.Schema({
  id: String,
  disabled: Boolean,
  name: String,
  category: String,
  weight: Number,
  series: String,
  price: Number,
  description: String,
  tagline: String,
  features: {
    kickpoint: String,
    blade: String,
    shaft: String
  },
  images: {
    root_path: String,
    profile: String,
    personalize: String,
    svg: String
  },
  colors: {
    shaft: [{name: String, hex: String}],
    accent: [{name: String, hex: String}],
    logo: [{name: String, hex: String}]
  }
});

export default mongoose.model('Stick', StickSchema);
