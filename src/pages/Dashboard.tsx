import React from 'react'
import { MainLayout } from '@/layouts/MainLayout'
import { StatCard } from '@/components/StatCard'
import { TrendingUp, Users, Settings, Activity } from 'lucide-react'

const STATS = [
  {
    label: 'Total Users',
    value: '12,543',
    change: '+12.5%',
    icon: <Users size={24} />,
    color: 'blue',
  },
  {
    label: 'Revenue',
    value: '$45,231',
    change: '+8.2%',
    icon: <TrendingUp size={24} />,
    color: 'green',
  },
  {
    label: 'Active Sessions',
    value: '3,421',
    change: '-2.1%',
    icon: <Activity size={24} />,
    color: 'purple',
  },
  {
    label: 'Settings Updated',
    value: '128',
    change: '+4.3%',
    icon: <Settings size={24} />,
    color: 'orange',
  },
]

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">Welcome back! Here&apos;s your dashboard overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Content Section */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-slate-600">Your dashboard content goes here</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
