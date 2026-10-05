import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
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
      <header className="site-header">
        <nav className="container" aria-label={dict.nav.label}>
          <Link href={`/${lang}`} className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <span>
              ludihan<span className="tld">.com</span>
            </span>
          </Link>
          <div className="nav-links">
            <NavLinks
              links={[
                { href: `/${lang}/projects`, label: dict.nav.projects },
                { href: `/${lang}/blog`, label: dict.nav.blog },
                { href: `/${lang}/about`, label: dict.nav.about },
              ]}
              highlight={!unknownPath}
            />
            <LanguageSwitcher lang={lang} label={dict.language} home={unknownPath} />
          </div>
        </nav>
      </header>
    </>
  );
}
