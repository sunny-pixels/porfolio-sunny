import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "Sunny Prajapati — software engineer building crafted, motion-rich interfaces and production AI systems. Next.js, TypeScript, Python, LLMs.";

export const metadata: Metadata = {
  // TODO: placeholder — set NEXT_PUBLIC_SITE_URL to the deployed domain.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${profile.name} — Software Engineer · Full-Stack & AI`,
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Software Engineer`,
    description,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/projects/maliha.webp", width: 1600, height: 1000 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0e11",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
