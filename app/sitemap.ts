import type { MetadataRoute } from "next";
import { SECTIONS, getSlugs } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/projects",
    ...SECTIONS.map((s) => `/${s}`),
    // Only posts that exist in every language, so the hreflang alternates are real pages.
    ...SECTIONS.flatMap((s) =>
      getSlugs("en", s)
        .filter((slug) => locales.every((l) => getSlugs(l, s).includes(slug)))
        .map((slug) => `/${s}/${slug}`),
    ),
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
