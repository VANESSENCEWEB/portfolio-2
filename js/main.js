/* ═══════════════════════════════════════════════════════════
   PORTFOLIO VANESSA LIMA — main.js
   Reveal on scroll · hero code-rain · typewriter · parallax
   ═══════════════════════════════════════════════════════════ */

const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 1. REVEAL AO ROLAR ──────────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* ── 2. HERO LINE REVEAL (GSAP when available) ───────────── */
let heroIntroDone = false;

function runHeroIntro() {
  if (heroIntroDone) return;
  const lines = document.querySelectorAll('.hero-title .reveal-line');
  if (!lines.length) return;

  if (reduz) {
    lines.forEach((el) => {
      el.style.transform = 'none';
    });
    heroIntroDone = true;
    return;
  }

  if (!window.gsap) return;

  heroIntroDone = true;
  window.gsap.fromTo(
    lines,
    { y: '110%' },
    { y: '0%', duration: 1, ease: 'power4.out', stagger: 0.12 }
  );
  window.gsap.fromTo(
    '.hero-sub, .hero-ctas, .hero-typed-wrap',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power2.out' }
  );
  window.gsap.fromTo(
    '.hero-notebook',
    { opacity: 0, scale: 0.94 },
    { opacity: 1, scale: 1, duration: 1, delay: 0.25, ease: 'power3.out' }
  );
}

// GSAP is deferred — poll briefly, then fall back to visible lines
(function waitForGsap(attempts) {
  if (window.gsap || reduz) {
    runHeroIntro();
    return;
  }
  if (attempts <= 0) {
    document.querySelectorAll('.hero-title .reveal-line').forEach((el) => {
      el.style.transform = 'none';
    });
    return;
  }
  setTimeout(() => waitForGsap(attempts - 1), 50);
})(40);

/* ── 3. TYPEWRITER ───────────────────────────────────────── */
const typedEl = document.querySelector('.hero-typed');
if (typedEl) {
  const full = 'front-end dev';
  if (reduz) {
    typedEl.textContent = full;
  } else {
    let i = 0;
    const type = () => {
      typedEl.textContent = full.slice(0, i);
      i += 1;
      if (i <= full.length) setTimeout(type, 70);
    };
    setTimeout(type, 900);
  }
}

/* ── 4. CODE-RAIN CANVAS ─────────────────────────────────── */
const canvas = document.querySelector('.hero-canvas');
const hero = document.querySelector('.hero');

if (canvas && hero && !reduz) {
  const ctx = canvas.getContext('2d');
  const glyphs = '01{}[]()<>/=+-*;:_#$%&VLdev'.split('');
  let cols = 0;
  let drops = [];
  let w = 0;
  let h = 0;
  let raf = 0;
  let last = 0;
  let running = true;

  const size = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.max(1, Math.floor(w / 20));
    drops = new Array(cols).fill(0).map(() => Math.random() * -40);
  };

  const draw = (t) => {
    if (!running) return;
    raf = requestAnimationFrame(draw);
    if (t - last < 90) return;
    last = t;
    ctx.fillStyle = 'rgba(10,10,11,0.16)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = '14px "JetBrains Mono", monospace';
    for (let i = 0; i < cols; i += 1) {
      const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
      const y = drops[i] * 20;
      const neon = Math.random() > 0.5 ? '57,255,136' : '255,46,166';
      ctx.fillStyle = Math.random() > 0.92 ? `rgba(${neon},0.9)` : `rgba(${neon},0.18)`;
      ctx.fillText(ch, i * 20, y);
      if (y > h && Math.random() > 0.985) drops[i] = 0;
      else drops[i] += 1;
    }
  };

  size();
  // Seed a dark base so first frames aren't blank white
  ctx.fillStyle = '#0a0a0b';
  ctx.fillRect(0, 0, w, h);
  raf = requestAnimationFrame(draw);

  window.addEventListener('resize', size, { passive: true });

  // Pause when hero is off-screen
  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      running = entry.isIntersecting;
      if (running) {
        last = 0;
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    },
    { threshold: 0 }
  );
  heroObserver.observe(hero);
}

/* ── 5. (photo parallax removed — notebook lives in hero now) ─ */

/* ── 6. LANG TOGGLE (visual state only — content is pt-BR) ─ */
document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach((b) => b.classList.remove('lang-active'));
    btn.classList.add('lang-active');
  });
});

/* ── 7. SPLIT TITLES (agency-style word reveal) ───────────── */
function splitTitleWords(el) {
  if (el.dataset.split === '1') return;
  const text = el.textContent.trim();
  const words = text.split(/\s+/);
  el.setAttribute('aria-label', text);
  el.textContent = '';
  words.forEach((word) => {
    const wrap = document.createElement('span');
    wrap.className = 'split-word';
    wrap.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
  });
  el.dataset.split = '1';
}

function runSplitTitles() {
  const titles = document.querySelectorAll('.js-split');
  if (!titles.length) return;

  titles.forEach(splitTitleWords);

  if (reduz) {
    titles.forEach((el) => {
      el.querySelectorAll('.split-word > span').forEach((s) => {
        s.style.transform = 'none';
      });
    });
    return;
  }

  const animate = (el) => {
    const inners = el.querySelectorAll('.split-word > span');
    if (window.gsap) {
      window.gsap.fromTo(
        inners,
        { y: '110%' },
        {
          y: '0%',
          duration: 0.85,
          ease: 'power4.out',
          stagger: 0.045,
          overwrite: true,
        }
      );
      const heading = el.closest('.section-heading');
      if (heading) {
        const extras = heading.querySelectorAll('.section-eyebrow, .section-desc');
        window.gsap.fromTo(
          extras,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.15, ease: 'power2.out', overwrite: true }
        );
      }
    } else {
      inners.forEach((s) => {
        s.style.transform = 'none';
      });
    }
  };

  // Hide inners until animated (avoid flash of full text)
  if (window.gsap) {
    titles.forEach((el) => {
      window.gsap.set(el.querySelectorAll('.split-word > span'), { y: '110%' });
      const heading = el.closest('.section-heading');
      if (heading) {
        window.gsap.set(heading.querySelectorAll('.section-eyebrow, .section-desc'), { opacity: 0 });
      }
    });
  }

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    titles.forEach((el) => {
      window.ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => animate(el),
      });
    });
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    titles.forEach((el) => io.observe(el));
  }
}

(function waitSplit(attempts) {
  if (reduz || window.gsap || attempts <= 0) {
    runSplitTitles();
    return;
  }
  setTimeout(() => waitSplit(attempts - 1), 50);
})(40);

/* ── 8. NAV SCROLL SPY (numbered active underline) ───────── */
(function navSpy() {
  const links = [...document.querySelectorAll('.nav-links a[data-section]')];
  if (!links.length) return;

  const sections = links.map((link) => {
    const id = link.dataset.section;
    const el =
      id === 'topo'
        ? document.getElementById('demo') || document.querySelector('.hero') || document.getElementById('topo')
        : document.getElementById(id);
    return { id, el, link };
  }).filter((s) => s.el);

  function setActive(id) {
    links.forEach((link) => {
      if (link.dataset.section === id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  let ticking = false;
  function update() {
    const marker = window.scrollY + Math.min(160, window.innerHeight * 0.25);
    let current = sections[0]?.id || 'topo';
    for (const s of sections) {
      const top = s.el.getBoundingClientRect().top + window.scrollY;
      if (top <= marker) current = s.id;
    }
    setActive(current);
    ticking = false;
  }

  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
})();
