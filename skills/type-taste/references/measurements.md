# Typography notes for type-taste

Reference notes behind Murat's typography taste, refined over years of shipping interfaces. Where a value was set by eye, that is stated.

## Method

- Date: 18 November 2026, evening, Europe/Istanbul.
- Viewport: 1440×1400, device pixel ratio 1. Playwright/Chromium with `color-scheme: light` emulated. Sites that are dark by default (Site F, Site E, Site M, Site K, muwrites, mutype) still rendered as dark.
- Computed styles via `getComputedStyle`. Font files were downloaded and identified from the OpenType name table (not guessed from CSS family aliases).
- CSS family names in the page (for example Site B’s `Sans`, Site A’s `X`, next/font hashes) are reported as computed, then mapped to the real family from the woff2 name table when the file was obtained.
- First-visible semantic tags can land on decorative hero type (Site A home `h3` at 720px, Site D marketing `p` at 40px). Those are labelled as decorative. Body/heading figures below prefer clearly editorial or UI text.
- `@font-face` rules in cross-origin stylesheets were sometimes unreadable (CORS). Network font requests still show what actually loaded.
- Hanging punctuation: `hanging-punctuation` was `none` on every typographic unique collected. `font-size-adjust` was not set on live text (next/font fallback faces do declare `size-adjust` / `ascent-override`).
- **Site O** was not fetched (login-gated). Figures come from Murat’s computed-style capture, summarized here (18 Nov 2026). Loading method and some fields were not in that note and are marked unknown.
- **muratalpay.me** was measured read-only. **Site F** was measured on the public homepage only (no workspace URL).

Pages measured:

| Site | Pages | HTTP |
|---|---|---|
| Site A | `/`, essay | 200 |
| Site B | `/`, article | 200 |
| Site C | `/` | 200 |
| Site D | `/` | 200 |
| mutype.vercel.app | `/` | 200 |
| muwrites.dev | `/`, `/articles/intent-is-the-moat` | 200 |
| Site E | `/` | 200 |
| muratalpay.me | `/` | 200 |
| Site F | `/` only | 200 |
| Site G | inner page | 200 |
| Site H | docs page | 200 |
| Site I | product page | 200 |
| Site J | `/` | 200 |
| Site K | `/` | 200 |
| Site L | `/` | 200 |
| Site M | `/` | 200 |
| Site N | essay | 200 |
| Site O | login-gated (Murat’s capture only) | not fetched |

Supporting raw files: `raw/*.json`, `extract/`, `fonts/` (downloaded woff/woff2/ttf), `extract/font-names.txt`.

---

## Per-site findings

### 1. Site A

**Fonts.** Computed family `X`. Downloaded file `dd.woff2` name table: **PP Neue Montreal Medium**. `@font-face` maps both weight 400 and 500 of `X` to that single Medium file. **JetBrains Mono** is declared in `@font-face` (`JetBrainsMono-Regular.woff2`) but was not requested and did not appear in computed styles on the two measured pages. Italic emphasis in the essay computes to **Georgia** italic (system serif), not a Neue Montreal italic.

**Loading.** Self-hosted same-origin woff2, preloaded. Not next/font.

**Scale / leading / tracking** (essay, the readable page):

| Role | Family | Size / line-height | Weight | Tracking | Notes |
|---|---|---|---|---|---|
| Body prose | X = PP Neue Montreal | 16px / 28px (1.75) | 400 | normal | `rgb(23, 23, 23)` |
| Title `h1` | same | 16px / 20px (1.25) | 500 | normal | same size as body; color `rgb(111, 111, 111)` |
| Date / meta `p` | same | 16px / 20px (1.25) | 400 | normal | grey |
| Nav / TOC | same | 14px / 20px or normal | 400 | normal | grey |
| Caption-like | same | 14px / 28px (2.0) | 400 | normal | `rgb(160, 160, 160)` |
| Inline italic `em`/`i` | Georgia | 16px / 28px (1.75) | 400 italic | normal | warm black |
| Superscript | X | 13.3333px / 14px | 400 | normal | |
| Home name (decorative) | X | 85px / normal | 400 | normal | not body |
| Home manifesto (decorative) | X | 75px / normal | 400 | normal | |
| Home giant glyph (decorative) | X | 720px / normal | 400 | nowrap | |

**Weights used:** 400, 500 only. **text-wrap:** `wrap` only (no `pretty`/`balance` observed). **OpenType:** no non-default `font-feature-settings` or `font-variant-numeric`.

**Colors.** Essay bg `rgb(252, 252, 252)` (`theme-color: #FCFCFC`). Home bg `rgb(237, 237, 237)` (`#EDEDED`). Text: `rgb(23, 23, 23)` primary, `rgb(111, 111, 111)` secondary, `rgb(160, 160, 160)` tertiary; some chrome `rgb(0, 0, 0)`.

**Measure.** Essay paragraphs: **672px ≈ 66.1ch** (`max-width: none`; width from layout). Classes include `family-body`, `size-16`, `lineHeight-28`.

**Signatures.** In-text links: `underline`, `text-underline-offset: 2px`, thickness `1px`, color `rgb(23, 23, 23)`. Title is not larger than body — weight + grey do the work. Italic is a real serif (Georgia), not a sloped sans.

---

### 2. Site B

**Fonts** (CSS name → name table of the next/font woff2):

| CSS family | Real family | Notes |
|---|---|---|
| `Sans` | **Inter Variable** | axes `opsz` 14–32 (default 14), `wght` 100–900 |
| `Serif` | **Heldane Text** | roman + italic files |
| `serifInline` | **Tiempos Text** italic | regular + medium italic files |
| `Mono` | **Berkeley Mono** | loaded; **not observed** in computed styles on `/` or the article |
| `runde` | **Open Runde** | 400/500/600 files loaded; **not observed** on these two pages |

`--font-settings: "cv01","ss03"` and `--font-variations: "opsz" auto` are set on the root.

**Loading.** next/font, self-hosted `/_next/static/media/*.woff2`, `font-display: swap`, fallback faces with `size-adjust` / `ascent-override`.

**Scale** (article; first `p` at 14px is a course banner, not prose):

