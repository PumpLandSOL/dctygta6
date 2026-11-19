// DCTY X kit: writes brand/X-KIT.md and fails if any tweet is over 245 characters.  node _studio/tweets.cjs
'use strict';
const fs = require('fs'), path = require('path');
// fill SITE in when the domain exists (no https://), then re-run: every tweet gets its link, deep-linked to the section it is about
const SITE = 'dctygta6.com', CA = '6GTDzJNqDfJ7v4kpmbs4aupxQZnVwgRqTD4WFU7fpump';
const len = (s) => [...s].length, NL = String.fromCharCode(10), link = (hash) => (SITE ? NL + NL + 'https://' + SITE + (hash || '') : '');
const NAME = 'DCTY | the right coin';
const BIO = 'Two DacityCoins share one name and one ticker. Only one was minted with the coin. Community takeover. $DCTY';
const DESC = 'DCTY is the DacityCoin minted with the coin itself as its image. Another DacityCoin with the same name and ticker was minted with only the logo, and because both tokens have no update authority, neither picture can ever be changed. This is a community takeover of the one that got it right. Check the address before you buy: it starts with 6GTD.';
// [title, media, section, text]. Market caps: DexScreener, 19 Nov 2026.
const T = [
  ['Pinned', 'dcty-g01-spot.png', '#spot', `Spot the difference.

Two DacityCoins. Same name. Same ticker.
One was minted with the coin. One was minted with a logo.

The logo is at a $14.9M market cap.
The coin is at $15K.

$DCTY`],
  ['The address', 'dcty-g05-address.png', '#buy', `Two coins trade as $DCTY, so the ticker tells you nothing.

The right one starts with 6GTD:

${CA}`],
  ['Receipts', 'dcty-g02-table.png', '#spot', `Name: identical.
Ticker: identical.
Image: one is the coin, one is not.

That single row is the whole trade.

$DCTY`],
  ['The gap', 'dcty-g03-gap.png', '#spot', `977x.

That is how far the market cap of the wrong picture sits above the market cap of the right coin today.

Same name. Same ticker. 977x apart.

$DCTY`],
  ['Forever', 'dcty-g04-forever.png', '', `Neither DacityCoin has an update authority. The pictures are locked for good.

So the $14.9M one keeps the wrong image forever, and the right image only exists here.

$DCTY`],
  ['Key art', 'dcty-g06-keyart.png', '', `Only one has the coin.

$DCTY`],
  ['Takeover', 'dcty-banner.png', '#buy', `Nobody owns this one. The community took it over because it is the DacityCoin that was minted right.

Site is up. Receipts are on it. The address is on it.

$DCTY`],
];
let bad = 0, out = `# DCTY X kit${NL}${NL}Display name:${NL}${NL}\`\`\`${NL}${NAME}${NL}\`\`\`${NL}${NL}Bio (${len(BIO)}):${NL}${NL}\`\`\`${NL}${BIO}${NL}\`\`\`${NL}${NL}pump.fun / DexScreener description:${NL}${NL}\`\`\`${NL}${DESC}${NL}\`\`\`${NL}`;
const seen = new Set();
for (const [title, media, hash, text] of T) { const full = text.replace(/(\n\n\$DCTY)?$/, (m) => link(hash) + (m || '')), n = len(full), reserve = SITE ? 0 : 40; const ok = n + reserve <= 245 && !seen.has(media) && fs.existsSync(path.join(__dirname, '..', 'brand', media)); seen.add(media); if (!ok) bad++;
  console.log((ok ? 'ok   ' : 'BAD  ') + String(n).padStart(3) + '  ' + title); out += `${NL}## ${title} (${n} chars) · ${media}${NL}${NL}\`\`\`${NL}${full}${NL}\`\`\`${NL}`; }
if (len(BIO) > 160) { console.log('BAD  bio ' + len(BIO)); bad++; }
fs.writeFileSync(path.join(__dirname, '..', 'brand', 'X-KIT.md'), out); console.log(bad ? bad + ' problem(s)' : 'all ok, wrote brand/X-KIT.md'); process.exit(bad ? 1 : 0);
