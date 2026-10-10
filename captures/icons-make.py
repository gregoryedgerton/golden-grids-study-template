#!/usr/bin/env python3
"""Draw each study's icons: the letters GIF in the study's face and colours.
Writes favicon.svg, tile.svg (square, for raster icons) and og.svg into <repo>/public/, as outlines (no font needed to show them)."""
import os, sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
F = os.path.dirname(os.path.abspath(__file__)) + "/../fonts/"
H = os.path.expanduser("~/Sites/golden-grids-study-")
# repo: (brand, font file, axes, background, ink)
S = {
 "template": ("GIFname", "inter", {"wght": 800}, "#111111", "#ffffff"),
 "01-airbnb": ("GIFbnb", "figtree", {"wght": 800}, "#ff385c", "#ffffff"),
 "02-spotify": ("GIFify", "montserrat", {"wght": 800}, "#121212", "#1db954"),
 "03-netflix": ("GIFflix", "jost", {"wght": 700}, "#141414", "#e50914"),
 "04-wikipedia": ("GIFipedia", "fraunces", {"wght": 700, "opsz": 72, "SOFT": 50, "WONK": 0}, "#f3ecdd", "#b4261f"),
 "05-nmr": ("GIFmilk Records", "archivonarrow", {"wght": 700}, "#b0231f", "#ffffff"),
 "06-espn": ("GIFspn", "barlowc", {}, "#cc0000", "#ffffff"),
 "07-coinbase": ("GIFbase", "inter", {"wght": 700}, "#0052ff", "#ffffff"),
 "08-x": ("GIFx", "inter", {"wght": 800}, "#0f1419", "#ffffff"),
 "09-irs": ("GIFrs", "sourcesans", {"wght": 700}, "#002d62", "#ffffff"),
 "10-tacobell": ("GIFbell", "montserrat", {"wght": 900}, "#501098", "#ffffff"),
 "11-northwestern": ("GIFmutual", "sourcesans", {"wght": 700}, "#0e497b", "#ffb81c"),
 "12-hotnnow": ("GIFn'now", "archivo", {"wght": 900, "wdth": 125}, "#0b145f", "#febc12"),
 "13-airbnb": ("GIFbnb", "figtree", {"wght": 800}, "#e31c5f", "#ffffff"),
}
def font(name, axes):
    f = TTFont(F + name + ".ttf")
    if "fvar" in f:
        have = {a.axisTag: a for a in f["fvar"].axes}
        loc = {t: max(have[t].minValue, min(have[t].maxValue, v)) for t, v in axes.items() if t in have}
        for t, a in have.items(): loc.setdefault(t, a.defaultValue)
        f = instantiateVariableFont(f, loc)
    return f
def outline(f, text):
    """Path data for `text` in font units (y up), with its ink bounds."""
    gs = f.getGlyphSet(); cmap = f.getBestCmap(); hmtx = f["hmtx"]
    pen = SVGPathPen(gs); bp = BoundsPen(gs); x = 0
    for ch in text:
        g = cmap.get(ord(ch)) or cmap[ord("?")]
        gs[g].draw(TransformPen(pen, (1, 0, 0, 1, x, 0))); gs[g].draw(TransformPen(bp, (1, 0, 0, 1, x, 0)))
        x += hmtx[g][0]
    return pen.getCommands(), bp.bounds
def place(d, b, x, y, w, h):
    """A <path> fitted inside the box x,y,w,h, centred."""
    x0, y0, x1, y1 = b; s = min(w / (x1 - x0), h / (y1 - y0))
    tx = x + (w - (x1 - x0) * s) / 2 - x0 * s; ty = y + (h + (y1 - y0) * s) / 2 + y0 * s
    return f'<path transform="translate({tx:.3f} {ty:.3f}) scale({s:.5f} {-s:.5f})" d="{d}"', s * (y1 - y0)
for k in (sys.argv[1:] or S):
    brand, fn, axes, bg, ink = S[k]; f = font(fn, axes)
    d, b = outline(f, "GIF")
    pub = (H + k if k != "template" else os.path.expanduser("~/Sites/golden-grids-study-template")) + "/public/"
    p, _ = place(d, b, 3, 6, 26, 20)
    open(pub + "favicon.svg", "w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="{bg}"/>{p} fill="{ink}"/></svg>\n')
    p, _ = place(d, b, 30, 50, 120, 80)
    open(pub + "tile.svg", "w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><rect width="180" height="180" fill="{bg}"/>{p} fill="{ink}"/></svg>\n')
    # The share card: the name, and what it is.
    dn, bn = outline(f, brand); pn, hn = place(dn, bn, 120, 150, 960, 210)
    ds, bs = outline(f, "a Golden Grids layout study"); ps, _ = place(ds, bs, 120, 400, 960, 46)
    open(pub + "og.svg", "w").write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="{bg}"/>{pn} fill="{ink}"/>{ps} fill="{ink}" opacity="0.85"/></svg>\n')
    print(k, brand)
