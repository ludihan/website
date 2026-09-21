import type { Metadata } from "next";
import { localeNames, locales } from "@/lib/i18n";

export const metadata: Metadata = { title: "ludihan" };

// Only visible without JavaScript; with it, the layout's script has already redirected.
export default function Page() {
  return (
    <noscript>
      <ul>
        {locales.map((l) => (
          <li key={l}>
            <a href={`/${l}`} hrefLang={l}>
              {localeNames[l]}
            </a>
          </li>
        ))}
      </ul>
    </noscript>
  );
}
