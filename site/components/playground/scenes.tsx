import Image from "next/image";
import type { CSSProperties } from "react";
import { Layers } from "./layers";
import type { SceneProps } from "./playground";

/*
 * ui-diff: the full-page composite from the repo's verified example (docs/example/compare). It is three
 * panels side by side (before, after, diff), each 775px wide at x = 19, 813 and 1607, with the page starting at y = 19.
 */
export const COMPOSITE = { src: "/ui-diff/compare/home__desktop__light.png", width: 2400, height: 1074 };
export const PANEL_X = { before: 19, after: 813, diff: 1607 } as const;

const ALT = {
  before: "Landing page at the base commit: the Start free trial button with 8px 14px padding and 4px corners.",
  after: "Landing page at the head commit: the same button with 10px 18px padding and 8px corners, and the Work email label in blue.",
  diff: "The diff: the page faded, with the button row and the Work email label outlined in pink.",
};

/** One panel of the composite, cropped to a `width`-px-wide window starting at (`x`, `y`) in the panel. */
export function CompositeCrop({
  panel,
  x = 0,
  y = 0,
  width = 775,
  sizes,
  priority = false,
}: {
  panel: keyof typeof PANEL_X;
  x?: number;
  y?: number;
  width?: number;
  sizes: string;
  priority?: boolean;
}) {
  const style: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: `${(COMPOSITE.width / width) * 100}%`,
    maxWidth: "none",
    height: "auto",
    transform: `translate(${(-(PANEL_X[panel] + x) / COMPOSITE.width) * 100}%, ${(-(19 + y) / COMPOSITE.height) * 100}%)`,
  };
  return (
    <Image
      src={COMPOSITE.src}
      width={COMPOSITE.width}
      height={COMPOSITE.height}
      alt={ALT[panel]}
      sizes={sizes}
      priority={priority}
      draggable={false}
      style={style}
    />
  );
}

const STAGE_SIZES = "(min-width: 768px) 2000px, 1100px";

export function UiDiffScene(props: SceneProps) {
  return (
    <Layers
      {...props}
      layers={[
        { id: "before", node: <CompositeCrop panel="before" sizes={STAGE_SIZES} /> },
        { id: "after", node: <CompositeCrop panel="after" sizes={STAGE_SIZES} /> },
        { id: "diff", node: <CompositeCrop panel="diff" sizes={STAGE_SIZES} /> },
      ]}
    />
  );
}

/* type-taste: before.png and after.png from skills/type-taste/before-after, both 1800px wide. */
function TypeShot({ which }: { which: "before" | "after" }) {
  return (
    <Image
      src={`/type-taste/${which}.png`}
      width={1800}
      height={which === "before" ? 1558 : 1696}
      alt={
        which === "before"
          ? "A blog post as written: a small search field, a pale label and date, a large bold title, black text and a bold table head."
          : "The same post with type-taste: a 16px search field, a mono caps label, a quiet title at body size, grey prose, a serif italic phrase and mono caps on the table head."
      }
      sizes="(min-width: 768px) 644px, 100vw"
      draggable={false}
      className="absolute top-0 left-0 h-auto w-full max-w-none"
    />
  );
}

export function TypeTasteScene(props: SceneProps) {
  return (
    <Layers
      {...props}
      layers={[
        { id: "before", node: <TypeShot which="before" /> },
        { id: "after", node: <TypeShot which="after" /> },
      ]}
    />
  );
}

/* ghost-record: the manual steps from the ghost-cursor home page, then the output the script printed there. */
const BY_HAND = [
  { text: "npm run dev", tone: "text-fg-1" },
  { text: "# open http://localhost:3000/your-post?record", tone: "text-fg-3" },
  { text: "# press Record, then use the component", tone: "text-fg-3" },
  { text: "# press Stop, then Copy recording", tone: "text-fg-3" },
  { text: "# paste the JSON into sort-menu.json", tone: "text-fg-3" },
];

const PROMPT = `/ghost-record filter list: type "to", then pick Tooltip`;
/* The offsets below replay the recorded run (typing cadence, when each line printed): content, not motion tokens. */
const CHAR_MS = 28;
const TYPE_START = 250;
const OUTPUT_START = TYPE_START + PROMPT.length * CHAR_MS + 300;

const OUTPUT = [
  { text: "→ FilterList from apps/site/components/demos/filter-list.tsx", tone: "text-fg-2", at: 0 },
  {
    text: "  recording where it's embedded: /docs/examples (apps/site/app/docs/examples/page.tsx:54)",
    tone: "text-fg-3",
    at: 300,
  },
  { text: "  using the dev server already running at http://localhost:3001", tone: "text-fg-3", at: 600 },
  { text: "  take 1 of 3", tone: "text-fg-3", at: 900 },
  { text: "✓ take 4 steps · 4.0s · 2 presses · 1.7 KB", tone: "text-fg-1", at: 1700 },
  { text: "✓ replay matches the live run", tone: "text-fg-1", at: 2000 },
  { text: "  saved apps/site/components/demos/filter-list.take.json", tone: "text-fg-3", at: 2300 },
  { text: "", tone: "", at: 2300 },
  { text: "<GhostReplay recording={filterListTake} style={{ height: 300 }}>", tone: "text-fg-1", at: 2800 },
  { text: "  <FilterList />", tone: "text-fg-1", at: 2900 },
  { text: "</GhostReplay>", tone: "text-fg-1", at: 3000 },
];

const rise = (delay: number): CSSProperties => ({ animation: `pg-rise var(--duration-fast) var(--ease-out) ${delay}ms both` });

function Terminal({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-stage p-3 sm:p-6">
      <div className="max-h-full w-full max-w-[560px] overflow-hidden rounded-xl bg-surface p-4 font-mono text-meta whitespace-pre-wrap shadow-raised sm:p-5">
        {children}
      </div>
    </div>
  );
}

export function GhostRecordScene(props: SceneProps) {
  return (
    <Layers
      {...props}
      kind={() => "fade"}
      layers={[
        {
          id: "before",
          node: (
            <Terminal>
              {BY_HAND.map((line, i) => (
                <div key={i} className={`pg-rise ${line.tone}`} style={rise(200 + i * 450)}>
                  {line.text}
                </div>
              ))}
            </Terminal>
          ),
        },
        {
          id: "after",
          node: (
            <Terminal>
              <div className="text-fg-1">
                <span className="text-fg-3 select-none">› </span>
                {[...PROMPT].map((ch, i) => (
                  <span
                    key={i}
                    className="pg-type"
                    style={{ animation: `pg-type var(--duration-instant) var(--ease-linear) ${TYPE_START + i * CHAR_MS}ms both` }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
              <div className="h-[21.125px]" />
              {OUTPUT.map((line, i) => (
                <div key={i} className={`pg-rise min-h-[21.125px] ${line.tone}`} style={rise(OUTPUT_START + line.at)}>
                  {line.text}
                </div>
              ))}
            </Terminal>
          ),
        },
      ]}
    />
  );
}