| Role | Family | Size / lh | Weight | Notes |
|---|---|---|---|---|
| Body prose | Sans = Inter Variable | 16px / 26.4px (**1.65**) | 400 | `feat="cv01", "ss03"` |
| `h1` | same | 16px / 24px (1.5) | **600** | same size as body |
| `h2` | same | 16px / 24px (1.5) | **550** | same size; weight only |
| Nav / name | same | 16px / 24px (1.5) | 500 | |
| Promo / small UI | same | 14px / 23.1px (1.65) or 14/20 | 400 | |
| Footnote-like | same | 14px / 23px | 400 | `text-wrap: pretty` |
| Meta | same | 13px / 13px (1.0) | 500 | |
| Inline `em` | serifInline = Tiempos Italic | 15.68px / 25.872px (1.65) | 400 italic | slightly smaller than body |
| Pull quote | Serif = Heldane Text | 30px / 39.9px (1.33) | 500 (italic 500) | quote mark also tried Georgia 30px |

**Weights:** 400, 500, 550, 600. **text-wrap:** `pretty` on some article spans; otherwise `wrap`. **OpenType:** `"cv01", "ss03"` on essentially all Inter text. No `font-variant-numeric` observed.

**Colors.** Bg `rgb(253, 253, 252)`. Primary `rgb(33, 32, 28)` (warm near-black). Secondary `rgb(99, 99, 94)`. Tertiary `rgb(130, 130, 124)`. Link underline color `rgb(188, 187, 181)` (muted, not the same as text).

**Measure.** Article / home column **644px** wide.

**Signatures.** Serif italic for emphasis, Heldane for quotes, Inter for everything else. Heading hierarchy is weight (550/600), not size. `opsz: auto`. Home bio uses 16/26.4 in secondary grey.

---

### 3. Site C

**Fonts.** Visible type computes to **Allo**. Downloaded file: **Allo Variable Friendly** (Site C, based on Inter), axes `opsz` 9–32 (default 14) and `wght` 100–900 — **no `ROND` axis** in this cut. Also requested: **Cormorant Garamond Light** (roman + italic, variable `wght` 300–700) via next/static files; **not observed** in computed styles on the homepage. `@font-face` also declares Signifier, GT Super Text, and Martina Plantijn; those files were **not requested** on `/`, so they were not used on the measured homepage. The `body` element itself computes to Signifier 16/24, but all visible text samples were Allo.

**Loading.** Self-hosted woff2, preload. Allo Variable Friendly is same-origin.

**Scale:**

| Role | Family | Size / lh | Weight | Wrap | Color |
|---|---|---|---|---|---|
| Body / bio | Allo | 16px / 26px (**1.625**) | **420** | pretty | `rgb(82, 82, 82)` |
| Inline links in bio | Allo | 16px / 26px (1.625) | 420 | pretty | `rgb(10, 10, 10)` |
| `h1` name, `h2` Projects | Allo | 24px / 36px (1.5) | 600 | pretty | `rgb(10, 10, 10)` |
| Project titles | Allo | 16px / 26px (1.625) | 500 | wrap | `rgb(10, 10, 10)` |

**Weights:** 420, 500, 600 (fine intermediate 420). **OpenType:** none non-default observed. **Colors.** Bg `rgb(250, 250, 250)`. Primary `rgb(10, 10, 10)`, secondary `rgb(82, 82, 82)`.

**Measure.** Bio paragraphs **548px ≈ 55.6ch**. `main` is 740px with 96px horizontal padding (`max-width: 740px`).

**Signatures.** `text-wrap: pretty` on headings and body. Intermediate weight 420 instead of 400. Quiet two-color hierarchy.

---

### 4. Site D

A font specimen, so many unique sizes/colors (142 typographic uniques). Treat marketing/hero type as display, not a blog scale.

**Fonts.** **Allo Variable** (name table), axes `opsz` 9–32 (default 14), `wght` 100–900, **`ROND` 0–100 (default 50)**. Also loaded: static **Allo SemiBold Oblique**. Computed families also include `Allo Oblique`, `Allo Oblique Weights`, and `Kit Allo` (icon/UI cut of Allo). **Signifier Regular** was requested from Site C (likely an in-use card); not the page UI font. Copyright: Site C 2026, portions Inter.

**Loading.** Self-hosted `/assets/*.woff2`, preloaded (`font-display: block` on the variable face).

**Representative styles** (not the full specimen inventory):

| Role | Family | Size / lh | Weight | Extra |
|---|---|---|---|---|
| `body` default | Allo | 16px / 21.6px (1.35) | 420 | |
| `h1` hero wordmark | Allo | 32px / 27.2px (**0.85**) | 650 | `ls=-0.64px`, `text-wrap: balance` |
| Marketing lead (decorative `p`) | Allo | 40.32px / 43.55px (1.08) | 620 | `pretty` |
| Section `h2` | Allo | 15px / 18px (1.2) | 550 | nowrap; display-p3 grey |
| `h3` / UI | Kit Allo | 15px / 20px (1.333) | 600 | `ROND` 25 |
| Caps label `h4` | Kit Allo | 11px / 16px | 700 | `ls=0.66px`, `uppercase`, `"case"`, `ROND` 50 |
| `small` | Allo | 11px / 14.85px (1.35) | 420 | |
| `code` (install line) | Allo | 22px / 25.3px (1.15) | 650 | `ls=0.22px`, `tabular-nums` |
| Buttons | Allo | 32px / 38.7px | 700 | `ROND` 50, `opsz` 32, `wght` 700 |

**Weights observed:** 100–900 including 420, 550, 620, 650, 750. **text-wrap:** `pretty`, `balance`, and `nowrap balance`. **OpenType:** specimen toggles `ss01`, `ss02`, `ss03`, `case`, `frac`, `zero`, `sups`, `cv01`, `calt`. **Variation axes** actually set on live elements: `ROND`, `opsz`, `wght`.

**Colors.** Page bg `rgb(252, 252, 252)`. UI text `rgb(17, 17, 17)` plus display-p3 greys and many oklch specimen colors (those are demo stickers, not a product palette).

**Measure.** In-story column **490px ≈ 42.8ch**; a `.cr-prose` well **680px ≈ 61.2ch**.

---

### 5. mutype.vercel.app

