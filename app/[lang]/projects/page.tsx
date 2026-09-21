import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { projects } from "@/lib/projects";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDictionary(lang).sections.projects };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return (
    <>
      <h1 className="title">{dict.sections.projects}</h1>
      <p>{dict.projects.intro}</p>
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} lang={lang} dict={dict.projects} />
      ))}
    </>
  );
}
