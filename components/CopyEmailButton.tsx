"use client";

import { useEffect, useRef, useState } from "react";

export function CopyEmailButton({
  email,
  label,
  copiedLabel,
}: {
  email: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      // Restart the countdown so earlier clicks can't hide the tooltip early.
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; nothing to fall back to here.
    }
  }

  return (
    <span className="copy-email-wrap">
      <button
        type="button"
        className="btn-link btn-copy"
        onClick={handleClick}
        aria-label={copied ? copiedLabel : label}
        title={copied ? copiedLabel : label}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="12" height="12" rx="1.5" />
            <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
          </svg>
        )}
      </button>
      {/* Keep the text while hidden so the fade-out doesn't collapse to an empty box. */}
      <span className={`copy-email-tooltip${copied ? " is-visible" : ""}`} aria-hidden="true">
        {copiedLabel}
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </span>
  );
}
