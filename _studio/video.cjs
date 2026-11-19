// DCTY mint-order video (frame-exact, 1920x1080, 30 fps).  node _studio/video.cjs   ·   node _studio/video.cjs still 3,9.8,12,15
'use strict';
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process'), { open } = require('./cdp.cjs');
const ROOT = path.join(__dirname, '..'), B = path.join(ROOT, 'brand'), K = path.join(__dirname, 'kit'), FPS = 30, DUR = 17, NAME = 'dcty-first-17s';
const url = (f) => encodeURI('file:///' + f.split(path.sep).join('/')), img = (n) => "'" + url(path.join(ROOT, 'site', n)) + "'";
const TL = JSON.parse(fs.readFileSync(path.join(__dirname, 'timeline.json'), 'utf8')), ROWS = TL.rows, ME = ROWS.find((r) => r.me);
const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'], p2 = (n) => String(n).padStart(2, '0');
const when = (t) => { const d = new Date(t); return [`${p2(d.getUTCDate())} ${MON[d.getUTCMonth()]}`, `${p2(d.getUTCHours())}:${p2(d.getUTCMinutes())}:${p2(d.getUTCSeconds())}`]; };
const CW = 210, GAP = 16, X0 = (1920 - (ROWS.length * CW + (ROWS.length - 1) * GAP)) / 2;
const cards = ROWS.map((r, i) => { const [d, h] = when(r.time), bad = !r.t ? 'WRONG TICKER' : 'WRONG IMAGE';
  return `<div class="card${r.me ? ' me' : ''}" id="c${i}" style="left:${X0 + i * (CW + GAP)}px"><div class="th" style="background-image:url(${img(r.img)})"></div><div class="dt">${d}</div><div class="tm">${h}</div><div class="tk">${r.ticker}</div><div class="st" id="s${i}">${r.me ? '✓ CORRECT' : '✗ ' + bad}</div></div>`; }).join('');
