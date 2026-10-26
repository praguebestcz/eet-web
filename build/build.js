// Sestaví index.html z build/stranka.js (obsah) a build/lib.js (kostra, CSS, skripty).
// Spuštění: node build/build.js   (z kořene repa). Stačí Node.js, žádné závislosti.
// Po sestavení doplní pevné mezery podle českého pravopisu (build/nbsp.js).
const fs = require('fs');
const path = require('path');
const { page } = require('./lib');
const { nbsp } = require('./nbsp');

const OUT = path.join(__dirname, '..');
const stranka = require('./stranka');

const html = nbsp(page(stranka));
const f = path.join(OUT, stranka.file || 'index.html');
fs.writeFileSync(f, html, 'utf8');
console.log('OK', path.basename(f), Math.round(html.length / 1024) + ' kB, NBSP aplikováno');
