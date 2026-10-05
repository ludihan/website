import fs from "node:fs";
import path from "node:path";
import { postModules } from "@/content/posts";
import { dateLocales, type Locale } from "./i18n";

export type Frontmatter = { title: string; date?: Date | string; description?: string };

const key = (lang: Locale, slug: string) => `./${lang}/blog/${slug}.md`;
const source = (lang: Locale, slug: string) =>
  fs.readFileSync(path.join(process.cwd(), "content", lang, "blog", `${slug}.md`), "utf8");

// Posts with `draft: true` in their frontmatter stay out of every page, like Zola's drafts.
const isDraft = (source: string) => /^---[\s\S]*?^draft:\s*true\s*$[\s\S]*?^---/m.test(source);

export function getSlugs(lang: Locale): string[] {
  const prefix = key(lang, "").replace(/\.md$/, "");
  return Object.keys(postModules)
    .filter((k) => k.startsWith(prefix))
    .map((k) => k.slice(prefix.length).replace(/\.md$/, ""))
    .filter((slug) => !isDraft(source(lang, slug)));
}

function readingMinutes(lang: Locale, slug: string) {
  const words = source(lang, slug).replace(/^---[\s\S]*?---/, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function loadPost(lang: Locale, slug: string) {
  const mod = await postModules[key(lang, slug)]();
  return {
    slug,
    Content: mod.default,
    frontmatter: mod.frontmatter,
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
