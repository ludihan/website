import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";

// The project list as an index table: number, name, what it is, stack and period.
// `hrefBase` + `#id` is where each row goes: the projects page, or an anchor on it.
export function ProjectIndex({ lang, hrefBase }: { lang: Locale; hrefBase: string }) {
  return (
    <ol className="index">
      {projects.map((p, i) => (
        <li key={p.id}>
          <Link href={`${hrefBase}#${p.id}`} className="index-row grid">
            <span className="index-no">{String(i + 1).padStart(2, "0")}</span>
            <span className="index-name">{p.name}</span>
            <span className="index-desc">{p.text[lang].tagline}</span>
            <span className="index-stack">{p.stack.slice(0, 3).join(", ")}</span>
            <span className="index-period">{p.text[lang].period}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
