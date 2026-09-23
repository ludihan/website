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

// Shared Open Graph / Twitter card: the site's colors, a page kicker, a title and a subtitle.
export type OgCard = { kicker: string; title: string; subtitle: string };

export async function ogImage({ kicker, title, subtitle }: OgCard) {
  const host = new URL(site.url).host;
  const footer = `${site.name} · ${host}`;
  const [regular, bold, mono] = await Promise.all([
    loadFont("Geist", 400),
    loadFont("Geist", 700),
    loadFont("Geist+Mono", 500),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "#141312",
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(209,161,89,0.22), transparent 55%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          borderLeft: "16px solid #d1a159",
          color: "#ece8e1",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 30, color: "#a8a197" }}>
          <span style={{ color: "#d1a159" }}>~/{kicker}</span>
          <span>&nbsp;$</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: title.length > 40 ? 68 : 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ fontSize: 36, color: "#d1a159", lineHeight: 1.3 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#a8a197" }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: "#d1a159" }} />
          {footer}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400 },
        { name: "Geist", data: bold, weight: 700 },
        { name: "Geist Mono", data: mono, weight: 500 },
      ],
    },
  );
}
