import type { Metadata } from "next";
import { Redirect } from "@/components/Redirect";
import { defaultLocale, localeNames, locales } from "@/lib/i18n";

export const metadata: Metadata = { title: "ludihan" };

// A static export has no proxy to negotiate the locale, so `/` picks one on the client.
export default function Page() {
  return (
    <div className="container">
      <Redirect locales={locales} defaultLocale={defaultLocale} />
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}`} />
      </noscript>
      <ul>
        {locales.map((l) => (
          <li key={l}>
            <a href={`/${l}`} hrefLang={l}>
              {localeNames[l]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
