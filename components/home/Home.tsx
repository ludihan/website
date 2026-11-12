import Image from "next/image";
import Link from "next/link";
import { preconnect } from "react-dom";
import { dateLocales, getDictionary, type Locale } from "@/lib/i18n";
import { profileText, skills, type SkillGroup } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { jsonLdGraph, personRef, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "../JsonLd";
import { LocalTime } from "../LocalTime";
import { ProjectIndex } from "../ProjectIndex";
import { RoleList } from "../RoleList";
import { SectionHead } from "../SectionHead";
import { Tags } from "../Tags";

export function Home({ lang }: { lang: Locale }) {
  const t = profileText[lang];
  const dict = getDictionary(lang);
  const ui = dict.ui;
  // The figures are screenshots served from GitHub.
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

      <section className="hero">
        <h1 className="display">Lucca Han</h1>
        <div className="grid hero-body">
          <dl className="meta">
            <div>
              <dt>{t.facts[0].label}</dt>
              <dd>{lang === "pt" ? "Manaus, Brasil" : "Manaus, Brazil"}</dd>
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
          </dl>
          <p className="statement">{t.lead}</p>
        </div>
      </section>

      <section className="section">
        <SectionHead n={1} title={ui.index} more={{ href: `/${lang}/projects`, label: ui.viewAll }} />
        <ProjectIndex lang={lang} hrefBase={`/${lang}/projects`} />
        <div className="grid figures">
          {projects.map((p, i) => {
            const shot = p.screenshots[0];
            return (
              <figure key={p.id} className="figure">
                <Link
                  href={`/${lang}/projects#${p.id}`}
                  className={`figure-frame${shot.height > shot.width ? " is-tall" : ""}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    alt=""
                    // The first figure is usually the largest image in view on load.
                    {...(i === 0 && { loading: "eager", fetchPriority: "high" })}
                  />
                </Link>
                <figcaption>
                  <span>
                    {ui.fig} {i + 1}
                  </span>{" "}
                  {shot.alt[lang]}.
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      <section className="section">
        <SectionHead n={2} title={t.workTitle} more={{ href: `/${lang}/about`, label: t.workAll }} />
        <RoleList roles={t.roles} />
      </section>

      <section className="section">
        <SectionHead n={3} title={t.educationTitle} />
        <div className="rows">
          {t.education.map((e) => (
            <article key={e.title} className="row grid">
              <p className="row-date">{e.period}</p>
              <div className="row-title">
                <h3>{e.title}</h3>
                <p>
                  {e.school}, {e.place}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead n={4} title={t.skillsTitle} />
        <div className="grid skills">
          {(Object.keys(skills) as SkillGroup[]).map((g) => (
            <div key={g} className="skill-col">
              <h3>{t.skillLabels[g]}</h3>
              <Tags items={skills[g]} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
