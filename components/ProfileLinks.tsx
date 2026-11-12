import { site } from "@/lib/profile";

// Ways to reach me: the email address, then GitHub and LinkedIn, each marked ↗ since it leaves
// the site. One per line, so each is easy to spot and to tap.
export function ProfileLinks() {
  return (
    <ul className="profile-links">
      <li>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </li>
      <li>
        <a href={site.github} target="_blank" rel="me noopener noreferrer">
          GitHub ↗
        </a>
      </li>
      <li>
        <a href={site.linkedin} target="_blank" rel="me noopener noreferrer">
          LinkedIn ↗
        </a>
      </li>
    </ul>
  );
}
