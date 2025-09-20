const Stripe = require('stripe');
const { buildShippingOptions, supportedCountries } = require('../shipping/rates');

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2024-06-20' }) : null;

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!stripe) {
      return res.status(500).json({ error: 'Stripe not configured. Set STRIPE_SECRET_KEY.' });
    }

  const { quantity = 1, purchaseType = 'one-time', shippingCountry } = req.body || {};
    const isSub = purchaseType === 'subscription';
    const unitAmount = isSub ? 9900 : 10900; // cents

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = process.env.PUBLIC_URL || `${protocol}://${host}`;

    const defaultAllowed = supportedCountries();
    const envCountries = (process.env.SHIPPING_ALLOWED_COUNTRIES || '').trim();
    const envAllowed = envCountries ? envCountries.split(/[ ,\n\t]+/).filter(Boolean) : defaultAllowed;
    const selectedCountry = String(shippingCountry || '').toUpperCase();
    const allowedCountries = selectedCountry && defaultAllowed.includes(selectedCountry)
      ? [selectedCountry]
      : envAllowed;

  const sessionCurrency = 'usd';
  const qty = Math.max(1, Math.min(10, parseInt(quantity, 10) || 1));
  const subtotalCents = unitAmount * qty;
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
          quantity: qty,
        }
      ],
      allow_promotion_codes: true,
      shipping_address_collection: { allowed_countries: allowedCountries },
      shipping_options,
      success_url: `${baseUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel.html`
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe error', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
};
