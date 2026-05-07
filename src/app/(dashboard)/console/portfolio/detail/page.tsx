'use client'

import PortfolioDetail from '@/components/ui/PortfolioDetail'
import { useDocuments } from '@/hooks/useDocuments'
import { useProducts } from '@/hooks/useProducts'
import { Project } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const PortfolioDetailClient = () => {
  const params = useSearchParams();
  const pid = params.get('pid')
  const { portfolio, getPortfolioById, createPortfolio, updatePortfolio } = useProducts();
  const { tags, impacts, medias } = useDocuments();

  const onAddProjectHandler = (project: Omit<Project, 'id'>) => {
    const mapData = {...project, isMigrated: true};
    createPortfolio(mapData);
  }

  const onUpdateProjectHandler = (id: string, project: Omit<Project, 'id'>) => {
    const mapData = {...project, isMigrated: true};
    updatePortfolio(id, mapData);
  }


  useEffect(() => {
    getPortfolioById(pid as string)
  }, [pid])

  if (!portfolio) return null

  return <PortfolioDetail portfolio={portfolio} tags={tags} impacts={impacts} medias={medias || []} onAddProject={onUpdateProjectHandler} />
}

export default PortfolioDetailClient
