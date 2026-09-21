import fs from "node:fs";
import path from "node:path";
import { dateLocales, type Locale } from "./i18n";

export type Frontmatter = { title: string; date?: Date | string; description?: string };

const blogDir = (lang: Locale) => path.join(process.cwd(), "content", lang, "blog");

export function getSlugs(lang: Locale): string[] {
  return fs
    .readdirSync(blogDir(lang))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readingMinutes(lang: Locale, slug: string) {
  const source = fs.readFileSync(path.join(blogDir(lang), `${slug}.md`), "utf8");
  const words = source.replace(/^---[\s\S]*?---/, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function loadPost(lang: Locale, slug: string) {
  const mod = await import(`@/content/${lang}/blog/${slug}.md`);
  return {
    slug,
    Content: mod.default,
    frontmatter: mod.frontmatter as Frontmatter,
    minutes: readingMinutes(lang, slug),
  };
}

// Newest first, like Zola's `sort_by = "date"`.
export async function getPosts(lang: Locale) {
  const posts = await Promise.all(getSlugs(lang).map((slug) => loadPost(lang, slug)));
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
