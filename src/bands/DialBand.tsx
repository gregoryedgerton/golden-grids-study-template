import { useEffect, useMemo, useRef, useState } from "react";
import {
  GoldenGrid,
  GoldenBox,
  generateGoldenGridLayout,
  spiralCamera,
  spiralWindow,
  tileOnScreen,
  toCssTileTransform,
  toCssContentTransform,
  trailToRotateDeg,
  focusIndexAt,
} from "@gifcommit/golden-grids";
import type { SpiralTrail } from "@gifcommit/golden-grids";
import { coverImage } from "../lib/placeholder";
import { Band } from "./Band";
import "./DialBand.css";

/**
 * The spiral dial — the library's other capability, bound to scroll.
 *
 * This band is a scroll body COUNT viewports tall with a sticky stage inside
 * it. Scrolling through the body moves the camera one square deeper per
 * viewport of travel. Nothing here is a wrapper over the library: every
 * number on screen comes from `spiralCamera` and the per-tile transforms,
 * called directly, in the order the library docs prescribe.
 *
 * Decisions a study has to make, shown here with one answer each:
 *   - Covers TURN with their tiles; only the label counter-rotates. (Study 02
 *     recommends trying both. `toCssContentTransform(frame)` on the art is
 *     the other answer.)
 *   - Each tile renders into a fixed 512px texture box and the source art is
 *     512px square, so nothing is upscaled at focus.
 *   - The trail grows into the open side of the stage: right when landscape,
 *     below when portrait. Solved per count with `trailToRotateDeg`.
 *   - `prefers-reduced-motion` swaps in a flat GoldenGrid of the same covers.
 *     A static layout, not a slower dial. Requirement, not polish.
 */
const COUNT = 13;
const TEXTURE_PX = 512;
const REDUCED = "(prefers-reduced-motion: reduce)";

function fibonacci(n: number): number[] {
  const seq = [1, 1];
  while (seq.length < n) seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
  return seq.slice(0, n);
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(Math.max(v, lo), hi);
}

const covers = Array.from({ length: COUNT }, (_, i) => coverImage(i + 1, (i * 47 + 20) % 360, TEXTURE_PX));

export function DialBand() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(REDUCED).matches
  );
  useEffect(() => {
    const media = window.matchMedia(REDUCED);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <Band
      id="dial"
      title="Band 11 — Spiral dial"
      note={reduced
        ? "prefers-reduced-motion: static GoldenGrid of the same covers"
        : `${COUNT} squares · scroll-bound depth · covers turn, labels stay upright`}
    >
      {reduced ? <StaticFallback /> : <Dial />}
    </Band>
  );
}

/** The static answer to reduced motion: the first five covers as a flat grid. */
function StaticFallback() {
  return (
    <GoldenGrid from={1} to={5} placement="right" outline="1px solid var(--line)">
      {covers.slice(0, 5).map((src, i) => (
        <GoldenBox key={i}>
          <figure className="media">
            <img src={src} alt="" />
            <figcaption className="media__tag">cover {i + 1}</figcaption>
          </figure>
        </GoldenBox>
      ))}
    </GoldenGrid>
  );
}

function Dial() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const [trail, setTrail] = useState<SpiralTrail>("bottom");

  // The layout is rebuilt only when the open side of the stage changes.
  const layout = useMemo(
    () => generateGoldenGridLayout(fibonacci(COUNT), true, trailToRotateDeg(trail, true, COUNT)),
    [trail]
  );

  useEffect(() => {
    let raf = 0;
    const paint = () => {
      const stage = stageRef.current;
      const body = bodyRef.current;
      if (!stage || !body) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (!width || !height) return;

      // Which side is open is the stage's shape, measured, never assumed.
      const open: SpiralTrail = width >= height ? "right" : "bottom";
      if (open !== trail) {
        setTrail(open); // the effect re-runs with the re-solved layout
        return;
      }

      const top = body.getBoundingClientRect().top + window.scrollY;
      const depth = clamp((window.scrollY - top) / height, 0, COUNT - 1);
      const frame = spiralCamera(layout, depth, width, height);

      layout.squares.forEach((square, k) => {
        const tile = tilesRef.current[k];
        if (!tile) return;
        const { opacity, hidden } = spiralWindow(k, depth, COUNT);
        const onScreen = tileOnScreen(frame, square, width, height);
        tile.style.transform = toCssTileTransform(frame, square, width, height, { texturePx: TEXTURE_PX });
        tile.style.opacity = String(opacity);
        tile.style.visibility = hidden || !onScreen ? "hidden" : "visible";
        // The label overlay counter-rotates about the tile centre so it reads
        // upright while the cover beneath it turns with the spiral.
        const label = tile.lastElementChild as HTMLElement;
        label.style.transform = toCssContentTransform(frame, { cover: false });
      });

      if (readoutRef.current) {
        const focus = Math.round(focusIndexAt(depth, COUNT)) + 1;
        readoutRef.current.textContent = `depth ${depth.toFixed(2)} · focus on cover ${focus}`;
      }
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };
    schedule();
    const observer = new ResizeObserver(schedule);
    if (stageRef.current) observer.observe(stageRef.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [layout, trail]);

  return (
    <div className="dial" ref={bodyRef} style={{ height: `${COUNT * 100}svh` }}>
      <div className="dial__stage" ref={stageRef} aria-label="Spiral dial of placeholder covers">
        {layout.squares.map((_, k) => (
          <div
            key={k}
            className="dial__tile"
            ref={(el) => { tilesRef.current[k] = el; }}
            style={{ width: TEXTURE_PX, height: TEXTURE_PX, visibility: "hidden" }}
          >
            <img className="dial__art" src={covers[k]} alt="" draggable={false} />
            <div className="dial__label" aria-hidden="true">
              <span className="media__tag">cover {k + 1}</span>
            </div>
          </div>
        ))}
        <p className="dial__readout" aria-live="off">
          <span ref={readoutRef}>depth 0.00 · focus on cover {COUNT}</span>
          <span className="dial__hint"> · scroll to dial</span>
        </p>
      </div>
    </div>
  );
}
