const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true
    },
    prix: {
      type: Number, 
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sport: {
      type: String,
      required: true
    }
  });
  
  module.exports = mongoose.model('Product', productSchema);
  