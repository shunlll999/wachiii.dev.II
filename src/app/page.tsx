import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import Metadata from "@/components/ui/Metadata";

export default function Home() {
  return (
    <>
      <Metadata seoTitle="wAcii - Home" seoDescription="Senior Software Engineer specializing in React, React Native, Flutter & Mobile. 15+ years building products." />
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
