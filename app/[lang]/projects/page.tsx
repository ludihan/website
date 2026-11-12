import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preconnect } from "react-dom";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { PageIntro } from "@/components/PageIntro";
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
      <PageIntro title={dict.sections.projects} description={dict.projects.intro}>
        <nav className="meta" aria-label={dict.projects.contents}>
          <div>
            <p className="meta-label">{dict.projects.contents}</p>
            <ol className="meta-links">
              {projects.map((p, i) => (
                <li key={p.id}>
                  <a href={`#${p.id}`}>
                    <span>{String(i + 1).padStart(2, "0")}</span> {p.name}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </PageIntro>
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} n={i + 1} lang={lang} dict={dict.projects} priority={i === 0} />
      ))}
    </>
  );
}
