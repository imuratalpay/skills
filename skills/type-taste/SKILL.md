---
name: type-taste
description: Murat's own typography taste, refined over years of shipping interfaces. Use when choosing or changing fonts, font sizes, line-height, font weight, letter-spacing, text colors or greys, line length, headings, labels, numbers, links or font loading in a web project, and when reviewing or auditing a page's typography, including contrast, input zoom, overflow and truncation, casing, punctuation and text direction. It supplies the values, the technique floors, a runnable audit and a report format.
---

# type-taste

Quiet Inter at reading size. A real serif italic for emphasis, a mono for code and labels. Hierarchy comes from grey first, weight second, size last. One 644px column, no pure black, no 600 or 700.

These are Murat's typography values, refined over years of shipping interfaces. Murat approved the rules on 18 Nov 2026. Notes: `references/measurements.md`. If a value isn't in that file, this skill doesn't have one (see "Left to the eye"). Drop-in CSS: `tokens.css`. Stack detection, Tailwind, `next/font` and licensing: `references/setup.md`. Runnable review: `references/audit.js`. Worked example: `before-after/` (`python3 render.py` re-renders and audits it).

The technique floors below come with the skill. If a general typography skill is also installed, its floors still hold. Where the two disagree on a value, this skill wins.

## When to use

- Setting or changing any text style in a web project: family, size, line-height, weight, tracking, color, measure, wrap, numbers, links, font files.
- Reviewing a page, a component or a pull request for typography.
- Not for anything under "Out of scope".

## Workflow

