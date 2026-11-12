import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

// IBM Plex Sans for everything, from captions to the display name; Plex Mono only for code in posts.
export const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-sans",
});
export const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"], variable: "--font-mono" });
