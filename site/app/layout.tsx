import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SITE } from "@/lib/skills";
import { Providers } from "./providers";
import "./globals.css";

// Full build: subset builds can drop the cv01 and ss03 features.
const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
// Each fallback is metric-matched to a face of the same kind, so text doesn't reflow when the font lands.
const newsreader = localFont({
  src: "./fonts/newsreader-italic-var.woff2",
  variable: "--font-newsreader",
  weight: "200 800",
  style: "italic",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const geistMono = localFont({
  src: "./fonts/geist-mono-var.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  // An Arial-shaped fallback would make code jump from proportional to mono; use a real mono instead.
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author, url: SITE.authorUrl }],
  twitter: { card: "summary_large_image" },
  alternates: { types: { "text/plain": "/llms.txt" } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Paint under the notch and home indicator; content pads back out with env(safe-area-inset-*).
  viewportFit: "cover",
  // On Android the keyboard resizes the layout, as it does on iOS, so the search dialog stays above it.
  interactiveWidget: "resizes-content",
  // Dark only: there is no light theme to switch to.
  colorScheme: "dark",
  themeColor: "#121212",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${newsreader.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#content"
          className="sr-only rounded-lg bg-surface text-secondary text-fg-1 shadow-overlay focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-20 focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
