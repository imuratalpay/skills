# Design system: skills site

A quiet docs site. Hierarchy comes from grey first, weight second, size last (type-taste). The site is dark only. Surfaces are flat: a 1px ring carries every edge, and there are no shadows. Motion is short and only answers an input. Every value below is in `app/globals.css` or a component; if it isn't listed here, it doesn't exist. Add it to the token file first, then here.

## Colors

Use the semantic utilities only: `bg-*`, `text-fg-*`, `shadow-*`. Never a hex, never `black`/`white`, never Tailwind's `gray-*`. There is one theme, dark: the tokens are set once on `:root` with `color-scheme: dark`, and nothing reads `prefers-color-scheme`. Never add a light theme or a light fallback; a hardcoded color still breaks it.

What text color?

```
Is it the page title, a heading, a link label or the thing being named?  → text-fg-1
Is it body text you read?                                                → text-fg-2 (body default)
Is it meta: dates, captions, rail titles, descriptions under a title?    → text-fg-3
Is it a placeholder, a `$` prompt or a list dash (never read as text)?   → text-fg-4
Is it a link underline or a divider-weight glyph?                        → decoration-fg-5 / text-fg-5
```

fg-4 and fg-5 fail 4.5:1. Never set words a person has to read in them.

What background?

```
The page                                        → bg-bg (from <html>, don't set it again)
A hovered or selected row, chip or button       → bg-tint, no edge
A code box, stage, tile or field (sunk)         → bg-stage shadow-well
A card, pill or button that sits above the page → bg-surface shadow-raised (hover: shadow-raised-hover)
The search dialog or the menu sheet             → bg-surface shadow-overlay
```

`bg-code` is an alias of `bg-stage`. Dividers are `border-line` at `border-[length:var(--hairline)]` (0.5px on 2× screens, 1px elsewhere).

## Type

Six roles. Each is a size and line-height pair; never set one without the other, and never use Tailwind's `text-sm`/`text-lg`.

| Utility | Size/leading | Use |
| --- | --- | --- |
| `text-display font-display` | 48/48, 590, −0.022em | The page's h1. One per page. |
| `text-title font-heading` | 24/32, 550 | Section h2, through `<H2>`. |
| body (no class) | 16/26, 400, fg-2 | Prose, FAQ answers. Cap at `max-w-[65ch]`. |
| `text-ui font-ui` | 15/24, 450 | Names in lists: skill titles, Previous/Next. |
| `text-secondary` | 14/22.75 | Nav links, search rows, header links. |
| `text-meta` | 13/21.125 | Captions, dates, rail titles, chips, kbd. |
| `.label` | Geist Mono 12/16, 500, caps | Tile labels and table heads only. |

- Weights are 400, 450 (`font-ui`), 550 (`font-heading`) and 590 (`font-display`). Never 600 or 700: Inter at 600+ reads loud next to 16px prose.
- Emphasis is `<em>` (Newsreader italic, 1.07em), never bold.
- Code is `<code>` or `.code-line` (Geist Mono 13/21.125). Data strings use backticks and render through `<Inline>`.
- Never change weight on hover, active or current. The text reflows by a pixel; use color or `bg-tint`.
- Changing digits get `.num` or `tabular-nums`.

## Shape and spacing

- Radii: 16px (`rounded-2xl`) for stages, tiles and the dialog. 12px (`rounded-xl`) for command boxes. 8px (`rounded-lg`) for rows and buttons. 6px (`rounded-md`) for sidebar items. 4px for inline code and labels. `rounded-full` for pills and phase chips.
- Nested radius = outer − padding. The dialog is 16px with `p-1.5`, so its rows are `rounded-[10px]`.
- Page column: the `PAGE` constant from `components/prose.tsx`. Never re-type its classes; every page shares it so nothing shifts between routes.
- Sections: `<H2>` brings `mt-14`. Overview sections are `mt-16 lg:mt-24`.
- Touch targets are 40px or more. When the visual box is smaller (a 16px text link), extend it with `relative before:absolute before:inset-x-0 before:-inset-y-3` rather than padding, so the text doesn't move.

## Motion

One token set in `app/globals.css`: transitions.dev's scale with the site's curves. Never write a duration, a curve or a scale in a component. In CSS use `var(--duration-fast)`, in Tailwind `duration-(--duration-quick)` and `ease-out`, in TS `seconds()`, `ms()`, `px()` and `curve()` from `lib/motion.ts`. Pick a token by what the motion is for (the comment next to it), not by the nearest number. If no token's purpose matches, add one to the set with its purpose; never inline the value.

Curves: `ease-out` for entering, leaving, hover color and sliding indicators. `ease-in-out` for things swapping in place. `ease-drawer` for the sheet only. `ease-linear` for constant motion only. Never `ease-in`, never `transition-all` or bare `transition`.

