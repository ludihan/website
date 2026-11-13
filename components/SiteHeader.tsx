import Link from "next/link";
import { getSlugs } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { profileText } from "@/lib/profile";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavLinks } from "./NavLinks";

/**
 * The masthead: one row of the page grid, set like the information line at the top of a Swiss
 * poster. Name and role in the first field, the numbered sections in the middle, the language
 * at the end. It stays on screen while the page scrolls.
 *
 * `unknownPath`: the page is built once for many URLs (the 404), so nothing may depend on
 * the path. No link is marked current, and the language switcher goes to the home pages.
 */
export function SiteHeader({ lang, unknownPath = false }: { lang: Locale; unknownPath?: boolean }) {
  const dict = getDictionary(lang);
  const t = profileText[lang];
  return (
    <>
      <a href="#content" className="skip-link">
        {dict.skip}
      </a>
      <header className="masthead grid">
        <Link href={`/${lang}`} className="masthead-name">
          <strong>Lucca Han</strong>
          <span>{t.role}</span>
        </Link>
        <nav className="masthead-nav" aria-label={dict.nav.label}>
          <NavLinks
            links={[
              { href: `/${lang}/about`, label: dict.nav.about },
              { href: `/${lang}/projects`, label: dict.nav.projects },
              // The blog stays out of the menu until it has a post to show.
              ...(getSlugs(lang).length > 0 ? [{ href: `/${lang}/blog`, label: dict.nav.blog }] : []),
            ]}
            highlight={!unknownPath}
          />
        </nav>
        <LanguageSwitcher lang={lang} label={dict.language} home={unknownPath} />
      </header>
    </>
  );
}
