import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import { useViewport, pick } from "../lib/viewport";
import { placeholderImage } from "../lib/placeholder";
import { Band } from "./Band";

const map = placeholderImage("MAP", 1200, 800, 160);

/**
 * Band 3 — prose and a quieter image, closing the page.
 *
 * Placement advances differently again ("left"), so the spiral does not turn
 * the same way three times running. Counter-clockwise for variety, too.
 */
export function TailBand() {
  const viewport = useViewport();
  const to = pick(viewport, { mobile: 3, tablet: 4, desktop: 4 });

  return (
    <Band id="tail" title="Band 3 — Description" note={`from=1 to=${to} placement="left" clockwise=false`}>
      <GoldenGrid from={1} to={to} placement="left" clockwise={false} outline="1px solid var(--line)">
        <GoldenBox>
          <div className="copy copy--prose">
            <span className="media__tag">largest · prose slot · ~90 words</span>
            <p>
              Placeholder prose. Lorem ipsum stands in for the copy slot's word
              count only; the asset spec in the README says how many words this
              box holds at each width, and the real copy arrives against that
              number. Do not loosen the structure to fit copy that has not
              arrived. Do not call the study finished while this paragraph is
              still here. Ninety words is roughly this long, which is the point
              of writing it out rather than pasting a shorter placeholder.
            </p>
          </div>
        </GoldenBox>
        <GoldenBox>
          <figure className="media">
            <img src={map.src} alt="" />
            <figcaption className="media__tag">map slot</figcaption>
          </figure>
        </GoldenBox>
        <GoldenBox>
          <div className="copy">
            <span className="media__tag">child 3</span>
            <p>Location line</p>
          </div>
        </GoldenBox>
        <GoldenBox>
          <div className="copy copy--tiny">
            <span className="media__tag">child 4</span>
          </div>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}
