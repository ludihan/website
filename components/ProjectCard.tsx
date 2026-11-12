import { ProjectGallery } from "./ProjectGallery";
import { Tags } from "./Tags";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

// One project on the page grid. The first three columns hold its numeral, set very large in
// blue, and the facts beneath it; columns 4–12 hold the name, the screenshots and the text.
export function ProjectCard({
  project,
  n,
  lang,
  dict,
  priority,
}: {
  project: Project;
  n: number;
  lang: Locale;
  dict: Dictionary["projects"];
  priority?: boolean;
}) {
  const { tagline, period, description, features } = project.text[lang];
  return (
    <article className="project grid" id={project.id} aria-labelledby={`${project.id}-name`}>
      <aside className="project-side">
        <span className="project-no" aria-hidden="true">
          {String(n).padStart(2, "0")}
        </span>
        <dl className="facts">
          <div>
            <dt>{dict.period}</dt>
            <dd>{period}</dd>
          </div>
          <div>
            <dt>{dict.license}</dt>
            <dd>{project.license}</dd>
          </div>
          <div>
            <dt>{dict.stack}</dt>
            <dd>
              <Tags items={project.stack} />
            </dd>
          </div>
          <div>
            <dt>{dict.source}</dt>
            <dd>
              <a href={project.repo} className="text-link" target="_blank" rel="noopener noreferrer">
                {project.repo.replace("https://github.com/", "github/")}
              </a>
            </dd>
          </div>
        </dl>
      </aside>

      <div className="project-main">
        <header className="project-head">
          <h2 id={`${project.id}-name`}>{project.name}</h2>
          <p>{tagline}</p>
        </header>

        <div className="project-media">
          <ProjectGallery shots={project.screenshots} lang={lang} labels={dict} priority={priority} />
        </div>

        <div className="project-text">
          <p className="project-desc">{description}</p>
          <div>
            <h3 className="sr-only">{dict.features}</h3>
            <ol className="project-features">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </article>
  );
}
