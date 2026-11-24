"use client";

import { useEffect, useRef, useState } from "react";
import { ms } from "@/lib/motion";

/*
 * One tooltip group for the whole site:
 * the first tooltip waits --delay-tooltip and fades in; while one is open, or within --delay-tooltip-warm
 * of the last closing, the next opens at once with no animation. Tooltips close at once, never show on
 * touch, open immediately for keyboard focus, and stay shut after a click until the pointer leaves.
 */
let openCount = 0;
let lastClosedAt = -Infinity;
const warm = () => openCount > 0 || performance.now() - lastClosedAt < ms("--delay-tooltip-warm");

export function useTooltip(label: string) {
  const [state, setState] = useState<"closed" | "open" | "instant">("closed");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const suppressed = useRef(false);
  const isOpen = useRef(false);

  const open = (instant: boolean) => {
    clearTimeout(timer.current);
    if (!isOpen.current) openCount++;
    isOpen.current = true;
    setState(instant ? "instant" : "open");
  };
  const close = () => {
    clearTimeout(timer.current);
    if (isOpen.current) {
      openCount--;
      lastClosedAt = performance.now();
    }
    isOpen.current = false;
    setState("closed");
  };

  useEffect(() => {
    if (state === "closed") return;
    window.addEventListener("scroll", close, { passive: true, once: true });
    return () => window.removeEventListener("scroll", close);
  });
  useEffect(() => {
    const t = timer;
    const o = isOpen;
    return () => {
      clearTimeout(t.current);
      if (o.current) {
        openCount--;
        lastClosedAt = performance.now();
      }
    };
  }, []);

  const triggerProps = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse" || suppressed.current) return;
      if (warm()) open(true);
      else timer.current = setTimeout(() => open(false), ms("--delay-tooltip"));
    },
    onPointerLeave: () => {
      suppressed.current = false;
      close();
    },
    onPointerDown: () => {
      suppressed.current = true;
      close();
    },
    onFocus: (e: React.FocusEvent) => e.currentTarget.matches(":focus-visible") && open(true),
    onBlur: close,
    onKeyDown: (e: React.KeyboardEvent) => e.key === "Escape" && close(),
  };

  const node = (
    <span aria-hidden className="tooltip" data-open={state !== "closed" || undefined} data-instant={state === "instant" || undefined}>
      {label}
    </span>
  );

  return { triggerProps, node };
}
