const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true }, 
  currency: { type: String, default: 'usd' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
