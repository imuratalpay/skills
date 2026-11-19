"use client";

import { useId, useState } from "react";
import { Inline } from "./prose";

/**
 * transitions.dev's accordion. Each question is a button with aria-expanded; the answer stays mounted
 * so its height can animate, and is inert while closed so it's neither focusable nor read out.
 */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-2 max-w-[65ch] border-t-[length:var(--hairline)] border-line">
      {items.map((item) => (
        <FaqItem key={item.q} {...item} />
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  // Enter or Space toggles at once: keyboard users are ahead of any animation. A click (detail ≥ 1) animates.
  const [instant, setInstant] = useState(false);
  const id = useId();
  return (
    <div
      className="faq border-b-[length:var(--hairline)] border-line"
      data-open={open || undefined}
      data-instant={instant || undefined}
    >
      <h3 className="font-normal">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={(e) => {
            setInstant(e.detail === 0);
            setOpen(!open);
          }}
          className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 py-[11px] text-left text-fg-1"
        >
          {q}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="faq-chevron flex-none text-fg-3">
            <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} inert={!open} className="faq-panel">
        <div>
          <p className="faq-answer pb-4 text-pretty">
            <Inline text={a} />
          </p>
        </div>
      </div>
    </div>
  );
}
