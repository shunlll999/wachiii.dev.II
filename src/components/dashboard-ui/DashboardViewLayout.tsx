import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { DashboardLayoutProps } from './types'
import { useRouter } from 'next/navigation'

type NavItem = {
  [K in string]: string;
};

const NAVIGATES: NavItem = {
  overview: '/console/overview', // 'Overview',
  analytics: '/console/analytics', // 'Analytics',
  settings: '/console/settings', // 'Settings',
  projects: '/console/projects', // 'Projects',
  portfolios: '/console/portfolio', // 'Portfolios',
} as const

export const DashboardViewLayout: React.FC<DashboardLayoutProps> = ({
  children,
  user = { name: 'wachiii', role: 'developer' },
  param
}) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState('overview')

  const actionNavigate = (id: string) => {
    setActiveItem(id)
    router.push(NAVIGATES[id])
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .dashboard-root {
          font-family: 'DM Sans', sans-serif;
          background: #f5f6f8;
          color: #1a1d23;
          display: flex;
          position: relative;
        }
        .dashboard-noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          opacity: 0.025;
        }
        .dashboard-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          position: relative;
          z-index: 1;
        }
        .dashboard-content {
          flex: 1;
          overflow: auto;
          height: calc(100vh - 52px);
          padding: 24px;
        }
      `}</style>

      <div className="dashboard-root">
        <div className="dashboard-noise" aria-hidden="true" />
        <Sidebar
          collapsed={collapsed}
          activeItem={activeItem}
          onItemClick={actionNavigate}
          user={user}
        />

        <div className="dashboard-main">
          <Topbar
            onToggleSidebar={() => setCollapsed((c) => !c)}
            breadcrumb={[
              { label: 'dashboard' },
              { label: activeItem, active: !param || false },
              ...(param ? [{ label: param.name, active: true }] : [])
            ]}
          />

          <main>
            <div className="dashboard-content">
            {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardViewLayout
