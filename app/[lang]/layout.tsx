import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/profile";
import "../globals.css";

export const dynamicParams = false;

export const viewport: Viewport = { themeColor: "#1a1a1a" };

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
  const dict = getDictionary(lang);
  return (
    <html lang={lang}>
      <body>
        <header className="site-header">
          <nav className="container">
            <Link href={`/${lang}`}>
              ludihan<span className="tld">.xyz</span>
            </Link>
            <div>
              <Link href={`/${lang}/projects`}>{dict.nav.projects}</Link>
              <Link href={`/${lang}/blog`}>{dict.nav.blog}</Link>
              <Link href={`/${lang}/about`}>{dict.nav.about}</Link>
              <LanguageSwitcher lang={lang} label={dict.language} />
            </div>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
