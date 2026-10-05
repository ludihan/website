import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";

// The optical size and width axes let the display type tighten up at large sizes.
export const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-sans", axes: ["opsz", "wdth"] });
export const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
