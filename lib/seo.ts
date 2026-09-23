import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "./i18n";
import { profileText, site, skills } from "./profile";

const openGraphLocale: Record<Locale, string> = { en: "en_US", pt: "pt_BR" };

// Name of a page's generated Open Graph image: "" -> "home", "/blog/first" -> "blog-first".
export const ogImageKey = (path: string) => (path === "" ? "home" : path.slice(1).replace(/\//g, "-"));

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
  const image = {
    url: `/og/${lang}/${ogImageKey(path)}.png`,
    width: 1200,
    height: 630,
    alt: path === "" ? getDictionary(lang).meta.ogAlt : (title ?? site.name),
  };
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages,
      // Lets feed readers and browsers discover the RSS feed from any page.
      types: { "application/rss+xml": `/${lang}/blog/rss.xml` },
    },
    openGraph: {
      ...(meta.publishedTime
        ? {
            type: "article" as const,
            publishedTime: meta.publishedTime,
            modifiedTime: meta.publishedTime,
            authors: [`${site.url}/${lang}/about`],
          }
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

// Structured data (schema.org). Nodes point at each other through stable `@id`s, so the
// person and the site are described once and every page links back to them.
const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;
export const personRef = { "@id": personId };

const pageUrl = (lang: Locale, path: string) => `${site.url}/${lang}${path}`;

export const jsonLdGraph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export function personJsonLd(lang: Locale) {
  const t = profileText[lang];
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    alternateName: "ludihan",
    url: pageUrl(lang, ""),
    jobTitle: t.role,
    description: getDictionary(lang).meta.homeDescription,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manaus",
      addressRegion: "Amazonas",
      addressCountry: "BR",
    },
    knowsLanguage: ["en", "pt"],
    knowsAbout: [
      ...skills.languages,
      ...skills.frontend,
      ...skills.backend,
      ...skills.devops,
      "Full-stack web development",
    ],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Fortaleza (UNIFOR)" },
      { "@type": "CollegeOrUniversity", name: "Wyden" },
      { "@type": "EducationalOrganization", name: "Quest Language Studies" },
    ],
    worksFor: { "@type": "Organization", name: "Masf Refeições" },
  };
}

export function websiteJsonLd(lang: Locale) {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    alternateName: "ludihan.xyz",
    description: getDictionary(lang).meta.homeDescription,
    inLanguage: locales,
    author: personRef,
    publisher: personRef,
  };
}

// A page node plus, when `crumbs` are given, its breadcrumb trail. `path` is the part after `/<lang>`.
export function webPageJsonLd(
  lang: Locale,
  path: string,
  page: { type?: string; name: string; description: string; crumbs?: string[] } & Record<string, unknown>,
) {
  const { type = "WebPage", crumbs = [], ...rest } = page;
  const url = pageUrl(lang, path);
  // One crumb per path segment, after the home page: ["Blog", "My post"] for /blog/my-post.
  const segments = path.split("/").filter(Boolean);
  const trail = [
    { name: site.name, url: pageUrl(lang, "") },
    ...crumbs.map((name, i) => ({ name, url: pageUrl(lang, `/${segments.slice(0, i + 1).join("/")}`) })),
  ];
  const node = {
    "@type": type,
    "@id": url,
    url,
    inLanguage: lang,
    isPartOf: { "@id": websiteId },
    primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}/og/${lang}/${ogImageKey(path)}.png` },
    ...rest,
  };
  if (!crumbs.length) return [node];
  return [
    { ...node, breadcrumb: { "@id": `${url}#breadcrumb` } },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.url })),
    },
  ];
}
