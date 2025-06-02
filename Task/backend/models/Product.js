const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  currencyType: { type: String, default: 'usd' },
  productPrice: { type: Number, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
