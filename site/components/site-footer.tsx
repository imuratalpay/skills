import { SITE } from "@/lib/skills";

const LINKS = [
  { href: "/llms.txt", label: "llms.txt" },
  { href: SITE.repo, label: "GitHub" },
  { href: SITE.authorUrl, label: "muratalpay.me" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 flex flex-wrap gap-x-5 gap-y-1 border-t-[length:var(--hairline)] border-line pt-6 text-meta text-fg-3">
      {LINKS.map((l) => (
        <a key={l.href} href={l.href} className="relative transition-colors duration-(--duration-quick) ease-out before:absolute before:-inset-x-1 before:-inset-y-2.5 hover:text-fg-1 active:text-fg-1">
          {l.label}
        </a>
      ))}
    </footer>
  );
}
