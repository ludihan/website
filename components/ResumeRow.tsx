import type { ReactNode } from "react";

// One row of a table on the page grid: the period in the first three columns, the title and
// organisation from column 4, the detail from column 8.
export function ResumeRow({
  period,
  title,
  organization,
  place,
  children,
}: {
  period: string;
  title: string;
  organization: string;
  place: string;
  children?: ReactNode;
}) {
  return (
    <article className="row grid">
      <p className="row-period">{period}</p>
      <div className="row-title">
        <h3>{title}</h3>
        <p>
          {organization}, {place}
        </p>
      </div>
      {children && <div className="row-detail">{children}</div>}
    </article>
  );
}
