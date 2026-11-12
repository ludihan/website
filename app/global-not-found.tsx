import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSlugs } from "@/lib/content";
import { mono, sans } from "@/lib/fonts";
import { defaultLocale, getDictionary, locales } from "@/lib/i18n";
import { site } from "@/lib/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `404 | ${site.name}`,
};

// A static export serves this one page for every missing URL, so it carries every
// language. The script reads the language from the path before anything paints, and
// the style hides the other translations; without JavaScript it stays in the default.
const pickLanguage = `var l=location.pathname.split("/")[1];if(${JSON.stringify(locales)}.includes(l))document.documentElement.lang=l`;
const hideOthers = locales.map((l) => `html:not([lang="${l}"]) [data-lang="${l}"]{display:none}`).join("");

export default function GlobalNotFound() {
  return (
    // The script may have changed `lang` before React hydrates.
    <html lang={defaultLocale} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: pickLanguage }} />
        <style>{hideOthers}</style>
      </head>
      <body>
        {locales.map((l) => (
          <div key={l} data-lang={l}>
            <SiteHeader lang={l} unknownPath />
          </div>
        ))}
        <main id="content" className="page">
          {locales.map((l) => {
            const t = getDictionary(l).notFound;
            return (
              <section key={l} data-lang={l} lang={l} className="page-head not-found">
                <h1 className="display">404</h1>
                <div className="grid hero-body">
                  <p className="meta-title">{t.title}</p>
                  <div className="statement">
                    <p>{t.lead}</p>
                    <ul className="inline-links">
                      <li>
                        <Link href={`/${l}`}>{t.home} →</Link>
                      </li>
                      <li>
                        <Link href={`/${l}/projects`}>{t.projects} →</Link>
                      </li>
                      {getSlugs(l).length > 0 && (
                        <li>
                          <Link href={`/${l}/blog`}>{t.blog} →</Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </main>
        {locales.map((l) => (
          <div key={l} data-lang={l}>
            <SiteFooter lang={l} />
          </div>
        ))}
      </body>
    </html>
  );
}
