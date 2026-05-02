import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "wAcii — Senior Software Engineer",
  description: "Senior Software Engineer specializing in React, React Native, Flutter & Mobile. 15+ years building high-impact products.",
  openGraph: {
    title: "wAcii — Senior Software Engineer",
    description: "Senior Software Engineer specializing in React, React Native, Flutter & Mobile. 15+ years building high-impact products.",
    url: "https://wachiii-dev0.web.app",
  },
  twitter: {
    title: "wAcii — Senior Software Engineer",
    description: "Senior Software Engineer specializing in React, React Native, Flutter & Mobile. 15+ years building high-impact products.",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ProductsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
