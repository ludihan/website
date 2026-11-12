import type { Role } from "@/lib/profile";
import { Tags } from "./Tags";

// Table-like rows on the page grid: period, role and org, then what I did there.
export function RoleList({ roles }: { roles: Role[] }) {
  return (
    <div className="rows">
      {roles.map((r) => (
        <article key={r.org} className="row grid">
          <p className="row-date">{r.period}</p>
          <div className="row-title">
            <h3>{r.title}</h3>
            <p>
              {r.org}, {r.place}
            </p>
          </div>
          <div className="row-body">
            <p>{r.summary}</p>
            <Tags items={r.stack} />
          </div>
        </article>
      ))}
    </div>
  );
}
