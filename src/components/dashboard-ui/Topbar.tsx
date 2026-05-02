import React from 'react'
import { IconBell, IconSearch, IconMenu, IconLogout } from './Icons'
import { logout } from '@/services/firebase';
import { useRouter } from 'next/navigation';

interface TopbarProps {
  onToggleSidebar: () => void
  breadcrumb?: { label: string; active?: boolean }[]
}

const TOP_H = 52

export const Topbar: React.FC<TopbarProps> = ({
  onToggleSidebar,
  breadcrumb = [{ label: 'dashboard' }, { label: 'overview', active: true }],
}) => {
  const router = useRouter()
  const [hasNotif] = React.useState(true)


  return (
    <div
      style={{
        height: TOP_H,
        background: '#ffffff',
        borderBottom: '1px solid #e2e4e9',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 12,
        flexShrink: 0,
      }}
    >
      {/* Toggle */}
      <button
        onClick={onToggleSidebar}
        style={{
          width: 30,
          height: 30,
          borderRadius: 7,
          border: '1px solid #e2e4e9',
          background: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#6b7280',
        }}
      >
        <IconMenu />
      </button>

      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          color: '#9ca3af',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {breadcrumb.map((item, i) => (
          <React.Fragment key={item.label}>
            {i > 0 && <span style={{ fontSize: 11 }}>/</span>}
            <span
              style={{
                color: item.active ? '#1a1d23' : '#9ca3af',
                fontWeight: item.active ? 500 : 400,
              }}
            >
              {item.label}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            border: '1px solid #e2e4e9',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            color: '#6b7280',
          }}
        >
          <IconBell />
          {hasNotif && (
            <span
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#2563eb',
                border: '1.5px solid white',
              }}
            />
          )}
        </button>

        <button
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            border: '1px solid #e2e4e9',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
          }}
        >
          <IconSearch />
        </button>
        <button style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            border: '1px solid #e2e4e9',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
          }} onClick={() => logout(() => router.push('/'))}><IconLogout /></button>
      </div>
    </div>
  )
}
