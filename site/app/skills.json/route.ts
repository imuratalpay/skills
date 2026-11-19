import { INSTALL_ALL, markdownUrl, pageUrl, skillFileUrl } from "@/lib/skill-markdown";
import { SITE, SKILLS } from "@/lib/skills";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    repo: SITE.repo,
    install: INSTALL_ALL,
    skills: SKILLS.map((s) => ({
      name: s.slug,
      title: s.title,
      description: s.summary,
      install: s.install.commands.join(" && "),
      invoke: s.invoke,
      invocation: s.invocation,
      url: pageUrl(s),
      markdown: markdownUrl(s),
      skillFile: skillFileUrl(s),
      source: s.source.href,
      updated: s.updated,
    })),
  });
}