1. **Find out how the project writes styles.** Do it before proposing a change. Read `package.json` for Tailwind or a CSS-in-JS dependency. Look for `tailwind.config.*`, `@import "tailwindcss"` or `@theme` in a CSS file, `*.module.css` imports, a global stylesheet, and styled tagged templates. The commands and the evidence-to-idiom table are in `references/setup.md`. If more than one idiom is present, use the one the file you are editing already uses. Write every fix in that idiom: a plain declaration, a Tailwind utility, a theme token, or a custom property the project already has. Never add a second styling system to deliver a type fix. On Tailwind, use the translation in `references/setup.md` and don't invent a parallel one.
2. **Decide purpose, role and emphasis.** Go through "Decide in this order" and take values from the role table. If no row fits, the text is prose. On a codebase that isn't Murat's (no `--mt-*` tokens, and he hasn't asked), keep its families: don't switch to Inter, add a serif italic or add a paid font. Apply the roles, greys, weights, measure, wrap, numbers and floors inside the families it already has.
3. **Apply the technique floors.** They have no Murat number, but every page has to meet them. See "Technique floors".
4. **Review against the checklist.** Run `references/audit.js` in light and in dark. Check the lines it can't prove by eye. Report every line as pass or fail. Don't summarize a failure away.
5. **Write the report by file.** Follow "Report". Change only what the fix needs. Touch markup only when the fix needs an element (a tooltip target, a span for a drawn line).

## Decide in this order

1. **How does the project write styles?** Workflow step 1. Every value below gets written in that idiom.
2. **What is the page for?**
   - Reading (note, essay, docs page): every heading at body size, 550, fg-1.
   - A long article with sections: the `h1` steps to 24/32, and the `h2`s stay at body size.
   - Looking (landing, tool home, one statement): one display line at 48/48, 590, −0.022em.
   - Unsure: it's a reading page.
3. **What role is this text?** Take its row from the table below. If no row fits, it's prose.
4. **Does it need to stand out more?** Take one grey step. Still not enough: one weight step. Change size only as the last resort, and only to a size in the table.
5. **Emphasis** is `em` in Newsreader italic. Not bold, not slanted Inter.
6. **Numbers** that change or sit in a column get `tabular-nums`.

## Roles

| Role | Type | Color |
|---|---|---|
| Prose | Inter 16/26, 400 | fg-2 |
| Long essay | Inter 17/27.625, 400 | fg-2 |
| UI, subcopy | Inter 15/24, 450 | fg-2 |
| Secondary | Inter 14/22.75, 400 | fg-3 |
| Meta, caption | Inter 13/21.125, 400 | fg-3 |
| Label, table head | Geist Mono 12/16, 500, uppercase, +0.3px | fg-3 |
| Code | Geist Mono 13/21.125; inline 0.8125em | fg-1 |
| Heading, same-size | body size, 550 | fg-1 |
| Heading, step | 24/32, 550, −0.3px | fg-1 |
| Heading, display | 48/48, 590, −0.022em | fg-1 |
| Emphasis | Newsreader italic, 430, 1.07em | inherit |
| Script | Caveat 700 at 1.333em, one word per page | fg-1 |

- **Weights:** 400 body, 420 soft body, 450 UI, 510 medium, 550 heading and `strong`, 590 display. Never 600 or 700 on the sans or mono.
- **Measure:** 644px. Stay inside 548–672px. Never wider.
- **Tracking** only on display (negative) and caps labels (positive). Everything under 24px that isn't caps stays `normal`.
- **Line-heights** are px pairs. Always set a size together with its line-height.
- **Fonts:** Inter with `"cv01", "ss03"`. Newsreader, Geist Mono and Caveat are free stand-ins. Paid upgrades, only if Murat buys them: Tiempos Text or Heldane Text for the italic, Berkeley Mono for the mono. Self-host every font as `woff2`, never from a hosted font CDN.

## Greys

| Step | Light | Dark | Contrast on bg (light / dark) | Use |
|---|---|---|---|---|
| bg | `#fcfcfc` | `#121212` | | page |
| fg-1 | `#202020` | `#eeeeee` | 15.9 / 16.2 | headings, strong, code |
| fg-2 | `#424242` | `#dadada` | 9.8 / 13.4 | prose |
| fg-3 | `#6f6f6f` | `#b6b6b6` | 4.9 / 9.2 | secondary, meta, labels, dates |
| fg-4 | `#a0a0a0` | `#7c7c7c` | 2.6 / 4.49 | disabled and placeholder only. It fails AA, so never use it for text someone has to read |
| fg-5 | `#c7c7c7` | `#3a3a3a` | 1.7 | hairlines, underline color |

Every value is in `references/measurements.md`. Dark fg-5 was set by eye.

The contrast floor is 4.5:1 for text someone has to read and 3:1 at large-text size (24px, or 18.66px at 700 and up). fg-1 to fg-3 clear it on bg. On any other surface (a tinted card, a banner, a code block) measure again against that surface.

## Technique floors

These are not taste values, so they aren't in the notes. Each floor names what it catches, what to do, when to leave it alone, and why.

- **Inputs at 16px.** Catches: the phone zooms the page when a field takes focus. Do: text `input`, `textarea` and `select` compute at least 16px on small viewports (the 16/26 prose pair). Go smaller only inside a wider breakpoint. Never add `maximum-scale=1` or `user-scalable=no` to the viewport meta. Skip: checkboxes, radios and sliders. Why: mobile browsers zoom into any field under 16px, and switching zoom off locks out the readers who need it.
- **Zoom and larger defaults.** Catches: text that clips or overlaps when the reader zooms or raises the default font size. Do: let boxes that hold text grow with it (`min-height`, not `height`), and change size and line-height together, never one alone. Skip: never. Why: the pair keeps the leading right at any scale, and a fixed box doesn't.
- **Breaking and truncation.** Catches: a URL, hash or user-entered string pushing out of its box; a label cut to "…" with nothing that shows the rest. Do: let long tokens break (`overflow-wrap: anywhere` on their container, `min-width: 0` on a flex or grid child). Keep short UI labels (badges, buttons, names in key–value rows) on one line with `white-space: nowrap`. If one still can't fit, truncate it (`overflow: hidden; text-overflow: ellipsis`) and give a way to the full text: a tooltip, a `title`, an expand control or a details page. Skip: prose, which wraps by itself, and code blocks, which scroll (`overflow-x: auto`). Why: an ellipsis with no way back hides data, so it's a bug.
- **Alignment.** Catches: rivers in justified UI copy, ragged centred paragraphs. Do: `text-align: start` by default, no `justify` on interface copy, and centre only blocks of one or two lines. Skip: number columns, which align `end` as in the table rule. Why: a steady starting edge is where the eye comes back to.
- **Direction.** Catches: spacing and alignment that come out backwards in right-to-left text. Do: set `lang` on `html` and on any passage in another language, and `dir="rtl"` on right-to-left content. Where direction can change, use logical properties (`margin-inline-start`, `padding-block`, `inset-inline-end`, `border-inline-start`) and `text-align: start` or `end`. Skip: physical properties in a layout that will only ever run left to right don't need rewriting for their own sake. Why: logical properties flip with `dir`; `lang` drives hyphenation, quote marks and the screen-reader voice.
- **Casing.** Catches: "DURATION" typed in the source. Copy-paste shouts, some screen readers spell it out, and no style change can undo it. Do: store sentence case and let `text-transform: uppercase` make the caps (the label recipe already does). Skip: acronyms and names that are capitals in their own right (`API`, `URL`). Why: casing is presentation, so it belongs in CSS.
- **Punctuation.** Catches: straight quotes, hyphens standing in for dashes, three dots. Do: in prose, use curly quotes (“ ” ‘ ’), an en dash for ranges (9–5), an em dash for an aside, the ellipsis character (…) and a non-breaking space between a value and its unit (`3.2&nbsp;s`). Skip: code, commands and anything the reader copies into a terminal; straight quotes stay there. Why: the typographic characters are the right ones, and the keyboard ones are stand-ins.
- **Real glyphs, not fakes.** Catches: small caps made by shrinking capitals, superscripts made by scaling digits. Do: `font-variant-caps: all-small-caps` and `font-variant-position: super` or `sub` when the font has the glyphs; otherwise use normal caps or a plain number. `tabular-nums` stays required on numbers that change or sit in a column. `font-variant-numeric: slashed-zero` is fine on IDs and serials if the font has it. Skip: fonts without the glyphs; `font-synthesis: none` already stops the browser faking them. Why: shrunk caps and scaled digits come out too thin next to the real letters.
- **Font files and font properties.** Catches: a desktop `ttf` or `otf` in the public fonts folder; a `font-feature-settings` that wipes out another one. Do: ship `woff2` only. Set weight with `font-weight`, optical size with `font-optical-sizing: auto` and features with `font-variant-*`. Keep raw `font-variation-settings` and `font-feature-settings` for custom axes and the numbered sets this skill uses (`cv01`, `ss03`). Skip: never. Why: `woff2` is the compressed web format, and the high-level properties combine where raw tag strings overwrite each other.
- **Synthesis and smoothing.** Catches: a browser-made bold or italic; smoothing declared again on every component. Do: `font-synthesis: none` stays on the root. Font smoothing is set once, on the root (`.mt` on `body`, or Tailwind's `antialiased` on `<body>`). Skip: never. Why: a missing face should look missing, not faked, and one declaration is easy to find.
- **Underlines.** Catches: an underline that cuts through descenders; a hover that animates the line itself. Do: keep the recipe (1px, 2px offset, fg-5, fading to the text color over 150ms) and leave `text-decoration-skip-ink` at `auto`. Don't transition `text-decoration-thickness` or `text-underline-offset`. A line that grows or slides needs its own element, such as a pseudo-element moved with `transform`. Skip: never. Why: native underline geometry snaps to whole pixels, so animating it jitters.
- **Selection and caret.** Catches: selected text that vanishes in one scheme; body copy that can't be selected. Do: if `::selection` is restyled, check it in light and in dark. Put `user-select: none` only on control chrome (buttons, tabs, drag handles), never on copy. `caret-color` may take a tint; don't hide or redraw the caret. Skip: never. Why: people select text to read, quote and translate it.
- **Trimmed text boxes.** Catches: a label sitting low in its button; a heading that won't sit flush with the top of its column. Do: `text-box: trim-both cap alphabetic`, as a progressive enhancement. Skip: any layout that only works with it; the page must look acceptable in browsers that ignore it. Why: support is still partial.
- **Optical size and family changes.** Catches: a text cut set at headline size, a display cut set at caption size, lines that jump when the web font swaps in. Do: if a family ships separate text and display cuts, pick the one drawn for the size you set; with an `opsz` axis, `font-optical-sizing: auto` does it. If you change family, retune size and line-height against the role table, because the same px reads bigger or smaller in another face. Give the fallback matching metrics (`size-adjust`, `ascent-override`, or the fallback `next/font` generates). Skip: never. Why: each cut is drawn for a size range, and a fallback with other metrics reflows the page on load.

## Do / don't

```css
/* Don't: hierarchy from size, bold and black */
h2 { font-size: 24px; font-weight: 700; color: #000; }
/* Do: same size, one weight step, one grey step */
h2 { font-size: inherit; font-weight: 550; color: var(--mt-fg-1); }

/* Don't: the browser slants Inter and calls it italic */
em { font-style: italic; }
/* Do: a real italic, sized up slightly to match the body */
em { font-family: var(--mt-serif-italic); font-weight: 430; font-size: 1.07em; line-height: 0; }

/* Don't: a date the reader needs, at 2.6:1 */
time { color: var(--mt-fg-4); }
/* Do: 4.9:1 */
time { color: var(--mt-fg-3); }

/* Don't: <th>DURATION</th> at the browser's bold 700 */
/* Do: <th>Duration</th> in the source, and CSS does the caps */
th { font: 500 12px/16px var(--mt-mono); letter-spacing: 0.3px; text-transform: uppercase; color: var(--mt-fg-3); }

/* Don't: a full-width paragraph, digits that change width */
p { max-width: none; }
/* Do */
p { max-width: 644px; text-wrap: pretty; }
td { font-variant-numeric: tabular-nums; text-align: end; }

/* Don't: 14px fields, with zoom switched off to hide the jump */
/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> */
input, select, textarea { font-size: 14px; }
/* Do: the prose pair on small screens; go smaller only inside a wider breakpoint */
input, select, textarea { font-size: var(--mt-prose); line-height: var(--mt-prose-lh); }

/* Don't: a commit hash that pushes the card off the screen */
.hash { white-space: nowrap; }
/* Do: let it break, and let the flex child shrink */
.hash { overflow-wrap: anywhere; min-width: 0; }
```

## Fast diagnoses

| Symptom | Cause | Fix |
|---|---|---|
| Page feels loud | Headings scaled up, or more than one display line | Headings back to body size at 550. Use one display line at most, and only on a looking page |
| Page feels flat | Title, prose and meta share one grey | Title fg-1, prose fg-2, meta fg-3. Don't add a size |
| Audit flags weight 700 | `th`, `b`, `strong` and `h*` are bold by default | Set them to 500 or 550 |
| Italic looks like slanted Inter | Newsreader didn't load | Fix the font load. `font-synthesis: none` makes the miss visible instead of faking it |
| `a` and `l` didn't change shape | The Inter subset dropped `cv01`/`ss03` | Use the full `InterVariable.woff2` |
| A line with `em` or `code` sits taller than the rest | The bigger inline face opened the line box | Give it `line-height: 0` |
| Caps labels clump | Caps in the sans, or caps without tracking | Mono 500, +0.3px |
| Lines feel long | Column is over 672px | Set 644px |
| Numbers twitch as they count, or columns don't line up | Proportional figures | `font-variant-numeric: tabular-nums` |
| The phone zooms in when a field gets focus | Field computes under 16px | The 16/26 pair on small screens; keep the viewport meta zoomable |
| A URL or hash runs out of its box | An unbreakable string in a box that can't shrink | `overflow-wrap: anywhere`, and `min-width: 0` on the flex or grid child |
| Caps can't be turned off, or a screen reader spells a word | The source is typed in capitals | Sentence case in the source, `text-transform: uppercase` in CSS |
| A label ends in "…" and nothing shows the rest | Truncation with no way back | A tooltip, `title`, expand control or details link |
| Spacing and alignment come out backwards in right-to-left text | Physical `left`/`right`, `margin-left`, `text-align: left` | Logical properties, `text-align: start`, `dir="rtl"` on the content |
| Audit line 14 fails | fg-4 on readable text, or a ladder grey on a tinted surface | Take fg-3 or darker; measure against the real surface |

## Review checklist

Run `references/audit.js` on the page in light and in dark (DevTools console, or `page.evaluate` in Playwright). Serve the page over HTTP so lines 10 and 16 can see the font requests. The script checks lines 1–11 and 14–16 and prints each failing element with its computed value. Check 12–13 and 17–23 by eye. Report every line as pass or fail. Don't summarize.

1. Text uses only Inter, Newsreader and Geist Mono, plus Caveat on at most one element.
2. Every Inter element computes `"cv01"` and `"ss03"`.
3. No sans or mono element computes a weight of 600 or more.
4. Prose is 15–17px, line-height ÷ size is 1.6–1.625, and width ≤ 672px.
5. `h2`–`h6` are at body size. An `h1` is same-size, step (24/32, −0.3px) or display (48/48, −0.022em). One display heading per page at most.
6. Uppercase text is mono, 12px, tracked +0.3 to +0.66px. Other text under 24px has `normal` tracking.
7. Every text color is fg-1, fg-2 or fg-3 of the active scheme. Nothing is `rgb(0, 0, 0)`.
8. `p` computes `pretty`, `h1`–`h3` compute `balance`, and digits in `td`, `time` or `.num` compute `tabular-nums`.
9. `em` is Newsreader italic 430 at 1.07em, and `font-synthesis` is `none`.
10. There are no requests to `fonts.googleapis.com` or `fonts.gstatic.com`.
11. Underlined links are 1px thick, 2px offset, fg-5.
12. Dark mode swaps to the dark ladder on `#121212`. It is not `filter: invert()`.
13. No paid font file (Tiempos, Heldane, Berkeley Mono) is in a public repo.
14. Readable text is at least 4.5:1 against its computed background, or 3:1 at large-text size (24px, or 18.66px at 700 and up). Disabled text is exempt. The script skips text over images and gradients; check those by eye.
15. Text inputs, `textarea` and `select` compute at least 16px at a phone width, and the viewport meta has no `maximum-scale=1` or `user-scalable=no`. The script flags every field under 16px at whatever width it runs; judge the viewport.
16. Every font file the page loads is `woff2`. None ends in `.ttf` or `.otf`.
17. Font smoothing is declared once, on the root, and nowhere else in the stylesheets.
18. Zoomed in and with a larger default font size, no text clips or overlaps. Long tokens break inside their box, and every truncated string has a way to the full text.
19. Source strings are sentence case. Capitals come from `text-transform`, except real acronyms.
20. Text aligns to `start`. No justified interface copy, no centred block longer than two lines.
21. `html` has `lang`, right-to-left content has `dir`, and spacing and alignment use logical properties wherever direction can change.
22. Prose uses curly quotes, en dashes for ranges, em dashes for asides, the ellipsis character and a non-breaking space before units. Small caps and superscripts are real glyphs or aren't used.
23. `::selection`, if restyled, is readable in both schemes, and `user-select: none` is only on control chrome.

## Report

Two parts, in this order.

**Checklist.** All 23 lines, numbered, pass or fail in light and in dark. A failing line names the element and its computed value.

**Issues by file.** One heading per file, must-fix first, then taste. Each issue is one bullet: where it is, what's wrong, the corrected declaration in the project's idiom, and the rule it serves. Leave out rules the page already follows.

- **Must-fix:** readable text below the contrast floor, inputs that zoom on focus, fake bold or italic, tokens that overflow their box, selection that can't be read, truncation with no way back.
- **Taste:** everything else, strong defaults first: heading mode, grey step, tracking, wrap, weights, families.

```md
## app/globals.css
Must-fix
- `globals.css:41` `.meta` is fg-4 on readable text (2.6:1). `color: var(--mt-fg-3);` (line 14, contrast floor)
Taste
- `globals.css:12` `h2` is 24px at 700. `font-size: inherit; font-weight: 550;` (line 5, same-size headings)

## components/search-field.tsx
Must-fix
- `search-field.tsx:18` the field computes 14px on phones. `className="text-prose sm:text-[15px]/[24px]"` (line 15, inputs at 16px)
```

## How strong is each rule

When a project pushes back, bend the weak rules first.

- **Floors, not negotiable:** the contrast floor, inputs at 16px with zoom left on, no fake bold, italic or small caps, breakable tokens, truncation with a way back, readable selection, `woff2`.
- **Strong defaults:** grey ladder, `pretty`/`balance`, self-hosted fonts, Inter, `tabular-nums`, negative display tracking, intermediate weights, dedicated mono.
- **Weaker:** ~60ch measure, tracked caps labels, serif italic, custom underlines, same-size headings, Inter `cv01`/`ss03`, script accent. The script is the weakest, so leave it out when in doubt.

## Left to the eye

Spacing, paragraph gaps, hover and focus states, `::selection`, and the dark fg-5 have no set values. This skill has no numbers for them. Set them by eye and don't turn a guess into a token. The one hover rule in `tokens.css` (underline fades to the text color) uses a 150ms ease-out. The demo spaces everything in `lh` units, so it doesn't invent any pixels.

## Out of scope

- Native mobile UI.
- CJK and vertical writing, beyond `lang`, `dir` and logical properties.
- SVG and canvas text.
- Email HTML and print stylesheets.
- Fluid type scales and vertical-rhythm tokens.
- Glyph-by-glyph feature surveys, beyond the Inter `cv01`/`ss03` check in the audit.