**Fonts.** **Geist** variable (`wght` 100–900), self-hosted `/assets/geist-latin-wght-normal-*.woff2`. Only this family.

**Limitation:** the homepage is a typographic animation, not an article. Only three distinct styles were found, all at **35.28px**, weight **400**, `letter-spacing: 0.882px`, cream on dark brown. `h1` uses `text-wrap: balance` (color is `rgba(0,0,0,0)` — the visible glyphs are sibling spans). No body, small, mono, or heading scale to report. No text-column measure (≥200px candidates with article-like copy were not found).

**Colors.** Bg `rgb(29, 25, 22)`. Text `rgb(242, 239, 232)`. `color-scheme: light dark`.

---

### 6. muwrites.dev (Murat)

**Fonts.** **Geist** (headings) and **Inter** (body/UI), both variable, next/font self-hosted `/_next/static/media/*.woff2`. Inter file: `wght` 100–900 (this cut has no `opsz` in the name table). Geist file: `wght` 100–900. Headings set `font-variation-settings: "opsz" 26` (computed). The Geist woff2 downloaded for this site lists only a `wght` axis in its `fvar` table, so that `opsz` value may have no effect.

**Loading.** next/font, same origin.

**Scale** (article “Intent is the moat”; home is consistent):

| Role | Family | Size / lh | Weight | Tracking | Wrap | Notes |
|---|---|---|---|---|---|---|
| Article `h1` | Geist | 48px / 48px (**1.0**) | **590** | **-1.06px** | balance | `calt` 0, `liga` 0, `opsz` 26 |
| Article `h2` | Geist | 24px / 32px (1.333) | 590 | -0.288px | balance | |
| Section / card titles | Geist | 20px / 28px (1.4) or 16/24 | 550 | -0.12px / -0.176px | balance | |
| Home `h1` | Geist | 40px / 48px (1.2) | 550 | -0.4px | balance | |
| Body prose | Inter | **17px / 27.2px (1.6)** | 400 | normal | wrap | color `color(srgb 0.838 0.838 0.838)` |
| Deck / card body | Inter | 16px / 24px (1.5) | 400 or 500 | -0.176px | | grey `rgb(163, 163, 163)` |
| Meta / byline | Inter | 13px / 20px (1.538) or 15/24 | 500 / 400 | ~-0.08 to -0.165px | | `rgb(123, 123, 123)` |
| Nav links | Inter | 13px / 16–19.5px | 500 | -0.13px | | `ss11` |
| Caps kbd-like `⌘` | Inter | 12px / 16px | 500 | **+0.48px**, uppercase | | |

**Weights:** 400, 500, 550, 590. **OpenType:** Inter `"calt" 0, "liga" 0, "ss11"`; Geist `"calt" 0, "liga" 0`. **Colors.** Bg `rgb(0, 0, 0)`. Primary white, mid grey `rgb(163, 163, 163)`, muted `rgb(123, 123, 123)`.

**Measure.** Article prose well **624px ≈ 61.8ch** (`.article-prose`, `max-width: 624px`).

**Signatures.** Geist display + Inter text. Tight display tracking and 1.0 heading lh. Ligatures off. Fine weights 550/590. Dark-only.

---

### 7. Site E

**Fonts.** **PP Neue Montreal Variable Upright** (`wght` 100–900) and **Geist Mono** variable (`wght` 100–900). Self-hosted `/fonts/*.woff2`.

**Loading.** Same-origin woff2 (not next/static media).

**Scale:**

| Role | Family | Size / lh | Weight | Tracking | Wrap |
|---|---|---|---|---|---|
| `h1` | PP Neue Montreal | 36px / 45px (1.25) | 400 | (features only) | balance |
| Subhead | same | 36px / 45px (1.25) | 400 | | balance |
| Mid display | same | 30px / 41.25px (1.375) or 30/37.5 (1.25) | 400 | | |
| `h3` / 20px copy | same | 20px / 27.5px (1.375) | 400 | +0.24px | pretty on some |
| Body-ish 24px | same | 24px / 33px (1.375) | 400 | +0.24px | pretty |
| UI / chrome | same | 14–16px / 20–24px | 450 or 550 | +0.14 to +0.24px | |
| Meta / meters | same | 12px / 16.5px (1.375) | 450 | +0.24px | `tabular-nums` |
| Code-like labels | GeistMono | 12px / 16.5px (1.375) | 450 | +0.24px | e.g. `image.generate` |

**Weights:** 400, 450, 550. **OpenType:** `"liga" 0, "ss07", "ss08"` on display/body; `tabular-nums` on prices and counts.

**Colors.** `color-scheme: dark`. Computed `html`/`body`/`main` backgrounds were **transparent** (exact canvas color not captured). Text: white primary, `rgb(133, 133, 133)` secondary. CSS vars include a text color `#f0f0f0` and a subtle text color `#828387`.

**Measure.** No 400–800px article-style column was identified (marketing layout).

**Signatures.** Slight **positive** tracking almost everywhere (opposite of the tight-display group). Stylistic sets ss07/ss08, ligatures off. Tabular figures. Geist Mono for meter/API labels.

---

### 8. muratalpay.me (Murat; read-only)

**Fonts.** **Inter** variable (`opsz` 14–32, `wght` 100–900) via next/font, and **Momo Signature** (script) for the first-name accent. Self-hosted `/_next/static/media/*.woff2`.

**Scale:**

| Role | Family | Size / lh | Weight | Tracking | Extra |
|---|---|---|---|---|---|
| `h1` “Murat Alpay” | Inter | 18px / 24px (1.333) | 500 | -0.09px | `text-wrap: balance` |
| Body / role line | Inter | 15px / 22px (1.467) | 400 | | secondary grey |
| Links in body | Inter | 15px / 22px | 500 | | primary |
| Date | Inter | 15px / 22px | 400 | -0.09px | secondary |
| Clock / numerals | Inter | 15px / 22px or 15/15 | 500 | -0.09px | **`tabular-nums`** |
| Script accent “Murat” | **Momo Signature** | 15px / 22px | 400 | -0.09px | same size as body |
| Nav pill | Inter | 12px / 16px | 400 | | nowrap |

