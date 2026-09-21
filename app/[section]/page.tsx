import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SECTIONS, formatDate, getPosts, isSection } from "@/lib/content";

export const dynamicParams = false;

export const generateStaticParams = () =>
  Object.keys(SECTIONS).map((section) => ({ section }));

export async function generateMetadata({
  params,
}: PageProps<"/[section]">): Promise<Metadata> {
  const { section } = await params;
  return { title: isSection(section) ? SECTIONS[section] : undefined };
}

export default async function SectionPage({ params }: PageProps<"/[section]">) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  const posts = await getPosts(section);
  return (
    <>
      <h1 className="title">{SECTIONS[section]}</h1>
      <ul>
        {posts.map(({ slug, frontmatter: { title, date } }) => (
          <li key={slug} className="blog-item">
            <Link href={`/${section}/${slug}`}>
              ~ {title.length > 35 ? `${title.slice(0, 35)}...` : title}
            </Link>
            {date && <label>{formatDate(date, "numeric")}</label>}
          </li>
        ))}
      </ul>
    </>
  );
}
