import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTIONS, formatDate, getSlugs, isSection, loadPost } from "@/lib/content";

export const dynamicParams = false;

export const generateStaticParams = () =>
  (Object.keys(SECTIONS) as (keyof typeof SECTIONS)[]).flatMap((section) =>
    getSlugs(section).map((slug) => ({ section, slug })),
  );

export async function generateMetadata({
  params,
}: PageProps<"/[section]/[slug]">): Promise<Metadata> {
  const { section, slug } = await params;
  if (!isSection(section)) return {};
  return { title: (await loadPost(section, slug)).frontmatter.title };
}

export default async function Post({ params }: PageProps<"/[section]/[slug]">) {
  const { section, slug } = await params;
  if (!isSection(section)) notFound();
  const { Content, frontmatter } = await loadPost(section, slug);
  return (
    <>
      <h1 className="title">{frontmatter.title}</h1>
      {frontmatter.date && (
        <p className="subtitle">
          <strong>{formatDate(frontmatter.date, "long")}</strong>
        </p>
      )}
      <div className="prose">
        <Content />
      </div>
    </>
  );
}
