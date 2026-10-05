import Image from "next/image";
import Link from "next/link";
import { preconnect } from "react-dom";
import { getDictionary, type Locale } from "@/lib/i18n";
import { profileText, site, skills, type SkillGroup } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { jsonLdGraph, personRef, webPageJsonLd } from "@/lib/seo";
import { CopyEmailButton } from "../CopyEmailButton";
import { JsonLd } from "../JsonLd";
import { RoleList } from "../RoleList";
import { Tags } from "../Tags";
import { SplitTitle } from "../SplitTitle";
import { Waters } from "./Waters";

export function Home({ lang }: { lang: Locale }) {
  const t = profileText[lang];
  const dict = getDictionary(lang);
  // The project tiles show a screenshot served from GitHub.
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
        <Waters />
        <p className="kicker" aria-hidden="true">
          <span>~/ludihan</span> $ <span className="typed">whoami</span>
        </p>
        <SplitTitle text={site.name} />
        <p className="role">{t.role}</p>
        <p className="lead">{t.lead}</p>
        <dl className="facts">
          {t.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="cta">
          <Link href={`/${lang}/projects`} className="btn-link btn-primary">
            {t.cta.projects}
          </Link>
          <span className="email-group">
            <a href={`mailto:${site.email}`} className="btn-link">
              {t.cta.email}
            </a>
            <CopyEmailButton email={site.email} label={t.cta.copyEmail} copiedLabel={t.cta.emailCopied} />
          </span>
          <a href={site.linkedin} className="btn-link" target="_blank" rel="me noopener noreferrer">
            LinkedIn
          </a>
          <a href={site.github} className="btn-link" target="_blank" rel="me noopener noreferrer">
            GitHub
          </a>
        </p>
      </section>

      <section>
        <h2>{dict.sections.projects}</h2>
        <div className="cards">
          {projects.map((p, i) => {
            const shot = p.screenshots[0];
            return (
              <Link key={p.id} href={`/${lang}/projects#${p.id}`} className="card card-project" data-spotlight>
                {/* Phone screenshots stand upright in the frame; wide ones fill it. */}
                <span className={`card-shot${shot.height > shot.width ? " is-tall" : ""}`} aria-hidden="true">
                  <Image
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    alt=""
                    // On tall screens the first tile is the largest thing in view, so don't lazy-load it.
                    {...(i === 0 && { loading: "eager", fetchPriority: "high" })}
                  />
                </span>
                <span className="card-body">
                  <strong>
                    {p.name}
                    <span className="card-arrow" aria-hidden="true">
                      →
                    </span>
                  </strong>
                  <span>{p.text[lang].tagline}</span>
                  <small>{p.stack.slice(0, 4).join(" · ")}</small>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2>{t.workTitle}</h2>
        <RoleList roles={t.roles} timeline />
        <h3>{t.educationTitle}</h3>
        <ul className="plain">
          {t.education.map((e) => (
            <li key={e.title}>
              <strong>{e.title}</strong>, {e.school} <small>({e.period})</small>
            </li>
          ))}
        </ul>
        <p>
          <Link href={`/${lang}/about`} className="text-link">
            {t.workAll} →
          </Link>
        </p>
      </section>

      <section>
        <h2>{t.skillsTitle}</h2>
        {(Object.keys(skills) as SkillGroup[]).map((g) => (
          <div key={g} className="skill-group">
            <h3>{t.skillLabels[g]}</h3>
            <Tags items={skills[g]} />
          </div>
        ))}
      </section>

      <section className="contact" data-spotlight>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <p className="cta">
          <span className="email-group">
            <a href={`mailto:${site.email}`} className="btn-link btn-primary">
              {site.email}
            </a>
            <CopyEmailButton email={site.email} label={t.cta.copyEmail} copiedLabel={t.cta.emailCopied} />
          </span>
          <a href={site.linkedin} className="btn-link" target="_blank" rel="me noopener noreferrer">
            LinkedIn
          </a>
          <a href={site.github} className="btn-link" target="_blank" rel="me noopener noreferrer">
            GitHub
          </a>
        </p>
      </section>

      <div className="os-joke">
        <span className="sr-only">{t.osJoke}</span>
        <div className="terminal" aria-hidden="true" data-play>
          <div className="terminal-bar">
            <i />
            <i />
            <i />
          </div>
          <code>
            <span className="prompt">$</span> <span className="typed">grep ^NAME /etc/os-release</span>
            <br />
            <span className="output">
              NAME=&quot;openSUSE&quot; <em># btw</em>
            </span>
          </code>
        </div>
      </div>
    </>
  );
}
