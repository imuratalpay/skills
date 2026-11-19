import type { MetadataRoute } from "next";
import { SITE, SKILLS } from "@/lib/skills";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = SKILLS.map((s) => s.updated).sort().at(-1)!;
  return [
    { url: SITE.url, lastModified: latest },
    ...SKILLS.map((s) => ({ url: `${SITE.url}/${s.slug}`, lastModified: s.updated })),
  ];
}
