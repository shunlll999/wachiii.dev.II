import { useEffect, useState } from "react"
import { getPortfoliosCollection, deletePortfolioById, getPortfoliosCollectionByID, addProject, updateProjectById } from '@/services/firebaseCollection'
import { Portfolio, Project } from "@/types";

export const useProducts = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const fetchPortfolios = async () => {
    const data = await getPortfoliosCollection();
    setPortfolios(data as Portfolio[]);
  };

  const createPortfolio = async (data: Omit<Project, 'id'>) => {
    await addProject(data);
    fetchPortfolios();
  };

  const updatePortfolio = async (id: string, data: Partial<Omit<Project, 'id'>>) => {
    await updateProjectById(id, data);
    fetchPortfolios();
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

  return { portfolios, portfolio, deletePortfolio, getPortfolioById, createPortfolio, updatePortfolio };
}
