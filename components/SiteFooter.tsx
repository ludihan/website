import { getDictionary, type Locale } from "@/lib/i18n";
import { profileText, site } from "@/lib/profile";
import { CopyEmailButton } from "./CopyEmailButton";

// Every page ends on the same full-bleed blue contact block, with the address set large.
export function SiteFooter({ lang }: { lang: Locale }) {
  const t = profileText[lang];
  const ui = getDictionary(lang).ui;
  return (
    <footer className="site-footer">
      <div className="grid footer-top">
        <p className="footer-label">{ui.contact}</p>
        <p className="footer-text">{t.contactText}</p>
      </div>
      <p className="footer-email">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <CopyEmailButton email={site.email} label={t.cta.copyEmail} copiedLabel={t.cta.emailCopied} />
      </p>
      <div className="grid footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="footer-links">
          <li>
            <a href={site.linkedin} target="_blank" rel="me noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="me noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={`/${lang}/blog/rss.xml`}>RSS</a>
          </li>
        </ul>
        <p className="footer-top-link">
          <a href="#content">{ui.top} ↑</a>
        </p>
      </div>
    </footer>
  );
}
