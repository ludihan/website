import { Geist_Mono, Schibsted_Grotesk } from "next/font/google";

// One grotesk for everything, from captions to the display name; a mono only for code in posts.
export const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
export const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
