import { skillMarkdown } from "@/lib/skill-markdown";
import { SKILLS, getSkill } from "@/lib/skills";

// Served at /<slug>.md through the rewrite in next.config.ts.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const skill = getSkill((await params).slug);
  if (!skill) return new Response("Not found", { status: 404 });
  return new Response(skillMarkdown(skill), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
