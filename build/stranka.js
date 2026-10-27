// Stránka EET 2.0 pro e-shopy: https://eet.pbst.app/
// Veřejný podklad pro klienty. Fakta ověřená 26. 10. 2026 v zákoně č. 180/2026 Sb., důvodové zprávě (tisk 189)
// a materiálech Finanční správy (eet.gov.cz, Popis položek datové zprávy v1.0, Příručka EET 2.0).
const { kde, tok } = require('./diagramy');
const { kviz, KVIZ_CSS, KVIZ_JS } = require('./kviz');

const VERZE = '1.1';
const DATUM = '27.&nbsp;10.&nbsp;2026';

const sticky = [
  { href: '#co-plati', label: 'Co platí a od kdy', n: '01' },
  { href: '#co-se-eviduje', label: 'Co se eviduje a co ne', n: '02' },
  { href: '#test', label: 'Týká se vás to?', n: '03' },
  { href: '#priklady', label: 'Jak to dopadne v e-shopu', n: '04' },
  { href: '#pokladna', label: 'Co pokladna posílá a co se mění', n: '05' },
  { href: '#dozor', label: 'Co se stane při nesplnění', n: '06' },
  { href: '#postup', label: 'Jak se připravit', n: '07' },
  { href: '#pomoc', label: 'S čím pomůžeme', n: '08' },
  { href: '#kontakt', label: 'Kontakt', n: '09' },
];

const extraCss = `
<style>
  figure.dg { margin: 22px 0 26px; max-width: 1000px; }
  figure.dg svg { width: 100%; height: auto; display: block; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 14px; }
  figure.dg figcaption { font-size: 13.5px; color: var(--ink-3); margin-top: 8px; line-height: 1.45; max-width: 860px; }
  td.ano, td.ne, td.cast { white-space: nowrap; font-weight: 700; }
  td.ano { color: var(--accent); }
  td.ne { color: var(--ok); }
  td.cast { color: var(--warn); }
  @media print { figure.dg { break-inside: avoid; } figure.dg svg { border: 0; padding: 0; } }
  /* zvýrazněná dlaždice klíčového závěru: hlavní sdělení stránky */
  .keytiles .kt.hl { background: var(--accent); border-color: var(--accent); }
  .keytiles .kt.hl span { color: rgba(255,255,255,0.88); }
</style>`;

