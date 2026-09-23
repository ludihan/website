import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preconnect } from "react-dom";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { site } from "@/lib/profile";
import { jsonLdGraph, pageMetadata, personRef, webPageJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata(lang, "/projects", {
    title: dict.sections.projects,
    description: dict.meta.projectsDescription,
  });
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  // Every screenshot is served from GitHub; open the connection before the images are found.
  preconnect("https://raw.githubusercontent.com");
  const url = `${site.url}/${lang}/projects`;
  const jsonLd = jsonLdGraph(
    ...webPageJsonLd(lang, "/projects", {
      type: "CollectionPage",
      name: dict.sections.projects,
      description: dict.meta.projectsDescription,
      crumbs: [dict.sections.projects],
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareSourceCode",
            "@id": `${url}#${p.id}`,
            url: `${url}#${p.id}`,
            name: p.name,
            alternativeHeadline: p.text[lang].tagline,
            description: p.text[lang].description,
            codeRepository: p.repo,
            license: `https://spdx.org/licenses/${p.license}.html`,
            keywords: p.stack,
            image: p.screenshots.map((s) => s.src),
            author: personRef,
          },
        })),
      },
    }),
  );
  return (
    <>
      <JsonLd data={jsonLd} />
      <h1 className="title">{dict.sections.projects}</h1>
      <p>{dict.projects.intro}</p>
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} lang={lang} dict={dict.projects} priority={i === 0} />
      ))}
    </>
  );
}
