import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { default: Home } = await import(`@/content/${lang}/index.mdx`);
  return (
    <div className="prose">
      <Home />
    </div>
  );
}
