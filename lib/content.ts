import fs from "node:fs";
import path from "node:path";

export const SECTIONS = { blog: "Blog", projects: "Projects" } as const;
export type Section = keyof typeof SECTIONS;

export type Frontmatter = { title: string; date?: Date | string };

export function isSection(s: string): s is Section {
  return s in SECTIONS;
}

export function getSlugs(section: Section): string[] {
  return fs
    .readdirSync(path.join(process.cwd(), "content", section))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function loadPost(section: Section, slug: string) {
  const mod = await import(`@/content/${section}/${slug}.md`);
  return { Content: mod.default, frontmatter: mod.frontmatter as Frontmatter };
}

// Newest first, like Zola's `sort_by = "date"`.
export async function getPosts(section: Section) {
  const posts = await Promise.all(
    getSlugs(section).map(async (slug) => ({
      slug,
      ...(await loadPost(section, slug)),
    })),
  );
  const time = (d?: Date | string) => (d ? new Date(d).getTime() : 0);
  return posts.sort((a, b) => time(b.frontmatter.date) - time(a.frontmatter.date));
}

export function formatDate(d: Date | string, style: "numeric" | "long") {
  const date = new Date(d);
  return style === "numeric"
    ? date.toLocaleDateString("en-GB", { timeZone: "UTC" })
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
}
