import Image from "next/image";
import Link from "next/link";
import { preconnect } from "react-dom";
import { dateLocales, getDictionary, type Locale } from "@/lib/i18n";
import { profileText } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { jsonLdGraph, personRef, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "../JsonLd";
import { LocalTime } from "../LocalTime";
import { ProfileLinks } from "../ProfileLinks";
import { RoleList } from "../RoleList";
import { SectionHead } from "../SectionHead";

export function Home({ lang }: { lang: Locale }) {
  const t = profileText[lang];
  const dict = getDictionary(lang);
  const ui = dict.ui;
  // The project figures are screenshots served from GitHub.
  preconnect("https://raw.githubusercontent.com");

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          ...webPageJsonLd(lang, "", {
            type: "ProfilePage",
            name: dict.meta.homeTitle,
            description: dict.meta.homeDescription,
            mainEntity: personRef,
          }),
        )}
      />

      {/*
        The cover: a full-bleed ultramarine poster. An information line across the top, the
        name stacked in two lines at the bottom left, the statement on the same baseline at the
        bottom right.
      */}
      <section className="cover">
        <dl className="cover-info grid">
          <div>
            <dt>{t.facts[0].label}</dt>
            <dd>{t.place}</dd>
          </div>
          <div>
            <dt>{ui.localTime}</dt>
            <dd>
              <LocalTime timeZone="America/Manaus" locale={dateLocales[lang]} fallback="UTC−4" />
            </dd>
          </div>
          <div>
            <dt>{ui.currently}</dt>
            <dd>{t.facts[1].value}</dd>
          </div>
          <div>
            <dt>{ui.contact}</dt>
            <dd>
              <ProfileLinks copy={{ label: t.cta.copyEmail, copiedLabel: t.cta.emailCopied }} />
            </dd>
          </div>
        </dl>
        <div className="cover-main grid">
          <h1 className="cover-name">
            <span>Lucca</span>
            <span>Han</span>
          </h1>
          <p className="cover-lead">{t.lead}</p>
        </div>
      </section>

      <section className="section">
        <SectionHead n={1} title={t.workTitle} more={{ href: `/${lang}/about`, label: t.workAll }} />
        <RoleList roles={t.roles} />
      </section>

      <section className="section">
        <SectionHead n={2} title={ui.index} more={{ href: `/${lang}/projects`, label: ui.viewAll }} />
        {/* A modular field: one project per four columns, figure above, caption below. */}
        <ol className="work grid">
          {projects.map((p, i) => {
            const shot = p.screenshots[0];
            const text = p.text[lang];
            return (
              <li key={p.id} className="work-item">
                <Link href={`/${lang}/projects#${p.id}`} className="work-link">
                  <span className={`work-fig${shot.height > shot.width ? " is-tall" : ""}`}>
                    <Image
                      src={shot.src}
                      width={shot.width}
                      height={shot.height}
                      alt={shot.alt[lang]}
                      sizes="(max-width: 800px) 100vw, 33vw"
                      // The first figure is usually the largest image in view on load.
                      {...(i === 0 && { loading: "eager", fetchPriority: "high" })}
                    />
                  </span>
                  <span className="work-meta">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>{text.period}</span>
                  </span>
                  <span className="work-name">{p.name}</span>
                  <span className="work-tagline">{text.tagline}</span>
                  <span className="work-stack">{p.stack.slice(0, 3).join(", ")}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
