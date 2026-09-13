# Layout study — [REFERENCE PAGE]

> **Template notice.** This repo was forked from
> [golden-grids-study-template](https://github.com/gregoryedgerton/golden-grids-study-template).
> Every `[BRACKETED]` field below is a blank. The pre-publish checklist at the
> bottom fails while any remain. Delete this notice once the study is real.

**Live:** [LIVE URL — `https://<owner>.github.io/<repo>/`]

An unaffiliated layout study. It rebuilds the structure of a named page using
stacked golden grids, so the comparison is between two ways of laying out the
same content hierarchy. All imagery and copy here are original. Nothing from
the reference site — photography, wordmarks, marketing copy — is reproduced.

Built with [Golden Grids](https://github.com/gregoryedgerton/golden-grids)
([npm](https://www.npmjs.com/package/@gifcommit/golden-grids) ·
[generator](https://gregoryedgerton.github.io/golden-grids/)).

---

## Reference

**Page:** [NAME OF PAGE] — [URL]

**Captured:** [DATE]. Full-page captures at the three reference widths live in
[`captures/`](captures/). They are the left half of every side-by-side below.

| Width  | Reference                              | Rebuild                            |
| ------ | -------------------------------------- | ---------------------------------- |
| 390px  | ![](captures/reference-390.png)        | ![](captures/study-390.png)        |
| 820px  | ![](captures/reference-820.png)        | ![](captures/study-820.png)        |
| 1440px | ![](captures/reference-1440.png)       | ![](captures/study-1440.png)       |

## The claim

[ONE SENTENCE. The structural argument this study makes. If there is no
distinct claim, the study is redundant.]

## Structural inventory

[The reference page's blocks, their relative weights, and what its grid does
with them. Derived from the captures, not from memory — where memory and the
live page disagree, the live page wins.]

## Bands

A study is a short vertical stack of bands. Each band is one small-range
`GoldenGrid` with one editorial job. Bands stack; they never nest.

| Band | Range (`from`–`to`) at 390 / 820 / 1440 | `placement` · `clockwise` | Editorial job | Responsive lever |
| ---- | ---------------------------------------- | ------------------------- | ------------- | ---------------- |
| [1]  | [1–4 / 1–4 / 1–4]                        | [bottom / right / right · cw] | [Hero and supporting shots] | [rotate placement] |
| [2]  | [1–1 / 1–2 / 1–2]                        | [right · cw]              | [Billboard]   | [collapse + merge] |
| [3]  | [...]                                    |                           |               |                  |

Breakpoints live in one place, [`src/lib/viewport.ts`](src/lib/viewport.ts).
Each band picks its own range, placement, and children from the viewport; no
band carries a media query. The template's catalogue (below) shows one lever
per band; a study uses whichever its reference page needs.

## Asset spec

The handoff artifact. Pass one of a study ends here: structure built, every
slot inventoried. Pass two fills these slots with real assets. Do not fill them
with invented placeholder content and call the study finished.

Media fills its slot with `object-fit: cover`. The slot owns the crop, so no
aspect ratio is specified — only resolution, subject placement, and what must
survive the crop at all three widths.

### Images

| Slot | Band | Role | Min. resolution | Subject placement | Safe area |
| ---- | ---- | ---- | --------------- | ----------------- | --------- |
| [hero] | [1] | [The room that sells the place] | [1600×1000] | [subject upper-right; `object-position: 68% 42%`] | [what must survive at 390, 820, and 1440 — the intersection, not the desktop crop] |
| [...]  |     |      |                 |                   |           |

### Copy

| Slot | Band | Role | Words at 390 / 820 / 1440 |
| ---- | ---- | ---- | ------------------------- |
| [title] | [1] | [Property name] | [4 / 6 / 8] |
| [...]   |     |                 |             |

## What worked

[...]

## What did not

[Name what looks worse than the original and why. A study where everything
worked is an advertisement, and readers discount all of it.]

## Running it

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`. The library is consumed from
the npm registry at its published version, never linked from a local checkout,
so the study exercises what the public installs. A bug found this way belongs
in an [issue](https://github.com/gregoryedgerton/golden-grids/issues).

## Deploying

Pushing to `main` builds and publishes to GitHub Pages. The base path derives
from the repository name inside the workflow, so nothing in the build config
needs editing after a fork.

**One step outside the repo**, done once before the first push: point the
repository's Pages source at GitHub Actions. Either in *Settings → Pages → Source
→ GitHub Actions*, or from a terminal with the GitHub CLI:

```bash
gh api -X POST repos/<owner>/<repo>/pages -f build_type=workflow
```

## Pre-publish checklist

Brand constraints, from the program brief:

- [ ] The reference page is named, with a URL, in the README and on the page.
- [ ] The unaffiliated-study line is visible on the page and in the README.
- [ ] No photography, wordmark, or marketing copy from the reference site
      appears anywhere in the repo or the deploy. Captures in `captures/` are
      commentary and are not used as assets.
- [ ] Every image and copy slot holds real content produced against the asset
      spec. No placeholder images, no lorem ipsum.
- [ ] The asset spec above is complete: every slot listed with resolution,
      subject placement, safe area, and word counts.
- [ ] The band table matches the source.
- [ ] "What did not" has at least one honest entry.

Quality floor, inherited from the template:

- [ ] Checked and legible at 390px, 820px, and 1440px. Rebuild captures at all
      three are in `captures/`.
- [ ] Visible keyboard focus on every interactive element.
- [ ] `prefers-reduced-motion` produces a real static layout, not slower motion.
- [ ] Text contrast meets WCAG AA against whatever it sits on, including images.
- [ ] Images that carry meaning have alt text; decorative ones have `alt=""`.
- [ ] No `[BRACKETED]` blanks remain anywhere in the repo.

---

## For the template itself

The example page is a **catalogue**: eleven bands, each one copyable pattern,
one responsive lever, and one thing the library does that is easy to get
wrong. A study author keeps the bands the reference page needs and deletes
the rest. Everything in `src/bands/` is scaffolding.

| # | Band | Range 390 / 820 / 1440 | placement · clockwise | Dominant | Lever | Teaches |
| - | ---- | ---------------------- | --------------------- | -------- | ----- | ------- |
| 1 | Bare defaults | 1–4 all | bottom / right / right · cw | image | rotate placement | No props is 1–4, right, clockwise. `placement` names where the spiral starts, so the default puts the hero on the **left**. Hero is the **last** element in the DOM. |
| 2 | Billboard | 1–1 / 1–2 / 1–2 | right · cw | text over image | collapse + merge | 1–2 has no hierarchy; first child on the placement side; `clockwise` a no-op. 1–1 is `single`: later children ignored, so the copy moves into the art box. |
| 3 | Gallery | 1–3 / 1–4 / 1–5 | top / left / bottom · cw | photos | shrink + rotate in lockstep | Orientation is count × placement: right/left is landscape with an even count, top/bottom with an odd one. Declare all five; `to` trims. |
| 4 | Editorial | 1–3 all | top · ccw / ccw / cw | prose | flip clockwise | `clockwise` mirrors the hero only with an odd count; with an even count only the tail reverses. Word count per width. |
| 5 | Bento | 1–4 all | right · ccw | numbers | none | Container-unit type needs no breakpoint. `color` walks the hue 180° from smallest box to hero, lightness ±3% per box. |
| 6 | Amenities | 1–3 / 3–4 / 3–4 | top · cw | list | open `from` | A list gets one slot. `from=3` collapses positions 1–2 into a 2×1 placeholder: F(from)×F(from−1), rendered first, filled by the **last** child. `from=2` equals `from=1`. |
| 7 | Title detail | 1–4 all | left · ccw | prose ↔ art | reorder children | Images survive demotion, prose does not. Map data straight to `GoldenBox`; wrappers and fragments are dropped silently. `GoldenBox` takes `style` and `className`. |
| 8 | Poster card | 1–3 all | left · cw | image | cap width | Height follows width; a 2:3 band at 1360px is 2040px tall. Cap the parent's width, never re-range the grid. |
| 9 | Whitespace | 1–5 all | bottom · ccw | quote | shorten children | Children are positional: too few leaves the smallest slots empty; an empty `<GoldenBox />` blanks a specific one. |
| 10 | Trailer | dropped / 1–4 / 1–4 | left · cw | video | drop the band | You cannot remove one slot from a spiral, so the unit of removal is the whole band. Video fills like an image; reduced motion shows the poster. |
| 11 | Spiral dial | 13 squares | trail solved per stage | covers | reduced motion → flat grid | `spiralCamera` + per-tile transforms, bound to scroll. Covers turn, labels counter-rotate, 512px textures, static fallback. |

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
