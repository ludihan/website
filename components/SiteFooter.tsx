import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/profile";

export function SiteFooter({ lang }: { lang: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul>
          <li>
            <a href={site.github} target="_blank" rel="me noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="me noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`/${lang}/blog/rss.xml`}>RSS</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
