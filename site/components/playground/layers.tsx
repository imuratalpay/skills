import type { CSSProperties, ReactNode } from "react";
import type { PhaseId } from "@/lib/skills";

type Kind = "wipe" | "fade";

const WIPE = "var(--demo-wipe) var(--ease-in-out) both";
const FADE_IN = "pg-fade-in var(--duration-fast) var(--ease-out) both";
const FADE_OUT = "pg-fade-out var(--duration-quick) var(--ease-out) both";

/**
 * Stacks one layer per phase, in phase order. Moving forward animates the new layer in on top;
 * moving back animates the old one out. Before ↔ After is a wipe with a divider, anything else a fade.
 */
export function Layers({
  phase,
  from,
  cycle,
  layers,
  kind = (a, b) => (a !== "diff" && b !== "diff" ? "wipe" : "fade"),
}: {
  phase: PhaseId;
  from: PhaseId | null;
  cycle: number;
  layers: { id: PhaseId; node: ReactNode }[];
  kind?: (from: PhaseId, to: PhaseId) => Kind;
}) {
  const cur = layers.findIndex((l) => l.id === phase);
  const prev = from ? layers.findIndex((l) => l.id === from) : -1;
  const how = from ? kind(from, phase) : null;
  const wipe = how === "wipe" && prev !== cur ? (prev < cur ? "in" : "out") : null;

  return (
    <>
      {layers.map((layer, i) => {
        let style: CSSProperties | undefined;
        let className = "absolute inset-0";
        if (i > cur && i !== prev) return null;
        // A jump over a phase fades straight from where it started.
        if (prev !== -1 && i > prev && i < cur) return null;
        if (i === cur && prev !== -1 && prev < cur) {
          className += how === "wipe" ? " pg-wipe" : "";
          style = { animation: how === "wipe" ? `pg-wipe-in ${WIPE}` : FADE_IN };
        } else if (i > cur) {
          className += how === "wipe" ? " pg-unwipe pg-static" : " pg-static";
          style =
            how === "wipe"
              ? { clipPath: "inset(0 100% 0 0)", animation: `pg-wipe-out ${WIPE}` }
              : { opacity: 0, animation: FADE_OUT };
        }
        if (i !== cur && i <= cur) className += " pg-static";
        return (
          <div key={i === cur ? `${layer.id}-${cycle}` : layer.id} className={className} style={style}>
            {layer.node}
          </div>
        );
      })}
      {wipe && (
        <div
          key={`divider-${cycle}`}
          aria-hidden
          className="pg-divider pointer-events-none absolute inset-0"
          style={{
            transform: wipe === "in" ? "translateX(100%)" : "translateX(0)",
            opacity: 0,
            animation: `${wipe === "in" ? "pg-divider-in" : "pg-divider-out"} ${WIPE}`,
          }}
        >
          <span className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.12),0_0_12px_rgb(0_0_0/0.18)]" />
          <span className="absolute top-1/2 -left-[3px] h-7 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.15),0_1px_3px_rgb(0_0_0/0.2)]" />
        </div>
      )}
    </>
  );
}
