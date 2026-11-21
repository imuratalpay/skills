import { SITE, type Skill } from "./skills";

/** Installs every skill in the repo. */
export const INSTALL_ALL = "npx skills add imuratalpay/skills";

export const pageUrl = (s: Skill) => `${SITE.url}/${s.slug}`;
export const markdownUrl = (s: Skill) => `${SITE.url}/${s.slug}.md`;
export const skillFileUrl = (s: Skill) => `${SITE.repo}/blob/main/skills/${s.slug}/SKILL.md`;

export function invocationText(s: Skill) {
  return s.invocation === "auto"
    ? `Automatic. The agent loads it when a task matches, or type \`${s.invoke}\`.`
    : `Only when typed: \`${s.invoke}\` (\`$${s.slug}\` in Codex). The agent never starts it on its own.`;
}

/** The skill page as markdown: served at /<slug>.md and copied by "Copy for your agent". */
export function skillMarkdown(s: Skill) {
  return [
    `# /${s.slug}`,
    "",
    `> ${s.summary}`,
    "",
    `- Page: ${pageUrl(s)}`,
    `- Install: \`${s.install.commands.join(" && ")}\``,
    ...(s.install.note ? [`- Install note: ${s.install.note}`] : []),
    ...(s.install.link ? [`- ${s.install.link.label}: ${s.install.link.href}`] : []),
    `- Invocation: ${invocationText(s)}`,
    `- Skill file: ${skillFileUrl(s)}`,
    `- Source: ${s.source.href}`,
    `- Updated: ${s.updated}`,
    "",
    ...(s.release
      ? [`## What’s new in ${s.release.version}`, "", ...s.release.items.map((line) => `- ${line}`), ""]
      : []),
    ...(s.example
      ? [
          "## Example",
          "",
          s.example.intro,
          "",
          "```md",
          s.example.output,
          "```",
          "",
          ...(s.example.image ? [`![${s.example.image.alt}](${SITE.url}${s.example.image.src})`, "", s.example.image.caption, ""] : []),
          `Source: ${s.example.source.href}`,
          "",
        ]
      : []),
    "## What it does",
    "",
    ...s.whatItDoes.map((line) => `- ${line}`),
    "",
    "## When to use it",
    "",
    ...s.whenToUse.flatMap((para) => [para, ""]),
    "## Example prompts",
    "",
    ...s.prompts.map((p) => `- ${p}`),
    "",
    "## Pairs with",
    "",
    ...s.pairs.map((p) => `- [${p.slug}](${SITE.url}/${p.slug}.md): ${p.why}`),
    "",
  ].join("\n");
}
