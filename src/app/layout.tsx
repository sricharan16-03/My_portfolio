import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Full-Stack Architect & UI Engineer | Portfolio",
  description: "Ultra-premium interactive developer portfolio showcasing advanced WebGL effects, smooth scrolling scrollbars, GSAP timelines, and high-performance React architectures.",
  authors: [{ name: "Creative Architect" }],
  keywords: ["Creative Developer", "Full Stack Architect", "UI Engineer", "Next.js Portfolio", "Interactive Website", "WebGL Particles"],
  openGraph: {
    title: "Creative Full-Stack Architect & UI Engineer | Portfolio",
    description: "Premium interactive portfolio showcasing advanced animations, 3D WebGL meshes, and modern digital branding.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-zinc-100 font-sans selection:bg-cyber-purple/35 selection:text-white">
        {children}
      </body>
    </html>
  );
}
