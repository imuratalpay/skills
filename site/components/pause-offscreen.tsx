"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Sets data-offscreen while the box is out of view, so CSS can pause the loops inside it. */
export function PauseOffscreen({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) delete el.dataset.offscreen;
      else el.dataset.offscreen = "";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
