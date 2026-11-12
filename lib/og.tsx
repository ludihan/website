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
// header row and the title set large and light.
export type OgCard = { kicker: string; title: string; subtitle: string };

export async function ogImage({ kicker, title, subtitle }: OgCard) {
  const host = new URL(site.url).host;
  const [light, regular] = await Promise.all([loadFont("IBM+Plex+Sans", 300), loadFont("IBM+Plex+Sans", 400)]);
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
          fontFamily: "IBM Plex Sans",
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
          <span>{site.name}</span>
          <span style={{ textTransform: kicker === "ludihan" ? "none" : "capitalize" }}>
            {kicker === "ludihan" ? host : kicker}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: title.length > 30 ? 80 : 136,
              fontWeight: 300,
              letterSpacing: title.length > 30 ? -2 : -4,
              lineHeight: 1,
              marginLeft: -4,
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
        { name: "IBM Plex Sans", data: light, weight: 300 },
        { name: "IBM Plex Sans", data: regular, weight: 400 },
      ],
    },
  );
}
