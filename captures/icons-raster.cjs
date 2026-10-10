// Rasterise each study's tile.svg and og.svg with Chrome: favicon-96.png, apple-touch-icon.png, og.png.
const { chromium } = require('playwright'); const fs = require('fs'); const os = require('os');
(async () => { const b = await chromium.launch({ channel: 'chrome' }); const base = os.homedir() + '/Sites/';
  const repos = fs.readdirSync(base).filter((d) => /^golden-grids-study-/.test(d));
  for (const r of repos) { const pub = `${base}${r}/public/`; if (!fs.existsSync(pub + 'tile.svg')) continue;
    for (const [src, out, w, h, transparent] of [['favicon.svg', 'favicon-96.png', 96, 96, true], ['tile.svg', 'apple-touch-icon.png', 180, 180, false], ['og.svg', 'og.png', 1200, 630, false]]) {
      const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })).newPage();
      await p.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:${w}px;height:${h}px}</style>${fs.readFileSync(pub + src, 'utf8')}`);
      await p.screenshot({ path: pub + out, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } }); await p.context().close(); }
    fs.unlinkSync(pub + 'tile.svg'); fs.unlinkSync(pub + 'og.svg'); console.log(r); }
  await b.close(); })();
