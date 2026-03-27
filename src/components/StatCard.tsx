import React from 'react'

interface StatCardProps {
  label: string
  value: string
  change: string
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple' | 'orange'
}

const COLOR_CLASSES = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
}

const CHANGE_COLOR = {
  '+': 'text-green-600',
  '-': 'text-red-600',
}

/**
 * StatCard Component - Reusable stat display card
 * Props:
 * - label: Card title
 * - value: Main value to display
 * - change: Percentage change indicator
 * - icon: Icon component
 * - color: Color theme (blue, green, purple, orange)
 */
export function StatCard({ label, value, change, icon, color }: StatCardProps) {
  const changeType = change.startsWith('+') ? '+' : '-'

  return (
    <div className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg">
      {/* Icon */}
      <div className={`mb-4 inline-flex rounded-lg p-3 ${COLOR_CLASSES[color]}`}>
        {icon}
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-slate-600">{label}</p>

      {/* Value */}
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>

      {/* Change */}
      <p className={`mt-2 text-sm font-semibold ${CHANGE_COLOR[changeType]}`}>
        {change} from last month
      </p>
    </div>
  )
}
