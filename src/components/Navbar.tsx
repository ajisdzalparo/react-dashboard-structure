'use client'

import React from 'react'
import { useSidebar } from '@/hooks/useSidebar'
import { Bell, Menu, LogOut } from 'lucide-react'

export function Navbar() {
  const { toggle } = useSidebar()

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <button
          onClick={toggle}
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-slate-700" />
        </button>

        {/* Center/Right Section */}
        <div className="ml-auto flex items-center gap-4">
          {/* Notifications */}
          <button className="relative rounded-lg p-2 hover:bg-slate-100">
            <Bell size={20} className="text-slate-700" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200" />

          {/* Logout */}
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