const [MD, MH] = when(ME.time);
const HTML = `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}body{width:1920px;height:1080px;overflow:hidden;position:relative;background:#190d2b;color:#fff3fa;font-family:'DM Mono',monospace}
body:before{content:"";position:absolute;inset:0;background:radial-gradient(60% 60% at 50% 45%,rgba(242,71,157,.2),transparent 70%),repeating-linear-gradient(0deg,rgba(255,255,255,.02) 0 1px,transparent 1px 4px)}
.d{font-family:Unbounded,sans-serif;font-weight:800;letter-spacing:-.03em;line-height:1.02}.p{color:#f2479d}.ok{color:#7dffb8}.m{letter-spacing:.2em;text-transform:uppercase}
.s{position:absolute;inset:0;opacity:0}.c{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
#head{position:absolute;left:0;right:0;top:92px;text-align:center;opacity:0}#head .m{font-size:22px;color:#f2479d}#clock{font:500 76px 'DM Mono',monospace;margin-top:14px}
#line{position:absolute;left:${X0}px;top:596px;height:3px;width:0;background:linear-gradient(90deg,#ff5a6e,#ff5a6e 85%,#7dffb8)}
.card{position:absolute;top:330px;width:${CW}px;opacity:0}.th{width:${CW}px;height:${CW}px;border-radius:22px;background:#000 center/cover;box-shadow:0 0 0 3px rgba(255,90,110,.8)}
.card.me .th{box-shadow:0 0 0 4px #7dffb8,0 0 60px rgba(125,255,184,.45)}
.dt{margin-top:84px;font-size:24px;color:#b79dc9;letter-spacing:.06em}.tm{font-size:30px;font-weight:500;margin-top:2px}.card.me .tm,.card.me .dt{color:#7dffb8}.tk{font-size:20px;color:#b79dc9;margin-top:8px}
.st{margin-top:14px;font-size:19px;font-weight:500;letter-spacing:.06em;color:#ff5a6e;opacity:0;white-space:nowrap}.card.me .st{color:#7dffb8}
#big{position:absolute;left:190px;top:250px;width:560px;height:560px;border-radius:50%;background:#f2479d url(${img('coin.png')}) center/101%;box-shadow:0 0 0 14px #c22b78,0 0 140px rgba(242,71,157,.6)}
#foot{position:absolute;left:0;right:0;bottom:56px;text-align:center;font-size:24px;letter-spacing:.2em;color:#b79dc9;opacity:0}
</style></head><body>
<div class="s c" id="a"><div class="m" style="font-size:26px;color:#f2479d">Solana · mint timestamps</div><div class="d" style="font-size:118px;margin-top:26px">Which $DCTY<br><span class="p">was first?</span></div><div style="font-size:34px;color:#b79dc9;margin-top:34px">with the correct ticker and image</div></div>
<div id="head"><div class="m">Deployed (UTC)</div><div id="clock"></div></div><div id="line"></div>${cards}
<div class="s" id="f"><div id="big"></div><div style="position:absolute;left:860px;top:270px;width:960px"><div class="m ok" style="font-size:26px">✓ correct ticker · ✓ correct image</div><div class="d p" style="font-size:210px;font-weight:900;margin-top:14px">FIRST.</div><div style="font:500 66px 'DM Mono',monospace;margin-top:26px">${MD} 2026</div><div style="font:500 66px 'DM Mono',monospace" class="ok">${MH} UTC</div><div style="font-size:28px;color:#b79dc9;margin-top:26px">${ROWS.length - 1} earlier coins. Every one: wrong ticker or wrong image.</div></div></div>
<div class="s c" id="e"><div class="d" style="font-size:72px;width:1760px">The first deployed DCTY<br><span class="p">with the correct ticker and image.</span></div><div style="font:500 30px 'DM Mono',monospace;margin-top:54px;padding:18px 30px;border:2px solid #7dffb8;border-radius:18px">${ME.a}</div></div>
<div id="foot">DCTYGTA6.COM · @OGDCTY</div>
<script>
const $=(i)=>document.getElementById(i),cl=(x)=>Math.max(0,Math.min(1,x)),ez=(x)=>1-Math.pow(1-cl(x),3),win=(t,a,b,f=.4)=>cl(Math.min((t-a)/f,(b-t)/f));
const N=${ROWS.length},T0=2.7,STEP=.9,LAST=T0+(N-1)*STEP,OUT=LAST+2.0,F0=OUT+.35,F1=F0+3.1,E0=F1+.3;
const TIMES=${JSON.stringify(ROWS.map((r) => when(r.time).join(' · ')))};
window.__seek=(t)=>{
  const a=win(t,.15,2.3);$('a').style.opacity=a;$('a').style.transform='scale('+(1.04-.04*ez(t/1.2))+')';
  const tl=win(t,2.4,OUT,.35);$('head').style.opacity=tl;$('line').style.opacity=tl;
  let cur=0;for(let i=0;i<N;i++){const s=T0+i*STEP,q=ez((t-s)/.45)*tl,c=$('c'+i),me=i===N-1;if(t>=s)cur=i;c.style.opacity=q*(me||t<LAST+.5?1:1-.6*cl((t-LAST-.5)/.4));c.style.transform='translateY('+((1-ez((t-s)/.45))*40).toFixed(1)+'px)'+(me?' scale('+(1+.08*ez((t-LAST-.5)/.5)).toFixed(3)+')':'');
    const z=ez((t-s-.3)/.3);$('s'+i).style.opacity=z;$('s'+i).style.transform='scale('+(1.5-.5*z).toFixed(3)+')';}
  $('clock').textContent=TIMES[cur];$('clock').style.color=cur===N-1&&t>=LAST?'#7dffb8':'#fff3fa';
  $('line').style.width=((${CW}+${GAP})*N-${GAP})*cl((t-T0+.2)/((N-1)*STEP+.4))+'px';
  const f=win(t,F0,F1,.35);$('f').style.opacity=f;$('big').style.transform='scale('+(.86+.14*ez((t-F0)/.7)).toFixed(3)+') rotate('+((t-F0)*2).toFixed(2)+'deg)';
  const e=cl((t-E0)/.5);$('e').style.opacity=e;$('e').style.transform='translateY('+((1-ez((t-E0)/.6))*24).toFixed(1)+'px)';
  $('foot').style.opacity=Math.max(cl((t-E0-.3)/.4),win(t,F0+.3,F1,.3)*.0);
};
document.fonts.ready.then(()=>{window.__seek(0);window.__ready=true;});
</script></body></html>`;
(async () => { fs.mkdirSync(K, { recursive: true }); const f = path.join(K, NAME + '.html'); fs.writeFileSync(f, HTML); const c = await open('about:blank', 1920, 1080, 9594);
  try { await c.load(url(f), 1920, 1080); if (!(await c.ev('window.__ready===true'))) throw new Error('page did not load');
    if (process.argv[2] === 'still') { for (const t of process.argv[3].split(',')) { await c.ev('__seek(' + t + ')'); await c.shot(path.join(K, 'still-' + t + '.jpg'), 'jpeg'); } console.log('stills'); return; }
    const FR = path.join(K, 'frames'); fs.rmSync(FR, { recursive: true, force: true }); fs.mkdirSync(FR, { recursive: true }); const N = Math.round(DUR * FPS);
    for (let i = 0; i < N; i++) { await c.ev('__seek(' + (i / FPS).toFixed(4) + ')'); await c.shot(path.join(FR, 'f_' + String(i).padStart(4, '0') + '.jpg'), 'jpeg'); }
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-framerate', String(FPS), '-i', path.join(FR, 'f_%04d.jpg'), '-vf', 'format=yuv420p', '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', path.join(B, NAME + '.mp4')]);
    fs.rmSync(FR, { recursive: true, force: true }); console.log('OK', NAME + '.mp4'); } finally { c.close(); } })().catch((e) => { console.error(e); process.exit(1); });
