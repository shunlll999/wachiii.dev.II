'use client'

import PortfolioDetail from '@/components/ui/PortfolioDetail'
import { useProducts } from '@/hooks/useProducts'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

const Page = () => {
  const { id } = useParams()
  const { portfolio, getPortfolioById } = useProducts();

  const getPortfolio = async (id: string) => {
    await getPortfolioById(id);
  };

  useEffect(() => {
    getPortfolio(id as string);
  }, [id])
  console.log(portfolio)

  if (!portfolio) return null;

  return (
    <PortfolioDetail portfolio={portfolio} />
  )
}

export default Page
