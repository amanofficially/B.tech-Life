/* ══════════════════════════════════════════
   B.Tech Journey · Enhanced script.js
══════════════════════════════════════════ */

/* ── 1. DISABLE RIGHT-CLICK & DEVTOOLS ── */
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12') { e.preventDefault(); return false; }
  if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) { e.preventDefault(); return false; }
  if (e.ctrlKey && ['u','U','s','S'].includes(e.key)) { e.preventDefault(); return false; }
});
(function devtoolsDetect() {
  const threshold = 160;
  setInterval(() => {
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      document.body.innerHTML = '<div style="display:flex;height:100vh;align-items:center;justify-content:center;font-family:sans-serif;font-size:1.4rem;color:#3d8de8;background:#fdfaf6">🔒 This page is protected.</div>';
    }
  }, 1000);
})();

/* ── 2. THEME TOGGLE ── */
const html     = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const saved    = localStorage.getItem('btjTheme');
if (saved) {
  html.setAttribute('data-theme', saved);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  html.setAttribute('data-theme', 'dark');
}
themeBtn?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('btjTheme', next);
});

/* ── 3. PROGRESS BAR ── */
const pgBar = document.getElementById('pg-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  if (pgBar) pgBar.style.width = pct + '%';
}, { passive: true });

/* ── 4. NAV ON SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('on', window.scrollY > 55);
}, { passive: true });

/* ── 5. CURSOR GLOW ── */
const glow = document.getElementById('cursorGlow');
if (glow && window.matchMedia('(hover:hover)').matches) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ── 6. TYPING EFFECT ── */
const lines = [
  'feeling nostalgic...',
  'missing the canteen...',
  'grateful for the squad...',
  'ready for the next chapter.',
  'always brothers. 🤝',
  'manifesting since Sem 3 🙏',
  'reliving 3 AM chai...',
  '9 backlogs → 0. legend.',
];
let li = 0, ci = 0, del = false;
const te = document.getElementById('h-type');
function type() {
  if (!te) return;
  const w = lines[li];
  if (!del && ci < w.length) {
    te.textContent += w[ci++];
    setTimeout(type, 68);
  } else if (!del) {
    del = true; setTimeout(type, 2400);
  } else if (del && ci > 0) {
    te.textContent = te.textContent.slice(0, -1);
    ci--; setTimeout(type, 34);
  } else {
    del = false; li = (li + 1) % lines.length;
    setTimeout(type, 440);
  }
}
type();

/* ── 7. COUNTER ANIMATION ── */
const cIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = parseInt(el.dataset.to, 10);
    let n = 0; const steps = 60, inc = target / steps;
    const t = setInterval(() => {
      n = Math.min(n + inc, target);
      el.textContent = Math.round(n);
      if (n >= target) { el.textContent = target; clearInterval(t); }
    }, 1400 / steps);
    cIO.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-to]').forEach(el => cIO.observe(el));

/* ── 8. SCROLL REVEAL ── */
const sIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); sIO.unobserve(e.target); }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.sr').forEach(el => sIO.observe(el));

/* ── 9. 3D TILT ON SQUAD CARDS ── */
if (window.matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.sqc').forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left  - r.width  / 2) / r.width;
      const y = (e.clientY - r.top   - r.height / 2) / r.height;
      card.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .55s ease, box-shadow .35s ease';
      card.style.transform  = '';
      setTimeout(() => { card.style.transition = ''; }, 580);
    });
  });
}

/* ── 10. TIMELINE FLIP TOUCH SUPPORT ── */
document.querySelectorAll('.tl-flip').forEach(card => {
  card.addEventListener('click', () => {
    if (!window.matchMedia('(hover:hover)').matches) {
      card.classList.toggle('flipped');
    }
  });
});

/* ── 11. COLLAGE PARALLAX ── */
window.addEventListener('scroll', () => {
  const s = window.scrollY * 0.016;
  const cards = document.querySelectorAll('.cc');
  const bases = ['rotate(-4.5deg)', 'rotate(4deg)', 'rotate(2.5deg)', 'rotate(-3.5deg)'];
  cards.forEach((c, i) => {
    const dir = i % 2 === 0 ? -1 : 1;
    c.style.transform = (bases[i] || '') + ` translateY(${s * dir}px)`;
  });
}, { passive: true });

/* ── 12. ANIMATED ENTRANCE FOR H1 LINES ── */
document.querySelectorAll('.hero-h1').forEach(h1 => {
  // Already handled via .au class
});

/* ── 13. STATS BAR HOVER RIPPLE ── */
document.querySelectorAll('.sv').forEach(sv => {
  sv.addEventListener('mouseenter', () => {
    sv.style.transform = 'translateY(-3px)';
    sv.style.transition = 'transform .25s ease';
  });
  sv.addEventListener('mouseleave', () => { sv.style.transform = ''; });
});

/* ── 14. QUOTE CARD STAGGER ON SCROLL ── */
const qIO = new IntersectionObserver(entries => {
  entries.forEach((e, idx) => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.classList.add('vis'); }, idx * 60);
      qIO.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.qc').forEach(el => qIO.observe(el));

/* ── 15. CONFETTI ── */
function celebrate() {
  if (typeof confetti === 'undefined') return;
  const end    = Date.now() + 5000;
  const colors = ['#5ba4f5','#f5d45b','#f5735b','#4ecbb8','#b89af5','#f59ac5','#85c1f5'];
  (function shoot() {
    if (Date.now() > end) return;
    confetti({ particleCount: 5, angle: 60,  spread: 72, origin: { x: 0 }, colors });
    confetti({ particleCount: 5, angle: 120, spread: 72, origin: { x: 1 }, colors });
    requestAnimationFrame(shoot);
  })();
}

/* ── 16. SMOOTH ACTIVE NAV LINK HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id], div[id]');
const navAs    = document.querySelectorAll('.nav-links a');
const navIO    = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.remove('nav-active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      active?.classList.add('nav-active');
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => navIO.observe(s));

/* ── 17. TIMELINE NODE ANIMATE ON SCROLL ── */
const tlIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const node = e.target.querySelector('.tl-node');
      if (node) {
        node.style.animation = 'nodeEntrance .6s cubic-bezier(.34,1.56,.64,1) forwards';
      }
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.tl-row').forEach(row => tlIO.observe(row));

/* Inject nodeEntrance keyframe */
const style = document.createElement('style');
style.textContent = `
  @keyframes nodeEntrance {
    from { transform: scale(0) rotate(-180deg); opacity: 0; }
    to   { transform: scale(1) rotate(0deg);    opacity: 1; }
  }
  .nav-links a.nav-active { color: var(--acc); }
  .nav-links a.nav-active::after { transform: scaleX(1); }
`;
document.head.appendChild(style);