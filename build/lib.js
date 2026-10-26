// Sdílená kostra informační stránky PragueBest pro klienty - design podle .claude/templates/spec-template-interni.html
// (stejná šablona jako eaa.praguebest.cz a oznacovani-ai-obsahu.praguebest.cz). Stránka = page({...}) → hotové HTML.
//
// Použití: node build/build.js   (z kořene repa)

const FONTS = (base) => `
<link rel="preload" href="${base}fonts/Inter-Variable-latin-ext.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}fonts/Inter-Variable-latin.woff2" as="font" type="font/woff2" crossorigin>
<style>
  @font-face { font-family: 'Inter'; src: url('${base}fonts/Inter-Variable-latin-ext.woff2') format('woff2-variations'); unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; font-weight: 100 900; font-style: normal; font-display: swap; }
  @font-face { font-family: 'Inter'; src: url('${base}fonts/Inter-Variable-latin.woff2') format('woff2-variations'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; font-weight: 100 900; font-style: normal; font-display: swap; }
  @font-face { font-family: 'JetBrains Mono'; src: url('${base}fonts/JetBrainsMono-Variable-latin-ext.woff2') format('woff2-variations'); unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; font-weight: 100 900; font-style: normal; font-display: swap; }
  @font-face { font-family: 'JetBrains Mono'; src: url('${base}fonts/JetBrainsMono-Variable-latin.woff2') format('woff2-variations'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; font-weight: 100 900; font-style: normal; font-display: swap; }
  @font-face { font-family: 'Inter Fallback'; src: local('Arial'); size-adjust: 107.4%; ascent-override: 90.49%; descent-override: 22.56%; line-gap-override: 0%; }
</style>`;

const FAVICON = (base) => `
<link rel="icon" type="image/png" sizes="32x32" href="${base}favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="${base}favicon-16x16.png">
<link rel="icon" type="image/png" sizes="194x194" href="${base}favicon-194x194.png">
<link rel="apple-touch-icon" sizes="180x180" href="${base}apple-touch-icon.png">
<link rel="mask-icon" href="${base}safari-pinned-tab.svg" color="#d92b48">`;

