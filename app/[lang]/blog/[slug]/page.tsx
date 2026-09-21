import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPosts, getSlugs, loadPost } from "@/lib/content";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/profile";
import { jsonLdScript, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export const generateStaticParams = () =>
  locales.flatMap((lang) => getSlugs(lang).map((slug) => ({ lang, slug })));

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const { frontmatter } = await loadPost(lang, slug);
  return pageMetadata(lang, `/blog/${slug}`, {
    title: frontmatter.title,
    description: frontmatter.description ?? getDictionary(lang).meta.blogDescription,
    publishedTime: frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined,
  });
}

export default async function Post({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { Content, frontmatter, minutes } = await loadPost(lang, slug);

  // Posts are sorted newest first, so the next index is the older post.
  const posts = await getPosts(lang);
  const i = posts.findIndex((p) => p.slug === slug);
  const newer = posts[i - 1];
  const older = posts[i + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    inLanguage: lang,
    url: `${site.url}/${lang}/blog/${slug}`,
    datePublished: frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined,
    author: { "@type": "Person", name: site.name, url: `${site.url}/${lang}` },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <p>
        <Link href={`/${lang}/blog`} className="text-link">
          {dict.blog.back}
        </Link>
      </p>
      <h1 className="title">{frontmatter.title}</h1>
      <p className="post-meta">
        {frontmatter.date && (
          <time dateTime={new Date(frontmatter.date).toISOString()}>
            {formatDate(lang, frontmatter.date, "long")}
          </time>
        )}
        {frontmatter.date && " · "}
        {minutes} {dict.blog.minRead}
      </p>
      <div className="prose">
        <Content />
      </div>
      {(newer || older) && (
        <nav className="post-nav" aria-label="Posts">
          {older ? (
            <Link href={`/${lang}/blog/${older.slug}`} rel="prev">
              <small>← {dict.blog.older}</small>
              {older.frontmatter.title}
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/${lang}/blog/${newer.slug}`} rel="next">
              <small>{dict.blog.newer} →</small>
              {newer.frontmatter.title}
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
