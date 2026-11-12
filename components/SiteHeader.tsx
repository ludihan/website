import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { profileText } from "@/lib/profile";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavLinks } from "./NavLinks";

/**
 * `unknownPath`: the page is built once for many URLs (the 404), so nothing may depend on
 * the path. No link is marked current, and the language switcher goes to the home pages.
 */
export function SiteHeader({ lang, unknownPath = false }: { lang: Locale; unknownPath?: boolean }) {
  const dict = getDictionary(lang);
  return (
    <>
      <a href="#content" className="skip-link">
        {dict.skip}
      </a>
      <header className="site-header grid">
        <Link href={`/${lang}`} className="brand">
          Lucca Han
        </Link>
        <p className="header-role">{profileText[lang].role}</p>
        <nav className="header-nav" aria-label={dict.nav.label}>
          <NavLinks
            links={[
              { href: `/${lang}/projects`, label: dict.nav.projects },
              { href: `/${lang}/blog`, label: dict.nav.blog },
              { href: `/${lang}/about`, label: dict.nav.about },
            ]}
            highlight={!unknownPath}
          />
        </nav>
        <LanguageSwitcher lang={lang} label={dict.language} home={unknownPath} />
      </header>
    </>
  );
}
