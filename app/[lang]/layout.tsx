import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import "../globals.css";

export const dynamicParams = false;

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    metadataBase: new URL("https://ludihan.xyz"),
    title: { default: "ludihan", template: "%s ~ ludihan" },
    description: getDictionary(lang).description,
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    },
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
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
        <div className="container">
          <header>
            <nav>
              <Link href={`/${lang}`}>ludihan.xyz</Link>
              <div>
                <Link href={`/${lang}/projects`}>{dict.nav.projects}</Link>
                <Link href={`/${lang}/blog`}>{dict.nav.blog}</Link>
                <Link href={`/${lang}/about`}>{dict.nav.about}</Link>
                <LanguageSwitcher lang={lang} label={dict.language} />
              </div>
            </nav>
          </header>
          <hr className="nav" />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
