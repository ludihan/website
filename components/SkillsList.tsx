import { skills, type SkillGroup } from "@/lib/profile";
import { Tags } from "./Tags";

// Rows on the page grid: the group in the first three columns, its list from column 4.
export function SkillsList({
  labels,
  languages,
}: {
  labels: Record<SkillGroup, string>;
  languages?: { title: string; items: string[] };
}) {
  const rows = [
    ...(Object.keys(skills) as SkillGroup[]).map((group) => ({ title: labels[group], items: skills[group] })),
    ...(languages ? [languages] : []),
  ];
  return (
    <div className="rows">
      {rows.map(({ title, items }) => (
        <div key={title} className="row skill-row grid">
          <h3>{title}</h3>
          <Tags items={items} />
        </div>
      ))}
    </div>
  );
}
