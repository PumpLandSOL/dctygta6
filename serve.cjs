// local preview only: serves site/ as static files. The site itself is plain static and deploys as a Render Static Site.
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, 'site'), PORT = +process.env.PORT || 8306;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon' };
http.createServer((req, res) => { const p = decodeURIComponent(new URL(req.url, 'http://x').pathname), f = path.join(ROOT, p === '/' ? 'index.html' : path.normalize(p));
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-cache' }); fs.createReadStream(f).pipe(res); }).listen(PORT, () => console.log('dcty on :' + PORT));
