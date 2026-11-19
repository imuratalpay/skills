import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommandBox } from "@/components/copy";
import { PromptCard } from "@/components/copy-button";
import { ExternalIcon } from "@/components/icons";
import { DashList, H2, Inline, P, PAGE, PrevNext } from "@/components/prose";
import { SiteFooter } from "@/components/site-footer";
import { SkillGlyph } from "@/components/skill-glyph";
import { SkillPlayground, SkillTile } from "@/components/skill-media";
import { pageMetadata } from "@/lib/metadata";
import { NAV } from "@/lib/nav";
import { SITE, SKILLS, formatDate, getSkill } from "@/lib/skills";

export const dynamicParams = false;

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const skill = getSkill((await params).slug);
  return skill ? pageMetadata({ title: skill.slug, description: skill.summary, path: `/${skill.slug}` }) : {};
}

const ORDER = NAV.flatMap((g) => g.items);

// The text box is 16px tall; the pseudo-element takes the tap target to 40px without moving the text.
const META_LINK =
  "relative underline decoration-fg-5 decoration-1 underline-offset-2 transition-colors duration-(--duration-quick) ease-out before:absolute before:inset-x-0 before:-inset-y-3 hover:text-fg-1 active:text-fg-1";

const RAIL_TITLE = "mb-2 text-meta text-fg-3";

export default async function SkillPage({ params }: PageProps<"/[slug]">) {
  const skill = getSkill((await params).slug);
  if (!skill) notFound();
  const i = ORDER.findIndex((p) => p.href === `/${skill.slug}`);

  return (
    <div className={PAGE}>
      {/* Hero: text on the left, the live tile on the right from 1280px. */}
      <header className="xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,400px)] xl:items-start xl:gap-12">
        <div>
          <div className="font-mono text-meta text-fg-3">/{skill.slug}</div>
          <h1 className="mt-3 text-display font-display text-balance">
            {skill.title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-pretty text-fg-2">{skill.summary}</p>
          <div className="mt-7">
            <CommandBox commands={skill.install.commands} label="Copy install command" />
            {skill.install.note && (
              <div className="mt-2 px-1 text-meta text-pretty text-fg-3">
                <Inline text={skill.install.note} />
              </div>
            )}
            {skill.install.link && (
              <div className="mt-2 px-1 text-meta text-fg-3">
                <a href={skill.install.link.href} className="link relative inline-flex items-center gap-1 before:absolute before:inset-x-0 before:-inset-y-2.5">
                  {skill.install.link.label}
                  <ExternalIcon />
                </a>
              </div>
            )}
          </div>
          <div className="mt-4 px-1 text-meta text-fg-3 tabular-nums">
            By{" "}
            <a href={SITE.authorUrl} className={META_LINK}>
              {SITE.author}
            </a>{" "}
            · Updated <time dateTime={skill.updated}>{formatDate(skill.updated)}</time> ·{" "}
            <a href={skill.source.href} className={`${META_LINK} inline-flex items-center gap-0.5`}>
              Source
              <ExternalIcon />
            </a>
          </div>
        </div>
        <div className="mt-10 xl:mt-2">
          <SkillTile slug={skill.slug} />
        </div>
      </header>

      {/* Body and the 260px rail, side by side from 1280px. */}
      <div className="mt-16 xl:mt-20 xl:grid xl:grid-cols-[minmax(0,1fr)_260px] xl:gap-16">
        <div>
          <H2 id="what-it-does" className="mt-0">
            What it does
          </H2>
          <DashList items={skill.whatItDoes} />

          <H2 id="when-to-use-it">When to use it</H2>
          {skill.whenToUse.map((para) => (
            <P key={para}>
              <Inline text={para} />
            </P>
          ))}
        </div>

        <aside className="mt-14 xl:mt-0">
          <div className="flex flex-col gap-6 xl:sticky xl:top-24">
            <section aria-labelledby="pairs-with">
              <div id="pairs-with" className={RAIL_TITLE}>
                Pairs with
              </div>
              <ul className="-mx-2 flex flex-col gap-0.5">
                {skill.pairs.map((pair) => (
                  <li key={pair.slug}>
                    <Link
                      href={`/${pair.slug}`}
                      className="control flex items-center gap-3 rounded-lg p-2 transition-colors duration-(--duration-quick) ease-out hover:bg-tint active:bg-tint"
                    >
                      <SkillGlyph slug={pair.slug} />
                      <span className="flex min-w-0 flex-col">
                        <span className="text-ui font-ui text-fg-1">{pair.slug}</span>
                        <span title={pair.why} className="truncate text-meta text-fg-3">
                          {pair.why}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="invoke-with" className="border-t-[length:var(--hairline)] border-line pt-6">
              <div id="invoke-with" className={RAIL_TITLE}>
                Invoke with
              </div>
              <CommandBox commands={[skill.invoke]} label="Copy invoke command" prompt={false} />
            </section>
          </div>
        </aside>
      </div>

      {/* These two span both columns, like the hero. */}
      <section className="mt-14">
        <H2 id="what-the-skill-changed" className="mt-0">
          What the skill changed
        </H2>
        <P>
          <Inline text={skill.playground.title} />
        </P>
        <SkillPlayground skill={skill} wide />
      </section>

      <section className="mt-14">
        <H2 id="example-prompts" className="mt-0">
          Example prompts
        </H2>
        <P>Plain English works. Tap or click a card to copy it.</P>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {skill.prompts.map((prompt) => (
            <li key={prompt} className="flex">
              <PromptCard prompt={prompt} invoke={skill.invoke} />
            </li>
          ))}
        </ul>
      </section>

      <PrevNext prev={ORDER[i - 1]} next={ORDER[i + 1]} />
      <SiteFooter />
    </div>
  );
}
