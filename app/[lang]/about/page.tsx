import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { frontmatter } = await import(`@/content/${lang}/about.md`);
  return pageMetadata(lang, "/about", {
    title: frontmatter.title,
    description: getDictionary(lang).meta.aboutDescription,
  });
}

export default async function Page({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { default: About, frontmatter } = await import(`@/content/${lang}/about.md`);
  return (
    <>
      <h1 className="title">{frontmatter.title}</h1>
      <div className="prose">
        <About />
      </div>
    </>
  );
}
