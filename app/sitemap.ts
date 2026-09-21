import type { MetadataRoute } from "next";
import { getSlugs } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/projects",
    "/blog",
    // Only posts that exist in every language, so the hreflang alternates are real pages.
    ...getSlugs("en")
      .filter((slug) => locales.every((l) => getSlugs(l).includes(slug)))
      .map((slug) => `/blog/${slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    })),
  );
}
