import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Home } from "@/components/home/Home";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  // `absolute` skips the "%s | Lucca Han" template: the home title is already complete.
  return pageMetadata(lang, "", {
    title: { absolute: meta.homeTitle },
    description: meta.homeDescription,
  });
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <Home lang={lang} />;
}
