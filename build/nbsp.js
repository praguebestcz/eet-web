// Pevné mezery podle českého pravopisu - přepis _workspace/nbsp_apply.ps1 do Node, aby build běžel na Windows, Macu i na Vercelu.
// Pravidla se aplikují jen na text mezi `>` a `<`, bloky <script>, <style>, <code>, <pre> se vynechávají.
// Výstup musí být shodný s nbsp_apply.ps1 (.NET regex), proto vlastní třídy místo \d, \s, \b a $ - v JS znamenají něco trochu jiného.
const NBSP = ' ';
const NBH = '‑';

const D = '\\p{Nd}';
const S = '[\\f\\n\\r\\t\\v\\x85\\p{Z}]';
const W = '[\\p{L}\\p{Mn}\\p{Nd}\\p{Pc}]';
const B = `(?:(?<=${W})(?!${W})|(?<!${W})(?=${W}))`;
const KONEC = '\\n?$';
const ZA_PREDLOZKOU = `(?=[\\p{L}${D}„“’(]|${KONEC})`;

// Seznamy podle českého pravopisu. Do 9. 10. 2026 tu byly velké Č/Ž/Ř/Ě (kopie chyby nbsp_apply.ps1, kde se
// $c_c_caron a $C_C_caron kvůli case-insensitive názvům proměnných přepisovaly) - opraveno v obou skriptech.
const MESICE = 'ledna|února|března|dubna|května|června|července|srpna|září|října|listopadu|prosince';
const JEDNOTKY = 'Kč|km|kg|cm|mm|m|%|ks|dní|dni|hodin|hodiny|minut|minuty|let|MB|GB|TB|h';
const DVOUZNAKOVE = 'po|do|na|za|ve|od|ke|ku|se|ze|ač|že|či|Po|Do|Na|Za|Ve|Od|Ke|Ku|Se|Ze|Ač|Že|Či';

const PRAVIDLA = [
  // datum dd. m. yyyy
  [`(${D}{1,2})\\.${S}+(${D}{1,2})\\.${S}+(${D}{4})`, `$1.${NBSP}$2.${NBSP}$3`],
  // datum dd. měsíc
  [`(${D}{1,2})\\.${S}+(${MESICE})`, `$1.${NBSP}$2`],
  // velká čísla v tisících
  [`(${D})${S}+(${D}{3})(?=\\P{Nd}|${KONEC})`, `$1${NBSP}$2`],
  // číslo + jednotka
  [`(${D})${S}+(${JEDNOTKY})${B}`, `$1${NBSP}$2`],
  // dvouznakové předložky a spojky
  [`(?<!\\p{L})(${DVOUZNAKOVE})[ \\t]+${ZA_PREDLOZKOU}`, `$1${NBSP}`],
  // jednopísmenné předložky a spojky
  [`(?<!\\p{L})([aiosuvzkAIOSUVZK])[ \\t]+${ZA_PREDLOZKOU}`, `$1${NBSP}`],
  // tituly
  [`${B}(Mgr|Ing|Bc|MUDr|PhDr|JUDr|doc|prof|p)\\.${S}+(?=\\p{Lu})`, `$1.${NBSP}`],
  // zkratky + číslo
  [`(§|č\\.|str\\.|tab\\.|obr\\.)${S}+(?=${D})`, `$1${NBSP}`],
  // e-shop, e-mail: nezlomitelný spojovník
  ['(?<!\\p{L})(e|E)-(shop|shopu|shopem|shopech|shopy|mail|mailu|mailem|maily|mailem|mailova|mailová|mailové|mailový|mailových|mailovou|kniha|knihy|knih|doklad|dokladu|dokladem|fakturace|fakturaci|faktur|faktúr|kasa|kasy|kasu|kase|kasou)', `$1${NBH}$2`],
].map(([vzor, nahrada]) => [new RegExp(vzor, 'gu'), nahrada]);

function nbsp(html) {
  const vynechane = [];
  const maskovane = html.replace(/<(script|style|code|pre)\b[^>]*>[\s\S]*?<\/\1>/gi, (m) => {
    vynechane.push(m);
    return `\0PH${vynechane.length - 1}\0`;
  });
  const upravene = maskovane.replace(/(>)([^<]*)(<)/g, (m, a, text, c) => {
    if (text.trim().length === 0) return m;
    for (const [re, nahrada] of PRAVIDLA) text = text.replace(re, nahrada);
    return a + text + c;
  });
  return upravene.replace(/\0PH(\d+)\0/g, (m, i) => vynechane[Number(i)]);
}

module.exports = { nbsp };
