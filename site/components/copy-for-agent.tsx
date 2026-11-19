"use client";

import { CheckIcon, CopyIcon } from "./icons";
import { IconSwap } from "./icon-swap";
import { useCopy } from "./use-copy";

/** Copies the page as markdown, the same text /<slug>.md serves, to paste into a coding agent. */
export function CopyForAgent({ markdown }: { markdown: string }) {
  const { copied, copy, hold } = useCopy(markdown);
  return (
    <button
      type="button"
      onClick={copy}
      {...hold}
      aria-label={copied ? "Copied" : "Copy this page as markdown for your agent"}
      className="group relative inline-flex h-8 items-center gap-1.5 rounded-lg bg-surface pr-3 pl-2 text-meta font-ui text-fg-2 shadow-raised transition-[color,scale] duration-(--duration-quick) ease-out before:absolute before:-inset-y-1 before:inset-x-0 hover:text-fg-1 hover:shadow-raised-hover active:scale-(--scale-press) motion-reduce:active:scale-100"
    >
      <span className="grid size-5 place-items-center text-fg-3 transition-colors duration-(--duration-quick) ease-out group-hover:text-fg-1">
        <IconSwap on={copied} onIcon={<CheckIcon />} offIcon={<CopyIcon />} />
      </span>
      Copy for your agent
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
