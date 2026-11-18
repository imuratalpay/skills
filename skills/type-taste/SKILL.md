---
name: type-taste
description: Murat's personal typography taste, measured from 18 sites he likes. Use for any type or UI-text decision in a web project (fonts, sizes, line-height, weights, tracking, greys, measure, headings, labels, numbers, links, font loading) and when reviewing a page's type. Layers on top of emil-typography. Emil supplies technique and accessibility floors, this skill supplies the values.
---

# type-taste

Quiet Inter at reading size. A real serif italic for emphasis, a mono for code and labels. Hierarchy comes from grey first, weight second, size last. One 644px column, no pure black, no 600 or 700.

Every value here was measured on a site Murat likes. Murat approved the rules on 18 Nov 2026. Evidence: `references/measurements.md`. If a value isn't in that file, this skill doesn't have one (see "Not measured"). Drop-in CSS: `tokens.css`. Tailwind, `next/font` and licensing: `references/setup.md`. Runnable review: `references/audit.js`. Worked example: `before-after/` (`python3 render.py` re-renders and audits it).

Apply emil-typography first. Where they disagree, this skill picks the value. Emil picks the technique and the floors.

## Decide in this order

1. **What is the page for?**
   - Reading (note, essay, docs page): every heading at body size, 550, fg-1. Emil, jakub.kr, rauno.
   - A long article with sections: the `h1` steps to 24/32, and the `h2`s stay at body size. interfaces.dev.
   - Looking (landing, tool home, one statement): one display line at 48/48, 590, −0.022em. muwrites, linear.
   - Unsure: it's a reading page.
2. **What role is this text?** Take its row from the table below. If no row fits, it's prose.
3. **Does it need to stand out more?** Take one grey step. Still not enough: one weight step. Change size only as the last resort, and only to a size in the table.
4. **Emphasis** is `em` in Newsreader italic. Not bold, not slanted Inter.
5. **Numbers** that change or sit in a column get `tabular-nums`.

## Roles

| Role | Type | Color | Measured on |
|---|---|---|---|
| Prose | Inter 16/26, 400 | fg-2 | interfaces, joshpuckett |
| Long essay | Inter 17/27.625, 400 | fg-2 | jakub.kr |
| UI, subcopy | Inter 15/24, 450 | fg-2 | linear, interfere |
| Secondary | Inter 14/22.75, 400 | fg-3 | interfaces |
| Meta, caption | Inter 13/21.125, 400 | fg-3 | jakub.kr |
| Label, table head | Geist Mono 12/16, 500, uppercase, +0.3px | fg-3 | interfaces (mono label, exact) |
| Code | Geist Mono 13/21.125; inline 0.8125em | fg-1 | jakub.kr, interfaces |
| Heading, same-size | body size, 550 | fg-1 | Emil, jakub.kr, interfaces h2 |
| Heading, step | 24/32, 550, −0.3px | fg-1 | interfaces h1 |
| Heading, display | 48/48, 590, −0.022em | fg-1 | muwrites −1.06px, linear −1.408px @64 |
| Emphasis | Newsreader italic, 430, 1.07em | inherit | benji (Newsreader 15px in 14px body) |
| Script | Caveat 700 at 1.333em, one word per page | fg-1 | devouringdetails (Caveat 24 in 18) |

- **Weights:** 400 body, 420 soft body (joshpuckett), 450 UI, 510 medium (linear), 550 heading and `strong`, 590 display. Never 600 or 700 on the sans or mono.
- **Measure:** 644px (Emil, jakub.kr). The measured range is 548–672px. Never wider.
- **Tracking** only on display (negative) and caps labels (positive). Everything under 24px that isn't caps stays `normal`.
- **Line-heights** are measured px pairs. Always set a size together with its line-height.
- **Fonts:** Inter with `"cv01", "ss03"` (Emil, linear). Newsreader, Geist Mono and Caveat are free stand-ins. Paid upgrades, only if Murat buys them: Tiempos Text or Heldane Text for the italic, Berkeley Mono for the mono. Self-host every font, never from Google's CDN.

## Greys

| Step | Light | Dark | Contrast on bg (light / dark) | Use |
|---|---|---|---|---|
| bg | `#fcfcfc` | `#121212` | | page |
| fg-1 | `#202020` | `#eeeeee` | 15.9 / 16.2 | headings, strong, code |
| fg-2 | `#424242` | `#dadada` | 9.8 / 13.4 | prose |
| fg-3 | `#6f6f6f` | `#b6b6b6` | 4.9 / 9.2 | secondary, meta, labels, dates |
| fg-4 | `#a0a0a0` | `#7c7c7c` | 2.6 / 4.49 | disabled and placeholder only. It fails AA, so never use it for text someone has to read |
| fg-5 | `#c7c7c7` | `#3a3a3a` | 1.7 | hairlines, underline color |

