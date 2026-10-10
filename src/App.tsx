import { Tools } from "./lib/tools";
import { StudyBanner, StudyDisclosure } from "./lib/study";
import { DefaultsBand } from "./bands/DefaultsBand";
import { BillboardBand } from "./bands/BillboardBand";
import { GalleryBand } from "./bands/GalleryBand";
import { EditorialBand } from "./bands/EditorialBand";
import { BentoBand } from "./bands/BentoBand";
import { AmenitiesBand } from "./bands/AmenitiesBand";
import { TitleDetailBand } from "./bands/TitleDetailBand";
import { PosterBand } from "./bands/PosterBand";
import { WhitespaceBand } from "./bands/WhitespaceBand";
import { TrailerBand } from "./bands/TrailerBand";
import { DialBand } from "./bands/DialBand";
import { CardsBand } from "./bands/CardsBand";

/**
 * A study is a short vertical stack of bands. Each band is one small-range
 * GoldenGrid with one editorial job. Nothing here nests one grid in another.
 *
 * This page is a CATALOGUE, not a design. Every band shows one pattern, one
 * responsive lever, and one thing the library does that is easy to get
 * wrong. A study author copies the bands the reference page needs and
 * deletes the rest. All content is scaffolding.
 */
export function App() {
  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <StudyBanner />
      <Tools />
      {/* STUDY: rebuild the reference's own header and nav here: the parody
          name where its logo is, its nav items, its search. Do not write
          "layout study" or the reference's name; the banner above and the
          disclosure below say that on every page. */}
      <header className="top">
        <a className="wordmark" href="#content">GIFname</a>
        <nav className="top__nav" aria-label="Primary">
          <ul>
            <li><a href="#content" aria-current="page">[Nav item]</a></li>
            <li><span>[Nav item]</span></li>
            <li><span>[Nav item]</span></li>
          </ul>
        </nav>
      </header>
      <main id="content">
        <div className="masthead">
          {/* STUDY: the page's own title and opening line, as the reference sets them. */}
          <h1>[The page's title]</h1>
          <p className="masthead__claim">
            Template catalogue: twelve bands, each one lever and one lesson. Orientation is
            box count × placement; hero side follows the spiral; the parent owns the width.
            Delete what the study does not need.
          </p>
        </div>
        <DefaultsBand />
        <BillboardBand />
        <GalleryBand />
        <EditorialBand />
        <BentoBand />
        <AmenitiesBand />
        <TitleDetailBand />
        <PosterBand />
        <WhitespaceBand />
        <TrailerBand />
        <CardsBand />
        <DialBand />
      </main>

      {/* Required on every study, and always the last element on the page.
          It reads src/study.json; fill that file in, do not edit this. */}
      <StudyDisclosure />
    </>
  );
}
