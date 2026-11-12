import type { Education } from "@/lib/profile";
import { Tags } from "./Tags";

export function EducationList({
  entries,
  courseworkLabel,
}: {
  entries: Education[];
  courseworkLabel?: string;
}) {
  return (
    <div className="rows">
      {entries.map((entry) => (
        <article key={entry.title} className="row grid">
          <p className="row-date">{entry.period}</p>
          <div className="row-title">
            <h3>{entry.title}</h3>
            <p>{entry.school}, {entry.place}</p>
          </div>
          {courseworkLabel && (entry.summary || entry.coursework) && (
            <div className="row-body">
              {entry.summary && <p>{entry.summary}</p>}
              {entry.coursework && (
                <>
                  <p className="row-label">{courseworkLabel}</p>
                  <Tags items={entry.coursework} />
                </>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
