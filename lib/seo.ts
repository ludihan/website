import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "./i18n";
import { site } from "./profile";

const openGraphLocale: Record<Locale, string> = { en: "en_US", pt: "pt_BR" };

// Canonical + hreflang for one page. `path` is the part after `/<lang>` ("", "/about", ...).
export function pageMetadata(
  lang: Locale,
  path: string,
  meta: {
    title?: string | { absolute: string };
    description: string;
    publishedTime?: string;
  },
): Metadata {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `/${l}${path}`]),
  );
  // `/` is the language-picking entry point, which is what x-default is meant for.
  languages["x-default"] = path === "" ? "/" : `/en${path}`;
  const title =
    typeof meta.title === "string" ? `${meta.title} | ${site.name}` : meta.title?.absolute;
  // A page-level `openGraph`/`twitter` replaces the layout's, so the image is set here.
  const image = { url: "/og.png", width: 1200, height: 630, alt: getDictionary(lang).meta.ogAlt };
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${lang}${path}`, languages },
    openGraph: {
      ...(meta.publishedTime
        ? { type: "article" as const, publishedTime: meta.publishedTime }
        : { type: "website" as const }),
      siteName: site.name,
      title,
      description: meta.description,
      images: [image],
      url: `/${lang}${path}`,
      locale: openGraphLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => openGraphLocale[l]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images: [image.url],
    },
  };
}

export function jsonLdScript(data: object) {
  // `<` is escaped so the payload can never close the script tag.
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
