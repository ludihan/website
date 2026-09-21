import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  lang,
  dict,
}: {
  project: Project;
  lang: Locale;
  dict: Dictionary["projects"];
}) {
  const { tagline, description, features } = project.text[lang];
  return (
    <article className="project" id={project.id}>
      <h2>
        {project.name} <small>{tagline}</small>
      </h2>
      <p>{description}</p>

      <div className="gallery">
        {project.screenshots.map((s) => (
          <Image key={s.src} src={s.src} width={s.width} height={s.height} alt={s.alt[lang]} />
        ))}
      </div>

      <h3>{dict.features}</h3>
      <ul>
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <h3>{dict.stack}</h3>
      <ul className="tags">
        {project.stack.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <p>
        <a href={project.repo} className="btn-link">
          {dict.source}
        </a>{" "}
        <span className="license">
          {dict.license}: {project.license}
        </span>
      </p>
    </article>
  );
}
