/* ═══════════════════════════════════════════════════════════
   PORTFOLIO VANESSA LIMA — main.js
   Duas responsabilidades:
   1. Revelar elementos ao rolar (IntersectionObserver)
   2. Notebook 3D com terminal (quando a seção existir)
   ═══════════════════════════════════════════════════════════ */

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
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* ── 2. NOTEBOOK 3D + TERMINAL ───────────────────────────── */
const LINHAS = [
  { cmd: 'whoami',        out: 'Vanessa Lima — front-end developer' },
  { cmd: 'cat stack.txt', out: 'HTML · CSS · JavaScript · Python · SQL' },
  { cmd: 'echo $BASE',    out: 'Recife, BR ⟶ London, UK' },
  { cmd: 'status',        out: 'disponível para novos projetos ✦' },
];

const pin = document.getElementById('demo');
if (pin) {
  const lid  = document.getElementById('lid');
  const term = document.getElementById('term');
  const hint = document.getElementById('pinHint');
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const chars = [];
  LINHAS.forEach(l => {
    [...('$ ' + l.cmd + '\n')].forEach(ch => chars.push({ ch, cmd: true }));
    [...(l.out + '\n')].forEach(ch => chars.push({ ch, cmd: false }));
  });

  function renderTerm(qtd) {
    let html = '', aberto = null;
    for (let i = 0; i < qtd; i++) {
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
    if (!reduz) lid.style.transform = `rotateX(${-78 + 78 * Math.min(1, p / .5)}deg)`;
    const tp = reduz ? 1 : Math.min(1, Math.max(0, (p - .45) / .5));
    renderTerm(Math.round(chars.le
