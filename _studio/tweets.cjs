// DCTY X kit: writes brand/X-KIT.md and fails if any tweet is over 245 characters.  node _studio/tweets.cjs
'use strict';
const fs = require('fs'), path = require('path');
// fill SITE in when the domain exists (no https://), then re-run: every tweet gets its link, deep-linked to the section it is about
const SITE = 'dctygta6.com', CA = '6GTDzJNqDfJ7v4kpmbs4aupxQZnVwgRqTD4WFU7fpump';
const len = (s) => [...s].length, NL = String.fromCharCode(10), link = (hash) => (SITE ? NL + NL + 'https://' + SITE + (hash || '') : '');
const NAME = 'DCTY | the first with all three';
const BIO = "The first DacityCoin minted with the right ticker, name and image. 18 Nov 2026, 15:59:45 UTC. Check the timestamps. Community takeover. $DCTY dctygta6.com";
const DESC = "DCTY is the first DacityCoin minted with the right ticker, the right name and the right image: 18 November 2026 at 15:59:45 UTC, recorded on Solana. 36 Dacity coins were minted before it, and every one has the wrong ticker, the wrong name or the wrong image, including the largest one, which carries an outline logo instead of the coin. Neither token has an update authority, so no image can ever be changed. This is a community takeover of the one that got it right. The full mint-order timeline with every address is at dctygta6.com. Check the address before you buy: it starts with 6GTD.";
// [title, media, section, text]. Market caps: DexScreener, 19 Nov 2026.
const T = [
  ['Pinned', 'dcty-g07-timeline.png', '#first', `36 Dacity coins were minted before this one.

Wrong ticker, wrong name or wrong image. Every one of them.

18 Nov, 15:59:45 UTC: the first DacityCoin with all three right.

$DCTY`],
  ['Receipts by timestamp', 'dcty-g08-matrix.png', '#first', `Ticker. Name. Image.

Seven earlier coins, each with its mint time straight from Solana. Each one misses at least one.

Row eight doesn't.

$DCTY`],
  ['First', 'dcty-g09-first.png', '#first', `18 November 2026, 15:59:45 UTC.

That is the block where the first DacityCoin with the right ticker, name and image was minted.

You can't backdate a block.

$DCTY`],
  ['Copies', 'dcty-g10-copies.png', '#first', `28 seconds after the mint, the first copy showed up with the same image.

8 minutes later, another.

Copies only copy the one that got it right.

$DCTY`],
  ['Spot the difference', 'dcty-g01-spot.png', '#spot', `Spot the difference.

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
