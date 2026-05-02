/* ============================================================
   Countdown Timer — presentation: June 2, 2026 at 15:00 Ankara time
   ============================================================ */
function updateCountdown() {
  const target = new Date('2026-06-02T15:00:00+03:00');
  const now    = new Date();
  const diff   = target - now;
  const el     = document.getElementById('countdown-timer');
  if (!el) return;

  if (diff <= 0) {
    el.textContent = '🎉 Sunum başladı!';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  el.textContent = `${days}g ${String(hours).padStart(2,'0')}s ${String(mins).padStart(2,'0')}d ${String(secs).padStart(2,'0')}sn`;
}
updateCountdown();
setInterval(updateCountdown, 1000);


/* ============================================================
   Metric Counter Animation
   Handles both small integers and large numbers (e.g. 807600).
   ============================================================ */
function formatValue(value, suffix) {
  if (value >= 1000) return value.toLocaleString('tr-TR') + suffix;
  return value + suffix;
}

function animateCounters() {
  const values = document.querySelectorAll('.metric-value');
  values.forEach(el => {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.round(eased * target);
      el.textContent = formatValue(current, suffix);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

const heroObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounters(); obs.disconnect(); }
    });
  },
  { threshold: 0.3 }
);
const heroSection = document.querySelector('#hero');
if (heroSection) heroObserver.observe(heroSection);


/* ============================================================
   Scroll-Reveal for Timeline Stages
   ============================================================ */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================================
   Smooth scroll for hero CTA
   ============================================================ */
document.querySelector('.hero-cta')?.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' });
});
