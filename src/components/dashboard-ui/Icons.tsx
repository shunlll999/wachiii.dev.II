import React from 'react'

interface IconProps {
  size?: number
  stroke?: string
}

const s = (size: number, _stroke: string): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  style: { display: 'block', flexShrink: 0 },
})

export const IconGrid = ({ size = 16, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <rect x="1" y="1" width="6" height="6" rx="1.5" />
    <rect x="9" y="1" width="6" height="6" rx="1.5" />
    <rect x="1" y="9" width="6" height="6" rx="1.5" />
    <rect x="9" y="9" width="6" height="6" rx="1.5" />
  </svg>
)

export const IconChart = ({ size = 16, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <polyline points="1,11 5,6 9,9 15,3" />
  </svg>
)

export const IconStar = ({ size = 16, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <path d="M8 1l2 4 5 .7-3.5 3.4.8 5L8 12l-4.3 2.1.8-5L1 5.7 6 5z" />
  </svg>
)

export const IconUser = ({ size = 16, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <circle cx="8" cy="5" r="3" />
    <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
  </svg>
)

export const IconCard = ({ size = 16, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <rect x="1" y="3" width="14" height="10" rx="1.5" />
    <path d="M1 6h14" />
  </svg>
)

export const IconSettings = ({ size = 16, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.1 3.1l1.4 1.4M11.5 11.5l1.4 1.4M3.1 12.9l1.4-1.4M11.5 4.5l1.4-1.4" />
  </svg>
)

export const IconBell = ({ size = 14, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <path d="M8 1a5 5 0 015 5c0 3 1.5 4 1.5 4H1.5S3 9 3 6a5 5 0 015-5z" />
    <path d="M6.5 13a1.5 1.5 0 003 0" />
  </svg>
)

export const IconSearch = ({ size = 14, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <circle cx="7" cy="7" r="5" />
    <line x1="11" y1="11" x2="15" y2="15" />
  </svg>
)

export const IconMenu = ({ size = 14, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <line x1="1" y1="4" x2="15" y2="4" />
    <line x1="1" y1="8" x2="11" y2="8" />
    <line x1="1" y1="12" x2="15" y2="12" />
  </svg>
)

export const IconPortfolio = ({ size = 16, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <rect x="1" y="4" width="14" height="10" rx="1.5" />
    <path d="M5 4V3a2 2 0 014 0v1" />
    <line x1="1" y1="8" x2="15" y2="8" />
  </svg>
)

export const IconEdit = ({ size = 16, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <path d="M11 2l3 3-8 8H3v-3l8-8z" />
    <line x1="9" y1="4" x2="12" y2="7" />
  </svg>
)

export const IconDelete = ({ size = 16, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <polyline points="2,4 14,4" />
    <path d="M5 4V2h6v2" />
    <path d="M3 4l1 10a1 1 0 001 1h6a1 1 0 001-1l1-10" />
    <line x1="6" y1="7" x2="6" y2="11" />
    <line x1="10" y1="7" x2="10" y2="11" />
  </svg>
)

export const IconLogout = ({ size = 16, stroke = 'currentColor' }: IconProps) => (
  <svg {...s(size, stroke)} viewBox="0 0 16 16" fill="none" stroke={stroke} strokeWidth={1.5}>
    <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" />
    <polyline points="10,11 14,8 10,5" />
    <line x1="14" y1="8" x2="5" y2="8" />
  </svg>
)
