import { getDictionary, type Locale } from "@/lib/i18n";
import { profileText } from "@/lib/profile";
import { jsonLdGraph, personRef, webPageJsonLd } from "@/lib/seo";
import { EducationList } from "../EducationList";
import { JsonLd } from "../JsonLd";
import { PageIntro } from "../PageIntro";
import { ProfileLinks } from "../ProfileLinks";
import { RoleList } from "../RoleList";
import { SectionHead } from "../SectionHead";
import { SkillsList } from "../SkillsList";
import { Tags } from "../Tags";

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
      <PageIntro title={a.title}>
        <dl className="facts">
          {t.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
          <div>
            <dt>{dict.ui.contact}</dt>
            <dd>
              <ProfileLinks />
            </dd>
          </div>
        </dl>
        <p className="statement">{a.summary}</p>
      </PageIntro>

      <section className="section">
        <SectionHead n={1} title={a.focusTitle} />
        {/* Four equal columns, each opened by a rule and lettered a–d. */}
        <div className="focus grid">
          {a.focus.map((f, i) => (
            <article key={f.title} className="focus-item">
              <span className="focus-no">{String.fromCharCode(97 + i)}</span>
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