**Weights:** 400, 500 only. **text-wrap:** `balance` on the heading. Body paragraphs have a Tailwind class `text-pretty`, but **computed `text-wrap` was `wrap`**, not `pretty`.

**Colors.** Bg `rgb(253, 253, 253)` (`theme-color: #fdfdfd`). Primary `rgb(51, 51, 51)`, secondary `rgb(102, 102, 102)`.

**Measure.** Paragraphs **560px ≈ 59.3ch**.

**Signatures.** Very small, quiet personal site. Script accent at body size, not a giant display script. Tabular numbers on the clock.

---

### 9. Site F (public homepage only)

Public homepage only (did not follow any workspace).

**Fonts.** **Inter Variable** (`opsz` 14–32, `wght` 100–900) and **Berkeley Mono Variable** (`wght` 100–900, `wdth` 60–100, `slnt` -16–0). Self-hosted from Site F’s font host.

**Scale:**

| Role | Family | Size / lh | Weight | Tracking | Extra |
|---|---|---|---|---|---|
| `h1` | Inter Variable | 64px / 64px (**1.0**) | **510** | **-1.408px** | `cv01`, `ss03` |
| `h2` | same | 48px / 48px (1.0) | 510 | -1.056px | secondary color on part of the line |
| `h3` | same | 20px / 26.6px (1.33) | 590 | -0.24px | |
| Mid marketing `p` | same | 24px / 31.92px (1.33) | 400 | -0.288px | `pretty` |
| Subcopy | same | 15px / 24px (1.6) | 400 | -0.165px | |
| UI / issue body | same | 14px / 21px (1.5) | 400 or 510 | -0.182px | |
| Small UI / IDs | same | 12–13px | 400 or 510 | often -0.13px | `lining-nums tabular-nums` |
| Caps mono labels (“FIG 0.1”, “POWERING…”) | **Berkeley Mono** | 12px / 16.8px (1.4) | 400 | | `uppercase` |
| Code | Berkeley Mono | 12px / 20px (1.667) | 400 | -0.182px | |

**Weights:** 300 (rare), 400, **510**, **590**. **OpenType:** `"cv01", "ss03"` on Inter; `lining-nums tabular-nums` on IDs and counts.

**Colors.** Dark bg `rgb(8, 9, 10)` (`theme-color: #08090a`). Near-white `rgb(247, 248, 248)` / `rgb(208, 214, 224)` primary; `rgb(138, 143, 152)` secondary; `rgb(98, 102, 109)` tertiary.

**Measure.** Marketing descriptions around **540–566px** (`max-width` 540px / 566.438px). Narrower cards ~362–368px.

**Signatures.** Inter + Berkeley Mono. cv01/ss03 (same pair as Site B). Tight 1.0 display lh and strong negative tracking. Intermediate weights 510/590. Tabular lining figures. Mono used for figure labels, not only code.

---

### 10. Site G

**Fonts** (next/font hashed families, identified from files):

| CSS family | Real family | Role on this page |
|---|---|---|
| `__Inter_d8ebd1` | **Inter** variable (`wght`) | essay / UI body |
| `__Newsreader_caac2d` | **Newsreader 16pt** italic (`wght`, `opsz`) | italic emphasis |
| `__Script_4a0607` | **Biro Script Plus** | script asides (“fair warning”) |
| `__lfeSans_*` / `__honkSans_*` / `__honkChat_*` | **Honk Sans** / **Honk Chat** | declared; playground faux-UI mostly computed as `system-ui` / **SF Mono** / Hiragino Sans |

`--font-code: "SF Mono", "SFMono-Regular", …` (system mono; no SF Mono file was downloaded). `--font-secondary: Newsreader`.

**Loading.** next/font, self-hosted `/_next/static/media/*`.

**Scale** (editorial, not the faux-UI playground):

| Role | Family | Size / lh | Weight | Tracking | Extra |
|---|---|---|---|---|---|
| `h1` | Inter | 14px / 20px (1.429) | 500 | -0.09px | `balance` |
| Body | Inter | 14px / 20px (1.429) | **460** | -0.09px | |
| `h2` / small heads | Inter | 13px / 15.6px (1.2) | 460 | -0.04px | muted |
| Figcaption | Inter | 12px / 18px (1.5) | 400 | | `rgba(0,0,0,0.4)` |
| Inline italic | Newsreader | 15px / 15px (1.0) | **430** italic | +0.16px | `"opsz" 10` |
| Script aside | Biro Script Plus | 22px / 20.9px (0.95) | 460 | -0.04px | `balance`, `"ss03"` |
| Code | SF Mono | 13px / 20.15px (1.55) | 400 | | |

**Weights:** 300, 400, 430, 450, 460, 500, 600, 700 (fine steps in the editorial type). **OpenType:** `"tnum"` / `tabular-nums` in the faux UI; `"ss03"` on the script line.

**Colors.** Page bg `rgb(253, 253, 252)` (html; body/main transparent). Editorial text `rgb(17, 17, 17)` and many `rgba(0,0,0, α)` steps (0.85 / 0.55 / 0.4 / 0.35).

**Measure.** Article **550px** (one listing `max-width: 706.562px`); `~54.5–61.4ch` depending on element.

**Signatures.** Tiny essay scale (14px body, 14px title). Newsreader italic + script accent. Half-steps (430/460). Faux UI is deliberately system fonts.

---

### 11. Site H

**Fonts.** Computed family `System` is **Kecal** — files `System-Regular-web.woff2` / `System-Medium-web.woff2`. **JetBrains Mono** for code and tokens. **Caveat Bold** for handwritten annotations. **PP Neue Montreal Medium** (`dd.woff2`, the same cut as Site A) was requested but **did not appear** in computed typographic uniques on this page.

**Loading.** Self-hosted same-origin files (woff2 + Caveat ttf).

**Scale:**

