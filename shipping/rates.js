// Shipping rates mapping (<3kg) in EUR and delivery estimates
// Each entry maps an ISO country code to an array of options
// { name, amountEUR, minDays, maxDays, freeFromEUR? }

/** @typedef {{ name: string; amountEUR: number; minDays: number; maxDays: number; freeFromEUR?: number|null }} ShippingOption */

/** @type {Record<string, ShippingOption[]>} */
const SHIPPING_RATES_EUR = {
  DE: [
    { name: 'Germany (Hermes)', amountEUR: 2.90, minDays: 1, maxDays: 3, freeFromEUR: 79.00 },
    { name: 'Germany (DHL)', amountEUR: 4.90, minDays: 1, maxDays: 3, freeFromEUR: null }
  ],
  AT: [ { name: 'Austria (Austrian Post)', amountEUR: 2.90, minDays: 2, maxDays: 4, freeFromEUR: 99.00 } ],
  PL: [ { name: 'Poland (InPost)', amountEUR: 1.90, minDays: 1, maxDays: 3, freeFromEUR: 99.00 } ],
  FR: [ { name: 'Metropolitan France (Mondial Relay/Colissimo)', amountEUR: 3.90, minDays: 3, maxDays: 5, freeFromEUR: 79.00 } ],
  NL: [ { name: 'Netherlands (PostNL)', amountEUR: 3.90, minDays: 2, maxDays: 4, freeFromEUR: 79.00 } ],
  BE: [ { name: 'Belgium (PostNL)', amountEUR: 3.90, minDays: 2, maxDays: 4, freeFromEUR: 99.00 } ],
  CH: [ { name: 'Switzerland (Post.ch)', amountEUR: 5.90, minDays: 3, maxDays: 5, freeFromEUR: 99.00 } ],
  ES: [ { name: 'Spain (DHL)', amountEUR: 3.90, minDays: 3, maxDays: 5, freeFromEUR: null } ],
  IT: [ { name: 'Italy (Poste Italiane)', amountEUR: 4.90, minDays: 3, maxDays: 4, freeFromEUR: 99.00 } ],
  IE: [ { name: 'Ireland (DHL)', amountEUR: 4.90, minDays: 4, maxDays: 5, freeFromEUR: 99.00 } ],
  GB: [ { name: 'Great Britain (Evri)', amountEUR: 7.90, minDays: 4, maxDays: 5, freeFromEUR: 99.00 } ],
  SE: [ { name: 'Sweden (PostNord Agent)', amountEUR: 6.90, minDays: 3, maxDays: 5, freeFromEUR: 99.00 } ],
  FI: [ { name: 'Finland (PostNord Agent)', amountEUR: 6.90, minDays: 3, maxDays: 5, freeFromEUR: 99.00 } ],
  DK: [ { name: 'Denmark (PostNord Agent)', amountEUR: 6.90, minDays: 3, maxDays: 5, freeFromEUR: 99.00 } ],
  CZ: [ { name: 'Czechia (DHL)', amountEUR: 2.90, minDays: 3, maxDays: 5, freeFromEUR: 59.00 } ],
  AD: [ { name: 'Andorra', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  BG: [ { name: 'Bulgaria', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  HR: [ { name: 'Croatia', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  EE: [ { name: 'Estonia', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  GR: [ { name: 'Greece', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  HU: [ { name: 'Hungary', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  LV: [ { name: 'Latvia', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  LI: [ { name: 'Liechtenstein', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  LT: [ { name: 'Lithuania', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  LU: [ { name: 'Luxembourg', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  MT: [ { name: 'Malta', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  MC: [ { name: 'Monaco', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  PT: [ { name: 'Portugal', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  RO: [ { name: 'Romania', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  SK: [ { name: 'Slovakia', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  SI: [ { name: 'Slovenia', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  VA: [ { name: 'Vatican City', amountEUR: 12.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  AL: [ { name: 'Albania', amountEUR: 15.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  CY: [ { name: 'Cyprus', amountEUR: 15.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  IS: [ { name: 'Iceland', amountEUR: 15.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  MD: [ { name: 'Moldova', amountEUR: 15.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  ME: [ { name: 'Montenegro', amountEUR: 15.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  NO: [ { name: 'Norway', amountEUR: 15.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  RS: [ { name: 'Serbia', amountEUR: 15.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  UA: [ { name: 'Ukraine', amountEUR: 15.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  DZ: [ { name: 'Algeria', amountEUR: 29.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  MA: [ { name: 'Morocco', amountEUR: 29.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  TR: [ { name: 'Turkey', amountEUR: 29.90, minDays: 5, maxDays: 20, freeFromEUR: null } ],
  CA: [ { name: 'Canada', amountEUR: 44.00, minDays: 5, maxDays: 20, freeFromEUR: null } ]
};

/** Return list of supported ISO country codes */
function supportedCountries() {
  return Object.keys(SHIPPING_RATES_EUR);
}

/**
 * Build Stripe shipping_options[] for a country in the session currency.
 * If sessionCurrency === 'eur', uses EUR amounts; otherwise converts using EUR_TO_USD_RATE env (default 1.1).
 * Free-shipping thresholds only apply when ENABLE_FREE_SHIPPING === 'true'.
 * @param {string} country ISO alpha-2 country code
 * @param {string} sessionCurrency 'usd' | 'eur' | other
 * @param {number} subtotalCents line items subtotal in session currency cents
 */
function buildShippingOptions(country, sessionCurrency, subtotalCents) {
  const opts = SHIPPING_RATES_EUR[country];
  if (!opts) return [];
  const isEUR = sessionCurrency.toLowerCase() === 'eur';
  const rate = isEUR ? 1 : Number(process.env.EUR_TO_USD_RATE || 1.1);
  const currency = isEUR ? 'eur' : 'usd';
  const enableFree = String(process.env.ENABLE_FREE_SHIPPING || 'false').toLowerCase() === 'true';
  // Flat surcharge in USD (default $5), converted to session currency
  const usdSurcharge = Number(process.env.SHIPPING_SURCHARGE_USD || 4);
  const surchargeCents = Math.max(0, Math.round(usdSurcharge * 100 * (isEUR ? (1 / rate) : 1)));
  return opts.map(o => ({
    shipping_rate_data: {
      type: 'fixed_amount',
      display_name: o.name + (enableFree && o.freeFromEUR && qualifiesForFree(o.freeFromEUR, isEUR, rate, subtotalCents) ? ' — Free' : ''),
      fixed_amount: (enableFree && qualifiesForFree(o.freeFromEUR, isEUR, rate, subtotalCents))
        ? { amount: 0, currency }
        : {
            amount: Math.round(o.amountEUR * rate * 100) + surchargeCents,
            currency
          },
      delivery_estimate: {
        minimum: { unit: 'business_day', value: o.minDays },
        maximum: { unit: 'business_day', value: o.maxDays }
      }
    }
  }));
}

function qualifiesForFree(freeFromEUR, isEUR, rate, subtotalCents) {
  if (freeFromEUR == null) return false;
  const thresholdCents = Math.round((isEUR ? freeFromEUR : freeFromEUR * rate) * 100);
  return subtotalCents >= thresholdCents;
}

module.exports = { SHIPPING_RATES_EUR, supportedCountries, buildShippingOptions };
