import { Geist_Mono, Inter } from "next/font/google";

// One neo-grotesk for everything, in the Helvetica line, from captions to the display name. The
// optical-size axis gives the large type its tighter display cut. A mono only for code in posts.
export const sans = Inter({ subsets: ["latin"], axes: ["opsz"], variable: "--font-sans" });
export const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
