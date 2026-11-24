# type-taste review of `before.html`

`references/audit.js` was run on `before.html` served over HTTP, in light and in dark, at 900px and 390px. Lines 12–13 and 17–23 were checked by eye. The page has one stylesheet, an inline `<style>` with plain selectors, so every fix is plain CSS: link `tokens.css`, put `class="mt"` on `body`, and change the rules below. The fixed page is `after.html`.

## Checklist (light / dark)

1. fail / fail: `<code>` computes `monospace`
2. fail / fail: no element computes `cv01`, `ss03`
3. fail / fail: `a` "Notes", `h1`, `h2`, `th` compute 700
4. fail / fail: prose is 16px/24px and 772px wide
5. fail / fail: `h1` 32px/48px, `h2` 24px/36px
6. fail / fail: "ENGINEERING NOTE" is sans, tracked 1px
7. fail / fail: text is `rgb(0, 0, 0)` and `rgb(153, 153, 153)`
8. fail / fail: `p` and `h1`–`h3` compute `auto` wrap; table digits are proportional
9. fail / fail: `em` is slanted Inter 400; `font-synthesis` is on
10. pass / pass
11. fail / fail: the link underline is the default blue
12. fail: the page stays white on `#fff` in dark
13. pass
14. fail / fail: the kicker and the date are 2.85:1 on `#fff`
15. fail / fail: the search field computes 13px; the viewport meta has `maximum-scale=1`
16. pass / pass
17. fail: font smoothing isn't declared
18. pass
19. fail: "ENGINEERING NOTE" is typed in capitals
20. pass
21. pass: `lang="en"`, and the page is left to right only
22. fail: `can't` uses a straight apostrophe
23. pass

## before.html

Must-fix
- `before.html:10` `.date` is `#999` on `#fff` (2.85:1). `color: var(--mt-fg-3);` (line 14, contrast floor)
- `before.html:8` `.kicker` is `#999` on `#fff` (2.85:1). `color: var(--mt-fg-3);` (line 14, contrast floor)
- `before.html:7` the search field is 13px, so phones zoom on focus. `font-size: var(--mt-prose); line-height: var(--mt-prose-lh);` (line 15, inputs at 16px)
- `before.html:1` the viewport meta switches zoom off. `<meta name="viewport" content="width=device-width, initial-scale=1">` (line 15, inputs at 16px)
- `before.html:2` no italic face is loaded, so the browser slants Inter for `em`. `em { font-family: var(--mt-serif-italic); font-style: italic; font-weight: 430; font-size: 1.07em; line-height: 0; }` and `font-synthesis: none` on the root (line 9, real italic)

Taste
- `before.html:3` body text is black at 16/24 with no Inter features. `.mt` from `tokens.css`: `color: var(--mt-fg-2); font-size: 16px; line-height: 26px; font-feature-settings: "cv01", "ss03";` (lines 2, 4, 7, prose role)
- `before.html:9` `h1` is 32px at 700, and `h2` falls back to 24px at 700. `class="mt-h-same"` on both: `font-size: inherit; line-height: inherit; font-weight: 550; color: var(--mt-fg-1);` (lines 3, 5, same-size headings on a reading page)
- `before.html:6` "Notes" is black at 700. `font-size: 15px; line-height: 24px; font-weight: 450; color: var(--mt-fg-1);` (lines 3, 7, UI role)
- `before.html:4` paragraphs run 772px wide. `max-width: 644px;` on `p`, `li` and the column (line 4, measure)
- `before.html:12` `th` is sans at 700 and aligned `left`. `th { font: 500 12px/16px var(--mt-mono); letter-spacing: 0.3px; text-transform: uppercase; color: var(--mt-fg-3); text-align: start; }` (lines 3, 6, label role)
- `before.html:12` table digits are proportional. `table { font-variant-numeric: tabular-nums; }` and `text-align: end` on the number columns (line 8, tabular numbers)
- `before.html:17` "ENGINEERING NOTE" is typed in capitals and tracked 1px in the sans. Source `Engineering note` with `class="label"` (lines 6, 19, casing)
- `before.html:11` `code` is the system `monospace`. `font-family: var(--mt-mono); font-size: 0.8125em; color: var(--mt-fg-1);` (line 1, dedicated mono)
- `before.html:3` paragraphs and headings wrap greedily. `p, li { text-wrap: pretty; } h1, h2, h3 { text-wrap: balance; }` (line 8, wrap)
- `before.html:3` the `format` link keeps the browser's blue underline. `text-decoration-thickness: 1px; text-underline-offset: 2px; text-decoration-color: var(--mt-fg-5);` (line 11, underlines)
- `before.html:3` there is no dark scheme. The dark ladder in `tokens.css` on `#121212` (line 12, dark mode)
- `before.html:3` font smoothing isn't set. `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;` once, on `.mt` (line 17, smoothing)
- `before.html:21` `can't`. `can’t` (line 22, punctuation)
