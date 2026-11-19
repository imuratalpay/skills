import { INSTALL_ALL, invocationText, markdownUrl } from "@/lib/skill-markdown";
import { SITE, SKILLS } from "@/lib/skills";

export const dynamic = "force-static";

export function GET() {
  const skills = SKILLS.map((s) =>
    [
      `### ${s.slug}`,
      "",
      s.summary,
      "",
      `- Page: ${SITE.url}/${s.slug}`,
      `- Markdown: ${markdownUrl(s)}`,
      `- Install: \`${s.install.commands.join(" && ")}\``,
      ...(s.install.link ? [`- Setup: ${s.install.link.href}`] : []),
      `- Invoke: \`${s.invoke}\``,
      `- Invocation: ${invocationText(s)}`,
      `- Source: ${s.source.href}`,
      "",
      "What it does:",
      ...s.whatItDoes.map((line) => `- ${line}`),
    ].join("\n"),
  );

  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `Install every skill: \`${INSTALL_ALL}\``,
    "",
    `- Index (JSON): ${SITE.url}/skills.json`,
    `- Repository: ${SITE.repo}`,
    ...SKILLS.map((s) => `- [${s.slug}](${markdownUrl(s)}): ${s.short}`),
    "",
    "## Skills",
    "",
    skills.join("\n\n"),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