| Role | Family | Size / lh | Weight | Extra |
|---|---|---|---|---|
| `h1` | System = Kecal | 18px / 16px (**0.889**) | 400 | very tight |
| Subline `h2` | same | 18px / 16px (0.889) | 400 | secondary grey |
| Body prose | same | 18px / 30px (**1.667**) | 400 | `pretty` |
| `h3` | same | 18px / 27px (1.5) | 500 | |
| UI / buttons / labels | same | 14–15px / 21–22.5px (1.5) | 400 | |
| Caption | same | 14px / 20px | 400 | pretty, grey |
| Code / tokens | JetBrains Mono | 13px / 18–20px | 400 | |
| Annotation | Caveat | 24px / 36px (1.5) | 700 | nowrap |
| Caps badge | System | 9px / 26px | 600 | `ls=0.2px`, uppercase |

**Weights:** 400, 500, 600, 700. **Colors.** Bg `rgb(252, 252, 252)` — same recipe as Site A’s essay. Primary `rgb(23, 23, 23)`, secondary `rgb(111, 111, 111)`, muted `rgb(199, 199, 199)`, accent `oklch(0.71 0.24 42.36)` / `rgb(251, 113, 0)` in code.

**Measure.** Content well **782.69px ≈ 68.8–77.4ch** (docs layout, wider than a blog column).

**Signatures.** Same grey trio as Site A (23 / 111 / 252). Tight heading lh vs 1.667 prose. Handwritten annotation. Mono metadata (`solid | soft | ghost`).

---

### 12. Site I

**Fonts.** Observed type is **Inter Variable** (`opsz` 14–32, `wght` 100–900), family name `InterVariable`, feature `"ss03"`. Also requested (so they loaded) from Site I’s font host: **Heldane Text** regular, medium, and italic. Heldane **did not appear** in the typographic-uniques snapshot on this page (possibly a logo or below-fold use not captured). No `@font-face` rules were readable (cross-origin CSS).

**Loading.** Self-hosted on Site I’s font host (bundler-hashed woff2).

**Scale:**

| Role | Size / lh | Weight | Tracking | Wrap | Color |
|---|---|---|---|---|---|
| `h1` | 56px / 56px (**1.0**) | 500 | **-0.56px** | pretty | `rgba(0,0,0,0.875)` |
| `h2` | 28px / 36px (1.286) | 500 | -0.28px | pretty | same |
| `h3` | 24px / 32px (1.333) | 500 | -0.24px | pretty | same |
| Body / feature copy | 15px / 24px (**1.6**) | 400 / 450 / 500 | | pretty on some | 0.875 / 0.608 / 0.447 |
| Nav / chrome | 13px / 20px (1.538) | 450 or 500 | | | |
| Caps / timestamps | 10px / 16px (1.6) | 500 | **+0.5px**, often uppercase | | `tabular-nums` on times |

**Weights:** 400, 450, 500, 600. **OpenType:** `"ss03"` almost everywhere; `tabular-nums` on times and IDs.

**Colors.** White bg. Hierarchy is **alpha on black**: 0.875 / 0.608 / 0.447 / 0.267 — not a separate grey palette.

**Measure.** A body `p` at **448px** (`max-width: 448px`, ≈80.6ch at that small size — ch is from the element’s font).

---

### 13. Site J

**Fonts.** **Inter Variable** (`opsz` 14–32, `wght` 100–900), self-hosted `/fonts/InterVariable.woff2`. **Caveat** 400–700 is pulled from a **hosted font CDN** (`fonts.googleapis.com/css2?family=Caveat…`) but **did not appear** in computed uniques on the homepage.

**Scale:**

| Role | Size / lh | Weight | Wrap | Color |
|---|---|---|---|---|
| Bio | 15px / 25px (**1.667**) | 400 | pretty | `rgb(63, 63, 63)` |
| Project title | 14px / 21px (1.5) | 500 | balance | `rgb(51, 51, 51)` |
| Project blurb | 14px / 21px (1.5) | 400 | pretty | `rgb(102, 102, 102)` |
| `h1` name | 14px / 22.4px (1.6) | 500 | | `rgb(51, 51, 51)` |
| Links | 13–15px | 400 | pretty | `rgb(21, 21, 21)`, underline at 30% opacity |
| Meta / stats | 12px | 400 | nowrap | `tabular-nums` on “41,229 monthly visits”, grey `rgb(102, 102, 102)` |
| Controls | 11–12px | 400/500 | | |

**Weights:** 400, 500. **OpenType:** `tabular-nums` on stats only.

**Colors.** Bg `rgb(253, 253, 253)`. Primary around `rgb(51, 51, 51)` / `rgb(63, 63, 63)`, secondary `rgb(102, 102, 102)`, inactive `rgb(153, 153, 153)`.

**Measure.** Bio / about text **600px** (`max-width: 600px` on `.about-text`, ≈63.5ch on the bio). `main` 720px.

**Signatures.** Small, almost understated name (`h1` 14px). Underlines use `text-decoration-color: color(srgb 0.082 0.082 0.082 / 0.3)`. `pretty` + `balance`.

---

### 14. Site K

**Fonts.** Display: **Saans Medium**, self-hosted `/assets/fonts/Saans-Medium.woff2`. UI/body: **Inter** variable and **Roboto Mono** variable from a **hosted font CDN** (`fonts.googleapis.com` + `fonts.gstatic.com`). A tiny `ui-monospace` 8px mark also appears.

**Loading.** Mixed: one self-hosted display face + the hosted font CDN for Inter / Roboto Mono.

**Scale:**

| Role | Family | Size / lh | Weight | Tracking | Wrap |
|---|---|---|---|---|---|
| `h1` | Saans | 42px / 45px (1.071) | 500 | -0.21px | balance |
| `h2` | Saans | 38px / 44.08px (1.16) or 30px / normal | 500 | -0.38px / -0.3px | balance |
| `h3` | Inter | 15px / 20px (1.333) | 500 | | balance |
| Subcopy | Inter | 16px / 24px (1.5) | 400 | | pretty |
| Card / UI | Inter | 13–14px / ~18–22px | 400/500 | | pretty / balance |
| Wordmark | Inter | 15px / 15px (1.0) | 500 | -0.15px | nowrap |
| Code | Roboto Mono | 12px / 18px (1.5) | 400 | | pretty |

**Weights:** 400, 500 (only these observed). **Colors.** Dark bg `rgb(18, 18, 18)` (`theme-color: #121212`). Near-white titles, many greys (`rgb(201,201,201)` down to `rgb(115,115,115)`) plus alpha greys. Accent blue `rgb(125, 180, 255)` / `rgb(158, 158, 255)`.

