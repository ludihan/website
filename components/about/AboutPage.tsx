import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { profileText, site, skills, type SkillGroup } from "@/lib/profile";
import { CopyEmailButton } from "../CopyEmailButton";
import { RoleList } from "../RoleList";
import { Tags } from "../Tags";

export function AboutPage({ lang }: { lang: Locale }) {
  const t = profileText[lang];
  const a = t.about;
  const dict = getDictionary(lang);

  return (
    <>
      <section className="hero">
        <h1 className="title">{a.title}</h1>
        <p className="role">{t.role}</p>
        <p>{a.summary}</p>
        <dl className="facts">
          {t.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2>{a.focusTitle}</h2>
        <div className="cards cards-two">
          {a.focus.map((f) => (
            <article key={f.title} className="card card-static">
              <strong>{f.title}</strong>
              <span>{f.text}</span>
              <small>{f.tags.join(" · ")}</small>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>{t.workTitle}</h2>
        <RoleList roles={t.roles} timeline />
      </section>

      <section>
        <h2>{t.educationTitle}</h2>
        <div className="timeline">
          {t.education.map((e) => (
            <article key={e.title} className="role-item">
              <header>
                <h3>
                  {e.title} <span>· {e.school}</span>
                </h3>
                <p>
                  {e.period} · {e.place}
                </p>
              </header>
              <p className="muted">{a.courseworkLabel}</p>
              <Tags items={e.coursework} />
            </article>
          ))}
        </div>
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

      <section>
        <h2>{a.languagesTitle}</h2>
        <Tags items={a.languages} />
        <h2 className="sub">{a.beyondTitle}</h2>
        <p>{a.beyond}</p>
      </section>

      <section>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <p className="cta">
          <a href={`mailto:${site.email}`} className="btn-link btn-primary">
            {site.email}
          </a>
          <CopyEmailButton email={site.email} label={t.cta.copyEmail} copiedLabel={t.cta.emailCopied} />
          <a href={site.linkedin} className="btn-link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={site.github} className="btn-link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <Link href={`/${lang}/projects`} className="btn-link">
            {dict.sections.projects}
          </Link>
        </p>
      </section>
    </>
  );
}