const CSS = `
<style>
  :root {
    --accent: #DA2A49; --accent-bright: #ff3057; --accent-soft: rgba(218,42,73,0.06);
    --ok: #0f7a4d; --ok-soft: rgba(15,122,77,0.07);
    --warn: #a86400; --warn-soft: rgba(168,100,0,0.08);
    --bg: #fafafa; --bg-card: #ffffff;
    --ink: #0a0a0a; --ink-2: #525252; --ink-3: #737373; --ink-4: #a3a3a3;
    --line: #e5e5e5; --line-soft: #f0f0f0;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; scroll-padding-top: 78px; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  body { font-family: 'Inter', 'Inter Fallback', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; font-synthesis: none; background: var(--bg); color: var(--ink); line-height: 1.55; font-size: 16px; -webkit-font-smoothing: antialiased; font-feature-settings: "ss01", "ss03", "cv11"; }
  .mono { font-family: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace; }
  .container { max-width: 1240px; margin: 0 auto; padding: 48px 28px 100px; }
  a { color: var(--accent); text-decoration: none; border-bottom: 1px solid rgba(218,42,73,0.25); }
  a:hover { border-bottom-color: var(--accent); }
  :focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
  .skip { position: absolute; left: -9999px; top: 0; background: var(--accent); color: #fff; padding: 12px 18px; z-index: 90; font-weight: 700; border-bottom: 0; border-radius: 0 0 10px 0; }
  .skip:focus { left: 0; top: 0; }
  .vh { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

  .top-bar { display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center; margin-bottom: 40px; font-size: 11px; color: var(--ink-3); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500; }
  .top-bar .brand::before { content: "\\25CF"; color: var(--accent); margin-right: 6px; }
  .top-bar a { color: var(--ink-3); border-bottom-color: var(--line); }
  .top-bar a:hover { color: var(--accent); }

  header.doc-header { margin-bottom: 44px; }
  header.doc-header h1 { font-size: clamp(34px, 5.6vw, 62px); font-weight: 800; letter-spacing: -0.04em; line-height: 1.04; margin-bottom: 18px; max-width: 900px; }
  header.doc-header h1 .accent { color: var(--accent); }
  header.doc-header .subtitle { font-size: 19px; color: var(--ink-2); line-height: 1.45; max-width: 820px; letter-spacing: -0.01em; }
  .meta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .pill { display: inline-flex; align-items: center; gap: 8px; padding: 7px 13px; border-radius: 100px; font-size: 12.5px; font-weight: 500; letter-spacing: -0.01em; background: var(--accent-soft); border: 1px solid rgba(218,42,73,0.18); color: var(--accent); }
  .pill.neutral { background: #fff; border-color: var(--line); color: var(--ink-3); }
  .pill::before { content: ""; width: 6px; height: 6px; background: currentColor; border-radius: 50%; }
  .doc-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
  .doc-actions .da { display: inline-flex; align-items: center; gap: 7px; padding: 8px 14px; border-radius: 100px; border: 1px solid var(--line); background: #fff; color: var(--ink); font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
  .doc-actions .da:hover { border-color: var(--ink-4); color: var(--ink); }
  .doc-actions .da svg { width: 15px; height: 15px; flex: none; }
  .doc-actions .da.primary { background: var(--accent); border-color: var(--accent); color: #fff; }
  .doc-actions .da.primary:hover { background: #c22440; }

  .keybox { background: var(--ink); color: #fff; border-radius: 18px; padding: 30px 32px 26px; margin-bottom: 22px; }
  .keybox .label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-bright); font-weight: 700; margin-bottom: 12px; display: block; }
  .keybox p { font-size: 17.5px; line-height: 1.5; letter-spacing: -0.01em; color: #f0f0f0; max-width: 920px; margin-bottom: 0; }
  .keybox p + p { margin-top: 12px; }
  .keybox ul { margin: 12px 0 0 18px; color: #e5e5e5; font-size: 15.5px; max-width: 920px; }
  .keybox li { margin-bottom: 5px; }
  .keybox strong { color: #fff; }
  .keybox a { color: #fff; border-bottom-color: rgba(255,255,255,0.4); }
  .keytiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin: 6px 0 20px; }
  .keytiles .kt { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 12px 14px; min-width: 0; }
  .keytiles .kt b { display: block; color: #fff; font-size: 16px; letter-spacing: -0.01em; line-height: 1.25; margin-bottom: 3px; }
  .keytiles .kt span { display: block; color: rgba(255,255,255,0.7); font-size: 12.5px; line-height: 1.35; }

  .disclaimer { background: var(--warn-soft); border: 1px solid rgba(168,100,0,0.25); border-radius: 12px; padding: 16px 18px; font-size: 14.5px; color: #6b4200; margin-bottom: 18px; max-width: 1000px; }
  .disclaimer strong { color: #4a2d00; }
  .disclaimer a { color: #6b4200; border-bottom-color: rgba(107,66,0,0.35); }
  .disclaimer.stop { background: var(--accent-soft); border-color: rgba(218,42,73,0.3); color: #7a1226; }
  .disclaimer.stop strong { color: #5d0c1c; }

  .subpages { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin: 0 0 56px; }
  .subpage { display: block; background: var(--bg-card); border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; color: var(--ink-2); font-size: 13.5px; line-height: 1.5; }
  .subpage:hover { border-color: var(--accent); }
  .subpage b { display: block; color: var(--accent); font-size: 15px; margin-bottom: 4px; }

  nav.toc { background: var(--bg-card); border: 1px solid var(--line); border-radius: 16px; padding: 22px 26px; margin: 0 0 64px; }
  nav.toc ol { margin: 0; padding: 0; list-style: none; columns: 2; column-gap: 36px; max-width: none; }
  nav.toc li { margin-bottom: 8px; break-inside: avoid; font-size: 15px; }
  nav.toc a { color: var(--ink-2); border-bottom: none; }
  nav.toc a:hover { color: var(--accent); }
  nav.toc .num { color: var(--ink-4); font-weight: 600; margin-right: 9px; font-size: 12px; }
  nav.toc-tiles ol { columns: auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  nav.toc-tiles li { margin: 0; }
  nav.toc-tiles a.tile { display: flex; flex-direction: column; gap: 4px; height: 100%; padding: 14px 16px; border: 1px solid var(--line); border-radius: 12px; background: #fff; color: var(--ink); transition: border-color .15s, transform .15s, box-shadow .15s; }
  nav.toc-tiles a.tile:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.08); color: var(--ink); }
  nav.toc-tiles a.tile .num { font-size: 11px; font-weight: 800; color: var(--accent); letter-spacing: .08em; margin: 0; }
  nav.toc-tiles a.tile .t { font-weight: 750; font-size: 15.5px; line-height: 1.25; }
  nav.toc-tiles a.tile .d { font-size: 13px; color: var(--ink-3); line-height: 1.4; }
  nav.toc-tiles .toc-group { margin-top: 22px; }
  nav.toc-tiles a.tile .num:empty { display: none; }
  nav.toc-tiles a.tile.sub { background: var(--accent); border-color: var(--accent); color: #fff; }
  nav.toc-tiles a.tile.sub:hover { background: #c22440; border-color: #c22440; color: #fff; }
  nav.toc-tiles a.tile.sub .t { color: #fff; }
  nav.toc-tiles a.tile.sub .d { color: rgba(255,255,255,0.82); }
  nav.toc-tiles .toc-group:first-child { margin-top: 0; }
  nav.toc-tiles .toc-group-title { display: block; font-size: 13px; font-weight: 800; color: var(--ink); margin: 0 0 8px; border-bottom: none; }
  nav.toc-tiles .toc-group-title .sub { font-weight: 500; color: var(--ink-3); }
  /* Obsah jako standardní odkazový seznam (Aleš): odrážky s krátkým vysvětlením, ve dvou sloupcích */
  nav.toc-list { padding: 18px 26px 16px 26px; border-left: 4px solid var(--accent); border-radius: 6px 16px 16px 6px; background: var(--accent-soft); }
  nav.toc-list .toc-group-title { display: block; font-size: 14px; font-weight: 800; color: var(--accent); margin: 0 0 10px; }
  nav.toc-list ul { list-style: disc; margin: 0 0 0 18px; padding: 0; max-width: none; columns: 2; column-gap: 40px; }
  nav.toc-list li { margin: 0 0 9px; font-size: 15px; line-height: 1.4; break-inside: avoid; color: var(--ink-2); }
  nav.toc-list li a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; font-weight: 650; border-bottom: none; }
  nav.toc-list li a:hover { color: var(--ink); }
  nav.toc-list li a .num { color: var(--ink-4); font-weight: 700; font-size: 12px; margin-right: 8px; text-decoration: none; display: inline-block; }
  nav.toc-list li .d { display: block; color: var(--ink-3); font-size: 13.5px; }
  @media (max-width: 720px) { nav.toc-list ul { columns: 1; } }
  .subpages { margin: -40px 0 56px; }
  .subpage, .subpage:hover { background: var(--accent); border-color: var(--accent); color: rgba(255,255,255,0.86); }
  .subpage:hover { background: #c22440; border-color: #c22440; }
  .subpage b { color: #fff; }
  .subpage code { background: rgba(255,255,255,0.18); color: #fff; }
  @media (max-width: 860px) { nav.toc-tiles ol { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 520px) { nav.toc-tiles ol { grid-template-columns: 1fr; } }

  section { margin-bottom: 68px; scroll-margin-top: 78px; }
  .section-label { display: block; font-size: 11px; color: var(--ink-3); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; margin-bottom: 12px; }
  .section-label::before { content: "\\25CF  "; color: var(--accent); }
  h2 { font-size: clamp(26px, 3.4vw, 38px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.08; margin-bottom: 14px; max-width: 1000px; }
  h2 .accent { color: var(--accent); }
  h3 { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; margin: 34px 0 10px; }
  h4 { font-size: 15.5px; font-weight: 700; letter-spacing: -0.01em; margin: 22px 0 8px; }
  .lead { font-size: 17px; color: var(--ink-2); max-width: 860px; line-height: 1.55; margin-bottom: 22px; }
  p { max-width: 860px; margin-bottom: 12px; color: var(--ink-2); }
  p strong, li strong { color: var(--ink); font-weight: 650; }
  ul, ol { margin: 0 0 16px 20px; max-width: 860px; color: var(--ink-2); }
  li { margin-bottom: 6px; }
  ul.dots { list-style: none; padding: 0; margin: 0 0 16px; max-width: 860px; }
  ul.dots li { position: relative; padding-left: 18px; margin: 0 0 8px; font-size: 15.5px; }
  ul.dots li::before { content: ""; position: absolute; left: 2px; top: 10px; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); }

  .table-wrap { overflow-x: auto; margin: 20px 0; border: 1px solid var(--line); border-radius: 14px; background: var(--bg-card); }
  table { width: 100%; border-collapse: collapse; font-size: 15px; min-width: 560px; line-height: 1.45; }
  caption { text-align: left; font-size: 13px; color: var(--ink-3); padding: 12px 16px 0; caption-side: top; }
  th { text-align: left; font-size: 11.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink); font-weight: 700; padding: 13px 16px; border-bottom: 2px solid var(--line); background: #f4f4f5; vertical-align: top; }
  td { padding: 12px 16px; border-bottom: 1px solid var(--line-soft); vertical-align: top; color: var(--ink); }
  tbody th { background: transparent; font-size: 15px; letter-spacing: 0; text-transform: none; font-weight: 600; border-bottom: 1px solid var(--line-soft); }
  tbody tr:nth-child(even) td, tbody tr:nth-child(even) th { background: #fafafa; }
  tr:last-child td, tr:last-child th { border-bottom: none; }
  td strong { color: var(--ink); }
  td.muted { color: var(--ink-3); font-weight: 400; }
  .st { display: inline-block; font-size: 11.5px; font-weight: 700; letter-spacing: 0.02em; padding: 3px 10px; border-radius: 100px; white-space: nowrap; }
  .st.in { background: var(--ok-soft); color: var(--ok); border: 1px solid rgba(15,122,77,0.25); }
  .st.data { background: var(--warn-soft); color: var(--warn); border: 1px solid rgba(168,100,0,0.3); }
  .st.out { background: #f1f1f2; color: var(--ink-3); border: 1px solid var(--line); }
  .todo-id { display: inline-block; font-weight: 700; font-size: 12px; color: var(--warn); background: var(--warn-soft); border: 1px solid rgba(168,100,0,0.3); padding: 1px 8px; border-radius: 100px; white-space: nowrap; }

  .callout { border-left: 3px solid var(--accent); background: var(--accent-soft); padding: 14px 18px; border-radius: 0 12px 12px 0; margin: 18px 0; max-width: 860px; }
  .callout p { margin-bottom: 0; font-size: 15px; }
  .callout p + p { margin-top: 8px; }
  .callout .label { display: block; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--accent); margin-bottom: 6px; }
  .callout.warn { border-left-color: var(--warn); background: var(--warn-soft); }
  .callout.warn .label { color: var(--warn); }
  .callout.ok { border-left-color: var(--ok); background: var(--ok-soft); }
  .callout.ok .label { color: var(--ok); }
  .callout.stop { border-left-color: var(--ink); background: #f1f1f2; }
  .callout.stop .label { color: var(--ink); }

  pre { background: #0f1115; color: #e6e6e6; border-radius: 12px; padding: 16px 18px; overflow-x: auto; font-size: 13px; line-height: 1.6; margin: 16px 0; max-width: 860px; }
  pre code { font-family: 'JetBrains Mono', Menlo, Consolas, monospace; background: none; padding: 0; color: inherit; font-size: inherit; }
  code:not(pre code) { font-family: 'JetBrains Mono', Menlo, Consolas, monospace; font-size: 0.88em; background: #f1f1f2; padding: 2px 6px; border-radius: 5px; color: var(--ink); overflow-wrap: anywhere; }

  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin: 22px 0; }
  .card { background: var(--bg-card); border: 1px solid var(--line); border-radius: 14px; padding: 20px 20px 18px; }
  .card .tag { display: inline-block; font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--accent); margin-bottom: 8px; }
  .card .tag.neutral { color: var(--ink-3); }
  .card h3 { margin: 0 0 6px; font-size: 16.5px; }
  .card p { font-size: 15px; margin-bottom: 0; line-height: 1.45; }
  .card ul, .card ol { font-size: 15px; margin: 6px 0 0 16px; line-height: 1.45; }
  .card ol.mini li { margin-bottom: 8px; }
  a.card { display: block; color: var(--ink); }
  a.card:hover { border-color: var(--accent); }
  a.card .tag { color: var(--accent); }
  .cols2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }

  .flow { counter-reset: step; list-style: none; padding: 0; margin: 0 0 18px; max-width: 860px; }
  .flow > li { position: relative; padding: 0 0 18px 44px; counter-increment: step; }
  .flow > li::before { content: counter(step); position: absolute; left: 0; top: 0; width: 30px; height: 30px; border-radius: 50%; background: var(--ink); color: #fff; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; }
  .flow > li::after { content: ''; position: absolute; left: 14px; top: 32px; bottom: 0; border-left: 2px solid var(--line); }
  .flow > li:last-child::after { display: none; }
  .flow > li b { display: block; color: var(--ink); font-size: 16px; margin-bottom: 2px; }
  .flow .branch { margin: 8px 0 0; padding-left: 0; list-style: none; }
  .flow .branch li { background: #fff; border: 1px solid var(--line); border-radius: 8px; padding: 8px 12px; margin: 6px 0; font-size: 15px; }

  details.more { border: 1px solid var(--line); border-radius: 12px; background: #fff; margin: 14px 0; max-width: 1000px; }
  details.more > summary { cursor: pointer; list-style: none; padding: 11px 14px; font-weight: 700; font-size: 14.5px; display: flex; align-items: center; gap: 10px; color: var(--ink); }
  details.more > summary::-webkit-details-marker { display: none; }
  details.more > summary::before { content: "+"; width: 22px; height: 22px; border-radius: 50%; background: var(--accent); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; flex: 0 0 auto; }
  details.more[open] > summary::before { content: "\\2013"; }
  details.more > div { padding: 2px 16px 14px; border-top: 1px solid var(--line); }
  details.more > div > :last-child { margin-bottom: 0; }

  /* Prohlášení - vzor: rám dokumentu, místa k doplnění */
  .doc { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 34px 38px 30px; margin: 22px 0 40px; box-shadow: 0 14px 40px rgba(0,0,0,.06); max-width: 1000px; }
  .doc h2 { font-size: clamp(24px, 3vw, 32px); }
  .doc h3 { font-size: 18px; margin-top: 28px; }
  .doc .updated { font-size: 14px; color: var(--ink-3); margin-bottom: 18px; }
  .fill { background: #fff1c2; color: #5a3d00; border-bottom: 2px solid #e8c56a; padding: 0 4px; border-radius: 3px; }
  .status { display: inline-block; font-size: 12px; font-weight: 700; padding: 2px 10px; border-radius: 100px; }
  .status-partial { background: var(--warn-soft); color: var(--warn); border: 1px solid rgba(168,100,0,0.3); }
  .doc .note { border-left: 3px solid var(--ink-4); background: #f4f4f5; padding: 12px 16px; border-radius: 0 10px 10px 0; margin: 16px 0; font-size: 14px; }
  .doc .note .label { display: block; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--ink-3); margin-bottom: 4px; }
  .doc .note p { margin: 0; font-size: 14px; }
  @media (max-width: 720px) { .doc { padding: 22px 18px; } }

  /* Checklist */
  th.col-check { width: 44px; }
  th.col-krit { width: 22%; }
  .wcag { display: block; font-size: 11.5px; font-weight: 600; color: var(--ink-3); margin-top: 3px; letter-spacing: 0.02em; font-family: 'JetBrains Mono', Menlo, Consolas, monospace; }
  input[type="checkbox"] { width: 18px; height: 18px; accent-color: var(--accent); margin: 2px 0 0; cursor: pointer; }
  tr:has(input:checked) td, tr:has(input:checked) th { background: var(--ok-soft) !important; }

  /* Checklist - stav a poznámka v tabulce */
  th.col-stav { width: 160px; } th.col-pozn { width: 180px; }
  select[data-stav] { font: inherit; font-size: 12.5px; font-weight: 600; padding: 6px 24px 6px 8px; border: 1px solid var(--line); border-radius: 8px; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 9px center; appearance: none; -webkit-appearance: none; color: var(--ink); cursor: pointer; width: 100%; }
  select[data-stav][data-hodnota="Splněno"] { background-color: var(--ok-soft); color: var(--ok); border-color: rgba(15,122,77,0.35); }
  select[data-stav][data-hodnota="Částečně"] { background-color: var(--warn-soft); color: var(--warn); border-color: rgba(168,100,0,0.35); }
  select[data-stav][data-hodnota="Nesplněno"] { background-color: var(--accent-soft); color: var(--accent); border-color: rgba(218,42,73,0.35); }
  select[data-stav][data-hodnota="Netýká se"] { background-color: #f1f1f2; color: var(--ink-3); }
  textarea[data-pozn] { font: inherit; font-size: 13px; width: 100%; min-height: 34px; padding: 6px 9px; border: 1px solid var(--line); border-radius: 8px; background: #fff; resize: vertical; color: var(--ink); line-height: 1.4; }
  textarea[data-pozn]::placeholder { color: var(--ink-4); }
  .da-status { font-size: 13px; color: var(--ink-3); align-self: center; }
  .doc-actions .da:disabled { opacity: 0.6; cursor: wait; }
  @media print { select[data-stav] { border: 0; padding: 0; background: none !important; font-weight: 700; } textarea[data-pozn] { border: 0; padding: 0; resize: none; } textarea[data-pozn]:placeholder-shown { display: none; } }

  /* Ke stažení */
  ul.dl { list-style: none; margin: 18px 0 44px; padding: 0; display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); max-width: none; }
  ul.dl li { margin: 0; }
  ul.dl a { display: block; height: 100%; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 16px 18px; color: var(--ink); border-bottom-width: 1px; }
  ul.dl a:hover { border-color: var(--accent); }
  ul.dl a strong { display: block; color: var(--accent); font-size: 15.5px; margin-bottom: 4px; }
  ul.dl a strong::before { content: "\\2193  "; }
  ul.dl a span { display: block; font-size: 13.5px; color: var(--ink-3); line-height: 1.45; }
  ul.dl a.link strong::before { content: "\\2192  "; }
  ul.dl a.link { background: var(--accent); border-color: var(--accent); color: #fff; }
  ul.dl a.link:hover { background: #c22440; border-color: #c22440; }
  ul.dl a.link strong { color: #fff; }
  ul.dl a.link span { color: rgba(255,255,255,0.82); }
  ul.dl a.link code { background: rgba(255,255,255,0.18); color: #fff; }

  .btn { display: inline-block; background: var(--accent); color: #fff; font-weight: 700; padding: 12px 22px; border-radius: 10px; border-bottom: 0; font-size: 15px; }
  .btn:hover { background: #c22440; color: #fff; }
  .btn.sec { background: #fff; color: var(--accent); border: 1.5px solid var(--accent); }
  .btn.sec:hover { background: var(--accent-soft); }

  footer.doc-footer { margin-top: 80px; padding-top: 28px; border-top: 1px solid var(--line); font-size: 13.5px; color: var(--ink-3); }
  footer.doc-footer p { font-size: 13.5px; color: var(--ink-3); max-width: 900px; }
  footer.doc-footer a { color: var(--ink-2); border-bottom-color: var(--line); }

  @media (max-width: 720px) {
    .container { padding: 36px 18px 70px; }
    nav.toc ol { columns: 1; }
    .keybox { padding: 24px 20px; }
  }

  /* Sticky lišta s obsahem */
  .stickynav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(250,250,250,0.93); -webkit-backdrop-filter: saturate(180%) blur(12px); backdrop-filter: saturate(180%) blur(12px); border-bottom: 1px solid var(--line); transform: translateY(-101%); transition: transform 0.22s ease; }
  .stickynav.show { transform: none; }
  .sn-progress { position: absolute; left: 0; top: 0; height: 2px; background: var(--accent); width: 0; transition: width 0.1s linear; }
  .sn-inner { max-width: 1240px; margin: 0 auto; padding: 0 28px; height: 56px; display: flex; align-items: center; gap: 16px; }
  .sn-title { font-size: 12.5px; font-weight: 700; letter-spacing: -0.01em; color: var(--ink); white-space: nowrap; flex: none; }
  .sn-title::before { content: "\\25CF"; color: var(--accent); margin-right: 7px; }
  .sn-cur { font-size: 12.5px; color: var(--ink-4); flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sn-cur b { color: var(--ink-2); font-weight: 600; }
  .sn-btn { display: inline-flex; align-items: center; gap: 8px; flex: none; font-family: inherit; font-size: 12.5px; font-weight: 650; color: var(--ink); background: #fff; border: 1px solid var(--line); border-radius: 100px; padding: 7px 14px; cursor: pointer; letter-spacing: -0.01em; }
  .sn-btn:hover { border-color: var(--ink-4); }
  .sn-btn .chev { width: 10px; height: 10px; transition: transform 0.18s ease; color: var(--ink-3); }
  .sn-btn[aria-expanded="true"] .chev { transform: rotate(180deg); }
  .sn-panel { position: absolute; right: 28px; top: 52px; background: #fff; border: 1px solid var(--line); border-radius: 14px; box-shadow: 0 18px 44px rgba(0,0,0,0.13); padding: 8px; min-width: 320px; max-height: 72vh; overflow-y: auto; }
  .sn-panel a { display: flex; align-items: baseline; gap: 11px; padding: 7px 11px; border-radius: 8px; font-size: 13.5px; color: var(--ink-2); border-bottom: none; line-height: 1.35; }
  .sn-panel a:hover { background: #f4f4f5; color: var(--ink); }
  .sn-panel a.on { background: var(--accent-soft); color: var(--accent); font-weight: 650; }
  .sn-panel a .n { color: var(--ink-4); font-weight: 700; font-size: 11px; min-width: 17px; flex: none; }
  .sn-panel a.on .n { color: var(--accent); }
  .sn-panel[hidden] { display: none; }
  .sn-panel .sep { height: 1px; background: var(--line); margin: 6px 4px; }
  @media (max-width: 720px) {
    html { scroll-padding-top: 70px; }
    section { scroll-margin-top: 70px; }
    .sn-inner { padding: 0 20px; height: 52px; gap: 12px; }
    .sn-title { display: none; }
    .sn-panel { left: 12px; right: 12px; min-width: 0; top: 48px; }
  }
  @media (prefers-reduced-motion: reduce) { .stickynav, .sn-progress { transition: none; } }

  .totop { position: fixed; right: 22px; bottom: 22px; width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--line); background: #fff; color: var(--ink); box-shadow: 0 8px 22px rgba(0,0,0,.14); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; visibility: hidden; transform: translateY(8px); transition: opacity .2s, transform .2s, visibility .2s, border-color .15s; z-index: 60; }
  .totop.show { opacity: 1; visibility: visible; transform: none; }
  .totop:hover { border-color: var(--accent); color: var(--accent); }
  .totop svg { width: 18px; height: 18px; }

  @media print {
    @page { margin: 14mm 12mm; }
    .stickynav, .totop, .top-bar, nav.toc, .subpages, .doc-actions, .skip { display: none !important; }
    html { scroll-padding-top: 0; }
    body { background: #fff; font-size: 12.5px; line-height: 1.45; }
    .container { padding: 0; max-width: none; }
    header.doc-header { margin-bottom: 22px; }
    header.doc-header h1 { font-size: 34px; }
    section { margin-bottom: 30px; break-inside: auto; }
    h1, h2, h3, h4, .section-label, caption, summary { break-after: avoid; break-inside: avoid; }
    h2 { font-size: 24px; margin-top: 8px; }
    h3 { margin-top: 18px; }
    p, li { orphans: 3; widows: 3; }
    li, tr, .card, .callout, .disclaimer, .keytiles .kt, .flow > li, ul.dl li, .subpage { break-inside: avoid; }
    thead { display: table-header-group; }
    .doc, .keybox, details.more { break-inside: auto; }
    table.keep { break-inside: avoid; }
    thead tr { break-after: avoid; }
    .lead { font-size: 14.5px; }
    p, li, ul.dots li { font-size: 13px; }
    .keytiles .kt b { font-size: 14px; }
    footer.doc-footer { break-inside: avoid; margin-top: 30px; padding-top: 14px; }
    .table-wrap { overflow: visible; border: 0; border-radius: 0; background: transparent; }
    table { border-top: 1px solid var(--line); }
    .doc { box-shadow: none; }
    table { min-width: 0; font-size: 11.5px; }
    th, td { padding: 6px 9px; }
    .cards, .cols2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .keybox { background: #111 !important; color: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; padding: 20px 22px; }
    .keybox p { font-size: 14px; }
    .fill, .callout, .disclaimer, .st, .pill, .keytiles .kt, th, tr:has(input:checked) td { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    details.more { border: 0; } details.more > summary::before { display: none; } details.more > div { border-top: 0; padding: 0; }
    details.more:not([open]) > div { display: block; }
    a { color: inherit; border-bottom: 0; }
    input[type="checkbox"] { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>`;

