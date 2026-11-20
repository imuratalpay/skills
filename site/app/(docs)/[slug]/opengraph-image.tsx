import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { OG_SIZE, ogImage } from "@/lib/og";
import { SKILLS, getSkill } from "@/lib/skills";

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const skill = getSkill((await params).slug);
  return [{ id: "card", size: OG_SIZE, contentType, alt: skill ? `${skill.title}: ${skill.summary}` : "" }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const skill = getSkill((await params).slug);
  if (!skill) notFound();
  // type-taste and ghost-record use the Plotter cover instead of the generated card.
  if (skill.slug === "type-taste" || skill.slug === "ghost-record") {
    const file = await readFile(path.join(process.cwd(), `public/${skill.slug}/og-1200x630.png`));
    return new Response(file, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    });
  }
  return ogImage({ eyebrow: `/${skill.slug}`, title: skill.title, summary: skill.summary });
}
