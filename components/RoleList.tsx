import type { Role } from "@/lib/profile";
import { ResumeRow } from "./ResumeRow";
import { Tags } from "./Tags";

// Table-like rows on the page grid: period, role and org, then what I did there.
export function RoleList({ roles }: { roles: Role[] }) {
  return (
    <div className="rows">
      {roles.map((r) => (
        <ResumeRow key={r.org} period={r.period} title={r.title} organization={r.org} place={r.place}>
          <p>{r.summary}</p>
          <Tags items={r.stack} />
        </ResumeRow>
      ))}
    </div>
  );
}
