export interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: number
  group?: string
}

export interface DashboardLayoutProps {
  children: React.ReactNode
  user?: {
    name: string
    role: string
    avatar?: string
  }
}