**Measure.** Cards **492px**. No single essay column.

**Signatures.** Saans for display, Inter for UI (same pairing as Site L). Underlines with `text-underline-offset: 2px` and 50% decoration color. `pretty`/`balance` widely used.

---

### 15. Site L

**Fonts.** Same trio as Site K, but **self-hosted** here: **Saans Medium**, **Inter** / **Inter Variable** (`opsz`+`wght` on the variable file), **Roboto Mono** variable. No hosted font CDN request.

**Loading.** Self-hosted `/` font files (plus next-style hashed names in some URLs).

**Scale:**

| Role | Family | Size / lh | Weight | Tracking | Wrap |
|---|---|---|---|---|---|
| `h1` | Saans | 46px / 52px (1.13) | 500 | -0.23px | (wrap) |
| `h2` / `h3` | Saans | 20–22px / 26–32px | 500 | -0.10 to -0.22px | balance on some |
| Subtitle | Inter | 16px / 24.2px (1.512) | 400 | | balance |
| Body / UI | Inter | 13–15px / 16–22px | 400/500 | wordmark -0.15px | |
| Code / terminal | Roboto Mono | 10.5–11px / 18–22px | 400/500/600 | | nowrap |
| Big metric | Inter | 35px / 40px (1.143) | 600 | | `tabular-nums` |

**Weights:** 400, 500, 600. **Colors.** Bg `rgb(253, 253, 253)`. Primary `rgb(13, 13, 13)` / `rgb(17, 17, 17)`, secondary `rgb(108, 108, 108)`, further greys 118 / 131 / 143 / 151. Accent blue `rgb(0, 83, 227)` / `rgb(0, 115, 229)`.

**Measure.** Subtitle `p` **600px** (`max-width: 600px`). Bento descriptions ~397px.

**Signatures.** Same Saans + Inter + Roboto Mono system as Site K, light instead of dark. `text-underline-offset: 2px` on at least one link. Tabular metric.

---

### 16. Site M

**Fonts.** **ABC Diatype** Regular + Medium, **DM Mono** (the “rolled” cut; file `dm-mono-rolled-regular-latin-*.woff2`). One computed unique used **Inter Variable** on a “Skip to content” leftover; Inter was **not** in the font network log for this page, so that occurrence is noted but not treated as a site font.

**Loading.** Self-hosted framework-hashed assets (`/_app/immutable/assets/`).

**Scale:**

| Role | Family | Size / lh | Weight | Tracking | Wrap | Features |
|---|---|---|---|---|---|---|
| `h1` | ABC Diatype | 45px / 48px (1.067) | 500 | -0.45px | balance | `"cv11"` |
| `h2` | same | 38px / 44px (1.158) | 500 | -0.38px | balance | cv11 |
| `h3` | same | 18px / 24px (1.333) | 400 | | balance | cv11 |
| Lead | same | 18px / 24px (1.333) | 400 | | pretty | cv11 |
| UI / nav | same | 14–16px / 18–24px | 400/500 | often +0.14–0.15px | pretty / nowrap pretty | cv11 |
| Tiny UI | same | 10–12px | 400/500 | +0.1px | | cv11 |
| Mono labels / CLI | DM Mono | 10–16px | 400 | +0.2–0.36px | nowrap | `"ss02"` |

**Weights:** 400, 500. **Colors.** Body/main bg `rgb(24, 24, 24)` (html `rgb(4, 8, 4)`). Primary `rgb(227, 229, 225)`, secondary `rgb(168, 171, 166)`, muted `rgb(108, 110, 106)`. Accent green `rgb(127, 238, 100)` on the word “production AI” and region chips in other hues.

**Measure.** A lead `p` at **403.19px** (`max-width: 403.2px`, `max-w-[25.2em]`).

**Signatures.** Diatype + DM Mono. `cv11` on the sans, `ss02` on the mono. Tight display lh, `balance` on headings, `pretty` on prose. Slight positive tracking on small UI, negative on display.

---

### 17. Site N

**Fonts.** CSS names `inter`, `heldane`, `berkeleyMono`, `libreBaskerville`, identified as **Inter Variable** (`opsz` 14–32, `wght` **400–700** in this subset), **Heldane Text**, **Berkeley Mono**, **Libre Baskerville Italic**. next/font self-hosted `/_next/static/immutable/media/*`.

**Scale** (this is an essay, and it closely matches the Site O capture):

| Role | Family | Size / lh | Weight | Extra |
|---|---|---|---|---|
| Body prose | inter | **17px / 27.625px (1.625)** | 400 | `"ss03"`; color `lab(28.08 …)` |
| `h1` | inter | **17px / 27.625px (1.625)** | **550** | same size as body; `lab(12.3)` |
| Heldane inset / definition | heldane | 17px / 27.625px (1.625) or 18/28 | 400 | |
| Inline `em` | libreBaskerville | 17px / 27.625px (or 16/24) | 400 italic | sometimes `pretty` |
| UI / chrome | inter | 16px / 26px (1.625) | 400/500 | some `ls=-0.4px` |
| Meta / captions | inter | 13px / 21.125px (1.625) or 12/16 | 400/450 | `pretty` on some |
| Code | berkeleyMono | **13px / 21.125px (1.625)** or 14/22.75 | 400 | matches the Site O note |
| Mono labels | berkeleyMono | 12px / 16px | 400/500 | `uppercase` (a product-name label), `"ss03"` |
| Display promo | inter | 60px / 60px (1.0) | 500 | `ls=-0.4px`; italic word in Libre Baskerville |

**Weights:** 400, 450, 500, 550 (no 600/700 observed). **OpenType:** `"ss03"` on Inter and Berkeley Mono; `tabular-nums` on tables/pager. **text-wrap:** `pretty` on several captions and blurbs.

**Colors.** Bg `rgb(252, 252, 252)`. Text mostly in **Lab greys**: `lab(12.3)` primary, `lab(28.08)` prose, `lab(46.64)` / `lab(54.76)` / `lab(58.59)` / `lab(75.87)` secondary–tertiary. (Murat’s Site O note used Lab L 94/87/74/52/46 on a dark bg — same language, inverted because this essay is light.)

