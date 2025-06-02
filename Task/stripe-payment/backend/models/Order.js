
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  stripeSessionId: { type: String, required: true },
  payment_status: { type: String, required: true },
  amount_total: { type: Number, required: true },
  items: [
    {
      name: String,
      quantity: Number,
      amount_subtotal: Number,
      amount_total: Number,
      currency: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

