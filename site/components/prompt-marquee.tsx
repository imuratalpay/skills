import Link from "next/link";
import { SKILLS } from "@/lib/skills";
import { PauseOffscreen } from "./pause-offscreen";

type Pill = { prompt: string; slug: string };

const PILLS: Pill[] = SKILLS.flatMap((s) => s.prompts.map((prompt) => ({ prompt, slug: s.slug })));
/** Alternate the prompts between the rows so neither row is one skill. */
const ROWS: Pill[][] = [PILLS.filter((_, i) => i % 2 === 0), PILLS.filter((_, i) => i % 2 === 1)];

function Pills({ pills, copy }: { pills: Pill[]; copy?: boolean }) {
  return (
    <ul className="marquee-list" data-copy={copy || undefined}>
      {pills.map((p) => (
        <li key={p.prompt}>
          <Link
            href={`/${p.slug}`}
            tabIndex={-1}
            className="control relative flex h-8 items-center gap-2 rounded-full bg-surface px-3 font-mono text-meta whitespace-nowrap text-fg-3 shadow-raised transition-colors duration-(--duration-quick) ease-out before:absolute before:inset-x-0 before:-inset-y-1 hover:text-fg-1 hover:shadow-raised-hover active:text-fg-1"
          >
            <span aria-hidden className="text-fg-4 before:content-['>']" />
            {p.prompt}
            <span aria-hidden className="text-fg-4 before:content-['→']" />
            <span className="text-fg-1">/{p.slug}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Two rows of real example prompts drifting in opposite directions. Each track holds the list twice
 * and moves by half its width, so the loop has no seam. Hover pauses it, so does scrolling it out of
 * view; reduced motion stops it and lets the rows wrap. It's decoration for pointers: every prompt is
 * also on its skill page, so it's hidden from screen readers and out of the tab order (moving,
 * mostly clipped links can't be used from a keyboard).
 */
export function PromptMarquee() {
  return (
    <PauseOffscreen className="marquee flex flex-col gap-2">
      {ROWS.map((row, i) => (
        <div key={i} className="marquee-row" aria-hidden>
          <div className="marquee-track" data-reverse={i === 1 || undefined}>
            <Pills pills={row} />
            <Pills pills={row} copy />
          </div>
        </div>
      ))}
    </PauseOffscreen>
  );
}
