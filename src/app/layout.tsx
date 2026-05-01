import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/sections/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import EasterEggProfile from "@/components/ui/EasterEggProfile";

export const metadata: Metadata = {
  // title: "wAcii — Senior Software Engineer",
  // description: "Senior Software Engineer specializing in React, React Native, Flutter & Mobile. 15+ years building products.",
  icons: { icon: "https://wachiii-dev0.web.app/assets/images/logo/wachiii-fav.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="https://wachiii-dev0.web.app/assets/images/logo/wachiii-fav.ico" />
      </head>
      <body className="noise">
        <CustomCursor />
        <EasterEggProfile />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
