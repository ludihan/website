import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SECTIONS, formatDate, getPosts, isSection } from "@/lib/content";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export const generateStaticParams = () =>
  locales.flatMap((lang) => SECTIONS.map((section) => ({ lang, section })));

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[section]">): Promise<Metadata> {
  const { lang, section } = await params;
  if (!hasLocale(lang) || !isSection(section)) return {};
  const dict = getDictionary(lang);
  return pageMetadata(lang, `/${section}`, {
    title: dict.sections[section],
    description: dict.meta.blogDescription,
  });
}

export default async function SectionPage({ params }: PageProps<"/[lang]/[section]">) {
  const { lang, section } = await params;
  if (!hasLocale(lang) || !isSection(section)) notFound();
  const posts = await getPosts(lang, section);
  return (
    <>
      <h1 className="title">{getDictionary(lang).sections[section]}</h1>
      <ul>
        {posts.map(({ slug, frontmatter: { title, date } }) => (
          <li key={slug} className="blog-item">
            <Link href={`/${lang}/${section}/${slug}`}>
              ~ {title.length > 35 ? `${title.slice(0, 35)}...` : title}
            </Link>
            {date && <label>{formatDate(lang, date, "numeric")}</label>}
          </li>
        ))}
      </ul>
    </>
  );
}
