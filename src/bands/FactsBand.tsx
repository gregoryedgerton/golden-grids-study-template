import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import { useViewport, pick } from "../lib/viewport";
import { Band } from "./Band";

/**
 * Band 2 — the skipped-range case. READ THIS ONE.
 *
 * `from={3}` skips the first two sequence positions. The library collapses
 * the skipped squares into one PLACEHOLDER slot so the spiral keeps its
 * proportions. Two things about it are easy to get wrong:
 *
 *   1. The placeholder is filled by the LAST <GoldenBox> child, not the first,
 *      even though it is rendered first in the DOM. All preceding children map
 *      largest → smallest across the visible slots.
 *   2. The placeholder is usually a large area — the two skipped squares
 *      together are as big as the next visible square. It is a real slot with
 *      a real job, not dead space.
 *
 * On mobile this band opens the range back up (from=1) and the placeholder
 * disappears — the last child is then just the smallest visible slot, so the
 * child order still works. Range changes never require reordering children.
 */
export function FactsBand() {
  const viewport = useViewport();
  const from = pick(viewport, { mobile: 1, tablet: 3, desktop: 3 });
  const to = pick(viewport, { mobile: 4, tablet: 5, desktop: 5 });
  const hasPlaceholder = from > 1;

  return (
    <Band
      id="facts"
      title="Band 2 — Facts (skipped range)"
      note={`from=${from} to=${to} placement="bottom" · ${hasPlaceholder ? "placeholder present: last child fills it" : "no placeholder at this width"}`}
    >
      <GoldenGrid from={from} to={to} placement="bottom" color="#c8b96a" outline="1px solid var(--line)">
        <GoldenBox>
          <div className="copy">
            <span className="media__tag">largest visible slot · child 1</span>
            <p className="copy__big">$000 <small>/ night</small></p>
          </div>
        </GoldenBox>
        <GoldenBox>
          <div className="copy">
            <span className="media__tag">child 2</span>
            <p>0 guests · 0 bedrooms · 0 baths</p>
          </div>
        </GoldenBox>
        <GoldenBox>
          <div className="copy copy--tiny">
            <span className="media__tag">child 3</span>
          </div>
        </GoldenBox>
        {/* LAST child → the skipped-range placeholder (when from > 1). */}
        <GoldenBox className="placeholder-slot">
          <div className="copy">
            <span className="media__tag">{hasPlaceholder ? "PLACEHOLDER · last child" : "smallest slot · last child"}</span>
            <p>{hasPlaceholder ? `Skipped positions 1–${from - 1}, collapsed into one slot.` : "Range starts at 1, so no placeholder."}</p>
          </div>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}
