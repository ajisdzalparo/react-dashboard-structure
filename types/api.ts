/**
 * API Response Types
 * Standardized API response interfaces
 */

/**
 * Standard API Response Wrapper
 * Semua API response menggunakan format ini
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
  timestamp: string
}

/**
 * Paginated Response
 * Untuk endpoints yang mengembalikan list data
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

/**
 * API Error
 * Standardized error response
 */
export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  timestamp: string
}

/**
 * Request Config
 * Untuk customizable request options
 */
export interface RequestConfig {
  headers?: Record<string, string>
  timeout?: number
  retry?: boolean
  retryCount?: number
  cache?: boolean
  cacheDuration?: number
}

/**
 * Fetch State
 * Hook state untuk data fetching
 */
export interface FetchState<T> {
  data: T | null
  isLoading: boolean
  error: ApiError | null
  isSuccess: boolean
  refetch: () => Promise<void>
}

/**
 * Upload Progress
 * Untuk file upload tracking
 */
export interface UploadProgress {
  progress: number
  loaded: number
  total: number
}
