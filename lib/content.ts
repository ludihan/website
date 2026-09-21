import fs from "node:fs";
import path from "node:path";
import { dateLocales, type Locale } from "./i18n";

export const SECTIONS = ["blog", "projects"] as const;
export type Section = (typeof SECTIONS)[number];

export type Frontmatter = { title: string; date?: Date | string };

export function isSection(s: string): s is Section {
  return (SECTIONS as readonly string[]).includes(s);
}

export function getSlugs(lang: Locale, section: Section): string[] {
  return fs
    .readdirSync(path.join(process.cwd(), "content", lang, section))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function loadPost(lang: Locale, section: Section, slug: string) {
  const mod = await import(`@/content/${lang}/${section}/${slug}.md`);
  return { Content: mod.default, frontmatter: mod.frontmatter as Frontmatter };
}

// Newest first, like Zola's `sort_by = "date"`.
export async function getPosts(lang: Locale, section: Section) {
  const posts = await Promise.all(
    getSlugs(lang, section).map(async (slug) => ({
      slug,
      ...(await loadPost(lang, section, slug)),
    })),
  );
  const time = (d?: Date | string) => (d ? new Date(d).getTime() : 0);
  return posts.sort((a, b) => time(b.frontmatter.date) - time(a.frontmatter.date));
}

export function formatDate(lang: Locale, d: Date | string, style: "numeric" | "long") {
  const options: Intl.DateTimeFormatOptions =
    style === "numeric"
      ? { timeZone: "UTC" }
      : { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" };
  return new Date(d).toLocaleDateString(dateLocales[lang], options);
}
