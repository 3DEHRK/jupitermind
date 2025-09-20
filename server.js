require('dotenv').config();
const express = require('express');
const path = require('path');
const Stripe = require('stripe');
const { buildShippingOptions, supportedCountries } = require('./shipping/rates');

const app = express();
const port = process.env.PORT || 3000;
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' }) : null;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health
app.get('/health', (_req, res) => res.json({ ok: true }));

// Create Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe not configured. Set STRIPE_SECRET_KEY.' });
    }

  const { quantity = 1, purchaseType = 'one-time', shippingCountry } = req.body || {};

    const isSub = purchaseType === 'subscription';
    const unitAmount = isSub ? 9900 : 10900; // cents

    // Broad worldwide shipping coverage (adjust via SHIPPING_ALLOWED_COUNTRIES env as comma-separated list if needed)
    const defaultAllowed = supportedCountries();
    const envCountries = (process.env.SHIPPING_ALLOWED_COUNTRIES || '').trim();
    const envAllowed = envCountries ? envCountries.split(/[,\s]+/).filter(Boolean) : defaultAllowed;
    const selectedCountry = String(shippingCountry || '').toUpperCase();
    const allowedCountries = selectedCountry && supportedCountries().includes(selectedCountry)
      ? [selectedCountry]
      : envAllowed;

  const sessionCurrency = 'usd';
  const subtotalCents = unitAmount * Math.max(1, Math.min(10, parseInt(quantity, 10) || 1));
  const shipping_options = shippingCountry ? buildShippingOptions(String(shippingCountry).toUpperCase(), sessionCurrency, subtotalCents) : [];
    const session = await stripe.checkout.sessions.create({
      mode: isSub ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: sessionCurrency,
            product_data: {
              name: 'JupiterMind Nootropic',
              description: isSub ? 'Monthly subscription' : 'One-time purchase',
              images: ['https://images.unsplash.com/photo-1580425143233-74f2b9a2426c?q=80&w=1200&auto=format&fit=crop']
            },
            unit_amount: unitAmount,
            recurring: isSub ? { interval: 'month' } : undefined
          },
          quantity
        }
      ],
      allow_promotion_codes: true,
      shipping_address_collection: { allowed_countries: allowedCountries },
      shipping_options,
      success_url: `${process.env.PUBLIC_URL || 'http://localhost:' + port}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_URL || 'http://localhost:' + port}/cancel.html`
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe error', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`JupiterMind running: http://localhost:${port}`);
});
