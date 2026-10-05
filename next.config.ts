import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  // A static export has two root layouts and no server, so every missing URL gets one 404 page.
  experimental: { globalNotFound: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      "remark-gfm",
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-autolink-headings", { behavior: "wrap" }],
      ["@shikijs/rehype", { theme: "gruvbox-dark-medium" }],
    ],
  },
});

// Only builds export. Under `next dev`, export mode throws for any URL outside
// generateStaticParams (say, a stray /admin-sw.js) instead of answering with the 404 page.
const config = (phase: string): NextConfig =>
  withMDX({ ...nextConfig, ...(phase !== PHASE_DEVELOPMENT_SERVER && { output: "export" }) });

export default config;
