"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";

export function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = matchMedia(REDUCED);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => matchMedia(REDUCED).matches,
    () => false,
  );
}

export function useDocumentHidden() {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    },
    () => document.hidden,
    () => false,
  );
}

/** True while the element is at least partly on screen. */
export function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

/** True while the window is in the background (another app or window has focus). */
export function useWindowBlurred() {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("blur", onChange);
      window.addEventListener("focus", onChange);
      return () => {
        window.removeEventListener("blur", onChange);
        window.removeEventListener("focus", onChange);
      };
    },
    () => !document.hasFocus(),
    () => false,
  );
}
