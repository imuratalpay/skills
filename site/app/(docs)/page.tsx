import Link from "next/link";
import { CommandBox } from "@/components/copy";
import { Faq } from "@/components/faq";
import { PromptMarquee } from "@/components/prompt-marquee";
import { H2, PAGE } from "@/components/prose";
import { SiteFooter } from "@/components/site-footer";
import { SkillGlyph } from "@/components/skill-glyph";
import { pageMetadata } from "@/lib/metadata";
import { GROUPS } from "@/lib/nav";
import { SITE, SKILLS, formatDate, getSkill } from "@/lib/skills";

export const metadata = pageMetadata({ description: SITE.description, path: "/" });

const LATEST = SKILLS.map((s) => s.updated).sort().at(-1)!;

const FAQ = [
  {
    q: "How do I install a skill?",
    a: "Each skill installs differently, and its page has the exact command. type-taste installs with `npx skills add imuratalpay/skills`. ui-diff lives in its own repository and installs with `./install.sh`. ghost-record ships inside ghost-cursor, and the ghost-cursor docs for agents have the steps.",
  },
  {
    q: "Which agents do they work with?",
    a: "Coding agents that load skills, like Claude Code and Cursor. ui-diff’s installer also takes `--codex` for Codex.",
  },
  {
    q: "How do I use one?",
    a: "Type its name, like `/type-taste`, or just describe the job. Each skill page has example prompts you can copy.",
  },
];

export default function Overview() {
  return (
    <div className={PAGE}>
      <div className="text-meta text-fg-3">
        Last updated <time dateTime={LATEST}>{formatDate(LATEST)}</time>
      </div>
      <h1 className="mt-3 text-display font-display text-balance">
        Agent skills for building interfaces with <em>taste</em>
      </h1>
      <p className="mt-5 max-w-[52ch] text-pretty text-fg-2">
        By{" "}
        <a href={SITE.authorX} className="link relative before:absolute before:inset-x-0 before:-inset-y-2">
          {SITE.author}
        </a>
        , a design engineer. Skills I write so agents build and review interfaces the way I would, with new ones
        added as I go.
      </p>
      <div className="mt-7 max-w-[536px]">
        <CommandBox commands={["npx skills add imuratalpay/skills"]} label="Copy install command" />
      </div>

      <div className="mt-12">
        <PromptMarquee />
      </div>

      <section aria-labelledby="available-skills" className="mt-16 lg:mt-24">
        <H2 id="available-skills" className="mt-0">
          <span className="flex items-center gap-2">
            Available skills
            <span className="rounded-md bg-tint px-1.5 text-meta font-ui tracking-normal text-fg-2 tabular-nums">
              {SKILLS.length}
            </span>
          </span>
        </H2>
        <p className="max-w-[65ch] text-pretty text-fg-3">In the order I reach for them on a project.</p>

        {GROUPS.map((group, gi) => (
          <div key={group.title} className="mt-8 border-t-[length:var(--hairline)] border-line pt-8 lg:grid lg:grid-cols-[360px_1fr] lg:gap-12">
            <div>
              <div className="font-mono text-meta text-fg-3 tabular-nums">
                {String(gi + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-heading text-fg-1">{group.title}</h3>
              <p className="mt-1 max-w-[40ch] text-pretty text-fg-3">{group.description}</p>
            </div>
            <ul className="mt-4 flex flex-col gap-1 lg:mt-0">
              {group.skills.map(({ slug, line }) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    className="control -mx-2 flex items-center gap-3 rounded-lg p-2 transition-colors duration-(--duration-quick) ease-out hover:bg-tint active:bg-tint"
                  >
                    <SkillGlyph slug={slug} />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-ui font-ui text-fg-1">{getSkill(slug)?.title}</span>
                      <span className="text-secondary text-fg-3">{line}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section aria-labelledby="faq" className="mt-16 lg:mt-24">
        <H2 id="faq" className="mt-0">
          FAQ
        </H2>
        <Faq items={FAQ} />
      </section>

      <SiteFooter />
    </div>
  );
}
