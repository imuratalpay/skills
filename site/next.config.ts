import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /ui-diff.md serves the skill page as markdown, from app/md/[slug].
  async rewrites() {
    return { beforeFiles: [{ source: "/:slug.md", destination: "/md/:slug" }] };
  },
  turbopack: {
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
