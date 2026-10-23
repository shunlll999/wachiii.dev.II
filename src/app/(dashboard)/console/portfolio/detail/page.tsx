'use client'

import PortfolioDetail from '@/components/ui/PortfolioDetail'
import { useDocuments } from '@/hooks/useDocuments'
import { useProducts } from '@/hooks/useProducts'
import { Project } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const emptyProject: Project = {
  id: '', slug: '', title: '', category: '', tags: [], tagColor: 'orange', description: '', longDescription: '',
  impact: [], challenge: '', solution: '', year: '', color: '#8fb0d9', gradient: '', featured: true, isMigrated: true,
}

const PortfolioDetailClient = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pid = params.get('pid')
  const isNew = pid === 'new'
  const { portfolio, getPortfolioById, createPortfolio, updatePortfolio } = useProducts();
  const { tags, impacts, medias } = useDocuments();

  const onAddProjectHandler = (project: Omit<Project, 'id'>) => {
    const mapData = {...project, isMigrated: true};
    createPortfolio(mapData).then(() => router.push('/console/projects'));
  }

  const onUpdateProjectHandler = (id: string, project: Omit<Project, 'id'>) => {
    const mapData = {...project, isMigrated: true};
    updatePortfolio(id, mapData);
  }


  useEffect(() => {
    if (pid && !isNew) getPortfolioById(pid)
  }, [pid])

  if (isNew) {
    return <PortfolioDetail portfolio={emptyProject} tags={tags} impacts={impacts} medias={medias || []} onAddProject={(_, project) => onAddProjectHandler(project)} />
  }

  if (!portfolio) return null

  return <PortfolioDetail portfolio={portfolio} tags={tags} impacts={impacts} medias={medias || []} onAddProject={onUpdateProjectHandler} />
}

export default PortfolioDetailClient
