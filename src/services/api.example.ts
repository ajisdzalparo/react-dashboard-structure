/**
 * API Service Example
 * 
 * Contoh bagaimana cara integrate dengan backend API
 * Rename file ini ke api.ts untuk menggunakannya
 */

// Types untuk API responses
interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  joinDate: string
}

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

interface PaginatedResponse<T> {
  data: T[]
  page: number
  total: number
  pageSize: number
}

// Base URL - set via environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

/**
 * Generic fetch wrapper dengan error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if available
        // 'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    console.error(`[API] Error calling ${endpoint}:`, error)
    throw error
  }
}

/**
 * User Service
 */
export const userService = {
  /**
   * Get all users
   */
  async getUsers(page = 1, limit = 10) {
    return fetchApi<PaginatedResponse<User>>(
      `/users?page=${page}&limit=${limit}`
    )
  },

  /**
   * Get single user
   */
  async getUser(id: string) {
    return fetchApi<ApiResponse<User>>(`/users/${id}`)
  },

  /**
   * Create new user
   */
  async createUser(data: Omit<User, 'id' | 'joinDate'>) {
    return fetchApi<ApiResponse<User>>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  /**
   * Update user
   */
  async updateUser(id: string, data: Partial<User>) {
    return fetchApi<ApiResponse<User>>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },

  /**
   * Delete user
   */
  async deleteUser(id: string) {
    return fetchApi<ApiResponse<null>>(`/users/${id}`, {
      method: 'DELETE',
    })
  },
}

/**
 * Dashboard Service
 */
export const dashboardService = {
  /**
   * Get dashboard stats
   */
  async getStats() {
    return fetchApi<ApiResponse<{
      totalUsers: number
      revenue: number
      activeSessions: number
      growthRate: number
    }>>('/dashboard/stats')
  },

  /**
   * Get recent activity
   */
  async getRecentActivity(limit = 10) {
    return fetchApi<ApiResponse<Array<{
      id: string
      action: string
      timestamp: string
    }>>>(`/dashboard/activity?limit=${limit}`)
  },
}

/**
 * Auth Service
 */
export const authService = {
  /**
   * Login
   */
  async login(email: string, password: string) {
    return fetchApi<ApiResponse<{
      token: string
      user: User
    }>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  /**
   * Logout
   */
  async logout() {
    return fetchApi<ApiResponse<null>>('/auth/logout', {
      method: 'POST',
    })
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    return fetchApi<ApiResponse<User>>('/auth/me')
  },
}

// Export all services
export default {
  userService,
  dashboardService,
  authService,
}
