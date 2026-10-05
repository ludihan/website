import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Motion } from "@/components/Motion";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { mono, sans } from "@/lib/fonts";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/profile";
import { jsonLdGraph, personJsonLd, websiteJsonLd } from "@/lib/seo";
import "../globals.css";

export const dynamicParams = false;

export const viewport: Viewport = { themeColor: "#12110f" };

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: meta.homeTitle, template: `%s | ${site.name}` },
    description: meta.homeDescription,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    // Allow large image previews and full snippets in search results.
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    formatDetection: { telephone: false, address: false, email: false },
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    // Lets Next.js pause the CSS smooth scrolling during route changes, so they jump to the top instead of animating.
    <html lang={lang} className={`${sans.variable} ${mono.variable}`} data-scroll-behavior="smooth">
      <body>
        <SiteHeader lang={lang} />
        <JsonLd data={jsonLdGraph(websiteJsonLd(lang), personJsonLd(lang))} />
        <main id="content" className="container">
          {children}
        </main>
        <SiteFooter lang={lang} />
        <Motion />
      </body>
    </html>
  );
}