Light: jakub.kr Lab 12.3 / 28.08, rauno 111 / 160 / 252, devouringdetails 199. Dark: interfaces Lab L 94 / 87 / 74 / 52, libraries.dev bg 18. Dark fg-5 was not measured.

## Do / don't

```css
/* Don't: hierarchy from size, bold and black */
h2 { font-size: 24px; font-weight: 700; color: #000; }
/* Do: same size, one weight step, one grey step */
h2 { font-size: inherit; font-weight: 550; color: var(--mt-fg-1); }

/* Don't: the browser slants Inter and calls it italic */
em { font-style: italic; }
/* Do: a real italic, sized the way benji sets Newsreader */
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
```

## Fast diagnoses

| Symptom | Fix |
|---|---|
| Page feels loud | Headings back to body size at 550. Use one display line at most, and only on a looking page |
| Page feels flat | Title fg-1, prose fg-2, meta fg-3. Don't add a size |
| Audit flags weight 700 | `th`, `b`, `strong` and `h*` are bold by default. Set them to 500 or 550 |
| Italic looks like slanted Inter | Newsreader didn't load. `font-synthesis: none` makes that visible instead of faking it |
| `a` and `l` didn't change shape | The Inter subset (for example fontsource) dropped `cv01`/`ss03`. Use rsms' `InterVariable.woff2` |
| A line with `em` or `code` sits taller than the rest | The bigger inline face opened the line box. Give it `line-height: 0` |
| Caps labels clump | Mono 500, +0.3px |
| Lines feel long | Column is over 672px. Set 644px |

## Review checklist

Run `references/audit.js` on the page in light and in dark (DevTools console, or `page.evaluate` in Playwright). It checks lines 1–11 and prints each failing element with its computed value. Check 12–13 by eye. Report every line as pass or fail. Don't summarize.

1. Text uses only Inter, Newsreader and Geist Mono, plus Caveat on at most one element.
2. Every Inter element computes `"cv01"` and `"ss03"`.
3. No sans or mono element computes a weight of 600 or more.
4. Prose is 15–17px, line-height ÷ size is 1.6–1.625, and width ≤ 672px.
5. `h2`–`h6` are at body size. An `h1` is same-size, step (24/32, −0.3px) or display (48/48, −0.022em). One display heading per page at most.
6. Uppercase text is mono, 12px, tracked +0.3 to +0.66px (interfaces to allo). Other text under 24px has `normal` tracking.
7. Every text color is fg-1, fg-2 or fg-3 of the active scheme. Nothing is `rgb(0, 0, 0)`.
8. `p` computes `pretty`, `h1`–`h3` compute `balance`, and digits in `td`, `time` or `.num` compute `tabular-nums`.
9. `em` is Newsreader italic 430 at 1.07em, and `font-synthesis` is `none`.
10. There are no requests to `fonts.googleapis.com` or `fonts.gstatic.com`.
11. Underlined links are 1px thick, 2px offset, fg-5 (rauno; muted like Emil's).
12. Dark mode swaps to the dark ladder on `#121212`. It is not `filter: invert()`.
13. No paid font file (Tiempos, Heldane, Berkeley Mono) is in a public repo.

## How strong is each rule

When a project pushes back, bend the weak rules first. Counts are out of 18 sites.

- **Strong:** grey ladder 16, `pretty`/`balance` 16, self-hosted 15, Inter 11, `tabular-nums` 11, negative display tracking 11, intermediate weights 10, dedicated mono 9.
- **Weak:** ~60ch measure 8, tracked caps labels 7, serif italic 5, custom underlines 5, same-size headings 4, Inter `cv01`/`ss03` 4, script accent 3. The script is the weakest, so leave it out when in doubt.

## Not measured

Spacing, paragraph gaps, hover and focus states, `::selection`, and the dark fg-5 were not measured. This skill has no numbers for them. Set them by eye and don't turn a guess into a token. The one hover rule in `tokens.css` (underline fades to the text color) takes its 150ms ease-out from emil-ui-polish. The demo spaces everything in `lh` units, so it doesn't invent any pixels.