const body = `
<div class="top-bar" data-review-id="topbar">
  <span class="brand">PragueBest&nbsp;s.r.o.</span>
  <span>Podklad pro&nbsp;klienty&nbsp;/ verze ${VERZE}&nbsp;/ ${DATUM}</span>
</div>

<header class="doc-header" data-review-id="header">
  <h1>Evidence tržeb <span class="accent">EET&nbsp;2.0</span> od&nbsp;1.&nbsp;1.&nbsp;2027</h1>
  <p class="subtitle">Zákon č.&nbsp;180/2026&nbsp;Sb. vrací evidenci tržeb. Platby přes e-shop se&nbsp;neevidují, platby při osobním převzetí ano.<br>Co to znamená pro&nbsp;váš e-shop, co se&nbsp;posílá Finanční správě a&nbsp;jak se&nbsp;připravit.</p>
  <div class="meta-row">
    <span class="pill">Platí od&nbsp;1.&nbsp;1.&nbsp;2027</span>
    <span class="pill neutral">Zákon č.&nbsp;180/2026&nbsp;Sb.</span>
    <span class="pill neutral">Certifikát od&nbsp;1.&nbsp;11.&nbsp;2026</span>
    <span class="pill neutral">Pro&nbsp;provozovatele e-shopů · čtení 8&nbsp;min</span>
  </div>
  <div class="doc-actions" data-review-id="doc-actions">
    <button type="button" class="da" id="da-pdf" data-review-id="da-pdf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg><span>Uložit jako PDF</span></button>
    <button type="button" class="da" id="da-share" data-review-id="da-share"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1.5-1.5"/></svg><span>Sdílet odkaz</span></button>
    <a class="da primary" href="#test" data-review-id="da-test"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg><span>Zjistit, zda se&nbsp;vás EET týká</span></a>
  </div>
</header>

<div class="keybox" data-review-id="keybox">
  <span class="label">Klíčový závěr</span>
  <div class="keytiles" data-review-id="keytiles">
    <div class="kt hl"><b>Jen platby na&nbsp;místě</b><span>hotovost a&nbsp;kontaktní platby podle §&nbsp;5 a&nbsp;6</span></div>
    <div class="kt"><b>Od&nbsp;1.&nbsp;1.&nbsp;2027</b><span>pro&nbsp;všechny najednou, bez&nbsp;náběhu po&nbsp;oborech</span></div>
    <div class="kt"><b>Online platby ne</b><span>karta, převod i&nbsp;QR kód z&nbsp;webu jsou mimo evidenci</span></div>
    <div class="kt"><b>Až&nbsp;500&nbsp;000&nbsp;Kč</b><span>horní hranice pokuty, dozor Finanční správa</span></div>
  </div>
  <p><strong>Rozhoduje, kde zákazník platí, ne&nbsp;čím.</strong> Platba kartou v&nbsp;platební bráně e-shopu se&nbsp;neeviduje. Stejná karta přiložená k&nbsp;terminálu na&nbsp;prodejně ano. E-shop bez&nbsp;prodejny, výdejního místa a&nbsp;vlastního rozvozu evidovat nemusí.</p>
  <p>Kdo přijímá platby na&nbsp;místě, potřebuje pokladnu napojenou na&nbsp;EET&nbsp;2.0 a&nbsp;pokladní certifikát z&nbsp;portálu MOJE daně.</p>
</div>

<div class="disclaimer" data-review-id="disclaimer">
  <strong>⚠️ Toto není právní ani daňové stanovisko.</strong> Stránka shrnuje zákon č.&nbsp;180/2026&nbsp;Sb., důvodovou zprávu k&nbsp;němu a&nbsp;materiály Finanční správy ke&nbsp;dni ${DATUM}. Podrobnou metodiku pro&nbsp;kombinované modely (e-shop s&nbsp;prodejnou nebo výdejním místem) Finanční správa teprve vydá. Posouzení konkrétní situace patří vašemu daňovému poradci.
</div>

<nav class="toc toc-list" aria-label="Obsah" data-review-id="toc">
  <span class="toc-group-title">Obsah</span>
  <ul>
    <li><a href="#co-plati"><span class="num">01</span>Co platí a&nbsp;od&nbsp;kdy</a><span class="d">Účinnost 1.&nbsp;1.&nbsp;2027, kdo je povinný, co je nové proti EET&nbsp;1.0.</span></li>
    <li><a href="#co-se-eviduje"><span class="num">02</span>Co se&nbsp;eviduje a&nbsp;co ne</a><span class="d">Kontaktní platba podle §&nbsp;6 a&nbsp;diagram rozhodnutí.</span></li>
    <li><a href="#test"><span class="num">03</span>Týká se vás to?</a><span class="d">Čtyři otázky a&nbsp;hned víte.</span></li>
    <li><a href="#priklady"><span class="num">04</span>Jak to dopadne v&nbsp;e-shopu</a><span class="d">Patnáct situací od&nbsp;platební brány po&nbsp;stánek na&nbsp;veletrhu.</span></li>
    <li><a href="#pokladna"><span class="num">05</span>Co pokladna posílá a&nbsp;co se&nbsp;mění</a><span class="d">Údaje, kód POK, certifikát, evidenční jednotky, výpadek.</span></li>
    <li><a href="#dozor"><span class="num">06</span>Co se&nbsp;stane při nesplnění</a><span class="d">Pokuta až&nbsp;500&nbsp;000&nbsp;Kč, bez&nbsp;uzavření provozovny.</span></li>
    <li><a href="#postup"><span class="num">07</span>Jak se&nbsp;připravit</a><span class="d">Pět kroků do&nbsp;1.&nbsp;1.&nbsp;2027.</span></li>
    <li><a href="#pomoc"><span class="num">08</span>S&nbsp;čím pomůžeme</a><span class="d">Posouzení platebních míst a&nbsp;nastavení e-shopu.</span></li>
    <li><a href="#kontakt"><span class="num">09</span>Kontakt</a><span class="d">Projektový manažer nebo produktaci@praguebest.cz.</span></li>
  </ul>
</nav>

<main id="obsah">
<section id="co-plati" data-review-id="section-co-plati">
  <span class="section-label">01 - Termíny</span>
  <h2>Co platí <span class="accent">a&nbsp;od&nbsp;kdy</span></h2>
  <p class="lead">Zákon č.&nbsp;180/2026&nbsp;Sb., o&nbsp;evidenci tržeb, schválila Sněmovna 9.&nbsp;9.&nbsp;2026 a&nbsp;ve&nbsp;Sbírce zákonů vyšel 7.&nbsp;10.&nbsp;2026. Evidence začíná <strong>1.&nbsp;ledna 2027 pro&nbsp;všechny povinné najednou</strong>. Na&nbsp;rozdíl od&nbsp;původní EET z&nbsp;roku 2016 nemá zákon náběh po&nbsp;oborech ani limit obratu.</p>
  <div class="cols2">
    <div class="card" data-review-id="karta-kdo">
      <span class="tag">Kdo je povinný</span>
      <h3>Každý poplatník daně z&nbsp;příjmů</h3>
      <p>Fyzické i&nbsp;právnické osoby s&nbsp;příjmy z&nbsp;podnikání (§&nbsp;2 a&nbsp;7). Plátcovství DPH nerozhoduje. Evidují se&nbsp;jen tržby přijaté na&nbsp;území České republiky.</p>
    </div>
    <div class="card" data-review-id="karta-nove">
      <span class="tag neutral">Co je jinak než v&nbsp;EET&nbsp;1.0</span>
      <h3>Rozhoduje místo platby, ne&nbsp;způsob úhrady</h3>
      <p>Původní zákon rozlišoval hotovost a&nbsp;bezhotovostní platby. Nový zákon rozlišuje platbu na&nbsp;místě a&nbsp;platbu na&nbsp;dálku.</p>
    </div>
  </div>
  <div class="table-wrap" data-review-id="tabulka-terminy">
  <table class="keep">
    <caption>Klíčová data</caption>
    <thead><tr><th>Datum</th><th>Co se&nbsp;děje</th></tr></thead>
    <tbody>
      <tr><td><strong>7.&nbsp;10.&nbsp;2026</strong></td><td>Zákon vyhlášen ve&nbsp;Sbírce zákonů.</td></tr>
      <tr><td><strong>1.&nbsp;11.&nbsp;2026</strong></td><td>Na&nbsp;portálu MOJE daně (DIS+) jde přihlásit se&nbsp;k&nbsp;EET, oznámit evidenční jednotky a&nbsp;vygenerovat pokladní certifikát. Produkční rozhraní běží v&nbsp;ověřovacím režimu.</td></tr>
      <tr><td><strong>1.&nbsp;12.&nbsp;2026</strong></td><td>Finanční správa spouští bezplatnou webovou pokladnu MOJE eet.</td></tr>
      <tr><td><strong>1.&nbsp;1.&nbsp;2027</strong></td><td>Účinnost zákona, začátek evidence. Leden Finanční správa označuje za&nbsp;pilotní režim s&nbsp;důrazem na&nbsp;metodickou podporu. Jde ale o&nbsp;standardní evidenci, ne&nbsp;o&nbsp;odklad.</td></tr>
    </tbody>
  </table>
  </div>
  <details class="more" data-review-id="plus-eet1">
<summary>Jak se&nbsp;nový zákon liší od&nbsp;EET&nbsp;1.0 z&nbsp;roku 2016</summary>
<div>
<ul class="dots">
  <li><strong>Méně údajů.</strong> Neposílají se&nbsp;položky, DPH ani způsob platby. Potvrzovací kód FIK nahrazuje POK, kódy BKP a&nbsp;PKP odpadají.</li>
  <li><strong>Bez&nbsp;informačního oznámení.</strong> Cedule o&nbsp;evidenci tržeb na&nbsp;provozovně odpadá.</li>
  <li><strong>Jeden online režim.</strong> Zjednodušený a&nbsp;zvláštní režim s&nbsp;papírovými účtenkami z&nbsp;bloku neexistují.</li>
  <li><strong>Nové rozhraní.</strong> Verze 4.1 není kompatibilní s&nbsp;původní verzí 3.1.</li>
</ul>
</div>
</details>
</section>

<section id="co-se-eviduje" data-review-id="section-co-se-eviduje">
  <span class="section-label">02 - Rozsah</span>
  <h2>Co se&nbsp;eviduje <span class="accent">a&nbsp;co ne</span></h2>
  <p class="lead">Evidovaná tržba musí splnit tři podmínky zároveň: je to <strong>kontaktní platba</strong>, je to <strong>příjem z&nbsp;podnikání</strong> a&nbsp;nevztahuje se&nbsp;na&nbsp;ni výjimka. Stačí, aby jedna podmínka chyběla, a&nbsp;platba se&nbsp;neeviduje.</p>
  <p>Kontaktní platba je podle §&nbsp;6 platba při <strong>osobním kontaktu</strong> s&nbsp;podnikatelem nebo jeho personálem, nebo platba <strong>v&nbsp;provozovně či&nbsp;dopravním prostředku</strong> podnikatele v&nbsp;souvislosti s&nbsp;prodejem. Hotovost, šeky a&nbsp;papírové poukázky nebo stravenky se&nbsp;evidují vždy, i&nbsp;bez&nbsp;osobního kontaktu. Jedinou výjimkou je dobírka: hotovost vybere poštovní operátor a&nbsp;e-shopu ji pošle převodem.</p>
  ${kde}
  <div class="callout" data-review-id="callout-jednotky">
    <span class="label">Evidenční jednotky</span>
    <p>Základní jednotkou evidence je evidenční jednotka: prodejna, výdejní místo, internetová stránka nebo dopravní prostředek. E-shop, který má prodejnu nebo výdejní místo s&nbsp;platbou na&nbsp;místě, musí v&nbsp;DIS+ oznámit <strong>všechny své jednotky, tedy i&nbsp;web</strong>, změny do&nbsp;15&nbsp;dnů. Tržby z&nbsp;webu se&nbsp;přesto neevidují.</p>
  </div>
</section>

${kviz({
  n: '03', nadpis: 'Týká se vás to?', akcent: 'Čtyři otázky.',
  lead: 'Odpovězte Ano nebo Ne. Výsledek se nikam neposílá ani neukládá.',
  otazky: [
    { q: 'Může zákazník zaplatit až při osobním převzetí na prodejně nebo výdejním místě e-shopu?', ano: 2 },
    { q: 'Přijímáte na místě hotovost, kartu přes terminál nebo QR platbu?', ano: 1 },
    { q: 'Rozvážíte zboží vlastními kurýry a vybíráte platbu při doručení?', ano: 3 },
    { q: 'Prodáváte jen online s platbou předem?', ano: -9 },
  ],
  vysledky: [
    { min: 3, nadpis: 'Evidovat musíte.', text: 'Platba při převzetí nebo při doručení vlastním kurýrem je kontaktní platba. Ověřte u dodavatele pokladny, že bude k 1. 1. 2027 připravená, a od 1. 11. 2026 vyřiďte certifikát v DIS+.', odkaz: '#postup', odkazText: 'Jak se připravit' },
    { min: 1, nadpis: 'Pravděpodobně evidovat musíte.', text: 'Jakmile zákazník platí na místě, jde o evidovanou tržbu. Projděte si v tabulce situací, které platby na místě přijímáte.', odkaz: '#priklady', odkazText: 'Tabulka situací' },
    { min: 0, nejiste: true, nadpis: 'Evidovat nemusíte.', text: 'Platby na dálku přes e-shop evidenci nepodléhají. Pokud později otevřete výdejní místo nebo začnete rozvážet vlastními kurýry, vraťte se k sekci 02.', odkaz: '#co-se-eviduje', odkazText: 'Co se eviduje' },
  ],
})}

<section id="priklady" data-review-id="section-priklady">
  <span class="section-label">04 - Příklady</span>
  <h2>Jak to dopadne <span class="accent">v&nbsp;e-shopu</span></h2>
  <p class="lead">Patnáct situací, které v&nbsp;e-shopech nastávají nejčastěji. U&nbsp;každé je uvedeno, zda tržba evidenci podléhá a&nbsp;proč. Zdrojem je zákon, důvodová zpráva a&nbsp;příklady z&nbsp;metodiky Finanční správy.</p>
  <div class="table-wrap" data-review-id="tabulka-situace">
  <table>
    <thead><tr><th>Situace</th><th>Eviduje se?</th><th>Proč</th></tr></thead>
    <tbody>
      <tr><th scope="row">Platba kartou v&nbsp;platební bráně e-shopu</th><td class="ne">Ne</td><td>Platba na&nbsp;dálku, mimo provozovnu. Důvodová zpráva výslovně říká, že na&nbsp;e-shopy s&nbsp;platbou bez&nbsp;osobního kontaktu se&nbsp;povinnost nevztahuje.</td></tr>
      <tr><th scope="row">Bankovní převod předem podle objednávky</th><td class="ne">Ne</td><td>Zákazník platí z&nbsp;domova nebo kanceláře. Totéž platí pro&nbsp;fakturu se&nbsp;splatností.</td></tr>
      <tr><th scope="row">QR kód na&nbsp;webu nebo v&nbsp;e-mailu</th><td class="ne">Ne</td><td>Finanční správa ho uvádí výslovně jako platbu na&nbsp;dálku.</td></tr>
      <tr><th scope="row">Zaplaceno předem online, vyzvednuto na&nbsp;prodejně</th><td class="ne">Ne</td><td>Vyzvednutí není platba. Pozor na&nbsp;výjimku: pokud brána částku jen zablokuje a&nbsp;strhne ji až&nbsp;při převzetí, jde podle důvodové zprávy o&nbsp;kontaktní platbu.</td></tr>
      <tr><th scope="row">Osobní odběr na&nbsp;prodejně, platba hotově</th><td class="ano">Ano</td><td>Hotovost se&nbsp;eviduje vždy (§&nbsp;6 odst.&nbsp;2).</td></tr>
      <tr><th scope="row">Osobní odběr, platba kartou na&nbsp;terminálu</th><td class="ano">Ano</td><td>Kontaktní platba v&nbsp;provozovně. Eviduje se&nbsp;částka skutečně stržená z&nbsp;karty.</td></tr>
      <tr><th scope="row">QR kód nebo převod zadaný na&nbsp;prodejně při převzetí</th><td class="ano">Ano</td><td>Platba je součástí prodeje na&nbsp;místě. Faktura se&nbsp;splatností, kterou zákazník náhodou zaplatí z&nbsp;mobilu v&nbsp;prodejně, se&nbsp;neeviduje.</td></tr>
      <tr><th scope="row">Dobírka vybraná dopravcem z&nbsp;evidence poštovních operátorů, hotově nebo kartou kurýrovi</th><td class="ne">Ne</td><td>Výjimka pro&nbsp;poštovní službu (§&nbsp;6 odst.&nbsp;2). Peníze přijdou e-shopu převodem. Dopravce ji neeviduje také, protože to není jeho příjem. Evidenci poštovních operátorů vede Český telekomunikační úřad.</td></tr>
      <tr><th scope="row">Dobírka vybraná vlastním kurýrem e-shopu</th><td class="ano">Ano</td><td>Osobní kontakt s&nbsp;personálem a&nbsp;dopravní prostředek podnikatele. Hotovost i&nbsp;karta na&nbsp;mobilním terminálu. Vozidlo e-shopu je evidenční jednotka.</td></tr>
      <tr><th scope="row">Výdejní místo nebo box třetí strany, platba tam</th><td class="ne">Ne</td><td>Platbu přijímá provozovatel výdejních míst a&nbsp;e-shopu ji posílá převodem. Závěr je odvozený ze&nbsp;zákona, oficiální příklad zatím chybí.</td></tr>
      <tr><th scope="row">Dárkový poukaz koupený online, uplatněný na&nbsp;prodejně</th><td class="cast">Záleží</td><td>Poukaz na&nbsp;konkrétní zboží nebo službu: nic se&nbsp;neeviduje, nákup proběhl na&nbsp;dálku. Hodnotový poukaz nebo kredit: čerpání na&nbsp;prodejně se&nbsp;eviduje jako kontaktní platba (§&nbsp;4 odst.&nbsp;2).</td></tr>
      <tr><th scope="row">Vrácení peněz za&nbsp;online objednávku na&nbsp;prodejně</th><td class="ne">Ne</td><td>Storno sleduje původní platbu. Ta byla na&nbsp;dálku, proto se&nbsp;vratka neeviduje, ani když ji vyplatíte hotově. Vratka hotovostního nákupu v&nbsp;hotovosti se&nbsp;eviduje jako záporná tržba.</td></tr>
      <tr><th scope="row">Záloha převodem, doplatek hotově na&nbsp;prodejně</th><td class="cast">Jen doplatek</td><td>Každá platba se&nbsp;posuzuje zvlášť. Záloha na&nbsp;dálku se&nbsp;neeviduje, doplatek na&nbsp;místě ano.</td></tr>
      <tr><th scope="row">Prodej přes online tržiště</th><td class="ne">Ne</td><td>Zákazník platí tržišti online a&nbsp;vyúčtování přijde převodem. Tržiště eviduje jen tehdy, když zboží vydá a&nbsp;inkasuje na&nbsp;své prodejně svým jménem.</td></tr>
      <tr><th scope="row">Stánek na&nbsp;veletrhu nebo dočasná prodejna</th><td class="ano">Ano</td><td>Mobilní provozovna je evidenční jednotka. Oznamuje se&nbsp;v&nbsp;DIS+ před první tržbou.</td></tr>
    </tbody>
  </table>
  </div>
  <details class="more" data-review-id="plus-nejasne">
<summary>Co zatím metodika Finanční správy neřeší</summary>
<div>
<ul class="dots">
  <li><strong>Karta kurýrovi dopravce, který není poštovním operátorem.</strong> Hotovost vybraná takovým kurýrem je pro&nbsp;e-shop evidovaná tržba. U&nbsp;platby kartou chybí osobní kontakt s&nbsp;podnikatelem i&nbsp;hmotná podstata, oficiální výklad ale neexistuje.</li>
  <li><strong>Kteří dopravci jsou poštovní operátoři.</strong> Rozhoduje evidence Českého telekomunikačního úřadu, ne&nbsp;název služby. Před nasazením dobírky ověřte svého dopravce v&nbsp;evidenci.</li>
  <li><strong>QR kód z&nbsp;e-mailu zaplacený na&nbsp;prodejně při vyzvednutí.</strong> Podle důvodové zprávy rozhoduje, zda je platba součástí prodeje na&nbsp;místě. Metodika tento případ nepopisuje.</li>
  <li><strong>Výdejní místa a&nbsp;boxy třetích stran.</strong> Závěr „e-shop neeviduje“ vychází z&nbsp;§&nbsp;6 a&nbsp;§&nbsp;9, modelový příklad Finanční správa nezveřejnila.</li>
  <li><strong>Cizí měna.</strong> Částka se&nbsp;posílá v&nbsp;korunách, metodika odkazuje na&nbsp;obecná pravidla přepočtu bez&nbsp;určení kurzu.</li>
</ul>
</div>
</details>
</section>

<section id="pokladna" data-review-id="section-pokladna">
  <span class="section-label">05 - Požadavky</span>
  <h2>Co pokladna posílá <span class="accent">a&nbsp;co se&nbsp;mění</span></h2>
  <p class="lead">Evidenci zajišťuje pokladní systém: při kontaktní platbě odešle Finanční správě datovou zprávu podepsanou pokladním certifikátem a&nbsp;přijme potvrzovací kód POK. E-shop sám nic neposílá, pokud platby na&nbsp;místě nepřijímá.</p>
  ${tok}
  <div class="cols2">
    <div class="card" data-review-id="karta-posila">
      <span class="tag">Co se&nbsp;posílá (§&nbsp;17)</span>
      <h3>Sedm údajů o&nbsp;tržbě</h3>
      <ul>
        <li>Evidenční identifikační číslo poplatníka (zpravidla DIČ)</li>
        <li>Označení evidenční jednotky a&nbsp;pokladního zařízení</li>
        <li>Pořadové číslo tržby</li>
        <li>Datum a&nbsp;čas</li>
        <li>Celková částka v&nbsp;korunách</li>
        <li>Identifikace datové zprávy</li>
        <li>U&nbsp;poukazů a&nbsp;kreditu částky nabití a&nbsp;čerpání</li>
      </ul>
    </div>
    <div class="card" data-review-id="karta-neposila">
      <span class="tag neutral">Co se&nbsp;neposílá</span>
      <h3>Položky, DPH ani zákazník</h3>
      <ul>
        <li>Položky nákupu a&nbsp;jejich ceny</li>
        <li>Základ daně, sazby a&nbsp;výše DPH</li>
        <li>Údaje o&nbsp;zákazníkovi</li>
        <li>Způsob platby</li>
        <li>Kódy BKP a&nbsp;PKP z&nbsp;EET&nbsp;1.0</li>
      </ul>
    </div>
  </div>

  <h3>Pokladní certifikát a&nbsp;zařízení</h3>
  <ul class="dots">
    <li><strong>Certifikát</strong> vydává zdarma certifikační autorita Finanční správy přes DIS+ na&nbsp;portálu MOJE daně, od&nbsp;1.&nbsp;11.&nbsp;2026. Platí jeden rok, jeden certifikát lze použít pro&nbsp;více pokladen. Certifikáty z&nbsp;EET&nbsp;1.0 nelze použít.</li>
    <li><strong>Pokladní zařízení</strong> je jakékoli zařízení s&nbsp;připojením k&nbsp;internetu. Zákon nevyžaduje certifikovaný hardware ani software. Pokladna z&nbsp;EET&nbsp;1.0 funguje po&nbsp;aktualizaci softwaru na&nbsp;rozhraní verze&nbsp;4.1.</li>
    <li><strong>Účtenku</strong> s&nbsp;kódem tisknout nemusíte. Doklad zákazníkovi vydáváte jen tam, kde to ukládá jiný předpis, například zákon o&nbsp;DPH.</li>
  </ul>

  <details class="more" data-review-id="plus-vypadek">
<summary>Výpadek připojení, MOJE eet, EET OFF a&nbsp;sleva na&nbsp;dani</summary>
<div>
<ul class="dots">
  <li><strong>Výpadek.</strong> Pokladna čeká na&nbsp;potvrzení nejméně 2&nbsp;sekundy (mezní doba odezvy). Když potvrzení nepřijde, tržbu uloží a&nbsp;odešle po&nbsp;obnovení spojení, nejpozději do&nbsp;48&nbsp;hodin. Provoz se&nbsp;nepřerušuje. Odeslání ve&nbsp;lhůtě není přestupek.</li>
  <li><strong>MOJE eet.</strong> Bezplatná webová pokladna Finanční správy od&nbsp;1.&nbsp;12.&nbsp;2026 pro&nbsp;podnikatele s&nbsp;nejvýše dvěma evidenčními jednotkami. Certifikát si zajistí sama.</li>
  <li><strong>EET OFF.</strong> Fyzická osoba v&nbsp;prvním pásmu paušální daně s&nbsp;příjmy do&nbsp;1&nbsp;000&nbsp;000&nbsp;Kč se&nbsp;může evidence zprostit přirážkou 1&nbsp;400&nbsp;Kč měsíčně. Oznámení pro&nbsp;rok 2027 se&nbsp;podává do&nbsp;10.&nbsp;1.&nbsp;2027 (den připadá na&nbsp;neděli, lhůta končí v&nbsp;pondělí 11.&nbsp;1.). Právnické osoby tuto možnost nemají.</li>
  <li><strong>Sleva na&nbsp;dani.</strong> Fyzická osoba si v&nbsp;prvním roce, kdy zaeviduje povinnou tržbu, odečte z&nbsp;daně až&nbsp;5&nbsp;000&nbsp;Kč. Platí i&nbsp;pro&nbsp;ty, kdo evidovali v&nbsp;EET&nbsp;1.0.</li>
</ul>
</div>
</details>
</section>

<section id="dozor" data-review-id="section-dozor">
  <span class="section-label">06 - Dozor</span>
  <h2>Co se&nbsp;stane, když tržby <span class="accent">neevidujete</span></h2>
  <p class="lead">Dozor vykonává Finanční správa, Celní správa prověřuje plnění povinností na&nbsp;místě. Zákon zná dva přestupky: <strong>nezaslání údajů o&nbsp;evidované tržbě</strong> (§&nbsp;24) a&nbsp;<strong>závažné ztěžování nebo maření evidence</strong> (§&nbsp;23). U&nbsp;obou je horní hranice pokuty 500&nbsp;000&nbsp;Kč, místo pokuty lze uložit napomenutí. Uzavření provozovny ani pozastavení činnosti zákon neumožňuje.</p>
  <div class="callout ok" data-review-id="callout-pocita-se">
    <span class="label">Co se&nbsp;počítá</span>
    <p>Tržba odeslaná po&nbsp;výpadku do&nbsp;48&nbsp;hodin není přestupek. Neoznámená evidenční jednotka se&nbsp;řeší pokutou podle daňového řádu, ne&nbsp;podle zákona o&nbsp;evidenci tržeb. V&nbsp;lednu 2027 Finanční správa slibuje metodickou podporu místo sankcí, povinnost ale platí od&nbsp;prvního dne.</p>
  </div>
</section>

<section id="postup" data-review-id="section-postup">
  <span class="section-label">07 - Postup</span>
  <h2>Jak se&nbsp;připravit <span class="accent">do&nbsp;1.&nbsp;1.&nbsp;2027</span></h2>
  <p class="lead">Příprava má pět kroků a&nbsp;u&nbsp;většiny e-shopů skončí hned u&nbsp;prvního: zjistit, zda vůbec přijímáte platby na&nbsp;místě.</p>
  <ol class="flow" data-review-id="kroky">
    <li><b>Zjistěte, kde zákazníci platí na&nbsp;místě</b>Prodejna, výdejní místo, vlastní rozvoz, stánek na&nbsp;akci. Když žádné takové místo nemáte, evidovat nemusíte a&nbsp;další kroky se&nbsp;vás netýkají.</li>
    <li><b>Ověřte pokladní systém u&nbsp;dodavatele</b>Zda bude k&nbsp;1.&nbsp;1.&nbsp;2027 napojený na&nbsp;rozhraní EET&nbsp;2.0, kdy vydá aktualizaci a&nbsp;zda umí automatickou obnovu certifikátu.</li>
    <li><b>Od&nbsp;1.&nbsp;11.&nbsp;2026 vyřiďte DIS+</b>Na&nbsp;portálu MOJE daně se&nbsp;přihlaste k&nbsp;EET, oznamte evidenční jednotky včetně webu a&nbsp;vygenerujte pokladní certifikát. Nahrajte ho do&nbsp;pokladny.</li>
    <li><b>Nastavte e-shop</b>Platební metody u&nbsp;osobního odběru a&nbsp;výdejních míst, dobírku vlastním rozvozem, poukazy a&nbsp;kredit, proces vratek. Ať je jasné, které platby končí v&nbsp;pokladně a&nbsp;které v&nbsp;platební bráně.</li>
    <li><b>Vyzkoušejte a&nbsp;spusťte</b>Od&nbsp;1.&nbsp;11.&nbsp;2026 běží produkční rozhraní v&nbsp;ověřovacím režimu. Od&nbsp;1.&nbsp;1.&nbsp;2027 běží evidence naostro.</li>
  </ol>
</section>

<section id="pomoc" data-review-id="section-pomoc">
  <span class="section-label">08 - Služby</span>
  <h2>S&nbsp;čím <span class="accent">pomůžeme</span></h2>
  <p class="lead">Pokladnu řeší její dodavatel. My se&nbsp;postaráme o&nbsp;to, aby e-shop a&nbsp;platby na&nbsp;místě do&nbsp;sebe zapadaly.</p>
  <div class="cards" data-review-id="sluzby">
    <div class="card"><h3>Posouzení platebních míst</h3><p>Projdeme, kde a&nbsp;jak vaši zákazníci platí, a&nbsp;řekneme, co z&nbsp;toho evidenci podléhá.</p></div>
    <div class="card"><h3>Nastavení platebních metod</h3><p>Osobní odběr, výdejní místa, dobírka a&nbsp;vlastní rozvoz v&nbsp;e-shopu tak, aby bylo jasné, co končí v&nbsp;pokladně.</p></div>
    <div class="card"><h3>Poukazy a&nbsp;kredit</h3><p>Nastavení dárkových poukazů a&nbsp;zákaznického kreditu s&nbsp;ohledem na&nbsp;evidenci nabití a&nbsp;čerpání.</p></div>
    <div class="card"><h3>Vratky a&nbsp;storna</h3><p>Proces vracení peněz za&nbsp;online i&nbsp;hotovostní nákupy, aby odpovídal pravidlům pro&nbsp;zápornou tržbu.</p></div>
    <div class="card"><h3>Podklady pro&nbsp;dodavatele pokladny</h3><p>Co musí pokladna na&nbsp;výdejním místě umět a&nbsp;jaká data z&nbsp;e-shopu potřebuje.</p></div>
    <div class="card"><h3>Texty pro&nbsp;zákazníky</h3><p>Informace o&nbsp;platbách na&nbsp;webu, v&nbsp;pokladně a&nbsp;v&nbsp;e-mailech k&nbsp;objednávce.</p></div>
  </div>
</section>

<section id="kontakt" data-review-id="section-kontakt">
  <span class="section-label">09 - Kontakt</span>
  <div class="keybox" data-review-id="cta">
    <span class="label">Další krok</span>
    <p><strong>Nevíte, zda se&nbsp;vás nová evidence týká?</strong> Ozvěte se&nbsp;svému projektovému manažerovi v&nbsp;PragueBest, nebo napište na&nbsp;<a href="mailto:produktaci@praguebest.cz?subject=EET%202.0">produktaci@praguebest.cz</a> s&nbsp;předmětem „EET&nbsp;2.0“. Projdeme s&nbsp;vámi současné řešení a&nbsp;pomůžeme najít vhodný způsob evidence.</p>
  </div>
</section>

</main>

<footer class="doc-footer" data-review-id="footer">
  <p>Zdroje: <a href="https://www.zakonyprolidi.cz/cs/2026-180">zákon č.&nbsp;180/2026&nbsp;Sb.</a> · <a href="https://www.psp.cz/sqw/historie.sqw?o=10&amp;t=189">důvodová zpráva, sněmovní tisk 189</a> · <a href="https://eet.gov.cz/">eet.gov.cz</a> · <a href="https://eet.gov.cz/cs/o-eet/dokumenty-k-eet-2-0">metodika Finanční správy: Popis položek datové zprávy, Příručka EET&nbsp;2.0</a></p>
  <p>PragueBest&nbsp;s.r.o. · podklad pro&nbsp;klienty · verze ${VERZE}, ${DATUM}</p>
</footer>
`;

module.exports = {
  file: 'index.html',
  base: '',
  title: 'EET 2.0 od 1. 1. 2027: co se mění pro e-shopy | PragueBest',
  description: 'Zákon č. 180/2026 Sb. vrací evidenci tržeb od 1. 1. 2027. Platby přes e-shop se neevidují, platby při osobním převzetí ano. Patnáct situací z e-shopů, co pokladna posílá a jak se připravit.',
  stickyTitle: 'EET 2.0 pro e-shopy',
  sticky,
  body,
  extraCss: extraCss + KVIZ_CSS,
  extraScript: KVIZ_JS,
};
