"use client";

import type { Skill } from "@/lib/skills";
import { Playground } from "./playground/playground";
import { GhostRecordScene, TypeTasteScene, UiDiffScene } from "./playground/scenes";
import { GhostRecordTile, TypeTasteTile, UiDiffTile } from "./tiles";

const MEDIA = {
  "ui-diff": { tile: UiDiffTile, scene: UiDiffScene, aspect: "aspect-[4/3] sm:aspect-[16/10]" },
  "type-taste": { tile: TypeTasteTile, scene: TypeTasteScene, aspect: "aspect-[4/3] sm:aspect-[16/10]" },
  "ghost-record": { tile: GhostRecordTile, scene: GhostRecordScene, aspect: "aspect-[2/3] sm:aspect-[16/10]" },
} as const;

type Slug = keyof typeof MEDIA;

export function SkillTile({ slug }: { slug: string }) {
  const Tile = MEDIA[slug as Slug].tile;
  return <Tile />;
}

/** `wide` spans the skill page's two columns from 1280px, where 16:10 would be too tall. */
export function SkillPlayground({ skill, wide = false }: { skill: Skill; wide?: boolean }) {
  const { scene, aspect } = MEDIA[skill.slug as Slug];
  return (
    <Playground
      phases={skill.playground.phases}
      scene={scene}
      aspect={wide ? `${aspect} xl:aspect-auto xl:h-[440px]` : aspect}
      prompt={skill.playground.prompt}
      invoke={skill.invoke}
    />
  );
}
