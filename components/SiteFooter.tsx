import { getSlugs } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";
import { profileText, site } from "@/lib/profile";
import { CopyEmailButton } from "./CopyEmailButton";

/**
 * The colophon: a black field closing every page. The three ways to reach me are set as an
 * index, one row each on the page grid: number and channel in the first field, the address large
 * from column 4, and at the end an arrow (or, for the email, the copy button). The whole row is
 * the link and fills with blue under the pointer.
 */
export function SiteFooter({ lang }: { lang: Locale }) {
  const t = profileText[lang];
  const ui = getDictionary(lang).ui;
  const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  const channels = [
    { name: "Email", href: `mailto:${site.email}`, text: site.email, external: false },
    { name: "LinkedIn", href: site.linkedin, text: strip(site.linkedin), external: true },
    { name: "GitHub", href: site.github, text: strip(site.github), external: true },
  ];
  return (
    <footer className="colophon">
      <p className="colophon-label">{ui.contact}</p>
      <ul className="channels">
        {channels.map((c, i) => (
          <li key={c.name} className="channel grid">
            <span className="channel-label">
              <span>{String(i + 1).padStart(2, "0")}</span>
              {c.name}
            </span>
            <a
              href={c.href}
              className="channel-link"
              {...(c.external && { target: "_blank", rel: "me noopener noreferrer" })}
            >
              {c.text}
            </a>
            <span className="channel-end">
              {c.external ? (
                <span aria-hidden="true">↗</span>
              ) : (
                <CopyEmailButton email={site.email} label={t.cta.copyEmail} copiedLabel={t.cta.emailCopied} />
              )}
            </span>
          </li>
        ))}
      </ul>
      <div className="grid colophon-foot">
        <p className="colophon-copy">
          © {new Date().getFullYear()} {site.name}
        </p>
        {getSlugs(lang).length > 0 && (
          <p className="colophon-rss">
            <a href={`/${lang}/blog/rss.xml`}>RSS</a>
          </p>
        )}
        <p className="colophon-top">
          <a href="#content">{ui.top} ↑</a>
        </p>
      </div>
    </footer>
  );
}
