import { formatDate, getSlugs, loadPost } from "@/lib/content";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { ogImage, type OgCard } from "@/lib/og";
import { profileText, site } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { ogImageKey } from "@/lib/seo";

// One Open Graph image per page, written at build time as `/og/<lang>/<key>.png`
// (see `ogImageKey`). A route handler keeps the `.png` extension, so static hosts
// serve it with the right content type.
export const dynamic = "force-static";
export const dynamicParams = false;

const pages = ["", "/about", "/projects", "/blog"];

export const generateStaticParams = () =>
  locales.flatMap((lang) =>
    [...pages, ...getSlugs(lang).map((slug) => `/blog/${slug}`)].map((path) => ({
      lang,
      image: `${ogImageKey(path)}.png`,
    })),
  );

async function card(lang: Locale, key: string): Promise<OgCard | undefined> {
  const t = profileText[lang];
  const dict = getDictionary(lang);
  switch (key) {
    case "home":
      return { kicker: "ludihan", title: site.name, subtitle: t.role };
    case "about":
      return { kicker: "about", title: t.about.title, subtitle: t.role };
    case "projects":
      return { kicker: "projects", title: dict.sections.projects, subtitle: projects.map((p) => p.name).join(" · ") };
    case "blog":
      return { kicker: "blog", title: dict.sections.blog, subtitle: dict.meta.blogDescription };
  }
  const slug = key.replace(/^blog-/, "");
  if (key.startsWith("blog-") && getSlugs(lang).includes(slug)) {
    const { frontmatter, minutes } = await loadPost(lang, slug);
    const date = frontmatter.date ? `${formatDate(lang, frontmatter.date, "long")} · ` : "";
    return { kicker: "blog", title: frontmatter.title, subtitle: `${date}${minutes} ${dict.blog.minRead}` };
  }
}

export async function GET(_req: Request, { params }: RouteContext<"/og/[lang]/[image]">) {
  const { lang, image } = await params;
  const c = hasLocale(lang) ? await card(lang, image.replace(/\.png$/, "")) : undefined;
  return c ? ogImage(c) : new Response("Not found", { status: 404 });
}
