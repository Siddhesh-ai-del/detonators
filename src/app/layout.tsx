import type { Metadata } from "next";
import {
  Space_Grotesk,
  Archivo_Black,
  Inter,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import CapsuleNav from "@/components/CapsuleNav";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Detonators — Team Portfolio",
  description:
    "Neo-brutalist timeline of events, hackathons, and posts from The Detonators team.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${archivoBlack.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border-[3px] focus:border-fg focus:bg-accent-yellow focus:px-3 focus:py-2 focus:font-bold"
        >
          Skip to content
        </a>
        <CapsuleNav />
        <div id="main">{children}</div>
      </body>
    </html>
  );
}