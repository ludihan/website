import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPage } from "@/components/about/AboutPage";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { profileText } from "@/lib/profile";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/about", {
    title: profileText[lang].about.title,
    description: getDictionary(lang).meta.aboutDescription,
  });
}

export default async function Page({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <AboutPage lang={lang} />;
}
