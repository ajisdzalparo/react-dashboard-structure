/**
 * Dashboard Module Types
 * Widget, chart, analytics related types
 */

export interface DashboardMetric {
  id: string
  label: string
  value: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: string
}

export interface ChartDataPoint {
  name: string
  value: number
  date: Date
}

export interface DashboardStats {
  metrics: DashboardMetric[]
  chartData: ChartDataPoint[]
  recentActivities: Activity[]
}

export interface Activity {
  id: string
  type: 'login' | 'update' | 'create' | 'delete'
  description: string
  timestamp: Date
  userId: string
  userName: string
}

export interface AnalyticsData {
  period: 'day' | 'week' | 'month' | 'year'
  startDate: Date
  endDate: Date
  data: AnalyticsPoint[]
  summary: {
    total: number
    average: number
    highest: number
    lowest: number
  }
}

export interface AnalyticsPoint {
  timestamp: Date
  views: number
  clicks: number
  conversions: number
  revenue: number
}

export interface Widget {
  id: string
  type: 'metric' | 'chart' | 'table' | 'list'
  title: string
  position: number
  size: 'small' | 'medium' | 'large'
  data: unknown
}
