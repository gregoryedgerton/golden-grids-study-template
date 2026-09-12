import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import { useViewport, pick } from "../lib/viewport";
import { placeholderImage } from "../lib/placeholder";
import { Band } from "./Band";

// Scaffolding assets — see src/lib/placeholder.ts. The hero's subject sits
// off-centre on purpose: at a tall mobile crop a centred crop would lose it,
// so the slot passes the source's subject position through as object-position.
const hero = placeholderImage("HERO", 1600, 1000, 210, { x: 0.68, y: 0.42 });
const second = placeholderImage("SECOND", 900, 900, 30);
const third = placeholderImage("THIRD", 800, 1000, 120);
const fourth = placeholderImage("FOURTH", 600, 400, 300);

/**
 * Band 1 — the dominant image and its supporting shots.
 *
 * Range shrinks as the viewport narrows: the tail boxes that read as
 * thumbnails at 1440 would be slivers at 390, so mobile drops them. Which
 * boxes to drop is this band's decision alone — the next band decides
 * differently.
 */
export function HeroBand() {
  const viewport = useViewport();
  const to = pick(viewport, { mobile: 3, tablet: 4, desktop: 5 });

  return (
    <Band id="hero" title="Band 1 — Gallery" note={`from=1 to=${to} placement="right" · one hero, supporting shots descend`}>
      <GoldenGrid from={1} to={to} placement="right" outline="1px solid var(--line)">
        {/* Children map largest → smallest. Extra children beyond the slot
            count are ignored, so the full set is declared and `to` trims it. */}
        <GoldenBox>
          <figure className="media">
            <img src={hero.src} alt="Placeholder hero image" style={{ objectPosition: hero.subject }} />
            <figcaption className="media__tag">slot 1 · object-position {hero.subject}</figcaption>
          </figure>
        </GoldenBox>
        <GoldenBox>
          <figure className="media">
            <img src={second.src} alt="" />
            <figcaption className="media__tag">slot 2</figcaption>
          </figure>
        </GoldenBox>
        <GoldenBox>
          <figure className="media">
            <img src={third.src} alt="" />
            <figcaption className="media__tag">slot 3</figcaption>
          </figure>
        </GoldenBox>
        <GoldenBox>
          <figure className="media">
            <img src={fourth.src} alt="" />
            <figcaption className="media__tag">slot 4</figcaption>
          </figure>
        </GoldenBox>
        <GoldenBox>
          <div className="copy copy--tiny">
            <span className="media__tag">slot 5</span>
          </div>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}
