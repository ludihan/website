import type { Education } from "@/lib/profile";
import { ResumeRow } from "./ResumeRow";
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
        <ResumeRow
          key={entry.title}
          period={entry.period}
          title={entry.title}
          organization={entry.school}
          place={entry.place}
        >
          {(entry.grade || (courseworkLabel && (entry.summary || entry.coursework))) && (
            <>
              {entry.grade && <p className="row-grade">{entry.grade}</p>}
              {courseworkLabel && entry.summary && <p>{entry.summary}</p>}
              {courseworkLabel && entry.coursework && (
                <>
                  <p className="row-label">{courseworkLabel}</p>
                  <Tags items={entry.coursework} />
                </>
              )}
            </>
          )}
        </ResumeRow>
      ))}
    </div>
  );
}
