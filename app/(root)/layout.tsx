import { defaultLocale } from "@/lib/i18n";
import "../globals.css";

// A static export has no proxy to negotiate the locale, so `/` picks one on the
// client. The script is inline and blocking so it runs before anything paints.
const redirect = `location.replace("/" + (/^pt(-|$)/i.test(navigator.language) ? "pt" : "${defaultLocale}"))`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <head>
        <script dangerouslySetInnerHTML={{ __html: redirect }} />
        <noscript>
          <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}`} />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
