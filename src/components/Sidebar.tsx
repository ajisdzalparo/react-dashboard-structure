'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/hooks/useSidebar'
import {
  BarChart3,
  Users,
  Settings,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <BarChart3 size={20} />,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: <Users size={20} />,
    badge: 'New',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings size={20} />,
  },
]

export function Sidebar() {
  const { isOpen, toggle, close } = useSidebar()
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform overflow-y-auto bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <BarChart3 size={18} />
            </div>
            <span className="text-lg font-bold">Dashboard</span>
          </div>
          <button
            onClick={toggle}
            className="rounded-lg p-1 hover:bg-slate-800 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-4 py-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-200 ${
                    isActive(item.href) ? 'translate-x-1' : '-translate-x-1 opacity-0 group-hover:opacity-100'
                  }`}
                />
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 px-4 py-4">
          <div className="flex items-center gap-3 rounded-lg bg-slate-800/50 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">John Doe</p>
              <p className="truncate text-xs text-slate-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
