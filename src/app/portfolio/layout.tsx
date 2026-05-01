import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse all projects by wAcii — React Native, Flutter, React, Unity, and more. 15+ shipped products across mobile, web, and games.",
  openGraph: {
    title: "Portfolio | wAcii",
    description: "Browse all projects by wAcii — React Native, Flutter, React, Unity, and more. 15+ shipped products across mobile, web, and games.",
    url: "https://wachiii-dev0.web.app/portfolio",
  },
  twitter: {
    title: "Portfolio | wAcii",
    description: "Browse all projects by wAcii — React Native, Flutter, React, Unity, and more. 15+ shipped products across mobile, web, and games.",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
