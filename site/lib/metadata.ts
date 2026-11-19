import type { Metadata } from "next";
import { SITE } from "./skills";

/**
 * Per-page metadata. Next replaces `openGraph` and `alternates` wholesale when a page sets them,
 * so every page builds both in full here instead of relying on the root layout's.
 */
export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path, types: { "text/plain": "/llms.txt" } },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      url: path,
      title: title ? `${title} · ${SITE.name}` : SITE.title,
      description,
    },
  };
}
