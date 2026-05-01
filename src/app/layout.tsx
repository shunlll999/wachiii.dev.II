import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/sections/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import EasterEggProfile from "@/components/ui/EasterEggProfile";
import { DemoBadge } from "@/components/ui/DemoBadge";

const SITE_URL = "https://wachiii-dev0.web.app";
const SITE_NAME = "wAcii — Senior Software Engineer";
const SITE_DESC = "Senior Software Engineer specializing in React, React Native, Flutter & Mobile. 15+ years building high-impact products.";
const OG_IMAGE = "/images/logo/screenshot.png";

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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
