import { useEffect, useState } from "react"
import { getPortfoliosCollection, deletePortfolioById, getPortfoliosCollectionByID, addProject, updateProjectById, getPortfoliosCollectionBySlug } from '@/services/firebaseCollection'
import { Portfolio, Project } from "@/types";

export const useProducts = () => {
  const [portfolios, setPortfolios] = useState<Project[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | Project | null>(null);

  const fetchPortfolios = async () => {
    const data = await getPortfoliosCollection();
    setPortfolios(data as Project[]);
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
    if (data !== null) {
      setPortfolio(data as unknown as Portfolio | Project);
    }
  };

  const getPortfolioBySlug = async (slug: string) => {
    const data = await getPortfoliosCollectionBySlug(slug);
    if (data !== null) {
      setPortfolio(data as unknown as Portfolio | Project);
    }
  };


  useEffect(() => {
    fetchPortfolios();
  }, []);

  return { portfolios, portfolio, deletePortfolio, getPortfolioById, getPortfolioBySlug, createPortfolio, updatePortfolio };
}
