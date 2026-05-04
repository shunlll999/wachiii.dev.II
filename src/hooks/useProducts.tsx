import { useEffect, useState } from "react"
import { getPortfoliosCollection, deletePortfolioById, getPortfoliosCollectionByID } from '@/services/firebaseCollection'
import { Portfolio } from "@/types";

export const useProducts = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const fetchPortfolios = async () => {
    const data = await getPortfoliosCollection();
    setPortfolios(data as Portfolio[]);
  };

  const deletePortfolio = async (id: string) => {
    await deletePortfolioById(id);
    setPortfolios((prev) => prev.filter((p) => p.id !== id));
  };

  const getPortfolioById = async (id: string) => {
    const data = await getPortfoliosCollectionByID(id);
    setPortfolio(data as unknown as Portfolio);
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return { portfolios, portfolio, deletePortfolio, getPortfolioById };
}