const SCRIPT = `
<script>
(function () {
  var bar = document.getElementById('stickynav');
  var btn = document.getElementById('sn-toggle');
  var panel = document.getElementById('sn-panel');
  var cur = document.getElementById('sn-current');
  var prog = document.getElementById('sn-progress');
  if (!bar || !btn || !panel) return;
  var links = Array.prototype.slice.call(panel.querySelectorAll('a'));
  var secs = links.map(function (a) { var h = a.getAttribute('href'); return h && h.charAt(0) === '#' ? document.querySelector(h) : null; });
  var toc = document.querySelector('nav.toc') || document.querySelector('header.doc-header');
  function closePanel() { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
  function openPanel() { panel.hidden = false; btn.setAttribute('aria-expanded', 'true'); }
  btn.addEventListener('click', function (e) { e.stopPropagation(); if (panel.hidden) { openPanel(); } else { closePanel(); } });
  document.addEventListener('click', function (e) { if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) closePanel(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { closePanel(); btn.focus(); } });
  links.forEach(function (a) { a.addEventListener('click', closePanel); });
  function update() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var trigger = toc ? toc.offsetTop + toc.offsetHeight - 90 : 420;
    if (y > trigger) { bar.classList.add('show'); } else { bar.classList.remove('show'); if (!panel.hidden) closePanel(); }
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (docH > 0 ? Math.min(100, (y / docH) * 100) : 0) + '%';
    var active = -1;
    for (var i = 0; i < secs.length; i++) { if (secs[i] && secs[i].getBoundingClientRect().top <= 140) active = i; }
    for (var j = 0; j < links.length; j++) { if (j === active) { links[j].classList.add('on'); } else { links[j].classList.remove('on'); } }
    if (active >= 0) { cur.innerHTML = '<b></b>'; cur.firstChild.textContent = links[active].getAttribute('data-label'); } else { cur.textContent = ''; }
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
(function(){
  var b = document.getElementById('totop'); if (!b) return;
  function upd(){ b.classList.toggle('show', window.scrollY > 600); }
  window.addEventListener('scroll', upd, { passive: true }); upd();
  b.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); });
})();
(function(){
  var otevrene = [];
  function predTiskem(){ otevrene = []; document.querySelectorAll('details.more:not([open])').forEach(function(d){ d.open = true; otevrene.push(d); }); }
  function poTisku(){ otevrene.forEach(function(d){ d.open = false; }); otevrene = []; }
  window.addEventListener('beforeprint', predTiskem);
  window.addEventListener('afterprint', poTisku);
  var p = document.getElementById('da-pdf'); if (p) p.addEventListener('click', function(){ predTiskem(); window.print(); });
  var s = document.getElementById('da-share'); if (s) s.addEventListener('click', function(){
    var url = location.href.split('#')[0];
    if (navigator.share) { navigator.share({ title: document.title, url: url }).catch(function(){}); return; }
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(function(){ s.querySelector('span').textContent = 'Odkaz zkopírován'; setTimeout(function(){ s.querySelector('span').textContent = 'Sdílet odkaz'; }, 2000); });
  });
})();
</script>
<button type="button" class="totop" id="totop" aria-label="Nahoru na začátek" title="Nahoru" data-review-id="totop"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg></button>`;

