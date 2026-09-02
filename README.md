<div align="center">


# 💻 Portfólio — Vanessa Lima

**Front-end em formação. Projetos reais em produção. Disponível para estágio.**

Hero com foto pop-out · Design system próprio · Spotlight cursor · Cases no ar · Recife · UNICAP

<br />

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://vanessenceweb.github.io/portfolio-2/)
[![Open to Work](https://img.shields.io/badge/Estágio-Front--end_·_Recife-ff2ea6?style=for-the-badge)](mailto:vanessalimaunicap@gmail.com?subject=Estágio%20front-end%20—%20Vanessa%20Lima)
[![UNICAP](https://img.shields.io/badge/UNICAP-3º_período-0a0a0b?style=for-the-badge)](https://www.unicap.br/)

<br />

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat&logo=githubpages&logoColor=white)

<br />

**[🌐 Ver ao vivo](https://vanessenceweb.github.io/portfolio-2/)** ·
**[📸 Screenshots](#-screenshots)** ·
**[🛠️ Stack](#️-stack-técnica)** ·
**[💡 Decisões](#-decisões-técnicas)** ·
**[✨ Features](#-features-destacadas)**

</div>

---

## 📖 Sobre o projeto

O **portfólio da Vanessa Lima** é uma página única em **HTML, CSS e JavaScript puros** — construído com **mentalidade de produto real**: design system próprio (tokens, acento configurável, tipografia), motion com GSAP, deploy estático no GitHub Pages e acessibilidade (`prefers-reduced-motion`, `aria-current`, labels).

Não é um template. Cada bloco existe para uma conversa de estágio: quem sou, o que já entreguei em produção e como falar comigo.

Em uma única página, o visitante pode:

- 👋 **Ver o hero** com foto pop-out, anel neon, texto em órbita e code-rain
- 🗂️ **Navegar os cases** — Recife Flats em produção, NASA Explorer, API REST com CI, IRPF, Quality Travel
- 🎨 **Trocar a cor de destaque** (verde, ciano, rosa, roxo, laranja) — a escolha fica salva
- ✉️ **Pedir o currículo ou mandar mensagem** por e-mail, WhatsApp ou LinkedIn

## 📸 Screenshots

O site é **one-page**. Abra ao vivo para ver cada seção no estado atual (o acento muda conforme o seletor de cor).

<table>
  <tr>
    <td align="center" width="50%">
      <sub><b>🏠 Hero</b> · Foto pop-out, anel neon, code-rain e CTAs de estágio</sub>
    </td>
    <td align="center" width="50%">
      <sub><b>🗂️ Work</b> · Case Recife Flats em destaque + projetos no ar</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <sub><b>👩‍💻 About</b> · UNICAP 3º período · Vanessenceweb · UK Companies House</sub>
    </td>
    <td align="center" width="50%">
      <sub><b>✉️ Contact</b> · Canais + formulário que abre o cliente de e-mail</sub>
    </td>
  </tr>
</table>

**[🌐 vanessenceweb.github.io/portfolio-2](https://vanessenceweb.github.io/portfolio-2/)**

> Para colar prints no README (como no [NASA Explorer](https://github.com/VANESSENCEWEB/nasa_explorer)): salve `screenshot-hero.jpg`, `screenshot-work.jpg`, `screenshot-about.jpg` e `screenshot-contact.jpg` na raiz e aponte os `<img>` nesta tabela.

## 🛠️ Stack técnica

<table>
<tr>
<td width="33%">

**Frontend**
- HTML5 semântico
- CSS3 (design system próprio)
- JavaScript vanilla
- GSAP + ScrollTrigger
- Canvas 2D (code-rain)

</td>
<td width="33%">

**Design**
- Figma (hero pop-out)
- Design tokens (`variables.css`)
- 5 acentos + glow
- Inter · Space Grotesk · JetBrains Mono

</td>
<td width="33%">

**Infra**
- GitHub (versionamento)
- GitHub Pages (deploy estático)
- Sem build, sem bundler
- Formulário via `mailto:`

</td>
</tr>
</table>

## ✨ Features destacadas

### 🪩 Hero pop-out (Figma → código)
Foto recortada com **anel tracejado**, texto circular em órbita (`FRONT-END DEV · DISPONÍVEL PARA ESTÁGIO`) e camada de pop-out da cabeça/ombros acima dos anéis. No load, o anel faz um **neon chase** e depois assenta num acento (salvo ou aleatório).

### 🌧️ Code-rain + frases flutuantes
Canvas 2D com glifos (`01{}[]()<>/=+-*;:_#$%&VLdev`) na cor de destaque. Frases tipo `const vanessa = "front-end developer"` cruzam o hero. O canvas **pausa fora da viewport** para não gastar CPU.

### 🎨 Sistema de acento
Cinco cores (verde, ciano, rosa, roxo, laranja) via `data-color` no `<html>`. O picker persiste em `localStorage`. Tokens em `css/variables.css` alimentam glow, anel, nav e cards.

### 💡 Spotlight cursor
Luz radial que segue o mouse (CSS `::before` + variáveis `--spot-x` / `--spot-y`). Só em ponteiro fino; desliga com `prefers-reduced-motion`.

### 🧭 Nav numerada + dots laterais
Links `01 home` … `05 contact` com **scroll spy** (`aria-current`). Dots neon na lateral acompanham a seção visível.

### 🗂️ Cases em produção
- **Recife Flats** — sistema de hospedagem (auth, diárias, PDF, welcome book) — demo sob solicitação
- **NASA Explorer** — APOD, asteroides 3D (Three.js), CRUD no Back4app
- **API REST** — Node + Express, 40 testes Newman, CI no GitHub Actions, deploy no Render
- **Simulador IRPF** e **Quality Travel** — front-end puro no ar

### 📱 Responsividade e acessibilidade
Layout mobile-first, `prefers-reduced-motion` (pausa canvas, GSAP, marquee, spotlight e anel), labels no formulário, `aria-expanded` no picker de cor e foco visível em teclado.

## 💡 Decisões técnicas

Este é um projeto onde cada decisão foi **consciente e documentada**:

<details>
<summary><b>1. JavaScript vanilla sem framework</b></summary>

Queria demonstrar **domínio dos fundamentos** — HTML semântico, CSS moderno, JS no DOM — antes de recorrer a React/Next. Zero bundler, zero `npm install` para rodar. O mesmo critério do [NASA Explorer](https://github.com/VANESSENCEWEB/nasa_explorer).

</details>

<details>
<summary><b>2. Design system próprio em vez de Tailwind</b></summary>

Tokens em `css/variables.css` (neutros, acentos, glow, tipografia, gutters). CSS separado por superfície: `base`, `header`, `hero`, `projects`, `sections`, `responsive`. Facilita trocar o acento inteiro com um `data-color`.

</details>

<details>
<summary><b>3. GSAP só onde o CSS não chega</b></summary>

Reveal de linhas do título, split de palavras nos headings e ScrollTrigger. O resto (marquee, anel neon, hover dos cards) é CSS. Se o CDN do GSAP falhar, o texto aparece mesmo assim.

</details>

<details>
<summary><b>4. Deploy estático no GitHub Pages</b></summary>

Portfólio não precisa de servidor. `index.html` na raiz, Pages ligado, URL estável. Formulário de contato abre o cliente de e-mail (`mailto:`) — sem backend, sem chave, sem spam trap extra.

</details>

<details>
<summary><b>5. Acento persistido, motion respeitada</b></summary>

A cor escolhida fica em `localStorage` (`portfolio-color` + lock). `prefers-reduced-motion` desliga code-rain, parallax, spotlight, GSAP e animações do anel. Motion é extra, não requisito para ler o conteúdo.

</details>

<details>
<summary><b>6. Toggle EN/PT ainda é visual</b></summary>

Os botões EN/PT na nav marcam estado no UI, mas o conteúdo da página é **pt-BR**. Internacionalização de verdade está no roadmap — não finjo i18n incompleto.

</details>

## 🎓 O que este projeto demonstra

- ✅ **Fundamentos sólidos** — HTML semântico, CSS moderno, JavaScript ES6+ sem framework
- ✅ **Design system** — tokens, acento configurável, tipografia (display / body / mono)
- ✅ **Motion com critério** — GSAP + CSS, com fallback e `prefers-reduced-motion`
- ✅ **Figma → código** — hero pop-out, anel e órbita implementados à mão
- ✅ **UX de produto** — scroll spy, spotlight, picker de cor, form com validação nativa
- ✅ **Cases reais** — hospedagem em produção, NASA APIs, API REST com CI
- ✅ **Acessibilidade** — `aria-*`, labels, foco, motion reduzida
- ✅ **Metodologia** — git com Conventional Commits, um commit por feature
- ✅ **Documentação** — README no mesmo padrão dos projetos de produto

## 🚀 Rodando localmente

**Requisitos**: navegador moderno + qualquer servidor HTTP local.

```bash
# 1. Clone o repositório
git clone https://github.com/VANESSENCEWEB/portfolio-2.git
cd portfolio-2

# 2. Sobe um servidor HTTP local (escolha uma opção)
python3 -m http.server 5500      # Python 3
# ou
npx serve                         # Node
# ou
php -S localhost:5500              # PHP

# 3. Abra no navegador
# http://localhost:5500/
```

O site **não precisa de `npm install`**. CSS e JS vão prontos no repositório. Abrir o `index.html` como arquivo (`file://`) pode quebrar fontes ou paths — use um servidor HTTP.

### Currículo (PDF)

O botão **Baixar PDF** aponta para `cv/vanessa-lima.pdf`. Coloque o arquivo com **esse nome exato** na pasta `cv/` (veja `cv/README.md`).

## 📂 Estrutura

```
portfolio-2/
├── index.html              # Página única (nav → hero → work → about → resume → contact)
├── css/
│   ├── variables.css       # Design tokens + paleta de acento
│   ├── base.css            # Reset, tipografia, spotlight, marquee, footer
│   ├── header.css          # Nav numerada, picker de cor, idioma
│   ├── hero.css            # Foto pop-out, anel, órbita, code-rain, CTAs
│   ├── projects.css        # Cards de case + painel lateral
│   ├── sections.css        # Stats, about, skills, currículo, contato
│   └── responsive.css      # Breakpoints + prefers-reduced-motion
├── js/
│   └── main.js             # Reveal, GSAP, canvas, cor, parallax, spy, form, spotlight
├── assets/
│   └── img/                # Foto, recortes WebP, assets do hero (Figma)
├── cv/
│   └── README.md           # Instrução do PDF (vanessa-lima.pdf)
└── README.md
```

## 🗺️ Roadmap

Ideias para próximas versões:

- [x] Hero Figma (pop-out + anel + texto em órbita)
- [x] Picker de acento com persistência
- [x] Spotlight cursor
- [x] Cards de projeto no formato visual + painel
- [ ] i18n de verdade (PT-BR / EN) — hoje o toggle é só visual
- [ ] PDF do currículo versionado em `cv/vanessa-lima.pdf`
- [ ] Open Graph / `og-image` para preview em redes
- [ ] Screenshots comprimidos neste README

## 👩‍💻 Sobre a autora

<table>
<tr>
<td width="150" align="center">
<a href="https://github.com/VANESSENCEWEB">
<img src="https://github.com/VANESSENCEWEB.png" width="120" style="border-radius: 50%" alt="Foto de perfil de Vanessa Lima no GitHub" />
</a>
</td>
<td>

**Vanessa Rafaella Carneiro de Lima**

Estudante de Sistemas para Internet na UNICAP (Recife, Pernambuco, Brasil) — 3º período.
Fundadora da Vanessenceweb Ltd (UK · Companies House [#16679666](https://find-and-update.company-information.service.gov.uk/company/16679666)).
Buscando **estágio em front-end**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vanessa-lima-dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/VANESSENCEWEB)
[![E-mail](https://img.shields.io/badge/Email-vanessalimaunicap@gmail.com-ff2ea6?style=flat)](mailto:vanessalimaunicap@gmail.com)

</td>
</tr>
</table>

## 🙏 Créditos e agradecimentos

- **Figma** — referência do hero pop-out
- **GSAP** — motion dos títulos ([greensock.com](https://greensock.com))
- **GitHub Pages** — hospedagem estática
- **UNICAP** — formação em Sistemas para Internet

---

<div align="center">

**Se este projeto te inspirou, considera dar uma ⭐ no repositório!**

Feito com 💗 em Recife · Pernambuco · Brasil

</div>
