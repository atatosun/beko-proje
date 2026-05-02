/* ============================================================
   Metric Counter Animation
   Runs once when the hero section enters the viewport.
   ============================================================ */
function animateCounters() {
  const values = document.querySelectorAll('.metric-value');

  values.forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800; // ms
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

// Trigger counters once hero is visible
const heroObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        obs.disconnect(); // run once only
      }
    });
  },
  { threshold: 0.3 }
);
const heroSection = document.querySelector('#hero');
if (heroSection) heroObserver.observe(heroSection);


/* ============================================================
   Scroll-Reveal for Timeline Stages
   Adds .visible class when a .reveal element enters viewport.
   ============================================================ */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================================
   Smooth scroll for hero CTA arrow
   ============================================================ */
document.querySelector('.hero-cta')?.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' });
});
