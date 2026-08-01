/* ═══════════════════════════════════════════════════════════
   NOTEBOOK 3D — Three.js + GSAP ScrollTrigger
   Closed iridescent laptop → opens on scroll → types on screen
   ═══════════════════════════════════════════════════════════ */

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const section = document.getElementById('demo');
const canvas = document.getElementById('notebook-canvas');
const hint = document.getElementById('pinHint');
const glowEl = document.querySelector('.notebook-glow');

if (!section || !canvas) {
  // nothing to mount
} else {
  initNotebook();
}

function initNotebook() {
  const W = 3.2;
  const D = 2.1;
  const T = 0.06;

  // —— Screen canvas (browser chrome + typing) ——
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 1024;
  screenCanvas.height = 640;
  const sctx = screenCanvas.getContext('2d');
  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.colorSpace = THREE.SRGBColorSpace;
  let typed = '';
  const TYPE_TEXT = 'do zero à produção';
  let blink = true;

  function paintScreen(progress) {
    const w = screenCanvas.width;
    const h = screenCanvas.height;
    sctx.fillStyle = '#f7f7f9';
    sctx.fillRect(0, 0, w, h);

    // Browser chrome
    sctx.fillStyle = '#ececf1';
    sctx.fillRect(0, 0, w, 72);
    const dots = ['#ff5f57', '#febc2e', '#28c840'];
    dots.forEach((c, i) => {
      sctx.beginPath();
      sctx.fillStyle = c;
      sctx.arc(36 + i * 28, 36, 9, 0, Math.PI * 2);
      sctx.fill();
    });
    // Address bar
    roundRect(sctx, 140, 20, w - 200, 32, 16);
    sctx.fillStyle = '#fff';
    sctx.fill();
    sctx.fillStyle = '#8a8a96';
    sctx.font = '500 18px Inter, system-ui, sans-serif';
    sctx.fillText('portfolio', 160, 42);

    // Typed line — motto (not the brand name)
    const chars = Math.floor(TYPE_TEXT.length * progress);
    typed = TYPE_TEXT.slice(0, chars);
    sctx.fillStyle = '#0a0a0b';
    sctx.font = '700 68px "Space Grotesk", Inter, sans-serif';
    sctx.textAlign = 'center';
    sctx.textBaseline = 'middle';
    const showCursor = blink && progress > 0;
    const label = typed + (showCursor ? '|' : '');
    sctx.fillText(label || (progress <= 0 ? '' : '|'), w / 2, h * 0.55);

    // Supporting line fades in late
    if (progress > 0.85) {
      sctx.globalAlpha = Math.min(1, (progress - 0.85) / 0.15);
      sctx.fillStyle = '#6e6e76';
      sctx.font = '500 26px Inter, system-ui, sans-serif';
      sctx.fillText('projetos reais · Recife', w / 2, h * 0.7);
      sctx.globalAlpha = 1;
    }

    sctx.textAlign = 'left';
    screenTexture.needsUpdate = true;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // —— Iridescent body texture (pink → violet → cyan) ——
  function makeIridTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 512, 280);
    g.addColorStop(0, '#ff2ea6');
    g.addColorStop(0.35, '#c45dff');
    g.addColorStop(0.65, '#7b8cff');
    g.addColorStop(1, '#5ce1ff');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);
    // soft specular streak
    const g2 = ctx.createLinearGradient(0, 0, 512, 512);
    g2.addColorStop(0.2, 'rgba(255,255,255,0)');
    g2.addColorStop(0.45, 'rgba(255,255,255,0.35)');
    g2.addColorStop(0.7, 'rgba(255,255,255,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, 512, 512);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  const iridMap = makeIridTexture();
  const bodyMat = new THREE.MeshPhysicalMaterial({
    map: iridMap,
    metalness: 0.85,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    reflectivity: 1,
    emissive: new THREE.Color('#ff2ea6'),
    emissiveIntensity: 0.08,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: '#1a1a1e',
    metalness: 0.4,
    roughness: 0.55,
  });
  const keyMat = new THREE.MeshStandardMaterial({
    color: '#d8b4ff',
    metalness: 0.3,
    roughness: 0.45,
  });
  const screenMat = new THREE.MeshBasicMaterial({
    map: screenTexture,
  });
  const screenOff = new THREE.MeshStandardMaterial({
    color: '#0a0a0b',
    roughness: 0.35,
    metalness: 0.2,
    emissive: new THREE.Color('#ff2ea6'),
    emissiveIntensity: 0.15,
  });

  // —— Scene ——
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  // Pulled back + slightly higher so open lid tips stay inside the frame
  camera.position.set(1.55, 3.05, 7.35);
  camera.lookAt(0, 0.45, 0);

  // Lights — neon pink/cyan
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(3, 5, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x5ce1ff, 0.55);
  fill.position.set(-4, 2, 1);
  scene.add(fill);
  const rim = new THREE.PointLight(0xff2ea6, 2.2, 12);
  rim.position.set(0, 0.4, -1.2);
  scene.add(rim);
  const hingeGlow = new THREE.PointLight(0xff2ea6, 0.2, 4);
  hingeGlow.position.set(0, 0.15, -D / 2 + 0.05);
  scene.add(hingeGlow);

  // Soft ground shadow disc
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.4, 64),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.07 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  scene.add(ground);

  // —— Laptop group ——
  const laptop = new THREE.Group();
  scene.add(laptop);

  // Base
  const base = new THREE.Mesh(new RoundedBoxGeometry(W, T, D, 4, 0.06), bodyMat);
  base.position.y = T / 2;
  laptop.add(base);

  // Deck (slightly inset top)
  const deck = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.96, 0.02, D * 0.92, 2, 0.03),
    darkMat
  );
  deck.position.y = T + 0.01;
  laptop.add(deck);

  // Keyboard block
  const kb = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.78, 0.025, D * 0.42, 2, 0.02),
    keyMat
  );
  kb.position.set(0, T + 0.025, -0.15);
  laptop.add(kb);

  // Trackpad
  const pad = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.32, 0.012, D * 0.22, 2, 0.02),
    new THREE.MeshStandardMaterial({ color: '#c9c9d4', metalness: 0.5, roughness: 0.3 })
  );
  pad.position.set(0, T + 0.02, 0.55);
  laptop.add(pad);

  // Lid pivot at hinge (back of base)
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, T, -D / 2 + 0.02);
  laptop.add(lidPivot);

  const lidMat = bodyMat.clone();
  const lid = new THREE.Mesh(new RoundedBoxGeometry(W, T * 0.9, D, 4, 0.06), lidMat);
  // lid mesh centered so bottom edge sits on hinge: move forward by D/2
  lid.position.set(0, 0, D / 2);
  lidPivot.add(lid);

  // Inner bezel + screen
  const bezel = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.94, 0.012, D * 0.9, 2, 0.02),
    darkMat
  );
  bezel.position.set(0, -T * 0.55, D / 2);
  lidPivot.add(bezel);

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 0.88, D * 0.82),
    screenOff
  );
  // face down toward keyboard when open; when closed faces base
  screen.rotation.x = Math.PI / 2;
  screen.position.set(0, -T * 0.7, D / 2);
  lidPivot.add(screen);

  // Tiny camera notch accent
  const notch = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.01, 0.06),
    darkMat
  );
  notch.position.set(0, -T * 0.65, 0.12);
  lidPivot.add(notch);

  // Start closed (lid flat). Open = rotate toward -X so screen faces camera-ish
  const CLOSED = 0.02;
  const OPEN = -Math.PI * 0.58; // ~104°
  lidPivot.rotation.x = reduz ? OPEN : CLOSED;

  // Presentational framing — smaller so corners never clip
  laptop.rotation.y = -0.38;
  laptop.rotation.x = 0.18;
  laptop.position.set(0.05, -0.28, 0);
  laptop.scale.setScalar(0.82);

  // State driven by scroll
  const state = { open: reduz ? 1 : 0, type: reduz ? 1 : 0, neon: 0.2 };

  function applyState() {
    lidPivot.rotation.x = CLOSED + (OPEN - CLOSED) * state.open;
    hingeGlow.intensity = 0.15 + state.open * 3.2;
    rim.intensity = 1.2 + state.open * 2.4;
    bodyMat.emissiveIntensity = 0.06 + state.open * 0.18;
    lidMat.emissiveIntensity = bodyMat.emissiveIntensity;
    // Swap screen material when mostly open
    if (state.open > 0.35) {
      if (screen.material !== screenMat) screen.material = screenMat;
      paintScreen(state.type);
    } else {
      if (screen.material !== screenOff) screen.material = screenOff;
      paintScreen(0);
    }
    if (glowEl) {
      const a = 0.25 + state.open * 0.55 + state.neon * 0.2;
      glowEl.style.opacity = String(a);
    }
    if (hint) hint.classList.toggle('some', state.open > 0.12);
  }

  paintScreen(reduz ? 1 : 0);
  applyState();

  // —— Resize ——
  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // —— Scroll progress (GSAP ScrollTrigger if available, else manual) ——
  function onProgress(p) {
    // 0→0.55 open, 0.4→1 type
    state.open = Math.min(1, Math.max(0, p / 0.55));
    state.type = Math.min(1, Math.max(0, (p - 0.4) / 0.55));
    state.neon = state.open;
    applyState();
  }

  function bindScroll() {
    if (reduz) {
      onProgress(1);
      return;
    }

    const compact = matchMedia('(max-width: 900px)').matches;

    // Mobile / short screens: play open when hero is in view (no tall pin)
    if (compact) {
      const play = () => {
        if (!window.gsap) {
          onProgress(1);
          return;
        }
        const proxy = { p: 0 };
        window.gsap.to(proxy, {
          p: 1,
          duration: 2.4,
          ease: 'power2.inOut',
          onUpdate: () => onProgress(proxy.p),
        });
      };
      const once = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            play();
            once.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      once.observe(section);
      return;
    }

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.55,
        onUpdate: (self) => onProgress(self.progress),
      });
    } else {
      let ticking = false;
      const update = () => {
        const r = section.getBoundingClientRect();
        const span = Math.max(r.height - innerHeight, 1);
        const p = Math.min(1, Math.max(0, -r.top / span));
        onProgress(p);
        ticking = false;
      };
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
    }
  }
  bindScroll();

  // Cursor blink
  setInterval(() => {
    blink = !blink;
    if (state.open > 0.35) paintScreen(state.type);
  }, 530);

  // —— Render loop (pause offscreen) ——
  let visible = true;
  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(frame);
    },
    { threshold: 0 }
  );
  io.observe(section);

  let raf = 0;
  let t0 = performance.now();
  function frame(now) {
    if (!visible) return;
    raf = requestAnimationFrame(frame);
    const t = (now - t0) / 1000;
    // gentle float + neon pulse
    laptop.position.y = -0.28 + Math.sin(t * 0.7) * 0.02;
    rim.intensity = 1.2 + state.open * 2.4 + Math.sin(t * 2.2) * 0.25;
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);
}
