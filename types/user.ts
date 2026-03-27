/**
 * User Module Types
 * Untuk user management dan profile
 */

import type { User } from './auth'

export interface UserProfile extends User {
  bio?: string
  phone?: string
  location?: string
  website?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export interface UserListItem {
  id: string
  email: string
  name: string
  role: string
  status: 'active' | 'inactive' | 'banned'
  lastLogin?: Date
}

export interface UserUpdateRequest {
  name?: string
  email?: string
  bio?: string
  phone?: string
  location?: string
}

export interface UsersQueryParams {
  page?: number
  limit?: number
  search?: string
  role?: string
  status?: 'active' | 'inactive' | 'banned'
  sortBy?: 'name' | 'createdAt' | 'lastLogin'
  sortOrder?: 'asc' | 'desc'
}

export interface UserStats {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  newUsersThisMonth: number
}
