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
- Prices are created inline via `price_data` (one-time $109.00 or subscription $99.00/mo). For production, create Prices in the Stripe Dashboard and use `price: 'price_...'` instead.
- Success and cancel URLs are set based on `PUBLIC_URL` or localhost. Update for your deployment domain.

## Shipping options
- The checkout now includes shipping options based on the selected country with carrier names and delivery estimates.
- Source of truth: `shipping/rates.js` (rates in EUR, <3kg). Countries without free-shipping thresholds use `null`.
- Currency:
	- Product prices are in USD; shipping fees are converted from EUR→USD using `EUR_TO_USD_RATE` (default: 1.1).
	- To avoid conversion, you can switch the session/product to EUR. Ask us to wire dual-currency if needed.

## Vercel deployment
- Serverless API: `api/create-checkout-session.js` is used in production. `server.js` is for local dev only.
- Rewrites: `vercel.json` maps `/create-checkout-session` → `/api/create-checkout-session` so the frontend fetch path stays the same.
- Required env vars (Vercel → Settings → Environment Variables):
	- `STRIPE_SECRET_KEY` — your Stripe secret key
	- `PUBLIC_URL` — e.g. `https://<your-project>.vercel.app`
	- Optional: `EUR_TO_USD_RATE` (e.g., `1.08`) and `SHIPPING_ALLOWED_COUNTRIES` (comma-separated ISO codes)

## Folder structure
- `server.js` — Express server and Stripe endpoint
- `public/` — Static assets (HTML, CSS, JS)

## License
MIT
