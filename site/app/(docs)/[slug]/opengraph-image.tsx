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
  return ogImage({ eyebrow: `/${skill.slug}`, title: skill.title, summary: skill.summary });
}
