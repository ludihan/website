import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPosts } from "@/lib/content";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  const metadata = pageMetadata(lang, "/blog", {
    title: dict.sections.blog,
    description: dict.meta.blogDescription,
  });
  // Lets feed readers and browsers discover the RSS feed.
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: { "application/rss+xml": `/${lang}/blog/rss.xml` },
    },
  };
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const posts = await getPosts(lang);
  return (
    <>
      <h1 className="title">{dict.sections.blog}</h1>
      <p>{dict.meta.blogDescription}</p>
      {posts.length === 0 ? (
        <p className="muted">{dict.blog.empty}</p>
      ) : (
        <ul className="post-list">
          {posts.map(({ slug, frontmatter: { title, date, description }, minutes }) => (
            <li key={slug}>
              <h2>
                <Link href={`/${lang}/blog/${slug}`}>{title}</Link>
              </h2>
              <p className="post-meta">
                {date && <time dateTime={new Date(date).toISOString()}>{formatDate(lang, date, "long")}</time>}
                {date && " · "}
                {minutes} {dict.blog.minRead}
              </p>
              {description && <p>{description}</p>}
            </li>
          ))}
        </ul>
      )}
      <p className="muted">
        <a href={`/${lang}/blog/rss.xml`}>{dict.blog.rss}</a>
      </p>
    </>
  );
}
