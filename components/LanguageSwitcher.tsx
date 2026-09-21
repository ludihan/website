"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";

// Swaps the leading `/<lang>` segment, keeping the rest of the path.
export function LanguageSwitcher({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");
  return (
    <div className="lang-switcher" aria-label={label}>
      {locales.map((l) => (
        <span key={l}>
          {l === lang ? (
            <strong>{l}</strong>
          ) : (
            <Link href={`/${l}${rest ? `/${rest}` : ""}`} hrefLang={l} title={localeNames[l]}>
              {l}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
