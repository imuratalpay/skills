"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const useScrolled = () =>
  useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > 0,
    () => false,
  );

/** The sticky header bar; its hairline shows once the page has scrolled. Only this part runs on the client. */
export function StickyHeader({ children }: { children: ReactNode }) {
  const scrolled = useScrolled();
  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-10 border-b-[length:var(--hairline)] border-transparent bg-bg pt-[env(safe-area-inset-top)] transition-colors duration-(--duration-quick) ease-out data-scrolled:border-line"
    >
      {children}
    </header>
  );
}
