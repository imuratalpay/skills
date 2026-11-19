"use client";

import { useEffect, useRef, useState } from "react";
import { ms } from "@/lib/motion";
import { createTimer, type Hold } from "@/lib/presentation-timer";

/** Writes to the clipboard, with a textarea fallback for pages served over plain http. */
async function writeText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.append(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

/**
 * Copies `text` and shows "Copied" on a presentation timer: it waits while the pointer is over the
 * control, while keyboard focus is on it, and while the tab or window is in the background.
 * Spread `hold` onto the element that owns the feedback.
 */
export function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const holds = useRef(new Set<Hold>());
  const timer = useRef<ReturnType<typeof createTimer>>(undefined);

  useEffect(() => {
    const set = (reason: Hold, on: boolean) => {
      if (on) {
        holds.current.add(reason);
        timer.current?.hold(reason);
      } else {
        holds.current.delete(reason);
        timer.current?.release(reason);
      }
    };
    const onVisibility = () => set("hidden", document.hidden);
    const onBlur = () => set("blurred", true);
    const onFocus = () => set("blurred", false);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      timer.current?.clear();
    };
  }, []);

  const toggle = (reason: Hold, on: boolean) => {
    if (on) {
      holds.current.add(reason);
      timer.current?.hold(reason);
    } else {
      holds.current.delete(reason);
      timer.current?.release(reason);
    }
  };

  const copy = () => {
    writeText(text).catch(() => {});
    setCopied(true);
    timer.current?.clear();
    timer.current = createTimer(ms("--hold-copied"), () => setCopied(false), holds.current);
  };

  const hold = {
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && toggle("hover", true),
    onPointerLeave: () => toggle("hover", false),
    // Focus a mouse click caused doesn't hold it, or "Copied" would stay until the next click elsewhere.
    onFocus: (e: React.FocusEvent) => e.currentTarget.matches(":focus-visible") && toggle("focus", true),
    onBlur: () => toggle("focus", false),
  };

  return { copied, copy, hold };
}
