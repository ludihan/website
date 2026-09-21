import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTIONS, formatDate, getSlugs, isSection, loadPost } from "@/lib/content";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export const generateStaticParams = () =>
  locales.flatMap((lang) =>
    SECTIONS.flatMap((section) =>
      getSlugs(lang, section).map((slug) => ({ lang, section, slug })),
    ),
  );

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[section]/[slug]">): Promise<Metadata> {
  const { lang, section, slug } = await params;
  if (!hasLocale(lang) || !isSection(section)) return {};
  const { frontmatter } = await loadPost(lang, section, slug);
  return pageMetadata(lang, `/${section}/${slug}`, {
    title: frontmatter.title,
    description: getDictionary(lang).meta.blogDescription,
  });
}

export default async function Post({ params }: PageProps<"/[lang]/[section]/[slug]">) {
  const { lang, section, slug } = await params;
  if (!hasLocale(lang) || !isSection(section)) notFound();
  const { Content, frontmatter } = await loadPost(lang, section, slug);
  return (
    <>
      <h1 className="title">{frontmatter.title}</h1>
      {frontmatter.date && (
        <p className="subtitle">
          <strong>{formatDate(lang, frontmatter.date, "long")}</strong>
        </p>
      )}
      <div className="prose">
        <Content />
      </div>
    </>
  );
}
