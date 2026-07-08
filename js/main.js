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
