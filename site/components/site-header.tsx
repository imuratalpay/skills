import Link from "next/link";
import { SITE } from "@/lib/skills";
import { MobileNav } from "./mobile-nav";
import { Search } from "./search";
import { StickyHeader } from "./sticky-header";

export function SiteHeader() {
  return (
    <StickyHeader>
      <div className="flex h-16 items-center gap-3 px-5 text-secondary">
        <Link href="/" className="-mx-2 flex min-h-10 items-center rounded-lg px-2 font-heading text-fg-1">
          <span className="text-fg-3">/</span>skills
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Search />
          <a
            href={SITE.repo}
            className="-mx-2 hidden min-h-10 items-center rounded-lg px-2 text-fg-3 transition-colors duration-(--duration-quick) ease-out hover:text-fg-1 sm:flex"
          >
            GitHub
          </a>
          <MobileNav />
        </div>
      </div>
    </StickyHeader>
  );
}
