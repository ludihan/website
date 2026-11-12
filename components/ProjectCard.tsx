import { ProjectGallery } from "./ProjectGallery";
import { Tags } from "./Tags";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

// One project as a spread: screenshots on the left half, everything about it on the right.
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
    <article className="project section grid" id={project.id} aria-labelledby={`${project.id}-name`}>
      <div className="project-media">
        <ProjectGallery shots={project.screenshots} lang={lang} labels={dict} priority={priority} />
      </div>

      <div className="project-info">
        <header className="project-head">
          <span className="section-no">{String(n).padStart(2, "0")}</span>
          <h2 id={`${project.id}-name`}>{project.name}</h2>
          <p>{tagline}</p>
        </header>

        <p className="project-desc">{description}</p>

        <h3 className="sr-only">{dict.features}</h3>
        <ol className="project-features">
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ol>

        <dl className="project-facts">
          <div>
            <dt>{dict.period}</dt>
            <dd>{period}</dd>
          </div>
          <div>
            <dt>{dict.license}</dt>
            <dd>{project.license}</dd>
          </div>
          <div className="project-facts-wide">
            <dt>{dict.stack}</dt>
            <dd>
              <Tags items={project.stack} />
            </dd>
          </div>
          <div className="project-facts-wide">
            <dt>{dict.source}</dt>
            <dd>
              <a href={project.repo} className="text-link" target="_blank" rel="noopener noreferrer">
                {project.repo.replace("https://", "")}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
