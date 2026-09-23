import { getPosts } from "@/lib/content";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/profile";

export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(_req: Request, { params }: RouteContext<"/[lang]/blog/rss.xml">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return new Response("Not found", { status: 404 });
  const dict = getDictionary(lang);
  const posts = await getPosts(lang);

  const items = posts
    .map(({ slug, frontmatter: { title, date, description } }) => {
      const url = `${site.url}/${lang}/blog/${slug}`;
      return `<item>
<title>${escape(title)}</title>
<link>${url}</link>
<guid>${url}</guid>
<dc:creator>${escape(site.name)}</dc:creator>${date ? `\n<pubDate>${new Date(date).toUTCString()}</pubDate>` : ""}${
        description ? `\n<description>${escape(description)}</description>` : ""
      }
</item>`;
    })
    .join("\n");

  const latest = posts.find((p) => p.frontmatter.date)?.frontmatter.date;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
<title>${escape(`${dict.sections.blog} | ${site.name}`)}</title>
<link>${site.url}/${lang}/blog</link>
<atom:link href="${site.url}/${lang}/blog/rss.xml" rel="self" type="application/rss+xml"/>
<description>${escape(dict.meta.blogDescription)}</description>
<language>${lang}</language>
<managingEditor>${site.email} (${escape(site.name)})</managingEditor>${
    latest ? `\n<lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>` : ""
  }
<image>
<url>${site.url}/og/${lang}/blog.png</url>
<title>${escape(`${dict.sections.blog} | ${site.name}`)}</title>
<link>${site.url}/${lang}/blog</link>
</image>
${items}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