**Measure.** Paragraphs / main **644px**.

**Signatures.** Inter + Heldane + Berkeley Mono + italic serif accent. Heading equals body size, weight 550 only. Prose lh exactly 1.625. Code lh 1.625. This is the closest live match to the Site O capture.

---

### 18. Site O (from Murat’s capture; not fetched)

Source: Murat’s private capture of the login-gated reference (not included). Loading method, measure, text-wrap, underline, and hanging punctuation were **not in the note**.

**Fonts.** **interVariable** (UI/body), **heldane** (serif accents/display), **berkeleyMono** (code + labels), **mondwest** (pixel display/meta).

**Scale** (as captured):

| Role | Family | Size / lh | Weight | Tracking |
|---|---|---|---|---|
| Body prose | Inter | 16px / 26px (**1.625**) | 400 | |
| UI body | Inter | 16px / 24px | | |
| Secondary | Inter | 14px / 22.75 | | |
| Article `h1` | Inter | 24px / 32px | **550** | **-0.3px** |
| Section `h2` | Inter | 16px / 26px | **550** | same size as body; weight only |
| Heldane title in demos | Heldane | 24px / 30px | | **-0.6px** |
| Inter display | Inter | 24px / 30px | 500 | -0.6px |
| Large display | (Inter implied) | 48px | | **-1.2px** (note: ≈ -0.025em) |
| Meta labels | Inter | 12px / 16px | 400 | **+0.3px** |
| Mono labels | Berkeley Mono | 12px / 16px | 500 | **+0.3px** |
| Pixel meta | mondwest | 14px / 20px | | **+0.35px** |
| Code | Berkeley Mono | 13 / 21.125 (**1.625**), also 14/22.75, 12/19.5 | | |

**Weights:** 400, 450, 500, 550 (fine half-steps; **no 600/700** in the note). **Colors.** Dark background. Greys given as Lab L: 94 primary, 87 prose, 74 secondary, 52 tertiary, 46 muted. Display lh 1.0–1.25; prose 1.625. `tnum` is discussed in the capture; the capture note does not list a computed `font-variant-numeric` string.

---

## Patterns

Labels describe how firmly each pattern sits in this taste, not a score. A pattern is noted only when it was actually observed (or, for Site O, stated in Murat’s capture). Declared-but-unused fonts are ignored. Weaker related cases are called out.

### 1. Inter (or Inter Variable) as the workhorse sans — **common**

Observed as the main UI and/or body face on: Site B, muwrites.dev (body), muratalpay.me, Site F, Site I, Site J, Site K, Site L, Site N, Site O, Site G.

Not Inter: Site A and Site E (PP Neue Montreal), mutype.vercel.app (Geist only), Site M (ABC Diatype), Site H (Kecal), Site C and Site D (Allo, which is Inter-derived — see below).

**Evidence:** woff2 name tables + computed families above.

### 2. Allo as a friendly Inter-derived UI face, with intermediate weights — **occasional** (plus Site D itself)

Site C uses Allo Variable Friendly (`opsz`+`wght`, weight **420** body, 600 headings, `text-wrap: pretty`). Site D uses the full variable with an extra **`ROND`** axis and many half-weights (420, 550, 620, 650…). Copyright on both files credits Site C and the Inter project.

### 3. A real italic serif used for emphasis, not a sloped sans — **occasional**

- Site B: Tiempos Text italic for `em`, Heldane Text for pull quotes
- Site O: Heldane accents (capture)
- Site N: Heldane inset + Libre Baskerville italic `em`
- Site A: Georgia italic `em` in the essay
- Site G: Newsreader italic (`opsz` 10) for “too much”

Heldane files also loaded on Site I but were not seen in computed text. Cormorant loaded on Site C home but was not used there.

### 4. A script or handwriting accent at text size — **occasional**

muratalpay.me (Momo Signature “Murat” at 15px), Site H (Caveat 24px annotations), Site G (Biro Script Plus “fair warning”).

### 5. A dedicated mono for code and/or metadata labels — **common**

Observed in computed styles: Site O (Berkeley Mono, capture), Site N (Berkeley Mono labels + code), Site F (Berkeley Mono caps labels + code), Site E (Geist Mono), Site H (JetBrains Mono), Site K (Roboto Mono), Site L (Roboto Mono), Site M (DM Mono), Site G (SF Mono, system stack), Site D (Allo itself with `tabular-nums` on the npm line — weaker, not a second family).

Nine solid matches, plus Allo as a maybe if its mono-styled labels count.

Site B loads Berkeley Mono and Site A declares JetBrains Mono, but neither appeared on the pages reviewed.

### 6. `text-wrap: pretty` and/or `balance` — **strong default**

pretty and/or balance observed on: Site C, Site D, Site B (article), mutype.vercel.app, muwrites.dev (headings `balance`), Site E, muratalpay.me (`balance` on `h1`), Site F, Site H, Site I, Site J, Site K, Site L, Site M, Site N, Site G (`balance`). **Site A** was `wrap` only. **Site O** wrap was not in the capture (unknown).

### 7. Tight display line-height (about 1.0–1.25) vs looser prose (about 1.5–1.75) — **common**

Clear split: muwrites.dev (48/48 vs 17/27.2), Site F (64/64 vs 15/24), Site I (56/56 vs 15/24), Site O (display 1.0–1.25 vs prose 1.625), Site M (45/48 vs ~1.5 UI / 18/24 lead), Site K (42/45 vs 16/24), Site L (46/52 vs 16/24.2), Site H (18/16 vs 18/30), Site D (hero 0.85 vs body 1.35), Site N (60/60 display; prose 1.625), Site A essay (title 1.25 vs prose 1.75).

Weaker or absent: Site C (1.5 / 1.625), Site B (headings stay 16/24), Site E (1.25 display, 1.375 mid), muratalpay.me / Site J / Site G (small type, modest lh contrast), mutype (no prose).

### 8. Negative tracking on display; slight positive tracking on caps/meta labels — **common** on display, **used often** on meta

Negative display tracking: muwrites, Site F, Site I, Site O (capture), Site K, Site L, Site M, Site N (on 16px and 60px lines), Site D (hero -0.64px), muratalpay (`h1` -0.09px, small), Site G (small negative on titles).

