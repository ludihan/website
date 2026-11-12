import type { ReactNode } from "react";

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
      <p className="row-date">{period}</p>
      <div className="row-title">
        <h3>{title}</h3>
        <p>
          {organization}, {place}
        </p>
      </div>
      {children && <div className="row-body">{children}</div>}
    </article>
  );
}
