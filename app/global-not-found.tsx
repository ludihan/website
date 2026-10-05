import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SplitTitle } from "@/components/SplitTitle";
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
        <main id="content" className="container">
          {locales.map((l) => {
            const t = getDictionary(l).notFound;
            return (
              <section key={l} data-lang={l} lang={l} className="hero not-found">
                <p className="kicker" aria-hidden="true">
                  <span>~/ludihan</span> $ <span className="typed">cd ..</span>
                </p>
                <SplitTitle text="404" />
                <p className="role">{t.title}</p>
                <p className="lead">{t.lead}</p>
                <p className="cta">
                  <Link href={`/${l}`} className="btn-link btn-primary">
                    {t.home}
                  </Link>
                  <Link href={`/${l}/projects`} className="btn-link">
                    {t.projects}
                  </Link>
                  <Link href={`/${l}/blog`} className="btn-link">
                    {t.blog}
                  </Link>
                </p>
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
