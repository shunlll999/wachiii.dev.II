// import type { Metadata } from "next";
import { Metadata } from "@/components/ui/Metadata";

export const metadata = {
  title: "About | wAcii",
  description: "Learn more about wAcii — a passionate software engineer with expertise in React Native, Flutter, React, Unity, and more. 15+ shipped products across mobile, web, and games.",
  openGraph: {
    title: "About | wAcii",
    description: "Learn more about wAcii — a passionate software engineer with expertise in React Native, Flutter, React, Unity, and more. 15+ shipped products across mobile, web, and games.",
    url: "https://wachiii-dev0.web.app/about",
  },
  twitter: {
    title: "About | wAcii",
    description: "Learn more about wAcii — a passionate software engineer with expertise in React Native, Flutter, React, Unity, and more. 15+ shipped products across mobile, web, and games.",
  },
  images: [
    {
     url: 'https://firebasestorage.googleapis.com/v0/b/wachiii-dev0.appspot.com/o/imagesCollection%2Fabout-cover_Artwork.png?alt=media&token=debed1af-8878-41ae-bf1f-49cf789f8c4e'
  }
]
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
          <head>
            <Metadata description={metadata.description} title={metadata.title} imageURL={metadata.images[0].url} />
          </head>
          <body className="noise">
            <main>{children}</main>
          </body>
        </html>
  );
}
