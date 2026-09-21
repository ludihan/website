import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ludihan.xyz"),
  title: { default: "ludihan", template: "%s ~ ludihan" },
  description: "ludihan's personal website",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header>
            <nav>
              <Link href="/">ludihan.xyz</Link>
              <div>
                <Link href="/projects">projects</Link>
                <Link href="/blog">blog</Link>
                <Link href="/about">about</Link>
              </div>
            </nav>
          </header>
          <hr className="nav" />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
