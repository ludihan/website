import { skills, type SkillGroup } from "@/lib/profile";
import { Tags } from "./Tags";

export function SkillsList({
  labels,
  languages,
}: {
  labels: Record<SkillGroup, string>;
  languages?: { title: string; items: string[] };
}) {
  // Rows on the page grid like experience and education: the group from column 1, its list from column 4.
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
