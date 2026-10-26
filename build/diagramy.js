// Diagramy stránky EET 2.0 - ručně psané inline SVG (bez knihoven, bez obrázků).
// Každý diagram = jedna figure s jedním tvrzením, popis i v aria-label pro čtečky.

const ARROW = `<defs>
  <marker id="sipka" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker>
  <marker id="sipka-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#DA2A49"/></marker>
</defs>`;

// 1) Rozhodnutí: kde zákazník platí
const kde = `
<figure class="dg" data-review-id="diagram-kde-plati">
<svg viewBox="0 0 900 300" role="img" aria-label="Rozhoduje místo platby: platba na dálku přes web se neeviduje, platba na místě při převzetí se eviduje." font-family="inherit" font-size="13" color="#0a0a0a">
${ARROW}
  <!-- start -->
  <rect x="20" y="135" width="150" height="60" rx="12" fill="#0a0a0a"/>
  <text x="95" y="160" text-anchor="middle" fill="#fff" font-weight="700" font-size="14">Zákazník platí</text>
  <text x="95" y="180" text-anchor="middle" fill="#cfcfcf" font-size="12">objednávku z e-shopu</text>

  <!-- větev nahoru: na dálku -->
  <path d="M170 165 H200 V80 H328" fill="none" stroke="currentColor" stroke-width="1.6" marker-end="url(#sipka)"/>
  <text x="266" y="70" text-anchor="middle" font-size="12" fill="#525252">zaplatí předem</text>
  <rect x="330" y="45" width="300" height="70" rx="12" fill="#fff" stroke="currentColor" stroke-width="1.4"/>
  <text x="346" y="70" font-weight="700" font-size="14">Na dálku</text>
  <text x="346" y="90" font-size="12.5" fill="#525252">Platební brána, převod předem,</text>
  <text x="346" y="106" font-size="12.5" fill="#525252">QR kód z webu, dobírka přes poštovního operátora</text>
  <line x1="630" y1="80" x2="658" y2="80" stroke="currentColor" stroke-width="1.6" marker-end="url(#sipka)"/>
  <rect x="660" y="50" width="220" height="60" rx="12" fill="#f1f1f2" stroke="#e5e5e5"/>
  <text x="770" y="75" text-anchor="middle" font-weight="700" font-size="14" fill="#525252">Neeviduje se</text>
  <text x="770" y="95" text-anchor="middle" font-size="12" fill="#737373">není evidovaná tržba</text>

  <!-- větev dolů: na místě -->
  <path d="M170 165 H200 V250 H328" fill="none" stroke="#DA2A49" stroke-width="1.8" marker-end="url(#sipka-a)"/>
  <text x="266" y="240" text-anchor="middle" font-size="12" fill="#DA2A49">zaplatí při převzetí</text>
  <rect x="330" y="215" width="300" height="70" rx="12" fill="#fff" stroke="#DA2A49" stroke-width="1.6"/>
  <text x="346" y="240" font-weight="700" font-size="14">Na místě</text>
  <text x="346" y="260" font-size="12.5" fill="#525252">Prodejna, výdejní místo, vlastní kurýr:</text>
  <text x="346" y="276" font-size="12.5" fill="#525252">hotovost, terminál, QR kód na místě</text>
  <line x1="630" y1="250" x2="658" y2="250" stroke="#DA2A49" stroke-width="1.8" marker-end="url(#sipka-a)"/>
  <rect x="660" y="220" width="220" height="60" rx="12" fill="#DA2A49"/>
  <text x="770" y="245" text-anchor="middle" font-weight="700" font-size="14" fill="#fff">Eviduje se</text>
  <text x="770" y="265" text-anchor="middle" font-size="12" fill="rgba(255,255,255,0.85)">kontaktní platba podle § 6</text>

</svg>
<figcaption>Stejná karta nebo stejný QR kód dopadne jinak podle toho, kde platba proběhne. Platba na dálku je mimo evidenci, platba při osobním převzetí je evidovaná tržba.</figcaption>
</figure>`;

// 2) Co se děje s evidovanou tržbou
const tok = `
<figure class="dg" data-review-id="diagram-tok-trzby">
<svg viewBox="0 0 900 250" role="img" aria-label="Pokladna odešle údaje o tržbě podepsané certifikátem Finanční správě, ta vrátí potvrzovací kód POK. Bez připojení se tržba odešle do 48 hodin. Účtenka zákazníkovi není povinná." font-family="inherit" font-size="13" color="#0a0a0a">
${ARROW}
  <!-- pokladna -->
  <rect x="20" y="60" width="240" height="76" rx="12" fill="#fff" stroke="currentColor" stroke-width="1.4"/>
  <text x="140" y="88" text-anchor="middle" font-weight="700" font-size="14">Pokladna nebo terminál</text>
  <text x="140" y="108" text-anchor="middle" font-size="12.5" fill="#525252">na prodejně, výdejním místě, u kurýra</text>
  <text x="140" y="124" text-anchor="middle" font-size="12" fill="#737373">s pokladním certifikátem</text>

  <!-- tam: údaje -->
  <line x1="260" y1="84" x2="398" y2="84" stroke="#DA2A49" stroke-width="1.8" marker-end="url(#sipka-a)"/>
  <text x="330" y="72" text-anchor="middle" font-size="12" fill="#DA2A49">údaje o tržbě</text>
  <!-- zpět: POK -->
  <line x1="400" y1="114" x2="262" y2="114" stroke="currentColor" stroke-width="1.6" marker-end="url(#sipka)"/>
  <text x="330" y="132" text-anchor="middle" font-size="12" fill="#525252">potvrzovací kód POK</text>

  <!-- finanční správa -->
  <rect x="400" y="60" width="220" height="76" rx="12" fill="#0a0a0a"/>
  <text x="510" y="92" text-anchor="middle" fill="#fff" font-weight="700" font-size="14">Finanční správa</text>
  <text x="510" y="112" text-anchor="middle" fill="#cfcfcf" font-size="12.5">systém EET 2.0</text>

  <!-- účtenka -->
  <line x1="140" y1="136" x2="140" y2="188" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 4" marker-end="url(#sipka)"/>
  <rect x="20" y="190" width="240" height="44" rx="10" fill="#fff" stroke="#e5e5e5"/>
  <text x="140" y="209" text-anchor="middle" font-size="12.5" font-weight="600">Účtenka zákazníkovi</text>
  <text x="140" y="225" text-anchor="middle" font-size="11.5" fill="#737373">tisk s potvrzením už není povinný</text>

  <!-- výpadek -->
  <rect x="660" y="60" width="220" height="76" rx="12" fill="#fff7e6" stroke="rgba(168,100,0,0.35)"/>
  <text x="770" y="86" text-anchor="middle" font-size="12.5" font-weight="700" fill="#6b4200">Bez připojení</text>
  <text x="770" y="104" text-anchor="middle" font-size="12" fill="#6b4200">tržbu uložit a odeslat po obnovení,</text>
  <text x="770" y="120" text-anchor="middle" font-size="12" fill="#6b4200">nejpozději do 48 hodin</text>
  <line x1="620" y1="98" x2="658" y2="98" stroke="rgba(168,100,0,0.6)" stroke-width="1.4" stroke-dasharray="4 4"/>
</svg>
<figcaption>Tok jedné evidované tržby: odeslání údajů, potvrzení kódem POK a náhradní postup bez připojení.</figcaption>
</figure>`;

module.exports = { kde, tok };
