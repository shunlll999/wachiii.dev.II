import React from 'react'
import {
  IconGrid, IconChart, IconStar,
  IconUser, IconCard, IconSettings,
  IconPortfolio,
} from './Icons'

interface SidebarProps {
  collapsed: boolean
  activeItem: string
  onItemClick: (id: string) => void
  user?: { name: string; role: string }
}

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: number
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'main',
    items: [
      { id: 'overview', label: 'overview', icon: <IconGrid /> },
      { id: 'analytics', label: 'analytics', icon: <IconChart /> },
      { id: 'projects', label: 'projects', icon: <IconStar />, badge: 3 },
      { id: 'portfolios', label: 'portfolios', icon: <IconPortfolio /> },
    ],
  },
  {
    label: 'manage',
    items: [
      { id: 'users', label: 'users', icon: <IconUser /> },
      { id: 'billing', label: 'billing', icon: <IconCard /> },
      { id: 'settings', label: 'settings', icon: <IconSettings /> },
    ],
  },
]

const SIDEBAR_W = 220
const SIDEBAR_COLLAPSED_W = 56
const TOP_H = 52

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  activeItem,
  onItemClick,
  user = { name: 'wachiii', role: 'developer' },
}) => {

  return (
    <div
      style={{
        width: collapsed ? SIDEBAR_COLLAPSED_W : SIDEBAR_W,
        minHeight: '100vh',
        background: '#ffffff',
        borderRight: '1px solid #e2e4e9',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s cubic-bezier(.4,0,.2,1)',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: TOP_H,
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          borderBottom: '1px solid #e2e4e9',
          gap: 10,
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src="https://wachiii-dev0.web.app/images/logo/wachiii.png"
          alt="wachiii"
          style={{
            width: 26,
            height: 26,
            objectFit: 'contain',
            filter: 'invert(1)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em',
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.2s',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          wachiii
        </span>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: '10px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflow: 'hidden',
        }}
      >
        {NAV_GROUPS.map((group) => (
          <React.Fragment key={group.label}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: '#9ca3af',
                letterSpacing: '0.06em',
                padding: '8px 8px 4px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                opacity: collapsed ? 0 : 1,
                transition: 'opacity 0.15s',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {group.label}
            </div>

            {group.items.map((item) => {
              const isActive = activeItem === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onItemClick(item.id)}
                  title={collapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '7px 8px',
                    borderRadius: 7,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    fontSize: 13,
                    color: isActive ? '#2563eb' : '#6b7280',
                    background: isActive ? '#eff4ff' : 'transparent',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = '#f0f2f5'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent'
                    }
                  }}
                >
                  <span style={{ opacity: isActive ? 1 : 0.6, flexShrink: 0, display: 'flex' }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      opacity: collapsed ? 0 : 1,
                      transition: 'opacity 0.2s',
                      flex: 1,
                    }}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        fontSize: 10,
                        fontFamily: "'DM Mono', monospace",
                        padding: '1px 6px',
                        borderRadius: 20,
                        opacity: collapsed ? 0 : 1,
                        transition: 'opacity 0.2s',
                        marginLeft: 'auto',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </React.Fragment>
        ))}
      </nav>

      {/* User */}
      <div
        style={{
          padding: '10px 8px',
          borderTop: '1px solid #e2e4e9',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: '7px 8px',
            borderRadius: 7,
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 500,
              color: '#2563eb',
              flexShrink: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {user.name[0].toUpperCase()}
          </div>
          <div
            style={{
              overflow: 'hidden',
              opacity: collapsed ? 0 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                fontFamily: "'DM Sans', sans-serif",
                color: '#1a1d23',
              }}
            >
              {user.name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#9ca3af',
                whiteSpace: 'nowrap',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {user.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
