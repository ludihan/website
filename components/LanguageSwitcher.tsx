"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

// Swaps the leading `/<lang>` segment, keeping the rest of the path. With `home`, links to
// each language's home page instead, for pages built without knowing their path (the 404).
export function LanguageSwitcher({ lang, label, home = false }: { lang: Locale; label: string; home?: boolean }) {
  const pathname = usePathname();
  const rest = home ? "" : pathname.split("/").slice(2).join("/");
  return (
    <div className="lang-switcher" role="group" aria-label={label}>
      {locales.map((l) =>
        l === lang ? (
          <span key={l} aria-current="true" title={localeNames[l]}>
            <span className="lang-pill" aria-hidden="true" />
            <span className="lang-label">{l}</span>
          </span>
        ) : (
          <Link key={l} href={`/${l}${rest ? `/${rest}` : ""}`} hrefLang={l} title={localeNames[l]}>
            <span className="lang-label">{l}</span>
          </Link>
        ),
      )}
    </div>
  );
}
