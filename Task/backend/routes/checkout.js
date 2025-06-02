// routes/checkout.js
const express = require('express');
const router = express.Router();
const stripe = require('../stripe');
const Order = require('../models/Order');

// Create Stripe Checkout Session
router.post('/create-session', async (req, res) => {
  const { items, email } = req.body;

  if (!email || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing email or items' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description || '',
          },
          unit_amount: item.price, 
        },
        quantity: item.quantity || 1,
      })),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url }); 
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});


module.exports = router;
