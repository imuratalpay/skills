# type-taste setup

Plain CSS: link `tokens.css` and put `class="mt"` on `body`. It already carries both ladders, the base styles and the three heading classes.

## Tailwind v4 (`globals.css`)

Light ladder only. Take the dark ladder from `tokens.css`.

```css
@import "tailwindcss";
@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-newsreader), Georgia, serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --text-prose: 16px; --text-prose--line-height: 26px;
  --text-meta: 13px;  --text-meta--line-height: 21.125px;
  --text-label: 12px; --text-label--line-height: 16px;
  --font-weight-ui: 450; --font-weight-heading: 550; --font-weight-display: 590;
  --tracking-display: -0.022em; --tracking-label: 0.3px;
  --color-fg-1: #202020; --color-fg-2: #424242; --color-fg-3: #6f6f6f;
  --color-fg-4: #a0a0a0; --color-fg-5: #c7c7c7; --color-bg: #fcfcfc;
}
body { font-feature-settings: "cv01", "ss03"; font-synthesis: none; }
p, li { text-wrap: pretty; }
h1, h2, h3 { text-wrap: balance; }
h1, h2, h3, h4, th, b, strong { font-weight: var(--font-weight-heading); }
em { font-family: var(--font-serif); font-weight: 430; font-size: 1.07em; line-height: 0; }
table, time, .num { font-variant-numeric: tabular-nums; }
```

Put Tailwind's `antialiased` on `<body>` once.

## Next.js fonts

Self-host everything through `next/font`. Never add a `<link>` to Google Fonts (self-hosting is the default).

```ts
import localFont from "next/font/local";
import { Newsreader } from "next/font/google"; // downloaded and self-hosted at build time
export const inter = localFont({ src: "./fonts/InterVariable.woff2", variable: "--font-inter", weight: "100 900" });
export const newsreader = Newsreader({ subsets: ["latin"], style: "italic", variable: "--font-newsreader" });
export const geistMono = localFont({ src: "./fonts/GeistMonoVariable.woff2", variable: "--font-geist-mono", weight: "100 900" });
```

Use a full `InterVariable.woff2`. Some subset builds (fontsource, for example) strip `cv01` and `ss03`, and then the feature settings silently do nothing.

## Licensing

Free (OFL): Inter, Geist Mono, Newsreader, Caveat, Libre Baskerville. Paid: Tiempos Text and Heldane Text, Berkeley Mono. Default to the free fonts and suggest the paid ones only as upgrades Murat chooses to buy. Never ship paid font files in a public repo.
