import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { SITE } from "./skills";

export const OG_SIZE = { width: 1200, height: 630 };

/* The light-theme tokens from app/globals.css. next/og can't read CSS variables. */
const T = {
  bg: "#fcfcfc",
  fg1: "#202020",
  fg2: "#424242",
  fg3: "#6f6f6f",
  fg4: "#a0a0a0",
  stage: "#f4f4f4",
  line: "rgba(0, 0, 0, 0.08)",
};

/*
 * Static instances of the site's fonts (app/fonts/og), with Inter's cv01 and ss03 baked into the cmap,
 * because next/og reads neither woff2 nor variable axes nor OpenType features.
 * Its weights must be multiples of 100, so 550 and 590 get their own family names.
 */
const font = (file: string) => readFile(join(process.cwd(), "app/fonts/og", file));

async function fonts() {
  const [body, heading, display, mono, serif] = await Promise.all([
    font("inter-400.ttf"),
    font("inter-550.ttf"),
    font("inter-590.ttf"),
    font("geist-mono-400.ttf"),
    font("newsreader-italic-430.ttf"),
  ]);
  return [
    { name: "Inter", data: body, weight: 400 as const, style: "normal" as const },
    { name: "Inter Heading", data: heading, weight: 400 as const, style: "normal" as const },
    { name: "Inter Display", data: display, weight: 400 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
    { name: "Newsreader", data: serif, weight: 400 as const, style: "italic" as const },
  ];
}

/** Newsreader italic for the emphasis, at type-taste's 1.07em. */
export function Em({ children }: { children: ReactNode }) {
  return <span style={{ fontFamily: "Newsreader", fontStyle: "italic", fontSize: "1.07em" }}>{children}</span>;
}

/** The page's hero at 2× the site's sizes: eyebrow, display title, then a summary or a command. */
export async function ogImage({
  eyebrow,
  title,
  summary,
  command,
}: {
  eyebrow: string;
  title: ReactNode;
  summary?: string;
  command?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: 72,
          background: T.bg,
          color: T.fg2,
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
          <span style={{ fontFamily: "Inter Heading", color: T.fg1, fontSize: 30 }}>{SITE.name}</span>
          <span style={{ color: T.fg3 }}>{new URL(SITE.url).host}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", flex: 1 }}>
          <span style={{ fontFamily: "Geist Mono", fontSize: 26, color: T.fg3 }}>{eyebrow}</span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 20,
              maxWidth: 980,
              fontFamily: "Inter Display",
              fontSize: 88,
              lineHeight: "92px",
              letterSpacing: "-0.022em",
              color: T.fg1,
            }}
          >
            {title}
          </div>
          {summary && (
            <div style={{ display: "flex", marginTop: 28, maxWidth: 940, fontSize: 32, lineHeight: "48px" }}>
              {summary}
            </div>
          )}
          {command && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginTop: 40,
                padding: "22px 32px",
                borderRadius: 24,
                background: T.stage,
                border: `2px solid ${T.line}`,
                fontFamily: "Geist Mono",
                fontSize: 28,
                color: T.fg1,
              }}
            >
              <span style={{ color: T.fg4, marginRight: 20 }}>$</span>
              {command}
            </div>
          )}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