function sticky(title, links) {
  const items = links.map((l) => l === '-' ? '<div class="sep" role="separator"></div>' : `<a href="${l.href}" data-label="${l.label}">${l.n ? '<span class="n">' + l.n + '</span>' : ''}${l.label}</a>`).join('\n    ');
  return `<div class="stickynav" id="stickynav" data-review-id="sticky-nav">
  <div class="sn-progress" id="sn-progress"></div>
  <div class="sn-inner">
    <span class="sn-title">${title}</span>
    <span class="sn-cur" id="sn-current" aria-live="polite"></span>
    <button type="button" class="sn-btn" id="sn-toggle" aria-expanded="false" aria-controls="sn-panel" data-review-id="sticky-nav-toggle">
      Obsah
      <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
    </button>
  </div>
  <nav class="sn-panel" id="sn-panel" hidden aria-label="Obsah dokumentu" data-review-id="sticky-nav-panel">
    ${items}
  </nav>
</div>`;
}


// Karty podstránek (.subpages) → chipy v .doc-actions (Hana 22. 9.: „dlaždice přesunout do chipů, doplnit ikonu stažení")
const ICO_DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg>';
const ICO_GO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>';
function karty2chipy(body) {
  const karty = [];
  body = body.replace(/\s*<nav class="subpages"[^>]*>([\s\S]*?)<\/nav>/g, (m, inner) => {
    for (const k of inner.matchAll(/<a class="subpage" href="([^"]+)"([^>]*)><b>([\s\S]*?)<\/b>[\s\S]*?<\/a>/g)) {
      const href = k[1]; const attrs = k[2] || '';
      const dl = /\bdownload\b/.test(attrs) || /\.(xlsx|pdf|docx|html)$/i.test(href);
      const label = k[3].replace(/(?:&nbsp;|\s)*(→|↓)\s*$/, '').trim();
      const rid = (attrs.match(/data-review-id="([^"]+)"/) || [])[1];
      karty.push(`<a class="da" href="${href}"${dl ? ' download' : ''}${rid ? ' data-review-id="chip-' + rid + '"' : ''}>${dl ? ICO_DL : ICO_GO}<span>${label}</span></a>`);
    }
    return '';
  });
  if (!karty.length) return body;
  const chips = '\n    ' + karty.join('\n    ') + '\n';
  if (body.includes('<div class="doc-actions"')) {
    // vložit před uzavření .doc-actions (první výskyt)
    const a = body.indexOf('<div class="doc-actions"'); const e = body.indexOf('</div>', a);
    body = body.slice(0, e) + chips + '  ' + body.slice(e);
  } else {
    body = body.replace(/(<div class="meta-row">[\s\S]*?<\/div>)/, '$1\n  <div class="doc-actions" data-review-id="doc-actions">' + chips + '  </div>');
  }
  return body;
}

function page(o) {
  const base = o.base || '';
  o.body = karty2chipy(o.body);
  // malé tabulky (do 6 řádků) se v tisku nedělí - viz table.keep v @media print
  o.body = o.body.replace(/<table\b([^>]*)>([\s\S]*?)<\/table>/g, (m, attrs, inner) => ((inner.match(/<tr\b/g) || []).length <= 6 && !/class=/.test(attrs) ? '<table class="keep"' + attrs + '>' + inner + '</table>' : m));
  return `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">${FAVICON(base)}
<title>${o.title}</title>
<meta name="description" content="${o.description || ''}">
${o.noindex ? '<meta name="robots" content="noindex, nofollow">' : `<meta property="og:title" content="${o.title}">\n<meta property="og:description" content="${o.description || ''}">\n<meta property="og:type" content="website">`}${FONTS(base)}${CSS}${o.extraCss || ''}
</head>
<body>
<a class="skip" href="#obsah" data-review-id="skip-link">Přeskočit na obsah</a>
${o.sticky ? sticky(o.stickyTitle, o.sticky) : ''}
<div class="container">
${o.body}
</div>
${SCRIPT}${o.extraScript || ''}
</body>
</html>
`;
}

module.exports = { page };
