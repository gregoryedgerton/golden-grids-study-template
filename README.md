# Layout study — [REFERENCE PAGE]

> **Template notice.** Forked from
> [golden-grids-study-template](https://github.com/gregoryedgerton/golden-grids-study-template).
> Every `[BRACKETED]` field is a blank; delete this notice once the study is
> real. Keep the README short and true to the page as built: a reader should
> be able to check every claim in it against the deploy.

**Live:** [`https://<owner>.github.io/<repo>/`]

An unaffiliated layout study. It rebuilds the structure of a named page as
stacked golden grids, so the comparison is between two ways of laying out the
same content hierarchy. [Say here where the imagery and copy come from: all
original, or a stated licence.] Nothing from the reference site — photography,
wordmarks, marketing copy — is reproduced. Built with
[Golden Grids](https://github.com/gregoryedgerton/golden-grids) from the
[study template](https://github.com/gregoryedgerton/golden-grids-study-template).

## Reference

[Page, URL], captured [date] at 390 / 820 / 1440 ([`captures/`](captures/)).
[Two or three sentences on what the capture shows about the reference's
structure, measured, not remembered.]

| Width | Reference | Rebuild |
| --- | --- | --- |
| 390px | ![](captures/reference-390.png) | ![](captures/study-390.png) |
| 820px | ![](captures/reference-820.png) | ![](captures/study-820.png) |
| 1440px | ![](captures/reference-1440.png) | ![](captures/study-1440.png) |

## Approach

[Two or three sentences: how the reference arranges this content, and how the
study arranges it. Describe; do not argue that either is better.]

## The page

[Pages and] bands in order. Measured sizes are width×height at 390 / 820 /
1440.

| Band | Range · placement · clockwise | Measured | What it holds |
| --- | --- | --- | --- |
| [1 Name] | [1–4 · right · cw (1–3 bottom at 390)] | [366² / 771×514 / 1360×816] | [the content, in the subject's terms] |

Breakpoints live in [`src/lib/viewport.ts`](src/lib/viewport.ts); no band
carries a media query.

## [The subject]

[Where the content comes from: the asset spec filled, the licence, the
provenance file. For a fictional service, say so and that forms send
nothing.]

## How it works

[Only what applies, one bullet each: type fitted to its square; expansion
and item bands; clips and the player; figures; register and the scheme that
is the reference's; the scan results.]

## Notes for review

Observations for whoever reviews this study, recorded without a verdict. Whether the layout suits the page is assessed separately, after every study has been reviewed.

- [What differs from the reference, what is missing, what was not captured, measured or tested. State each as a fact.]

## Disclosure

Every page says what it is in three places, all read from
[`src/study.json`](src/study.json): its title and description, a sticky notice
at the top, and a disclosure at the very end listing the pages reviewed, what
is real, what is invented or changed, and where each kind of asset came from.

## Study tools

A floating panel (top right) toggles grid outlines (`g`), band notes (`n`,
which carry each band's range and placement) and reduced motion (`m`).

## Running and deploying

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`; pushing to `main` deploys
to GitHub Pages (once: point the repo's Pages source at GitHub Actions,
`gh api -X POST repos/<owner>/<repo>/pages -f build_type=workflow`). The
library is consumed from npm at its published version, never linked locally.

## Pre-publish checklist

- [ ] The reference is named with a URL; the unaffiliated line is on the
      page and here; nothing from the reference is in the repo or deploy.
- [ ] Every slot holds real content; no placeholders, no `[BRACKETS]`.
- [ ] The band table matches the source and the measured sizes.
- [ ] No band title, lesson or caption describes the grid; the copy is the
      subject's, plain.
- [ ] `captures/scan.cjs` is clean in both engines and schemes at three
      widths; the skip link is first in the tab order; every control has a
      distinct name.
- [ ] Both schemes render and the README says which is the reference's;
      reduced motion gives a static page, tested with the device setting.
- [ ] "Notes for review" records what a reviewer should know, as facts, without a verdict.
- [ ] `src/study.json` is filled in: notice, pages reviewed, what is real, what is invented, asset sources.

---

## The standard

What every study built from this template does, and where to find it. The
template's `CLAUDE.md` states each as a rule with its conditions.

| | Where | What |
| --- | --- | --- |
| Type fits its square | `src/lib/fit.tsx`, `src/lib/boxes.tsx`, Band 12 | One fact per square, set as large as the square allows; nothing cut; formulae break only where written; a spoken form for lines that do not read as written |
| Depth in flow | `src/lib/expand.tsx`, Bands 3 and 6 | Expansion in place, inert cover, focus handling; an item from a row opens its own band |
| Media | `src/lib/clip.tsx`, Band 10 | Clips in squares, silent, in view only, stills under reduced motion; the whole work on request |
| Schemes | `src/styles.css` tokens | Light and dark by device preference; per-scheme label colour |
| Motion | `src/styles.css`, `src/lib/motion.ts` | `transition: none`; static layouts, not slower ones |
| Fonts | `src/lib/fonts.ts` | Display type held until the faces load |
| Scans | `captures/scan.cjs` | Overflow, fitted-line floor and axe-core, in Chrome and WebKit, both schemes, three widths |

Copy is about the subject, not the grid; marketing and account modules are
rebuilt where the format has them, with plain copy for a fictional service.
Grids run full width, type fills the squares content does not, and the type
set is one set with the headline capped near 120px.

---

## For the template itself

The example page is a **catalogue**: twelve bands, each one copyable pattern,
one responsive lever, and one thing the library does that is easy to get
wrong. A study author keeps the bands the reference page needs and deletes
the rest. Everything in `src/bands/` is scaffolding.

| # | Band | Range 390 / 820 / 1440 | placement · clockwise | Dominant | Lever | Teaches |
| - | ---- | ---------------------- | --------------------- | -------- | ----- | ------- |
| 1 | Bare defaults | 1–4 all | bottom / right / right · cw | image | rotate placement | No props is 1–4, right, clockwise. `placement` names where the spiral starts, so the default puts the hero on the **left**. Hero is the **last** element in the DOM. |
| 2 | Billboard | 1–1 / 1–2 / 1–2 | right · cw | text over image | collapse + merge | 1–2 has no hierarchy; first child on the placement side; `clockwise` a no-op. 1–1 is `single`: later children ignored, so the copy moves into the art box. |
| 3 | Gallery | 1–3 / 1–4 / 1–5 | top / left / bottom · cw | photos | shrink + rotate in lockstep | Orientation is count × placement: right/left is landscape with an even count, top/bottom with an odd one. Declare all five; `to` trims. **Every photograph expands its own slot.** |
| 4 | Editorial | 1–3 all | top · ccw / ccw / cw | prose | flip clockwise | `clockwise` mirrors the hero only with an odd count; with an even count only the tail reverses. Word count per width. |
| 5 | Bento | 1–4 all | right · ccw | numbers | none | Container-unit type needs no breakpoint. `color` walks the hue 180° from smallest box to hero, lightness spread 3% × box count, centred on the base (±6% over four boxes). |
| 6 | Amenities | 1–3 / 3–4 / 3–4 | top · cw | list | open `from` | A list gets one slot. `from=3` collapses positions 1–2 into a 2×1 placeholder: F(from)×F(from−1), rendered first, filled by the **last** child. `from=2` still makes a 1×1 placeholder; only `from=1` has none. **Its CTA expands a different slot.** |
| 7 | Title detail | 1–4 all | left · ccw | prose ↔ art | reorder children | Images survive demotion, prose does not. Map data straight to `GoldenBox`; wrappers and fragments are dropped silently. `GoldenBox` takes `style` and `className`. |
| 8 | Poster card | 1–3 all | left · cw | image | cap width | Height follows width; a 2:3 band at 1360px is 2040px tall. Cap the parent's width, never re-range the grid. |
| 9 | Whitespace | 1–5 all | bottom · ccw | quote | shorten children | Children are positional: too few leaves the smallest slots empty; an empty `<GoldenBox />` blanks a specific one. |
| 10 | Trailer | dropped / 1–4 / 1–4 | left · cw | clip | drop the band | You cannot remove one slot from a spiral, so the unit of removal is the whole band. `Clip` plays silently while on screen and is its poster under reduced motion; `Player` loads the whole work only on request. |
| 11 | Spiral dial | 13 squares | trail solved per stage | covers | reduced motion → flat grid | `spiralCamera` + per-tile transforms, bound to scroll. Covers turn, labels counter-rotate, 512px textures, static fallback. |
| 12 | Cards | 1–5 all | top · cw | fitted type | the fit | `Fact`, `Figure`, `LinkBox`: one fact per square, type sized to the square against a `flex: 1 1 0` container; supporting matter removed whole in small squares, never clipped; `fit--num` breaks only where written; `spoken` for lines that do not read aloud. |

Two rules the catalogue is built on, both verified against the 5.0.0 source:

- **Parity.** Let *n* be the visible boxes plus one if there is a placeholder.
  `right`/`left` give a landscape band only when *n* is even; `top`/`bottom`
  only when *n* is odd.
- **Hero side.** The largest box lands on the `placement` side turned
  *n − 2* quarter-turns in the spiral's direction. At *n* = 4 it is opposite
  the placement; at *n* = 3 one step round; at *n* = 2 the first child sits on
  the placement side.

All eight `placement` × `clockwise` orientations appear at least once. Tall
bands are capped in width (`cap` on `Band`) because the grid is `width: 100%`
of its parent with an inline aspect ratio; the parent owns the width.

Verified against `@gifcommit/golden-grids` 5.0.0 source: `GoldenGrid` props
are `from` (default 1), `to` (default 4), `color`, `outline`, `clockwise`
(default true), `placement` (default `"right"`), `children`. Structural CSS is
injected automatically; no stylesheet import. Sequence positions index the
Fibonacci stops, so 1 and 2 are both value 1, 3 is 2, 4 is 3, 5 is 5.
