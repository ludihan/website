import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { formatDate, getPosts, getSlugs, loadPost } from "@/lib/content";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/profile";
import { jsonLdGraph, ogImageKey, pageMetadata, webPageJsonLd } from "@/lib/seo";

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

  const url = `${site.url}/${lang}/blog/${slug}`;
  const published = frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined;
  const description = frontmatter.description ?? dict.meta.blogDescription;
  const jsonLd = jsonLdGraph(
    ...webPageJsonLd(lang, `/blog/${slug}`, {
      name: frontmatter.title,
      description,
      crumbs: [dict.sections.blog, frontmatter.title],
      mainEntity: { "@id": `${url}#post` },
    }),
    {
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      mainEntityOfPage: { "@id": url },
      url,
      headline: frontmatter.title,
      description,
      inLanguage: lang,
      image: `${site.url}/og/${lang}/${ogImageKey(`/blog/${slug}`)}.png`,
      datePublished: published,
      dateModified: published,
      timeRequired: `PT${minutes}M`,
      author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: `${site.url}/${lang}` },
      publisher: { "@id": `${site.url}/#person` },
      isPartOf: { "@type": "Blog", "@id": `${site.url}/${lang}/blog` },
    },
  );

  return (
    <article>
      <JsonLd data={jsonLd} />
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
