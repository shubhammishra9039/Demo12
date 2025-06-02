const express = require('express');
const router = express.Router();
const stripe = require('../stripe');
const Order = require('../models/Order');
const bodyParser = require('body-parser');

// Use raw body for Stripe webhook signature verification
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK
    );
  } catch (err) {
    console.error(' Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout session
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const items = lineItems.data.map(item => ({
        name: item.description,
        quantity: item.quantity,
        amount_subtotal: item.amount_subtotal,
        amount_total: item.amount_total,
        currency: item.currency,
      }));

        await Order.create({
        email: session.customer_email,
        stripeSessionId: session.id,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        items: items,
      });
      console.log('Order stored in MongoDB');
    } catch (err) {
      console.error('Error saving order to DB:', err.message);
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;
