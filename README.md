# JupiterMind — Premium Nootropic Landing

Modern single-page landing page with a cinematic Jupiter hero, benefits, pricing with Stripe Checkout, FAQ, and Impressum.

## Features
- Fast static frontend (HTML/CSS/JS) served by Express
- Stripe Checkout backend endpoint
- Smooth scrolling, responsive layout
- Success and cancel pages

## Setup
1. Copy `.env.example` to `.env` and set your Stripe secret key:
```
STRIPE_SECRET_KEY=sk_test_...
PUBLIC_URL=http://localhost:3000
PORT=3000
```
2. Install dependencies and start the server.

## Development
- Start server (Windows PowerShell):
```
npm install
npm run dev
```
- Open http://localhost:3000

## Stripe notes
- The price is created inline via `price_data` ($49.99). For production, create a Price in the Stripe Dashboard and use `price: 'price_...'` instead.
- Success and cancel URLs are set based on `PUBLIC_URL` or localhost. Update for your deployment domain.

## Folder structure
- `server.js` — Express server and Stripe endpoint
- `public/` — Static assets (HTML, CSS, JS)

## License
MIT
