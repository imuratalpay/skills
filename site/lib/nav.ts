import { SKILLS } from "./skills";

export type NavItem = { href: string; title: string; description: string };

/** Skills in the order you'd reach for them in a project. The overview and the sidebar both read this. */
export const GROUPS: { title: string; description: string; skills: { slug: string; line: string }[] }[] = [
  {
    title: "Building the interface",
    description: "Set the type, then record how the component moves.",
    skills: [
      { slug: "type-taste", line: "Fix the type before anyone reviews it." },
      { slug: "ghost-record", line: "Record a live demo of the component from one sentence." },
    ],
  },
  {
    title: "Reviewing",
    description: "Show what a pull request changes on screen.",
    skills: [{ slug: "ui-diff", line: "Put before and after screenshots in the PR." }],
  },
];

const short = (slug: string) => SKILLS.find((s) => s.slug === slug)?.short ?? "";

export const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Get started",
    items: [{ href: "/", title: "Overview", description: "Every skill on one page." }],
  },
  ...GROUPS.map((g) => ({
    group: g.title,
    items: g.skills.map((s) => ({ href: `/${s.slug}`, title: s.slug, description: short(s.slug) })),
  })),
];
