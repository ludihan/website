import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavLinks } from "@/components/NavLinks";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/profile";
import "../globals.css";

export const dynamicParams = false;

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const viewport: Viewport = { themeColor: "#141312" };

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
    <html lang={lang} className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#content" className="skip-link">
          {dict.skip}
        </a>
        <header className="site-header">
          <nav className="container" aria-label={dict.nav.label}>
            <Link href={`/${lang}`} className="brand">
              <span className="brand-mark" aria-hidden="true" />
              <span>
                ludihan<span className="tld">.xyz</span>
              </span>
            </Link>
            <div className="nav-links">
              <NavLinks
                links={[
                  { href: `/${lang}/projects`, label: dict.nav.projects },
                  { href: `/${lang}/blog`, label: dict.nav.blog },
                  { href: `/${lang}/about`, label: dict.nav.about },
                ]}
              />
              <LanguageSwitcher lang={lang} label={dict.language} />
            </div>
          </nav>
        </header>
        <main id="content" className="container">
          {children}
        </main>
        <footer className="site-footer">
          <div className="container">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <ul>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`/${lang}/blog/rss.xml`}>RSS</a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
