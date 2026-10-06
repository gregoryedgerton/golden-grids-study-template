import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import { useExpandGroup } from "../lib/expand";
import { Fact, Figure, LinkBox } from "../lib/boxes";
import { Band } from "./Band";

/**
 * Band 12 — cards: type fitted to its square.
 *
 * One fact per square, set as large as the square allows. `Fact` is a
 * label, a fitted line (src/lib/fit.tsx: a binary search on font-size
 * against a definite flex box), optional body copy, and a foot with a
 * source and a More control that expands the slot to the fuller passage.
 * `Figure` fills the square with a drawing and captions it; `LinkBox`
 * makes a square a link. Container queries remove the supporting matter
 * in a small square rather than clipping it; nothing is ever cut.
 *
 * `spoken` is for a line that does not read aloud as written. `fit--num`
 * breaks only at its own newlines. Lever: the fit.
 */
export function CardsBand() {
  const x = useExpandGroup();
  return (
    <Band
      id="cards"
      title="Band 12 — Cards (type fits the square)"
      lesson="A label, a line of type sized to the room that is left, body copy, a foot. The fitted line's container is flex: 1 1 0, a definite box to measure against in every engine; supporting matter is removed whole in a small square, never clipped."
      note='from=1 to=5 · placement="top" · clockwise=true · hero right · Fact, Figure, LinkBox · lever: the fit'
      kind="rule"
    >
      <GoldenGrid from={1} to={5} placement="top" outline="1px solid var(--line)">
        <GoldenBox {...x.boxProps("hero")}>
          <Fact
            label="[Label · what this square is]"
            body={<p>[Body copy, two or three sentences, removed whole below 240px of height.]</p>}
            source="[Source]"
            expand={{
              group: x, slotKey: "hero", title: "[The passage's title]",
              full: <p>[The fuller passage the More control opens, at reading measure. Facts, in the subject's own terms.]</p>,
              source: "[Where it is adapted from.]",
              related: [{ href: "#cards", label: "[Where this continues]" }],
            }}
          >
            [The fact, as large as the square allows]
          </Fact>
        </GoldenBox>
        <GoldenBox>
          <Figure label="[Figure 1]" caption="[What the drawing shows, in one line.]">
            <svg viewBox="0 0 100 62" style={{ width: "100%", height: "100%", display: "block" }} role="img" aria-label="Placeholder diagram: a golden rectangle divided into a square and a smaller rectangle">
              <rect x="1" y="1" width="98" height="60" fill="none" stroke="currentColor" />
              <line x1="61" y1="1" x2="61" y2="61" stroke="var(--accent)" strokeWidth="1.5" />
            </svg>
          </Figure>
        </GoldenBox>
        <GoldenBox>
          <Fact label="[Number]" fitClass="fit--num" spoken="[the number, read aloud]">{"1.618…"}</Fact>
        </GoldenBox>
        <GoldenBox>
          <LinkBox label="[§ II · Section]" href="#defaults">[Next]</LinkBox>
        </GoldenBox>
        <GoldenBox>
          <Fact label="[Small]" fitClass="fit--num">φ</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}
