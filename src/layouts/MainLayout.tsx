'use client'

import React from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { SidebarProvider } from '@/contexts/SidebarContext'

interface MainLayoutProps {
  children: React.ReactNode
}

/**
 * MainLayout Component
 * Struktur: Sidebar + Navbar + Content
 * Responsive: Sidebar collapse di mobile
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar />

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto">
            <div className="px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
