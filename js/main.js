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
    '.hero-photo',
    { opacity: 0, scale: 0.92 },
    { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
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

/* ── 5. HERO PHOTO PARALLAX ──────────────────────────────── */
const photo = document.querySelector('.hero-photo');
if (hero && photo && !reduz && !matchMedia('(pointer: coarse)').matches) {
  hero.addEventListener(
    'mousemove',
    (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      photo.style.transform =
        `perspective(800px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translate(${px * 14}px, ${py * 14}px)`;
    },
    { passive: true }
  );
  hero.addEventListener('mouseleave', () => {
    photo.style.transform = '';
  });
}

/* ── 6. LANG TOGGLE (visual state only — content is pt-BR) ─ */
document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach((b) => b.classList.remove('lang-active'));
    btn.classList.add('lang-active');
  });
});

/* ── 7. NOTEBOOK 3D + TERMINAL (abre com o scroll) ───────── */
const LINHAS = [
  { cmd: 'whoami', out: 'Vanessa Lima — front-end developer' },
  { cmd: 'cat stack.txt', out: 'HTML · CSS · JavaScript · Python · SQL' },
  { cmd: 'echo $BASE', out: 'Recife, BR ⟶ London, UK' },
  { cmd: 'status', out: 'disponível para estágio ✦' },
];

const pin = document.getElementById('demo');
if (pin) {
  const lid = document.getElementById('lid');
  const term = document.getElementById('term');
  const hint = document.getElementById('pinHint');

  const chars = [];
  LINHAS.forEach((l) => {
    [...('$ ' + l.cmd + '\n')].forEach((ch) => chars.push({ ch, cmd: true }));
    [...(l.out + '\n')].forEach((ch) => chars.push({ ch, cmd: false }));
  });

  function renderTerm(qtd) {
    let html = '';
    let aberto = null;
    for (let i = 0; i < qtd; i += 1) {
      const c = chars[i];
      if (c.cmd !== aberto) {
        if (aberto !== null) html += '</span>';
        html += c.cmd ? '<span class="cmd">' : '<span>';
        aberto = c.cmd;
      }
      html += c.ch;
    }
    if (aberto !== null) html += '</span>';
    term.innerHTML = html + '<span class="cursor"></span>';
  }

  let aguardando = false;
  function atualizaPin() {
    const r = pin.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    if (!reduz) {
      lid.style.transform = `rotateX(${-78 + 78 * Math.min(1, p / 0.5)}deg)`;
    }
    const tp = reduz ? 1 : Math.min(1, Math.max(0, (p - 0.45) / 0.5));
    renderTerm(Math.round(chars.length * tp));
    hint.classList.toggle('some', p > 0.1);
    aguardando = false;
  }

  addEventListener(
    'scroll',
    () => {
      if (!aguardando) {
        requestAnimationFrame(atualizaPin);
        aguardando = true;
      }
    },
    { passive: true }
  );
  atualizaPin();
}
