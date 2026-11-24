# type-taste setup

## Detect the stack

Do this before proposing any change. It takes a minute and decides how every fix gets written.

```sh
rg -n '"tailwindcss"|"@tailwindcss/' package.json   # Tailwind, and which major version
ls tailwind.config.* 2>/dev/null                    # config file: Tailwind v3 style
rg -l '@import "tailwindcss"|@theme' -g '*.css'     # v4 entry and theme block
rg -l '\.module\.css' -g '*.{tsx,jsx,ts,js}'        # CSS Modules
rg -l 'styled\.[a-z]+`|css`' -g '*.{tsx,jsx,ts,js}' # CSS-in-JS tagged templates
rg -n -- '--[a-z0-9-]+:' -g '*.css' | head -40      # custom properties the project already has
```

| Evidence | Idiom | Write the fix as |
|---|---|---|
| `@import "tailwindcss"` or `@theme` in a CSS file | Tailwind v4 | utilities from the `@theme` below; base rules in the same global CSS file |
| `tailwind.config.*` and no `@theme` | Tailwind v3 | the same names under `theme.extend` (`fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, `colors`), then utilities |
| Components import `*.module.css` | CSS Modules | a declaration in that component's module |
| A CSS-in-JS dependency, tagged templates like `` styled.p`…` `` | CSS-in-JS | a declaration inside the existing styled block |
| One global stylesheet, plain selectors | Plain CSS | `tokens.css`, or a declaration next to the rule it fixes |

- If the project already has its own custom properties for color or type, write the fix with those. Add an `--mt-*` value only when the project has nothing for that role.
- If two idioms are present, follow the one the file you are editing already uses.
- Never install a second styling system to deliver a typography fix.

## Plain CSS

Link `tokens.css` and put `class="mt"` on `body`. It already carries both ladders, the base styles and the three heading classes.

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

Self-host everything through `next/font`. Never add a `<link>` to a hosted font CDN (self-hosting is the default).

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
