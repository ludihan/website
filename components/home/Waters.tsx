import type { CSSProperties } from "react";

// The Meeting of the Waters, outside Manaus: the dark Rio Negro and the sandy Solimões
// run side by side for kilometres without mixing. Two soft glows sit on either side of
// a seam, and thin currents of light flow along it.
const seam = "M 520 -40 C 700 120 860 240 1060 320 S 1360 430 1520 470";
// `phase`: how far along its loop each current starts, so they don't move in step.
const currents = [
  { d: seam, dur: 11, phase: 0, opacity: 0.9 },
  { d: "M 500 -30 C 690 140 840 270 1040 350 S 1340 460 1520 505", dur: 15, phase: 0.4, opacity: 0.5 },
  { d: "M 545 -50 C 720 100 880 215 1080 292 S 1380 400 1520 438", dur: 13, phase: 0.23, opacity: 0.4 },
];

export function Waters() {
  return (
    <div className="waters" aria-hidden="true" data-loop>
      <div className="waters-glow" />
      <svg viewBox="0 0 1440 720" preserveAspectRatio="xMidYMin slice">
        <defs>
          <linearGradient id="current" gradientUnits="userSpaceOnUse" x1="520" y1="0" x2="1440" y2="480">
            <stop offset="0" stopColor="#f1d29b" stopOpacity="0" />
            <stop offset="0.35" stopColor="#f1d29b" stopOpacity="0.9" />
            <stop offset="1" stopColor="#f1d29b" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d={seam} className="waters-seam" />
        {/* Each current is a bright core over a wide, faint halo that flows with it. */}
        {currents.map((c, i) => (
          <g
            key={i}
            className="waters-current"
            stroke="url(#current)"
            style={{ "--dur": `${c.dur}s`, "--from": 1000 * (1 - c.phase), opacity: c.opacity } as CSSProperties}
          >
            <path d={c.d} className="waters-halo" />
            <path d={c.d} />
          </g>
        ))}
      </svg>
    </div>
  );
}
