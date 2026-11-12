import { ImageResponse } from "next/og";
import { site } from "./profile";

export const ogSize = { width: 1200, height: 630 };

// Satori can't read woff2, and Google Fonts serves a full TTF to clients that don't ask for
// woff2. Each font is downloaded once per build, however many images use it.
const fonts = new Map<string, Promise<ArrayBuffer>>();

function loadFont(family: string, weight: number) {
  const key = `${family}:${weight}`;
  let font = fonts.get(key);
  if (!font) {
    font = (async () => {
      const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`)).text();
      const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
      if (!url) throw new Error(`Could not load ${family} ${weight} for the Open Graph images`);
      return (await fetch(url)).arrayBuffer();
    })();
    fonts.set(key, font);
  }
  return font;
}

// Shared Open Graph / Twitter card, set like the site's footer: ultramarine, paper-coloured type, a hairline
// header row and the title set large, bold and tight.
export type OgCard = { kicker: string; title: string; subtitle: string };

export async function ogImage({ kicker, title, subtitle }: OgCard) {
  const host = new URL(site.url).host;
  const [regular, bold] = await Promise.all([loadFont("Schibsted+Grotesk", 400), loadFont("Schibsted+Grotesk", 700)]);
  const paper = "#f1efe9";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px 56px 56px",
          background: "#1c3fd1",
          color: paper,
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 18,
            borderBottom: `1px solid ${paper}`,
            fontSize: 26,
          }}
        >
          <span style={{ fontWeight: 700 }}>{site.name}</span>
          <span style={{ textTransform: kicker === "ludihan" ? "none" : "capitalize" }}>
            {kicker === "ludihan" ? host : kicker}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: title.length > 30 ? 92 : 168,
              fontWeight: 700,
              letterSpacing: title.length > 30 ? -4 : -10,
              lineHeight: 0.88,
              marginLeft: -6,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.25, opacity: 0.85 }}>{subtitle}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Schibsted Grotesk", data: regular, weight: 400 },
        { name: "Schibsted Grotesk", data: bold, weight: 700 },
      ],
    },
  );
}
