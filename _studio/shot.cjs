// node _studio/shot.cjs <file.html> <out.png> [W] [H] : render a local HTML file to PNG
'use strict';
const path = require('path'), { open } = require('./cdp.cjs');
const [src, out, W = 1600, H = 900] = process.argv.slice(2);
(async () => { const b = await open('about:blank', +W, +H, 9391); try { await b.load(encodeURI('file:///' + path.resolve(src).split(path.sep).join('/')), +W, +H); await b.shot(path.resolve(out)); console.log('wrote', out); } finally { b.close(); } })();
