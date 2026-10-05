import { ViewTransition, type ReactNode } from "react";

// A template remounts on every navigation, so the old page exits and the new one enters.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div className="page">{children}</div>
    </ViewTransition>
  );
}
