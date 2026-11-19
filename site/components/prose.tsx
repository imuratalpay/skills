import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon } from "./icons";

/** The content column next to the sidebar, shared by the overview and skill pages so nothing shifts between them. */
export const PAGE = "mx-auto w-full max-w-[1080px] px-4 pt-16 pb-16 sm:px-8 md:px-12 lg:pt-[92px]";

/** Short tokens stay on one line; longer ones (paths, URLs) may wrap rather than overflow. */
const NOWRAP_MAX = 28;

/** Renders `backticks` in data strings as inline code and **double asterisks** as strong. */
export function Inline({ text }: { text: string }) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code
          key={i}
          className={`rounded-[4px] bg-tint px-[0.3em] py-[0.1em] ${part.length - 2 <= NOWRAP_MAX ? "whitespace-nowrap" : "[overflow-wrap:anywhere]"}`}
        >
          {part.slice(1, -1)}
        </code>
      );
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return part;
  });
}

export function H2({ id, children, className = "mt-14" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={`${className} mb-3 scroll-mt-24! text-title font-heading text-fg-1`}
    >
      {children}
    </h2>
  );
}

/** Prose: 16/26 from the body, capped at 65ch. */
export function P({ children }: { children: ReactNode }) {
  return <p className="my-4 max-w-[65ch] text-pretty">{children}</p>;
}

/** A list with quiet dashes for markers. */
export function DashList({ items }: { items: string[] }) {
  return (
    <ul className="my-4 flex max-w-[65ch] flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="relative pl-5 text-pretty before:absolute before:left-0 before:text-fg-4 before:content-['–']">
          <Inline text={item} />
        </li>
      ))}
    </ul>
  );
}

type PageLink = { href: string; title: string };

/* transitions.dev's learn-more hover, shift only: the arrow leans 2px toward where it goes. Quick in, softer out. */
const NUDGE =
  "inline-flex transition-[translate] duration-(--duration-medium) ease-out group-hover:duration-(--duration-fast)";

export function PrevNext({ prev, next }: { prev?: PageLink; next?: PageLink }) {
  return (
    <nav aria-label="More skills" className="mt-14 grid grid-cols-2 gap-4 border-t-[length:var(--hairline)] border-line pt-5 lg:mt-28">
      {prev ? (
        <Link href={prev.href} className="group control -m-2 rounded-lg p-2 transition-colors duration-(--duration-quick) ease-out hover:bg-tint active:bg-tint">
          <span className="block text-meta text-fg-3">Previous</span>
          <span className="mt-1 inline-flex items-center gap-1.5 font-ui text-fg-1">
            <span className={`rotate-180 ${NUDGE} group-hover:-translate-x-(--distance-nudge)`}>
              <ArrowIcon />
            </span>
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="group control -m-2 rounded-lg p-2 text-right transition-colors duration-(--duration-quick) ease-out hover:bg-tint active:bg-tint">
          <span className="block text-meta text-fg-3">Next</span>
          <span className="mt-1 inline-flex items-center gap-1.5 font-ui text-fg-1">
            {next.title}
            <span className={`${NUDGE} group-hover:translate-x-(--distance-nudge)`}>
              <ArrowIcon />
            </span>
          </span>
        </Link>
      )}
    </nav>
  );
}
