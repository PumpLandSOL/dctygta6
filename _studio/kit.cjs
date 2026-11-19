// DCTY brand kit: pfp, banner, share image and the comparison graphics.  node _studio/kit.cjs [name]
'use strict';
const fs = require('fs'), path = require('path'), { open } = require('./cdp.cjs');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'brand'), SRC = path.join(__dirname, 'kit'); fs.mkdirSync(OUT, { recursive: true }); fs.mkdirSync(SRC, { recursive: true });
const url = (f) => 'file:///' + f.split(path.sep).join('/'), img = (n) => "'" + encodeURI(url(path.join(ROOT, 'site', n))) + "'";
// fill these in when they exist, then re-run
const SITE = 'dctygta6.com', X = '';
const CA = '6GTDzJNqDfJ7v4kpmbs4aupxQZnVwgRqTD4WFU7fpump', RUN = '9hjBLBrc7WZW2H8UQvBAvG5WiTZotXUv2Bdcn4f4pump';
// market caps: DexScreener, 19 Nov 2026
const DATE = '19 NOV 2026', MC_OG = '$15.3K', MC_RUN = '$14.9M', GAP = '977x';
const LINE = [SITE, X].filter(Boolean).join(' · ') || 'DacityCoin · $DCTY';

const page = (W, H, body, extra = '') => `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800;900&family=DM+Mono:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}body{width:${W}px;height:${H}px;overflow:hidden;position:relative;background:#190d2b;color:#fff3fa;font:400 28px/1.4 Inter,sans-serif;-webkit-font-smoothing:antialiased}
body:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.02) 0 1px,transparent 1px 4px)}
.d{font-family:Unbounded,sans-serif;font-weight:800;letter-spacing:-.03em;line-height:1}.m{font-family:'DM Mono',monospace;letter-spacing:.18em;text-transform:uppercase}.p{color:#f2479d}.dim{color:#b79dc9}.ok{color:#7dffb8}.no{color:#ff5a6e}
.abs{position:absolute}.glow{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(242,71,157,.5),transparent)}
.coin{position:absolute;border-radius:50%;background:#f2479d url(${img('coin.png')}) center/101% no-repeat;box-shadow:0 0 0 10px #c22b78,0 30px 80px rgba(0,0,0,.55),inset 0 0 0 5px rgba(255,255,255,.14)}
.tile{position:absolute;border-radius:28px;overflow:hidden;background:#000 center/cover no-repeat}
.foot{position:absolute;left:70px;right:70px;bottom:44px;display:flex;justify-content:space-between;font:400 17px 'DM Mono',monospace;letter-spacing:.18em;text-transform:uppercase;color:#b79dc9}
.badge{position:absolute;font:500 22px 'DM Mono',monospace;letter-spacing:.14em;padding:12px 20px;border-radius:999px;background:rgba(10,4,20,.86)}
${extra}</style></head><body>${body}<script>window.__no3d=true</script></body></html>`;
const foot = (r = LINE) => `<div class="foot"><span>$DCTY · the right coin</span><span>${r}</span></div>`;
const head = (t) => `<div class="abs m p" style="left:70px;top:56px;font-size:19px">${t}</div>`;
const coin = (x, y, s) => `<div class="coin" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px"></div>`;

// the timeline: every earlier coin with the DCTY ticker or the pink coin image, with its on-chain mint time. Built by _studio/timeline.json.
const TL = JSON.parse(fs.readFileSync(path.join(__dirname, 'timeline.json'), 'utf8')), ROWS = TL.rows, ME = ROWS.find((r) => r.me), AFTER = TL.after;
const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'], p2 = (n) => String(n).padStart(2, '0');
const when = (t, sec) => { const d = new Date(t); return `${p2(d.getUTCDate())} ${MON[d.getUTCMonth()]} · ${p2(d.getUTCHours())}:${p2(d.getUTCMinutes())}${sec ? ':' + p2(d.getUTCSeconds()) : ''}`; };
const mark = (ok) => `<span class="${ok ? 'ok' : 'no'}">${ok ? '✓' : '✗'}</span>`;
const thumb = (r, x, y, s, rad = 18) => `<div class="tile" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:${rad}px;background-image:url(${img(r.img)});box-shadow:0 0 0 3px ${r.me ? '#7dffb8' : 'rgba(255,90,110,.75)'}"></div>`;