| What | Recipe (transitions.dev) | Tokens |
| --- | --- | --- |
| Hover and press color | none | `duration-(--duration-quick) ease-out` |
| Press | none | `active:scale-(--scale-press)` on buttons, `--scale-press-large` on cards |
| FAQ | accordion | opens on `--duration-fast`, closes on `--duration-quick`; answer rises `--distance-micro` |
| Search dialog | modal | opens on `--duration-fast`, closes on `--duration-quick`, `--scale-dialog`; instant from ⌘K or `/` |
| Menu sheet | panel reveal, sideways | opens on `--duration-medium` + `ease-drawer`, closes on `--duration-fast` |
| Tooltip | tooltip | `--delay-tooltip`, `--delay-tooltip-warm`, appears on `--duration-quick`, closes at once |
| Icon swap | icon swap | `--duration-fast` `ease-in-out` both ways, `--scale-icon-swap` |
| Text swap (tile roles, playground captions) | text swap | `--duration-quick` `ease-in-out`, `--distance-micro` |
| Sidebar pill | sliding tabs | `--duration-fast` `ease-out`, pointer navigation only |
| Previous/Next arrow | learn-more hover | `--distance-nudge`, in on `--duration-fast`, out on `--duration-medium` |
| Copy confirmation | none | held `--hold-copied`; the timer pauses on hover, focus and a hidden tab |

- Opens are slower than closes. Hover-in is quick; hover-out may be softer and longer. Never delay a close or a hover-out.
- Animate `transform`, `opacity`, `scale`, `translate` and `clip-path` only. The one exception is the FAQ's `grid-template-rows`, which is how the accordion animates height without measuring.
- No blur, no scroll-triggered entrances, no motion on first paint.
- Keyboard-initiated changes never animate (`data-instant`). Keyboard users act fast and expect the result at once.
- Anything that loops pauses offscreen (`<PauseOffscreen>` or `useInView`), on a hidden tab, and on hover. It stops for good once the reader taps or presses a key.
- Reduced motion is instant: the media query at the top of `globals.css` zeroes every duration token, so anything that reads tokens needs no rule of its own. Timers (`--delay-*`, `--hold-*`) aren't motion and stay.

## Components

**Something to copy.** A shell command is `<CommandBox commands={[...]} label="Copy install command" />`. Its default surface is `code`; use `surface="raised"` only when it sits on a stage. A prompt is `<PromptCard>` in a grid, or `<PromptBar>` above a playground. A lone copy action next to custom content is `<CopyButton text label />`. Never write a new clipboard handler: `useCopy` already has the timer, the screen-reader announcement and the icon swap.

```tsx
// Correct
<CommandBox commands={skill.install.commands} label="Copy install command" />
// Incorrect: a hand-rolled box loses the copy button, the `$` and the line-breaking rules
<pre className="bg-gray-100 p-4">{skill.install.commands.join("\n")}</pre>
```

**A clickable row.** Navigation is a `<Link>`, an action is a `<button type="button">`; never a `div` with `onClick`. Rows, pills and nav items carry `control` (no text selection or iOS callout) and `hover:bg-tint active:bg-tint`. Text links in prose use `.link`.

**Prose.** `<H2 id>` for sections (the `id` feeds anchors), `<P>` for paragraphs, `<DashList items>` for lists, `<Inline text>` for data strings with backticks or `**bold**`. Rail titles and eyebrows are a `div` in `text-meta text-fg-3`, not a heading: headings go h1 → h2 → h3 with no skips.

**Icons.** From `components/icons.tsx` only, inheriting `currentColor`. An icon-only button needs `aria-label` naming the action ("Search skills", not "icon").

**Overlays.** Native `<dialog>` with `showModal()`; it traps focus and handles Escape. Close buttons are 44px on touch (`pointer-coarse:` variants). Keyboard hints (`<kbd>`) hide on touch with `pointer-coarse:hidden`.

**Media.** Skill visuals go through `SkillTile` (hero) and `SkillPlayground` (body), keyed by slug in `components/skill-media.tsx`. Images use `next/image` with `width`, `height`, `sizes` and alt text that says what changed. Only the hero tile gets `priority`.

`components/action-group.tsx` is unused. Don't build on it.

## Adding a skill

1. Add an entry to `SKILLS` in `lib/skills.ts`. Every field is required except `install.note`, `install.link`, `release` and `example`. `release` lists what the latest major version added; `example` is real output from the skill, trimmed, never written by hand. Set `invocation` to `"auto"` or `"user"` to match the skill's frontmatter. Text is short and concrete, with no em dashes.
2. Add its slug to a group in `lib/nav.ts`. The sidebar, the overview, search, the sitemap, `llms.txt`, `skills.json`, the `/<slug>.md` pages and the OG image all read from these two files. The skill itself lives at `skills/<slug>/SKILL.md` in the repo root.
3. Add a tile and a scene to `MEDIA` in `components/skill-media.tsx`, using the playground's phase timing.
4. Run `npm run build` and `npm run lint`. Both must pass with no warnings.

## Metadata

Every page exports metadata through `pageMetadata({ title, description, path })` from `lib/metadata.ts`. It sets the canonical URL and the full Open Graph block, because Next replaces `openGraph` and `alternates` wholesale per page. OG images render with `ogImage()` from `lib/og.tsx`, which uses the light-theme tokens and the static fonts in `app/fonts/og`.
