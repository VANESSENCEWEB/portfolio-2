/* ═══════════════════════════════════════════════════════════
   PORTFOLIO VANESSA LIMA — main.js
   Só UMA responsabilidade: revelar elementos quando entram
   na tela. Site leve = carrega rápido = recrutador feliz.
   ═══════════════════════════════════════════════════════════ */

/* IntersectionObserver = "vigia" que avisa quando um elemento
   aparece na área visível. Você já viu essa técnica no site
   antigo (seção de certificados) — aqui está a versão enxuta. */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
        observer.unobserve(entry.target); // já revelou, para de vigiar
      }
    });
  },
  { threshold: 0.15 } // dispara quando 15% do elemento aparece
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));


/* ── NOTEBOOK: tampa + terminal guiados pelo scroll ─────────
   Progresso p = quanto da seção .pin já foi rolado (0 a 1).
   0 a 0.5  → tampa abre (rotateX -78° → 0°)
   0.45 a 1 → terminal digita proporcional ao scroll (reversível) */

const LINHAS = [
  { cmd: 'whoami',        out: 'Vanessa Lima — front-end developer' },
  { cmd: 'cat stack.txt', out: 'HTML · CSS · JavaScript · Python · SQL' },
  { cmd: 'echo $BASE',    out: 'Recife, BR ⟶ London, UK' },
  { cmd: 'status',        out: 'disponível para novos projetos ✦' },
];

const pin  = document.getElementById('demo');
const lid  = document.getElementById('lid');
const term = document.getElementById('term');
const hint = document.getElementById('pinHint');
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Texto inteiro achatado em caracteres, guardando se é comando */
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
  renderTerm(Math.round(chars.length * tp));

  hint.classList.toggle('some', p > .1);
  aguardando = false;
}
addEventListener('scroll', () => {
  if (!aguardando) { requestAnimationFrame(atualizaPin); aguardando = true; }
}, { passive: true });
atualizaPin();