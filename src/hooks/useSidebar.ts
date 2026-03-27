import { useContext } from 'react'
import { SidebarContext } from '@/contexts/SidebarContext'

/**
 * Custom hook untuk mengakses Sidebar state dan functions
 * @throws Error jika digunakan di luar SidebarProvider
 */
export function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}
