'use client';
import PortfolioSection from "@/components/sections/PortfolioSection";
import { useProducts } from "@/hooks/useProducts";

const PortfolioSectionView = () => {
  const { portfolios } = useProducts(); // Fetch projects data using a custom hook or any data fetching method

  return (
    <PortfolioSection featuredProjects={portfolios} />
  )
}

export default PortfolioSectionView;
