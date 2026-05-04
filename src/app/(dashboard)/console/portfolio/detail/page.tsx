'use client'

import PortfolioDetail from '@/components/ui/PortfolioDetail'
import { useDocuments } from '@/hooks/useDocuments'
import { useProducts } from '@/hooks/useProducts'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const PortfolioDetailClient = () => {
  const params = useSearchParams();
  const pid = params.get('pid')
  const { portfolio, getPortfolioById } = useProducts();
  const { tags, impacts } = useDocuments();


  useEffect(() => {
    getPortfolioById(pid as string)
  }, [pid])

  if (!portfolio) return null

  return <PortfolioDetail portfolio={portfolio} tags={tags} impacts={impacts} />
}

export default PortfolioDetailClient
