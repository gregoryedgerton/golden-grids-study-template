import { useViewport } from "./lib/viewport";
import { HeroBand } from "./bands/HeroBand";
import { FactsBand } from "./bands/FactsBand";
import { TailBand } from "./bands/TailBand";
import { DialBand } from "./bands/DialBand";

/**
 * A study is a short vertical stack of bands. Each band is one small-range
 * GoldenGrid with one editorial job. Nothing here nests one grid in another.
 *
 * Everything on this page is scaffolding. A study author replaces the bands
 * with the reference page's structure, then fills the asset spec in README.md.
 */
export function App() {
  const viewport = useViewport();

  return (
    <>
      <a className="skip" href="#hero">Skip to content</a>
      <header className="masthead">
        {/* STUDY: replace with the study's name and one-line structural claim. */}
        <h1>Layout study — [REFERENCE PAGE]</h1>
        <p className="masthead__claim">[One sentence: the structural argument this study makes.]</p>
        <p className="masthead__viewport" aria-live="polite">
          viewport: <code>{viewport}</code>
        </p>
      </header>

      <main>
        <HeroBand />
        <FactsBand />
        <TailBand />
        <DialBand />
      </main>

      <footer className="colophon">
        {/* Required on every study. Keep this line. */}
        <p>
          An unaffiliated layout study of <a href="[REFERENCE URL]">[REFERENCE SITE]</a>. All imagery and
          copy are original; nothing from the reference site is reproduced. Built with{" "}
          <a href="https://github.com/gregoryedgerton/golden-grids">Golden Grids</a> ·{" "}
          <a href="https://www.npmjs.com/package/@gifcommit/golden-grids">npm</a> ·{" "}
          <a href="https://gregoryedgerton.github.io/golden-grids/">generator</a>.
        </p>
      </footer>
    </>
  );
}
