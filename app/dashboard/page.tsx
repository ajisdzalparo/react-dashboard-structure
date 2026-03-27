import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { StatCard } from '@/components/StatCard'
import { BarChart3, Users, TrendingUp, Activity } from 'lucide-react'

const STATS = [
  {
    label: 'Total Users',
    value: '12,543',
    change: '+12.5%',
    icon: <Users size={24} />,
    color: 'blue' as const,
  },
  {
    label: 'Revenue',
    value: '$45,231',
    change: '+8.2%',
    icon: <TrendingUp size={24} />,
    color: 'green' as const,
  },
  {
    label: 'Active Sessions',
    value: '3,421',
    change: '-2.1%',
    icon: <Activity size={24} />,
    color: 'purple' as const,
  },
  {
    label: 'Growth Rate',
    value: '23.5%',
    change: '+4.3%',
    icon: <BarChart3 size={24} />,
    color: 'orange' as const,
  },
]

const RECENT_ACTIVITY = [
  { id: 1, action: 'New user registered', time: '2 hours ago' },
  { id: 2, action: 'Revenue increased by $2,400', time: '4 hours ago' },
  { id: 3, action: 'System update completed', time: '6 hours ago' },
  { id: 4, action: 'New feature deployed', time: '1 day ago' },
]

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="mt-2 text-slate-600">
                Welcome back! Here&apos;s your dashboard overview.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">
                  Welcome to Your Dashboard
                </h2>
                <p className="text-slate-600">
                  This is your main dashboard page. You can customize the layout, add charts, and integrate
                  your data sources here.
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-slate-500">✓ Responsive layout</p>
                  <p className="text-sm text-slate-500">✓ Clean architecture</p>
                  <p className="text-sm text-slate-500">✓ Tailwind CSS styling</p>
                  <p className="text-sm text-slate-500">✓ Reusable components</p>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Recent Activity</h3>
                <div className="space-y-3">
                  {RECENT_ACTIVITY.map((activity) => (
                    <div key={activity.id} className="border-b border-slate-200 pb-3 last:border-b-0">
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
