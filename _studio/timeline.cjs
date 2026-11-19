// writes _studio/timeline.json and site/timeline.js from the scan (tokens.json) and exact mint times (times.json, optional)
// node _studio/timeline.cjs <scan dir>
'use strict';
const fs = require('fs'), path = require('path'), DIR = process.argv[2];
const list = JSON.parse(fs.readFileSync(path.join(DIR, 'tokens.json'), 'utf8')), T = fs.existsSync(path.join(DIR, 'times.json')) ? JSON.parse(fs.readFileSync(path.join(DIR, 'times.json'), 'utf8')) : {};
const OURS = '6GTDzJNqDfJ7v4kpmbs4aupxQZnVwgRqTD4WFU7fpump', OUR_TIME = Date.UTC(2026, 10, 18, 15, 59, 45); // pump.fun pair creation, matches the mint
const tok = (p) => list.find((e) => e.a.startsWith(p)), time = (e) => (T[e.a] && T[e.a].time) || (e.a === OURS ? OUR_TIME : e.created);
// [prefix, what the image is, short label]
const PRE = [['9hjBLB', 'outline logo, no coin', 'outline logo'], ['BQLQT9', 'grey metal render', 'grey render'], ['ZAdX9J', 'right coin, wrong ticker', 'the coin'], ['GgyKtb', 'outline logo in a ring', 'ring logo'], ['2oK1Ky', 'outline logo in a ring', 'ring logo'], ['Gakss2', 'outline logo, wrong name', 'outline logo'], ['HWeKyu', 'outline logo, no coin', 'outline logo'], ['6GTDzJ', '', 'the coin']];
const rows = PRE.map(([p, what, short]) => { const e = tok(p), ticker = (e.csym || e.sym).trim(), name = (e.cname || e.name).trim(), me = e.a === OURS;
  return { a: e.a, time: time(e), ticker, name, img: 'others/' + p + '.png', t: ticker === 'DCTY', n: name === 'DacityCoin', i: me || p === 'ZAdX9J', what, short, me }; }).sort((a, b) => a.time - b.time);
const mine = rows.find((r) => r.me), late = (ms) => { const s = Math.round(ms / 1000); return s < 120 ? s + ' sec' : Math.round(s / 60) + ' min'; };
const after = ['Fjoubg', '5qErNM'].map((p) => { const e = tok(p); return { a: e.a, time: time(e), ticker: (e.csym || e.sym).trim(), name: (e.cname || e.name).trim(), img: 'others/' + p + '.png', t: true, n: true, i: true, late: late(time(e) - mine.time) }; });
const before = list.filter((e) => e.a !== OURS && time(e) < mine.time).length;
const bad = rows.filter((r) => !r.me && (r.time >= mine.time || (r.t && r.n && r.i))).concat(after.filter((r) => r.time <= mine.time));
const out = { before, rows, after, checked: new Date().toISOString().slice(0, 10) };
fs.writeFileSync(path.join(__dirname, 'timeline.json'), JSON.stringify(out, null, 1)); fs.writeFileSync(path.join(__dirname, '..', 'site', 'timeline.js'), 'window.DCTY_TL = ' + JSON.stringify(out) + ';\n');
for (const r of rows) console.log(new Date(r.time).toISOString(), r.ticker.padEnd(7), r.name.padEnd(12), r.t ? 'T' : '-', r.n ? 'N' : '-', r.i ? 'I' : '-', r.me ? '<= ours' : '');
for (const r of after) console.log(new Date(r.time).toISOString(), 'copy +' + r.late);
console.log('before:', before, bad.length ? 'CLAIM BROKEN by ' + bad.map((r) => r.a.slice(0, 6)).join(',') : 'claim holds');
