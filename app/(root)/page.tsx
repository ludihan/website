import type { Metadata } from "next";
import { getDictionary, localeNames, locales } from "@/lib/i18n";
import { site } from "@/lib/profile";

// The language picker is the x-default page, so it points at every translation.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: getDictionary("en").meta.homeTitle,
  description: getDictionary("en").meta.homeDescription,
  alternates: {
    canonical: "/",
    languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/" },
  },
};

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
