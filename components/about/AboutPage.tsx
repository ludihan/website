import { getDictionary, type Locale } from "@/lib/i18n";
import { profileText } from "@/lib/profile";
import { jsonLdGraph, personRef, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "../JsonLd";
import { RoleList } from "../RoleList";
import { SectionHead } from "../SectionHead";
import { Tags } from "../Tags";
import { EducationList } from "../EducationList";
import { SkillsList } from "../SkillsList";

export function AboutPage({ lang }: { lang: Locale }) {
  const t = profileText[lang];
  const a = t.about;
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          ...webPageJsonLd(lang, "/about", {
            type: "AboutPage",
            name: a.title,
            description: dict.meta.aboutDescription,
            mainEntity: personRef,
            crumbs: [a.title],
          }),
        )}
      />
      <header className="page-head">
        <h1 className="display display-page">{a.title}</h1>
        <div className="grid hero-body">
          <dl className="meta">
            {t.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="statement">{a.summary}</p>
        </div>
      </header>

      <section className="section">
        <SectionHead n={1} title={a.focusTitle} />
        <div className="grid focus">
          {a.focus.map((f, i) => (
            <article key={f.title} className="focus-item">
              <span className="focus-no">{String.fromCharCode(97 + i)}.</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <Tags items={f.tags} />
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead n={2} title={t.workTitle} />
        <RoleList roles={t.roles} />
      </section>

      <section className="section">
        <SectionHead n={3} title={t.educationTitle} />
        <EducationList entries={t.education} courseworkLabel={a.courseworkLabel} />
      </section>

      <section className="section">
        <SectionHead n={4} title={t.skillsTitle} />
        <SkillsList labels={t.skillLabels} languages={{ title: a.languagesTitle, items: a.languages }} />
      </section>
    </>
  );
}