const G = {
  'dcty-g07-timeline': [1600, 900, `${head('Mint order · on-chain timestamps, UTC')}<div class="abs d" style="left:70px;top:104px;font-size:58px">${TL.before} Dacity coins came first.<br><span class="p">None got all three right.</span></div>
    <div class="abs" style="left:70px;right:70px;top:498px;height:2px;background:linear-gradient(90deg,rgba(255,90,110,.7),rgba(255,90,110,.7) 86%,#7dffb8)"></div>
    ${ROWS.map((r, i) => { const x = 70 + i * 184; return `${thumb(r, x, 300, 172)}<div class="abs" style="left:${x + 80}px;top:491px;width:14px;height:14px;border-radius:50%;background:${r.me ? '#7dffb8' : '#ff5a6e'}"></div>
      <div class="abs m" style="left:${x}px;top:524px;width:172px;font-size:14px;letter-spacing:.06em;color:${r.me ? '#7dffb8' : '#fff3fa'}">${when(r.time)}</div>
      <div class="abs" style="left:${x}px;top:552px;width:172px;font:500 15px/1.5 'DM Mono',monospace"><span class="dim">ticker</span> ${mark(r.t)} ${r.ticker}<br><span class="dim">name</span> ${mark(r.n)}<br><span class="dim">image</span> ${mark(r.i)}</div>
      <div class="abs m ${r.me ? 'ok' : 'no'}" style="left:${x}px;top:640px;width:172px;font-size:12.5px;letter-spacing:.06em;line-height:1.5">${r.me ? 'first with all three' : r.what}</div>`; }).join('')}
    <div class="abs m dim" style="left:70px;top:740px;font-size:15px;letter-spacing:.1em">Shown: every earlier coin with the DCTY ticker or the pink coin image. Source: Solana, DexScreener.</div>`],
  'dcty-g08-matrix': [1600, 900, `${head('The receipts · on-chain')}<div class="abs d" style="left:70px;top:108px;font-size:52px">Ticker. Name. Image. <span class="p">One coin has all three.</span></div>
    <div class="abs m dim" style="left:70px;right:70px;top:214px;display:grid;grid-template-columns:90px 330px 1fr 250px 250px 200px;font-size:15px;align-items:center"><span></span><span>Minted (UTC)</span><span>Address</span><span>Ticker</span><span>Name</span><span>Image</span></div>
    ${ROWS.map((r, i) => `<div class="abs" style="left:70px;right:70px;top:${244 + i * 66}px;height:66px;border-top:1px solid rgba(242,71,157,.28);display:grid;grid-template-columns:90px 330px 1fr 250px 250px 200px;align-items:center;font:500 20px 'DM Mono',monospace;${r.me ? 'background:rgba(125,255,184,.09)' : ''}"><span style="width:52px;height:52px;border-radius:10px;background:#000 url(${img(r.img)}) center/cover"></span><span class="${r.me ? 'ok' : ''}">${when(r.time, true)}</span><span class="dim">${r.a.slice(0, 6)}…${r.a.slice(-4)}</span><span>${mark(r.t)} ${r.ticker}</span><span>${mark(r.n)} ${r.name}</span><span>${mark(r.i)} ${r.me ? 'the coin' : r.short}</span></div>`).join('')}`],
  'dcty-g09-first': [1600, 900, `<div class="glow" style="right:-80px;top:40px;width:820px;height:820px"></div>${coin(1040, 200, 440)}${head('Minted on Solana')}
    <div class="abs d p" style="left:64px;top:118px;font-size:250px;font-weight:900;letter-spacing:-.05em">FIRST.</div>
    <div class="abs d" style="left:70px;top:408px;font-size:44px;width:900px;line-height:1.12">The first DacityCoin with the right ticker, the right name and the right image.</div>
    <div class="abs" style="left:70px;top:610px;border:2px solid #7dffb8;border-radius:20px;padding:20px 28px"><div class="m ok" style="font-size:16px">mint timestamp</div><div style="font:500 40px 'DM Mono',monospace;margin-top:6px">${when(ME.time, true).replace(' · ', ' 2026 · ')} UTC</div></div>`],
  'dcty-g10-copies': [1600, 900, `${head('After the mint')}<div class="abs d" style="left:70px;top:112px;font-size:50px">Then the copies came. <span class="p">Same image, later.</span></div>
    ${[ME, ...AFTER].map((r, i) => { const x = 70 + i * 500; return `${thumb({ ...r, me: i === 0 }, x, 250, 420, 26)}<div class="badge ${i ? 'no' : 'ok'}" style="left:${x + 18}px;top:${268}px">${i ? '✗ COPY' : '✓ FIRST'}</div><div class="abs" style="left:${x}px;top:694px;width:420px;font:500 26px 'DM Mono',monospace">${when(r.time, true)} UTC</div><div class="abs m ${i ? 'no' : 'ok'}" style="left:${x}px;top:736px;width:420px;font-size:17px">${i ? '+' + r.late + ' later' : 'the original'} · ${r.a.slice(0, 4)}…${r.a.slice(-4)}</div>`; }).join('')}`],
  'dcty-pfp': [800, 800, `<div class="glow" style="inset:-10%"></div>${coin(100, 100, 600)}`],
  'dcty-banner': [1500, 500, `<div class="abs d" style="left:-30px;top:60px;font-size:430px;font-weight:900;color:transparent;-webkit-text-stroke:2px rgba(242,71,157,.22);letter-spacing:-.06em">DCTY</div><div class="glow" style="right:40px;top:-80px;width:660px;height:660px"></div>${coin(1010, 70, 360)}
    <div class="abs d" style="left:70px;top:150px;font-size:62px">Same name. Same ticker.<br><span class="p">Only one has the coin.</span></div><div class="abs m dim" style="left:72px;top:330px;font-size:18px">DacityCoin · $DCTY · community takeover</div>`],
  'og-share': [1200, 630, `<div class="glow" style="right:-40px;top:-60px;width:760px;height:760px"></div>${coin(700, 105, 420)}<div class="abs m p" style="left:60px;top:60px;font-size:18px">$DCTY · the right coin</div>
    <div class="abs d" style="left:60px;top:210px;font-size:60px;width:640px">Same name.<br>Same ticker.<br><span class="p">Only one has the coin.</span></div>`],
  'dcty-g01-spot': [1600, 900, `${head('Spot the difference')}<div class="abs d" style="left:70px;top:104px;font-size:62px">Two DacityCoins. <span class="p">One face is wrong.</span></div>
    <div class="tile" style="left:70px;top:236px;width:540px;height:540px;background-image:url(${img('og.png')});box-shadow:0 0 0 4px #7dffb8"></div><div class="badge ok" style="left:92px;top:258px">✓ THE COIN</div>
    <div class="tile" style="left:990px;top:236px;width:540px;height:540px;background-image:url(${img('runner.png')});box-shadow:0 0 0 4px #ff5a6e"></div><div class="badge no" style="left:1012px;top:258px">✗ JUST A LOGO</div>
    <div class="abs d" style="left:610px;top:440px;width:380px;text-align:center;font-size:92px;color:#b79dc9">VS</div>
    <div class="abs m" style="left:70px;top:796px;width:540px;text-align:center;font-size:20px">this DCTY · <span class="ok">${MC_OG}</span> market cap</div><div class="abs m" style="left:990px;top:796px;width:540px;text-align:center;font-size:20px">the runner · <span class="no">${MC_RUN}</span> market cap</div>`, 'nofoot'],
  'dcty-g02-table': [1600, 900, `${head('The receipts · ' + DATE)}<div class="abs d" style="left:70px;top:104px;font-size:60px">Same everything. <span class="p">Except the picture.</span></div>
    <div class="tile" style="left:640px;top:236px;width:150px;height:150px;background-image:url(${img('og.png')})"></div><div class="tile" style="left:1120px;top:236px;width:150px;height:150px;background-image:url(${img('runner.png')})"></div>
    ${[['Name', 'DacityCoin', 'DacityCoin', '', ''], ['Ticker', 'DCTY', 'DCTY', '', ''], ['Image', '✓ the coin', '✗ logo only', 'ok', 'no'], ['Image can change', 'never', 'never', '', 'no'], ['Market cap', MC_OG, MC_RUN, 'p', '']].map(([k, a, b, ca, cb], i) => `<div class="abs" style="left:70px;right:70px;top:${410 + i * 76}px;height:76px;border-top:1px solid rgba(242,71,157,.3);display:grid;grid-template-columns:570px 480px 1fr;align-items:center"><span class="m dim" style="font-size:20px">${k}</span><span class="d ${ca}" style="font-size:34px;font-weight:600">${a}</span><span class="d ${cb}" style="font-size:34px;font-weight:600">${b}</span></div>`).join('')}`],
  'dcty-g03-gap': [1600, 900, `<div class="glow" style="left:-200px;top:-100px;width:1100px;height:1100px"></div>${head('By market cap · ' + DATE)}
    <div class="abs d p" style="left:60px;top:170px;font-size:330px;font-weight:900;letter-spacing:-.06em">${GAP}</div>
    <div class="abs d" style="left:70px;top:590px;font-size:56px;width:1000px">The wrong picture is worth ${MC_RUN}.<br><span class="p">The right coin is at ${MC_OG}.</span></div>${coin(1190, 190, 330)}`],
  'dcty-g04-forever': [1600, 900, `${head('On-chain fact')}<div class="abs d" style="left:70px;top:130px;font-size:84px">A coin's image<br><span class="p">is forever.</span></div>
    <div class="abs" style="left:70px;top:420px;width:760px;font-size:31px;color:#b79dc9;line-height:1.45">Both DacityCoins have their update authority set to none. The runner can never swap its picture for the coin.</div>
    <div class="abs m" style="left:70px;top:640px;font-size:21px;line-height:2.1"><span class="dim">update authority ·</span> <span class="no">null</span><br><span class="dim">image ·</span> <span class="no">locked as minted</span></div>
    <div class="tile" style="left:960px;top:150px;width:560px;height:560px;background-image:url(${img('runner.png')});box-shadow:0 0 0 4px #ff5a6e;filter:saturate(.75)"></div><div class="abs d no" style="left:960px;top:150px;width:560px;height:560px;display:grid;place-items:center;font-size:120px;transform:rotate(-12deg);text-shadow:0 6px 30px #000">LOCKED</div>`],
  'dcty-g05-address': [1600, 900, `${head('Check before you buy')}<div class="abs d" style="left:70px;top:120px;font-size:96px">Two tickers.<br><span class="p">One address.</span></div>${coin(1180, 90, 330)}
    <div class="abs" style="left:70px;right:70px;top:470px;border:3px solid #7dffb8;border-radius:26px;padding:30px 34px"><div class="m ok" style="font-size:19px">✓ the right coin</div><div style="font:500 37px 'DM Mono',monospace;margin-top:12px;letter-spacing:.01em">${CA}</div></div>
    <div class="abs" style="left:70px;right:70px;top:672px;border:2px solid rgba(255,90,110,.6);border-radius:26px;padding:22px 34px;opacity:.85"><div class="m no" style="font-size:17px">✗ not this one</div><div style="font:400 27px 'DM Mono',monospace;margin-top:8px;color:#b79dc9;text-decoration:line-through">${RUN}</div></div>`],
  'dcty-g06-keyart': [1600, 900, `<div class="abs d" style="left:-40px;top:150px;font-size:640px;font-weight:900;color:transparent;-webkit-text-stroke:2px rgba(242,71,157,.25);letter-spacing:-.06em">DCTY</div><div class="glow" style="left:400px;top:50px;width:800px;height:800px"></div>${coin(560, 110, 480)}
    <div class="abs d" style="left:0;right:0;top:650px;text-align:center;font-size:64px">Only one <span class="p">has the coin.</span></div>`],
};

(async () => { const only = process.argv[2], names = Object.keys(G).filter((n) => !only || n.includes(only)); const b = await open('about:blank', 1600, 900, 9388);
  try { for (const n of names) { const [W, H, body, flag] = G[n], pure = n === 'dcty-pfp' || n === 'dcty-banner' || n === 'og-share' || flag === 'nofoot', f = path.join(SRC, n + '.html');
      fs.writeFileSync(f, page(W, H, body + (pure ? '' : foot()))); await b.load(url(f), W, H); const out = n === 'og-share' ? path.join(ROOT, 'site', 'og-share.png') : path.join(OUT, n + '.png'); await b.shot(out); console.log('wrote', path.relative(ROOT, out)); } } finally { b.close(); } })();
