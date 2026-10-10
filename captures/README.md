# Reference captures

Full-page screenshots of the reference page, taken before the build. They are
the left half of every side-by-side and the evidence for the structural
argument, so they live in the repo.

Capture all three, every time, in the same content state:

| File                  | Width  | Why                                                                      |
| --------------------- | ------ | ------------------------------------------------------------------------ |
| `reference-390.png`   | 390px  | Where the original's grid collapses to one column and order carries it.  |
| `reference-820.png`   | 820px  | The awkward middle — where twelve-column grids are weakest.              |
| `reference-1440.png`  | 1440px | The width the grid was designed for.                                     |

Full-page captures, not viewport crops. After the study is built, capture the
rebuild at the same three widths as `study-390.png`, `study-820.png`, and
`study-1440.png`.

These files are commentary on a named site. They are not redistributed as
assets of the study and nothing from them is copied into the build.

## Scripts

- `scan.cjs`: overflow, the fitted-line floor and axe, in Chrome and WebKit, at three widths and in both schemes.
- `cells.cjs`: opens every expandable square at a phone width and fails on overflow or a head that drifts.
- `icons-make.py`, `icons-raster.cjs`: the GIF icons and the share card, from the study's face and colours.
- `site-issue.cjs`: run once, after the study's first deploy is live. It opens the "add this study to the gallery" issue on the marketing site's board (`gregoryedgerton/golden-grids-site`) from `src/study.json`, so a published study is never missing from the site because nobody knew. `--dry` prints the issue and opens nothing.