Positive meta/caps tracking: Site O (+0.3px labels, +0.35px mondwest), Site D caps +0.66px, Site I caps +0.5px, muwrites `⌘` +0.48px, Site H badge +0.2px, Site M small UI +0.1–0.36px, Site E **almost all type** at +0.24px (a different, site-wide choice).

### 9. Intermediate / variable font weights (not just 400 and 700) — **common**

450/550/590/510/420/430/460 appear on: Site C (420), Site D (many), Site B (550), muwrites.dev (550, 590), Site E (450, 550), Site F (510, 590), Site I (450), Site N (450, 550), Site O (450, 550; note says no 600/700), Site G (430, 450, 460).

400/500-only (or 400 only): muratalpay.me, mutype.vercel.app, Site J, Site K, Site A (400/500). Site M and Site L use 400/500(/600) without quarter-steps. Site H uses 400–700 but not quarter-steps.

### 10. OpenType stylistic sets on the main sans, especially Inter `ss03` / `cv01` — **default**

- `"cv01", "ss03"`: Site B, Site F (2)
- `"ss03"` only: Site I, Site N (and Site G on the script line) (2 + 1)
- Other sets: muwrites.dev (`ss11`, ligatures off), Site E (`ss07`, `ss08`, liga off), Site M (`cv11` on Diatype, `ss02` on DM Mono), Site D (ss01–ss03 etc.)

Site O feature settings were not in the capture (the Site O capture discusses features, but no computed string was recorded).

### 11. Tabular numbers for meters, clocks, IDs, and changing figures — **common**

Observed `tabular-nums` and/or `tnum`: Site E, Site F (`lining-nums tabular-nums`), Site I, Site N, Site J, muratalpay.me, Site D, Site H, Site L, Site G, Site O (article discusses `tnum`; counted from the capture note).

### 12. A grey (or alpha-grey) hierarchy of 3+ steps, not only black on white — **strong default**

Nearly every site. Personal/light sites tend to warm near-black on off-white (Site B `253,253,252` / `33,32,28`; Site A essay `252,252,252` / `23,23,23`; Site C `250,250,250` / `10,10,10`). Product dark sites (Site F, Site M, Site K, muwrites) use a near-white primary plus two or three cooler greys. Site I and Site G lean on **alpha** (`rgba(0,0,0,0.875/0.608/…)` or `rgba(0,0,0,0.85/0.4)`). mutype is a two-color poster (cream on brown) — not really a hierarchy. Site E’s exact background was not recorded, but white vs `rgb(133,133,133)` is a two-step hierarchy.

### 13. Reading measure roughly 55–66ch / 540–670px on essay-like pages — **default**, plus a few marketing widths

Essay-like: Site A 672px / 66.1ch, Site B 644px, muwrites.dev 624px / 61.8ch, Site N 644px, Site C 548px / 55.6ch, muratalpay.me 560px / 59.3ch, Site J 600px, Site G 550px. Marketing/docs differ (Site I 448px, Site F ~540–566px, Site M 403px, Site H ~783px, Site D prose 680px). Not measurable or not applicable: mutype, Site E, Site O (unknown).

### 14. Essay titles the same size as body, distinguished by weight (and sometimes color) — **occasional**, plus a related case

Site B (`h1`/`h2` 16px, weights 600/550), Site O (`h2` 16/26 w550, same as body; `h1` steps up to 24), Site N (`h1` 17/27.625 w550, same as body), Site A essay (`h1` 16px grey w500 vs body 16/28). Site H `h1` is also 18px, same as body, but with tighter lh.

This is a strong “taste” signal for writing, even if rare on marketing homes.

### 15. Self-hosted fonts as the default; a hosted font CDN is the exception — **strong default**

The hosted font CDN is used on Site K (Inter + Roboto Mono; Saans is self-hosted) and Site J (Caveat only; Inter is self-hosted). Everyone else that loaded fonts did so from their own origin or a first-party CDN (Site F’s font host, Site I’s font host). Site O loading is unknown. next/font with fallback `size-adjust` is common (Site B, Site G, muwrites, muratalpay, Site N, Site C’s Cormorant).

### 16. Underlines are custom (offset and/or muted decoration color), when they appear — **occasional**

Site A essay: offset 2px, thickness 1px, color `rgb(23,23,23)`. Site B: underline color `rgb(188,187,181)`. Site J: decoration color at 30% opacity. Site K and Site L: `text-underline-offset: 2px` (Site K also uses a 50% decoration color). Many sites have no underline in the snapshot (they color or weight links instead). **Hanging punctuation was never observed.**

### 17. Ligatures often turned off on UI / display faces — **occasional**

muwrites.dev `"calt" 0, "liga" 0`; Site E `"liga" 0`; Site D can toggle `calt` off. Not a majority, but it is explicit on muwrites.dev and Site E.

---

## Notes for type-taste (not rules yet)

The densest recipe for **writing / personal sites** in this taste looks like:

- Inter (or Allo / Geist) for UI and often for body; a serif italic only for emphasis; a mono for code and small labels.
- Prose around 15–17px with line-height **1.6–1.75** (1.625 shows up exactly on Site O, Site N, and Site C).
- A column near **60ch** (roughly 550–670px at these sizes).
- Headings either slightly larger with **tight lh (~1.0) and negative tracking**, or — in the Site B / Site O / Site N essay style — **the same size as the body**, heavier (550–600).
- Intermediate weights (420, 450, 510, 550, 590) rather than jumping to 700.
- `text-wrap: pretty` / `balance`.
- Inter features `cv01` and/or `ss03` when Inter is the face; `tabular-nums` wherever numbers change.
- A short grey ladder (or alpha ladder) on an off-white or near-black ground; custom underlines if underlines are used at all.

These values already show up in Murat's own work: **muwrites.dev** (Geist display + Inter text, 17/27.2, 624px, tight 48/48 titles, 550/590, `ss11`, dark greys), **muratalpay.me** (Inter 15/22, 560px, tabular clock, script accent, 18px balanced title), **mutype.vercel.app** (Geist poster, too sparse to generalize).

Raw JSON dumps are not included in this repo.
