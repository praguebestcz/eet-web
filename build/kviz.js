// Rychlý test „Týká se vás to?“ - otázky Ano/Ne s bodováním a výsledkem. Bez knihoven, nic se neodesílá ani neukládá.
// Vzor: test v novinkách pro web PB a konfigurátor „Jak vybrat e-shopovou platformu“.
// kviz({ n, label, nadpis, akcent, lead, otazky: [{ q, ano, ne }], vysledky: [{ min, nadpis, text, odkaz, odkazText }] })
// Výsledek = položka s nejvyšším `min`, které je menší nebo rovno součtu bodů (záporný součet se bere jako 0).

function kviz(o) {
  const otazky = o.otazky.map((q, i) => `
      <li class="kv-q" data-ano="${q.ano || 0}" data-ne="${q.ne || 0}"><span class="kv-n">${i + 1}</span><span class="kv-t">${q.q}</span><span class="kv-btns"><button type="button" class="kv-btn" data-v="ano">Ano</button><button type="button" class="kv-btn" data-v="ne">Ne</button></span></li>`).join('');
  const vysledky = o.vysledky.map((v) => `
      <div class="kv-vysledek" data-min="${v.min}" hidden><b>${v.nadpis}</b><p>${v.text}</p><p><a class="btn" href="#kontakt">Ozvěte se nám</a>${v.odkaz ? ` <a class="btn sec" href="${v.odkaz}">${v.odkazText || 'Podrobnosti'}</a>` : ''}</p></div>`).join('');
  return `
<section id="test" data-review-id="section-test">
  <span class="section-label">${o.n} - Test</span>
  <h2>${o.nadpis} <span class="accent">${o.akcent}</span></h2>
  <p class="lead">${o.lead}</p>
  <div class="kviz" data-kviz data-review-id="kviz">
    <ol class="kv-list">${otazky}
    </ol>
    <div class="kv-foot"><span class="kv-stav">Odpovězeno 0 ze&nbsp;${o.otazky.length}</span><button type="button" class="kv-reset">Začít znovu</button></div>
    <div class="kv-res" hidden data-review-id="kviz-vysledek"><span class="label">Výsledek</span>${vysledky}
    </div>
  </div>
</section>
`;
}

const KVIZ_CSS = `
<style>
  .kviz { background: #fff; border: 1px solid var(--line); border-radius: 16px; max-width: 1000px; margin: 22px 0; }
  .kv-list { list-style: none; margin: 0; padding: 0; max-width: none; }
  .kv-q { display: flex; align-items: center; gap: 14px; padding: 14px 20px; margin: 0; border-bottom: 1px solid var(--line-soft); }
  .kv-n { font-weight: 800; color: var(--accent); min-width: 18px; font-size: 14px; }
  .kv-t { flex: 1; font-size: 15.5px; color: var(--ink); line-height: 1.4; }
  .kv-btns { display: flex; gap: 6px; flex: none; }
  .kv-btn { font: inherit; font-size: 12.5px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; padding: 7px 14px; border: 1.5px solid var(--ink); background: #fff; color: var(--ink); border-radius: 8px; cursor: pointer; }
  .kv-btn:hover { border-color: var(--accent); color: var(--accent); }
  .kv-btn.on { background: var(--ink); color: #fff; border-color: var(--ink); }
  .kv-btn.on[data-v="ano"] { background: var(--accent); border-color: var(--accent); }
  .kv-foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 20px; font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); font-weight: 600; }
  .kv-reset { font: inherit; font-size: 11.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; background: none; border: 0; border-bottom: 2px solid var(--accent); color: var(--ink); cursor: pointer; padding: 0 0 2px; }
  .kv-res { margin: 0 20px 20px; background: var(--ink); color: #fff; border-radius: 14px; padding: 22px 24px 12px; }
  .kv-res[hidden] { display: none; }
  .kv-res .label { display: block; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--accent-bright); font-weight: 700; margin-bottom: 8px; }
  .kv-res b { display: block; font-size: 19px; letter-spacing: -0.01em; color: #fff; margin-bottom: 6px; }
  .kv-res p { color: #e5e5e5; font-size: 15.5px; margin-bottom: 12px; max-width: 860px; }
  .kv-res .btn { margin: 0 8px 8px 0; }
  .kv-res .btn.sec { background: transparent; color: #fff; border-color: rgba(255,255,255,.55); }
  .kv-res .btn.sec:hover { background: rgba(255,255,255,.1); }
  .kv-vysledek[hidden] { display: none; }
  @media (max-width: 720px) { .kv-q { flex-wrap: wrap; } .kv-btns { width: 100%; justify-content: flex-end; } .kv-res { margin: 0 12px 12px; padding: 18px 16px 8px; } }
  @media print { .kv-btns, .kv-foot, .kv-res { display: none !important; } .kviz { border: 0; } .kv-q { padding: 4px 0; border: 0; } }
</style>`;

const KVIZ_JS = `
<script>
(function(){
  var kvizy = document.querySelectorAll('[data-kviz]');
  Array.prototype.forEach.call(kvizy, function(k){
    var qs = Array.prototype.slice.call(k.querySelectorAll('.kv-q'));
    var stav = k.querySelector('.kv-stav');
    var res = k.querySelector('.kv-res');
    var vys = Array.prototype.slice.call(k.querySelectorAll('.kv-vysledek'));
    function update(scrollTo){
      var answered = 0, score = 0;
      qs.forEach(function(q){
        var on = q.querySelector('.kv-btn.on');
        if (!on) return;
        answered++;
        score += Number(on.getAttribute('data-v') === 'ano' ? q.getAttribute('data-ano') : q.getAttribute('data-ne')) || 0;
      });
      stav.textContent = 'Odpovězeno ' + answered + ' ze ' + qs.length;
      if (answered === qs.length) {
        var s = Math.max(score, 0), best = null;
        vys.forEach(function(v){ var m = Number(v.getAttribute('data-min')); if (m <= s && (best === null || m > Number(best.getAttribute('data-min')))) best = v; });
        vys.forEach(function(v){ v.hidden = (v !== best); });
        res.hidden = false;
        if (scrollTo) res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        res.hidden = true;
      }
    }
    k.addEventListener('click', function(e){
      var b = e.target.closest('.kv-btn');
      if (b) {
        var q = b.closest('.kv-q');
        Array.prototype.forEach.call(q.querySelectorAll('.kv-btn'), function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        update(true);
        return;
      }
      if (e.target.closest('.kv-reset')) {
        Array.prototype.forEach.call(k.querySelectorAll('.kv-btn.on'), function(x){ x.classList.remove('on'); });
        update(false);
      }
    });
    update(false);
  });
})();
</script>`;

module.exports = { kviz, KVIZ_CSS, KVIZ_JS };
