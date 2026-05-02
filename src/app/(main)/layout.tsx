// ── Firebase (ต้อง init ก่อน component ใดๆ) ──────────────────────────
import '@/services/firebase'; // Initialize Firebase app
import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/sections/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import EasterEggProfile from "@/components/ui/EasterEggProfile";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { OG_IMAGE, SITE_DESC, SITE_NAME, SITE_URL } from "@/constants";
import { Metadata as MetaDataTag } from "@/components/ui/Metadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | wAcii",
  },
  description: SITE_DESC,
  keywords: ["software engineer", "react native", "flutter", "mobile developer", "frontend", "typescript", "javascript", "bangkok"],
  authors: [{ name: "Wachara Nilsonti", url: SITE_URL }],
  creator: "Wachara Nilsonti",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESC,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
    images: [OG_IMAGE],
    creator: "@wachiii3",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo/wachiii-fav.ico",
    shortcut: "/images/logo/wachiii-fav.ico",
    apple: "/images/logo/wachiii-fav.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <MetaDataTag />
      </head>
      <body className="noise">
        <DemoBadge />
        <CustomCursor />
        <EasterEggProfile />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
