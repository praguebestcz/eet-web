# EET 2.0 od 1. 1. 2027 - informační stránka pro klienty

Stránka PragueBest pro klienty: co se s evidencí tržeb mění pro e‑shopy, které platby se evidují a které ne, co pokladna posílá Finanční správě a jak se připravit. Živě na https://eet.pbst.app.

Stejná kostra jako https://eaa.praguebest.cz a https://oznacovani-ai-obsahu.praguebest.cz.

## Co je v repu

* `index.html` - hotová stránka. **Generuje se, needitovat ručně** (přepíše se při dalším sestavení).
* `build/stranka.js` - obsah stránky: texty, tabulky, sekce, odkazy.
* `build/diagramy.js` - diagramy jako inline SVG (kde zákazník platí, tok evidované tržby).
* `build/lib.js` - sdílená kostra, CSS, sticky navigace, tisk (shodné s EAA).
* `build/nbsp.js` - pevné mezery a nezalomitelné spojovníky podle českého pravopisu.
* `build/build.js` - sestavení stránky.
* `fonts/` - self‑hosted Inter a JetBrains Mono (woff2, latin + latin‑ext).
* `vercel.json` - statické nasazení bez buildu.

## Úprava textů

1. Upravit `build/stranka.js` (texty) nebo `build/diagramy.js` (diagramy).
2. Sestavit: `node build/build.js` (stačí Node.js, bez závislostí).
3. Commit a push do `main`.

## Nasazení

Vercel projekt `eet-web` (tým PragueBest's projects) je napojený na toto repo. Push do `main` = nasazení na produkci.

## Zdroje faktů

Zákon č. 180/2026 Sb., o evidenci tržeb (Sbírka zákonů 7. 10. 2026), důvodová zpráva (sněmovní tisk 189), materiály Finanční správy na eet.gov.cz (Popis položek datové zprávy v1.0, Příručka EET 2.0, leták Evidenční jednotka, harmonogram). Rešerše k 26. 10. 2026.

Související: novinka pro nový web PragueBest v repu `spec-workspace` → `projects/mastershop/outputs/pb-web-novinky/02-eet-2-0.md`.
