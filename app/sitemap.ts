import type { MetadataRoute } from "next";
import { getSlugs, loadPost } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/profile";
import { projects } from "@/lib/projects";

export const dynamic = "force-static";

type Page = { path: string; lastModified?: Date; images?: string[] };

const latest = (dates: (Date | undefined)[]) =>
  dates.reduce<Date | undefined>((a, d) => (d && (!a || d > a) ? d : a), undefined);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only posts that exist in every language, so the hreflang alternates are real pages.
  const slugs = getSlugs("en").filter((slug) => locales.every((l) => getSlugs(l).includes(slug)));
  const posts = await Promise.all(
    slugs.map(async (slug): Promise<Page> => {
      const { date } = (await loadPost("en", slug)).frontmatter;
      return { path: `/blog/${slug}`, lastModified: date ? new Date(date) : undefined };
    }),
  );
  const pages: Page[] = [
    { path: "" },
    { path: "/about" },
    // Screenshots help the projects page show up in image search.
    { path: "/projects", images: projects.flatMap((p) => p.screenshots.map((s) => s.src)) },
    { path: "/blog", lastModified: latest(posts.map((p) => p.lastModified)) },
    ...posts,
  ];
  // No `alternates` here: every page already declares hreflang in its <head> (lib/seo.ts), and
  // the sitemap's `xhtml:link` elements make browsers render the file as unstyled XHTML instead
  // of showing the XML tree.
  return pages.flatMap(({ path, ...rest }) =>
    locales.map((lang) => ({ url: `${site.url}/${lang}${path}`, ...rest })),
  );
}
