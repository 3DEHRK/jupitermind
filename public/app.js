// Smooth scrolling enhancements and Stripe Checkout integration
(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle (rebuilt header)
  const nav = document.querySelector('header.site-header');
  const navToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('siteNav');
  const setOpen = (open) => {
    if(!nav) return;
    nav.dataset.open = String(!!open);
    if(navToggle) navToggle.setAttribute('aria-expanded', String(!!open));
  };
  navToggle?.addEventListener('click', () => setOpen(nav?.dataset.open !== 'true'));
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') setOpen(false); });
  document.addEventListener('click', (e)=>{
    if(!nav || nav.dataset.open !== 'true') return;
    if(!(e.target instanceof Element)) return;
    if(!nav.contains(e.target)) setOpen(false);
  });

  // Smooth scroll for internal nav
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if(!target) return;
        // Adjust for sticky header on larger screens
        const rect = target.getBoundingClientRect();
        const offset = Math.max(0, window.scrollY + rect.top - 70);
        window.scrollTo({ top: offset, behavior: 'smooth' });
        setOpen(false);
      }
    });
  });

  // Stripe Checkout
  const buyBtn = document.getElementById('buyBtn');
  const qtyEl = document.getElementById('qty');
  const priceEl = document.getElementById('displayPrice');
  const priceAmountEl = document.getElementById('priceAmount');
  const priceCentsEl = document.getElementById('priceCents');
  const pricePerEl = document.getElementById('pricePer');
  const purchaseRadios = document.querySelectorAll('input[name="purchaseType"]');

  // Price display updater
  const updatePriceUI = () => {
    if(!priceEl) return;
    const sel = document.querySelector('input[name="purchaseType"]:checked');
    const type = sel ? sel.value : 'one-time';
    const cents = type === 'subscription' ? Number(priceEl.dataset.subscription || 9900) : Number(priceEl.dataset.oneTime || 10900);
    const dollars = Math.floor(cents / 100);
    const remainder = String(cents % 100).padStart(2, '0');
    priceAmountEl.textContent = String(dollars);
    priceCentsEl.textContent = `.${remainder}`;
    pricePerEl.textContent = type === 'subscription' ? '/mo' : '';
  };
  updatePriceUI();
  purchaseRadios.forEach(r => r.addEventListener('change', updatePriceUI));
  if (buyBtn){
    buyBtn.addEventListener('click', async () => {
      buyBtn.disabled = true;
      buyBtn.textContent = 'Redirecting…';
      try{
        const quantity = Math.max(1, Math.min(10, parseInt(qtyEl?.value || '1', 10) || 1));
        const sel = document.querySelector('input[name="purchaseType"]:checked');
        const purchaseType = sel ? sel.value : 'one-time';
        const res = await fetch('/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity, purchaseType })
        });
        if(!res.ok){
          const err = await res.json().catch(()=>({error:'Network error'}));
          throw new Error(err.error || 'Unable to start checkout');
        }
        const data = await res.json();
        if (data.url){
          window.location.href = data.url;
        } else if (data.id) {
          // Fallback in case of partial session data
          window.location.href = `/success.html?session_id=${encodeURIComponent(data.id)}`;
        } else {
          throw new Error('Unexpected response from server');
        }
      }catch(err){
        alert((err && err.message) || 'Checkout failed');
      }finally{
        buyBtn.disabled = false;
        buyBtn.textContent = 'Buy with Stripe';
      }
    });
  }
})();
