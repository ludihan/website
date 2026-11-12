import { skills, type SkillGroup } from "@/lib/profile";
import { Tags } from "./Tags";

export function SkillsList({
  labels,
  languages,
}: {
  labels: Record<SkillGroup, string>;
  languages?: { title: string; items: string[] };
}) {
  return (
    <div className="grid skills">
      {(Object.keys(skills) as SkillGroup[]).map((group) => (
        <div key={group} className="skill-col">
          <h3>{labels[group]}</h3>
          <Tags items={skills[group]} />
        </div>
      ))}
      {languages && (
        <div className="skill-col">
          <h3>{languages.title}</h3>
          <Tags items={languages.items} />
        </div>
      )}
    </div>
  );
}
