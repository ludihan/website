import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { frontmatter } = await import(`@/content/${lang}/about.md`);
  return { title: frontmatter.title };
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
