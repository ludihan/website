import { site } from "@/lib/profile";
import { CopyEmailButton } from "./CopyEmailButton";

// Ways to reach me: the email address, then LinkedIn and GitHub (in that order:
// employers look for LinkedIn first), each marked ↗ since it leaves
// the site. One per line, so each is easy to spot and to tap. With `copy`, the email gets the
// colophon's copy button beside it.
export function ProfileLinks({ copy }: { copy?: { label: string; copiedLabel: string } } = {}) {
  return (
    <ul className="profile-links">
      <li className={copy ? "profile-email" : undefined}>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        {copy && <CopyEmailButton email={site.email} label={copy.label} copiedLabel={copy.copiedLabel} />}
      </li>
      <li>
        <a href={site.linkedin} target="_blank" rel="me noopener noreferrer">
          LinkedIn ↗
        </a>
      </li>
      <li>
        <a href={site.github} target="_blank" rel="me noopener noreferrer">
          GitHub ↗
        </a>
      </li>
    </ul>
  );
}
