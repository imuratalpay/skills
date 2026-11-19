"use client";

import Link from "next/link";
import { useRef } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { SidebarNav } from "./sidebar-nav";

export function MobileNav() {
  const sheet = useRef<HTMLDialogElement>(null);
  const close = () => sheet.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => sheet.current?.showModal()}
        className="relative -mr-2 grid size-10 place-items-center rounded-lg text-fg-2 transition-[background-color,color] duration-(--duration-quick) ease-out before:absolute before:-inset-0.5 hover:bg-tint hover:text-fg-1 active:bg-tint lg:hidden"
      >
        <MenuIcon />
      </button>
      <dialog
        ref={sheet}
        aria-label="Menu"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="sheet my-0 mr-0 ml-auto h-dvh max-h-none w-[min(300px,85vw)] max-w-none overscroll-contain bg-bg text-fg-2 shadow-overlay"
      >
        {/* Links sit at the bottom, where a thumb reaches; padded past the notch and home indicator. */}
        <div className="flex h-full flex-col pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)]">
          <div className="flex h-16 flex-none items-center justify-between px-5">
            <Link
              href="/"
              onClick={close}
              className="-mx-2 flex min-h-10 items-center rounded-lg px-2 text-secondary font-heading text-fg-1"
            >
              <span className="text-fg-3">/</span>skills
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="relative -mr-2 grid size-10 place-items-center rounded-lg text-fg-3 transition-[background-color,color] duration-(--duration-quick) ease-out before:absolute before:-inset-0.5 hover:bg-tint hover:text-fg-1 active:bg-tint"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="mt-auto overflow-y-auto overscroll-contain px-3 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <SidebarNav onNavigate={close} touch />
          </div>
        </div>
      </dialog>
    </>
  );
}
