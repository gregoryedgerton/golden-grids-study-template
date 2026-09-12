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

| Band | Range (`from`–`to`) at 390 / 820 / 1440 | `placement` | Editorial job |
| ---- | ---------------------------------------- | ----------- | ------------- |
| [1]  | [1–3 / 1–4 / 1–5]                        | [right]     | [Hero and supporting shots] |
| [2]  | [1–4 / 3–5 / 3–5]                        | [bottom]    | [Facts; skipped range on tablet and desktop] |
| [3]  | [1–3 / 1–4 / 1–4]                        | [left]      | [Description and map] |

Breakpoints live in one place, [`src/lib/viewport.ts`](src/lib/viewport.ts).
Each band picks its own range and placement from the viewport; no band carries
a media query.

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

**One manual step**, which cannot be done from inside the repo: in the
repository's *Settings → Pages*, set *Source* to **GitHub Actions**. Do this
once, before the first push.

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

Everything in `src/bands/` is scaffolding for a study author to delete. It
exists to show four things a new user gets wrong:

1. **Bands stack, they do not nest.** Three small grids, three editorial jobs.
2. **Placement varies between bands** so the spiral does not advance the same
   way three times running.
3. **The skipped-range case.** `FactsBand` uses `from={3}`. The skipped
   positions collapse into one placeholder slot that is rendered first in the
   DOM but filled by the **last** `GoldenBox` child. All preceding children map
   largest to smallest across the visible slots.
4. **Media fills a slot with `object-fit: cover`.** `GoldenBox` sizes itself
   to 100% of the slot and applies nothing else; the fill is consumer CSS. The
   hero image passes its subject position through as `object-position`, the
   escape hatch for a subject a centred crop would lose.

Verified against `@gifcommit/golden-grids` 5.0.0 source: `GoldenGrid` props
are `from` (default 1), `to` (default 4), `color`, `outline`, `clockwise`
(default true), `placement` (default `"right"`), `children`. Structural CSS is
injected automatically; no stylesheet import. Sequence positions index the
Fibonacci stops, so 1 and 2 are both value 1, 3 is 2, 4 is 3, 5 is 5.
