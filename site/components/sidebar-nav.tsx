"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { lastInputWasKeyboard } from "@/lib/input-modality";
import { NAV } from "@/lib/nav";

export function SidebarNav({ onNavigate, touch = false }: { onNavigate?: () => void; touch?: boolean }) {
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  /*
   * One pill behind the active item, moved with a transform so it glides between items. It only
   * animates for a pointer navigation after the first paint: keyboard changes and first paint jump.
   */
  const place = (animate: boolean) => {
    const p = pill.current;
    const link = nav.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!p) return;
    if (!link || !link.offsetHeight) {
      p.style.opacity = "0";
      return;
    }
    if (animate) p.dataset.animate = "";
    else delete p.dataset.animate;
    p.style.height = `${link.offsetHeight}px`;
    p.style.transform = `translateY(${link.offsetTop}px)`;
    p.style.opacity = "1";
  };

  useLayoutEffect(() => {
    place(placed.current && !lastInputWasKeyboard());
    placed.current = true;
  }, [pathname]);

  // The menu sheet renders this while closed (zero size); place the pill when it gets a size.
  useEffect(() => {
    const n = nav.current;
    if (!n) return;
    const ro = new ResizeObserver(() => place(false));
    ro.observe(n);
    return () => ro.disconnect();
  }, []);

  return (
    <nav ref={nav} aria-label="Site" className="relative flex flex-col gap-6">
      <span ref={pill} aria-hidden className="nav-pill pointer-events-none absolute inset-x-0 top-0 rounded-md bg-tint opacity-0" />
      {NAV.map(({ group, items }) => (
        <div key={group}>
          <div className="px-2 pb-1 text-meta text-fg-3">{group}</div>
          <ul className="flex flex-col gap-0.5">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`control relative flex min-w-0 items-center rounded-md px-2 text-secondary text-fg-2 hover:bg-tint hover:text-fg-1 active:bg-tint aria-[current=page]:text-fg-1 aria-[current=page]:hover:bg-transparent ${touch ? "min-h-11" : "min-h-8"}`}
                >
                  <span className="truncate">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
