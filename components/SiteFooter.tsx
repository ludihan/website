import { getSlugs } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { profileText, site } from "@/lib/profile";
import { CopyEmailButton } from "./CopyEmailButton";

// The colophon: a black field closing every page, with the address set as large as the name.
export function SiteFooter({ lang }: { lang: Locale }) {
  const t = profileText[lang];
  const ui = getDictionary(lang).ui;
  return (
    <footer className="colophon">
      <div className="grid colophon-main">
        <p className="colophon-label">{ui.contact}</p>
        <p className="colophon-email">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <CopyEmailButton email={site.email} label={t.cta.copyEmail} copiedLabel={t.cta.emailCopied} />
        </p>
      </div>
      <div className="grid colophon-foot">
        <p className="colophon-copy">
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="colophon-links">
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
          {getSlugs(lang).length > 0 && (
            <li>
              <a href={`/${lang}/blog/rss.xml`}>RSS</a>
            </li>
          )}
        </ul>
        <p className="colophon-top">
          <a href="#content">{ui.top} ↑</a>
        </p>
      </div>
    </footer>
  );
}
