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
      <header className="masthead">
        {/* STUDY: replace with the study's name and a one-line description of what it rebuilds. Describe; do not argue. */}
        <h1>Layout study — [REFERENCE PAGE]</h1>
        <p className="masthead__claim">[One sentence: what this study rebuilds and how it is arranged.]</p>
        <p className="masthead__claim">
          Template catalogue: twelve bands, each one lever and one lesson. Orientation is
          box count × placement; hero side follows the spiral; the parent owns the width.
          Delete what the study does not need.
        </p>
      </header>

      <main id="content">
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
