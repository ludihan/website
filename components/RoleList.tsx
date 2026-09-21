import type { Role } from "@/lib/profile";
import { Tags } from "./Tags";

export function RoleList({ roles, timeline = false }: { roles: Role[]; timeline?: boolean }) {
  return (
    <div className={timeline ? "timeline" : undefined}>
      {roles.map((r) => (
        <article key={r.org} className="role-item">
          <header>
            <h3>
              {r.title} <span>· {r.org}</span>
            </h3>
            <p>
              {r.period} · {r.place}
            </p>
          </header>
          <p>{r.summary}</p>
          <Tags items={r.stack} />
        </article>
      ))}
    </div>
  );
}
