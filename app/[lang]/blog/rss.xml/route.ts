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
<guid>${url}</guid>${date ? `\n<pubDate>${new Date(date).toUTCString()}</pubDate>` : ""}${
        description ? `\n<description>${escape(description)}</description>` : ""
      }
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escape(`${dict.sections.blog} | ${site.name}`)}</title>
<link>${site.url}/${lang}/blog</link>
<description>${escape(dict.meta.blogDescription)}</description>
<language>${lang}</language>
${items}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
