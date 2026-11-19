// DCTY X kit: writes brand/X-KIT.md and fails if any tweet is over 245 characters.  node _studio/tweets.cjs
'use strict';
const fs = require('fs'), path = require('path');
// fill SITE in when the domain exists (no https://), then re-run: every tweet gets its link, deep-linked to the section it is about
const SITE = 'dctygta6.com', CA = '6GTDzJNqDfJ7v4kpmbs4aupxQZnVwgRqTD4WFU7fpump';
const len = (s) => [...s].length, NL = String.fromCharCode(10), link = (hash) => (SITE ? NL + NL + 'https://' + SITE + (hash || '') : '');
const NAME = 'DCTY | the first with all three';
const BIO = "The first $DCTY with the correct logo and ticker. Minted 18 Nov 2026, 15:59:45 UTC. The runner has the wrong logo. Community takeover. dctygta6.com";
const DESC = "DCTY is the first DacityCoin minted with the right ticker, the right name and the right image: 18 November 2026 at 15:59:45 UTC, recorded on Solana. 36 Dacity coins were minted before it, and every one has the wrong ticker, the wrong name or the wrong image, including the largest one, which carries an outline logo instead of the coin. Neither token has an update authority, so no image can ever be changed. This is a community takeover of the one that got it right. The full mint-order timeline with every address is at dctygta6.com. Check the address before you buy: it starts with 6GTD.";
// [title, media, section, text]. Market caps: DexScreener, 19 Nov 2026.
const T = [
  ['Pinned', 'dcty-g07-timeline.png', '#first', `This is the first $DCTY with the correct logo and ticker.

The $10M runner has the wrong logo.

Minted 18 Nov, 15:59:45 UTC. It's on-chain.`],
  ['Receipts', 'dcty-g08-matrix.png', '#first', `Every $DCTY minted before this one, with its timestamp.

Each has the wrong logo or the wrong ticker.

This is the first with both correct.`],
  ['First', 'dcty-g09-first.png', '#first', `18 Nov 2026, 15:59:45 UTC.

The first $DCTY with the correct logo and ticker was minted.

That timestamp is on Solana. Nobody can change it.`],
  ['Copies', 'dcty-g10-copies.png', '#first', `28 seconds after this $DCTY was minted, a copy appeared with the same logo.

8 minutes later, another one.

They copied the first one that got it right.`],
  ['Spot the difference', 'dcty-g01-spot.png', '#spot', `Spot the difference.

Left: the correct $DCTY logo.
Right: the logo on the $10M runner.

Same ticker. Wrong logo on the big one.`],
  ['The address', 'dcty-g05-address.png', '#buy', `Two coins use the $DCTY ticker. Only one has the correct logo.

It starts with 6GTD:

${CA}`],
  ['Same ticker', 'dcty-g02-table.png', '#spot', `Same name. Same ticker.

One has the correct logo. The $10M runner doesn't.

$DCTY`],
  ['The gap', 'dcty-g03-gap.png', '#spot', `The $DCTY with the wrong logo: $10M market cap.

The $DCTY with the correct logo: $16K market cap.`],
  ['Forever', 'dcty-g04-forever.png', '', `A coin's logo can't be changed after it's minted.

The $10M runner has the wrong $DCTY logo forever.

This one was minted with the correct one.`],
  ['Key art', 'dcty-g06-keyart.png', '', `The first $DCTY with the correct logo and ticker.`],
  ['Takeover', 'dcty-banner.png', '#buy', `$DCTY is a community takeover.

The first one with the correct logo and ticker. The runner has the wrong logo.

Timestamps and the address are on the site.`],
];
let bad = 0, out = `# DCTY X kit${NL}${NL}Display name:${NL}${NL}\`\`\`${NL}${NAME}${NL}\`\`\`${NL}${NL}Bio (${len(BIO)}):${NL}${NL}\`\`\`${NL}${BIO}${NL}\`\`\`${NL}${NL}pump.fun / DexScreener description:${NL}${NL}\`\`\`${NL}${DESC}${NL}\`\`\`${NL}`;
const seen = new Set();
for (const [title, media, hash, text] of T) { const full = text + link(hash), n = len(full), reserve = SITE ? 0 : 40; const ok = n + reserve <= 245 && !seen.has(media) && fs.existsSync(path.join(__dirname, '..', 'brand', media)); seen.add(media); if (!ok) bad++;
  console.log((ok ? 'ok   ' : 'BAD  ') + String(n).padStart(3) + '  ' + title); out += `${NL}## ${title} (${n} chars) · ${media}${NL}${NL}\`\`\`${NL}${full}${NL}\`\`\`${NL}`; }
if (len(BIO) > 160) { console.log('BAD  bio ' + len(BIO)); bad++; }
fs.writeFileSync(path.join(__dirname, '..', 'brand', 'X-KIT.md'), out); console.log(bad ? bad + ' problem(s)' : 'all ok, wrote brand/X-KIT.md'); process.exit(bad ? 1 : 0);
