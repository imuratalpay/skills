"use client";

import { PromptText } from "./prompt-text";
import { CheckIcon, CopyIcon } from "./icons";
import { IconSwap } from "./icon-swap";
import { useTooltip } from "./tooltip";
import { useCopy } from "./use-copy";

/** An icon button that copies `text`, with a "Copy" tooltip and the swap to a check. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const { copied, copy, hold } = useCopy(text);
  const tip = useTooltip("Copy");
  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : label}
      onClick={copy}
      onPointerEnter={(e) => (hold.onPointerEnter(e), tip.triggerProps.onPointerEnter(e))}
      onPointerLeave={() => (hold.onPointerLeave(), tip.triggerProps.onPointerLeave())}
      onPointerDown={tip.triggerProps.onPointerDown}
      onFocus={(e) => (hold.onFocus(e), tip.triggerProps.onFocus(e))}
      onBlur={() => (hold.onBlur(), tip.triggerProps.onBlur())}
      onKeyDown={tip.triggerProps.onKeyDown}
      className="relative grid size-8 flex-none place-items-center rounded-md text-fg-3 transition-[background-color,color,scale] duration-(--duration-quick) ease-out before:absolute before:-inset-1 hover:bg-tint hover:text-fg-1 active:scale-(--scale-press) motion-reduce:active:scale-100"
    >
      <IconSwap on={copied} onIcon={<CheckIcon />} offIcon={<CopyIcon />} />
      {tip.node}
      <Live copied={copied} />
    </button>
  );
}

function Live({ copied }: { copied: boolean }) {
  return (
    <span className="sr-only" aria-live="polite">
      {copied ? "Copied" : ""}
    </span>
  );
}

/** An example prompt: the whole card copies it. */
export function PromptCard({ prompt, invoke }: { prompt: string; invoke: string }) {
  const { copied, copy, hold } = useCopy(prompt);
  return (
    <button
      type="button"
      onClick={copy}
      {...hold}
      aria-label={copied ? "Copied" : `Copy prompt: ${prompt}`}
      className="group flex min-h-[72px] w-full items-start gap-3 rounded-xl bg-surface py-2.5 pr-2 pl-4 text-left shadow-raised transition-[scale] duration-(--duration-quick) ease-out hover:shadow-raised-hover active:scale-(--scale-press-large) motion-reduce:active:scale-100"
    >
      <span className="code-line min-w-0 flex-1 py-[5px]">
        <PromptText prompt={prompt} invoke={invoke} />
      </span>
      <span className="grid size-8 flex-none place-items-center text-fg-3 transition-colors duration-(--duration-quick) ease-out group-hover:text-fg-1">
        <IconSwap on={copied} onIcon={<CheckIcon />} offIcon={<CopyIcon />} />
      </span>
      <Live copied={copied} />
    </button>
  );
}
