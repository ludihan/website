import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { profileText, site, skills, type SkillGroup } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { jsonLdScript } from "@/lib/seo";

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function Home({ lang }: { lang: Locale }) {
  const t = profileText[lang];
  const dict = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: "ludihan",
    url: `${site.url}/${lang}`,
    jobTitle: t.role,
    description: dict.meta.homeDescription,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Manaus",
      addressRegion: "Amazonas",
      addressCountry: "BR",
    },
    knowsLanguage: ["en", "pt", "ja"],
    knowsAbout: [
      ...skills.languages,
      ...skills.frontend,
      ...skills.backend,
      ...skills.devops,
      "Full-stack web development",
    ],
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Fortaleza (UNIFOR)" },
    worksFor: { "@type": "Organization", name: "Masf Refeições" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      <section className="hero">
        <h1 className="title">{site.name}</h1>
        <p className="role">{t.role}</p>
        <p>{t.lead}</p>
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
          <a href={`mailto:${site.email}`} className="btn-link">
            {t.cta.email}
          </a>
          <a href={site.linkedin} className="btn-link">
            LinkedIn
          </a>
          <a href={site.github} className="btn-link">
            GitHub
          </a>
        </p>
      </section>

      <section>
        <h2>{dict.sections.projects}</h2>
        <div className="cards">
          {projects.map((p) => (
            <Link key={p.id} href={`/${lang}/projects#${p.id}`} className="card">
              <strong>{p.name}</strong>
              <span>{p.text[lang].tagline}</span>
              <small>{p.stack.slice(0, 4).join(" · ")}</small>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>{t.workTitle}</h2>
        {t.roles.map((r) => (
          <article key={r.org} className="role-item">
            <header>
              <h3>
                {r.title} <span>· {r.org}</span>
              </h3>
              <p>
                {r.period} · {r.place}
              </p>
            </header>
            <p>{r.summary}</p>
            <Tags items={r.stack} />
          </article>
        ))}
        <h3>{t.educationTitle}</h3>
        <ul className="plain">
          {t.education.map((e) => (
            <li key={e.title}>
              <strong>{e.title}</strong>, {e.school} <small>({e.period})</small>
            </li>
          ))}
        </ul>
        <p>
          <Link href={`/${lang}/about`}>{t.workAll} →</Link>
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

      <section>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <p className="cta">
          <a href={`mailto:${site.email}`} className="btn-link btn-primary">
            {site.email}
          </a>
          <a href={site.linkedin} className="btn-link">
            LinkedIn
          </a>
          <a href={site.github} className="btn-link">
            GitHub
          </a>
        </p>
        <p className="muted">{t.interests}</p>
      </section>
    </>
  );
}
