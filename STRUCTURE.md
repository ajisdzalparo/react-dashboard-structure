# Struktur Project Dashboard - Clean Architecture

## 📁 Hierarki Folder Lengkap

```
src/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   └── (dashboard)/             # Dashboard routes group
│       ├── layout.tsx           # Dashboard layout wrapper
│       ├── page.tsx             # Dashboard main page
│       ├── profile/
│       │   └── page.tsx         # Profile page
│       ├── settings/
│       │   └── page.tsx         # Settings page
│       └── analytics/
│           └── page.tsx         # Analytics page
│
├── components/                   # Reusable UI Components
│   ├── ui/                      # Shadcn/UI components (auto-generated)
│   ├── common/                  # Shared components across app
│   │   ├── Header.tsx           # Header component
│   │   ├── Sidebar.tsx          # Sidebar navigation
│   │   ├── Footer.tsx           # Footer component
│   │   ├── LoadingSpinner.tsx   # Loading state
│   │   └── ErrorBoundary.tsx    # Error handling
│   ├── layout/                  # Layout components
│   │   ├── DashboardLayout.tsx  # Dashboard wrapper
│   │   ├── AuthLayout.tsx       # Auth page wrapper
│   │   └── ContentLayout.tsx    # Content area wrapper
│   └── dashboard/               # Dashboard-specific components
│       ├── widgets/
│       │   ├── StatCard.tsx
│       │   ├── ChartWidget.tsx
│       │   └── ListWidget.tsx
│       ├── forms/
│       │   ├── ProfileForm.tsx
│       │   └── SettingsForm.tsx
│       └── tables/
│           └── DataTable.tsx
│
├── hooks/                        # Custom React Hooks
│   ├── use-mobile.tsx           # Responsive hook
│   ├── use-toast.ts             # Toast notification
│   ├── useAuth.ts               # Authentication logic
│   ├── useFetch.ts              # Data fetching hook
│   ├── useLocalStorage.ts       # Local storage management
│   └── useDebounce.ts           # Debounce utility hook
│
├── services/                     # API & Business Logic
│   ├── api/
│   │   ├── client.ts            # Axios/fetch instance
│   │   ├── auth.ts              # Auth endpoints
│   │   ├── users.ts             # User endpoints
│   │   ├── dashboard.ts         # Dashboard endpoints
│   │   └── analytics.ts         # Analytics endpoints
│   ├── storage/
│   │   ├── localStorage.ts      # Local storage service
│   │   └── sessionStorage.ts    # Session storage service
│   └── cache/
│       └── queryClient.ts       # React Query config
│
├── utils/                        # Utility Functions
│   ├── formatters.ts            # Format date, currency, etc
│   ├── validators.ts            # Input validation
│   ├── constants.ts             # App constants
│   ├── helpers.ts               # General helpers
│   ├── cn.ts                    # Class name utility
│   └── errors.ts                # Error handling
│
├── types/                        # TypeScript Types & Interfaces
│   ├── index.ts                 # Export all types
│   ├── auth.ts                  # Auth types
│   ├── user.ts                  # User types
│   ├── dashboard.ts             # Dashboard types
│   └── api.ts                   # API response types
│
├── store/                        # State Management (Optional)
│   ├── authStore.ts             # Auth state (Zustand/Context)
│   ├── userStore.ts             # User state
│   └── uiStore.ts               # UI state (theme, sidebar, etc)
│
├── styles/                       # Global styles
│   ├── variables.css            # CSS variables
│   ├── animations.css           # Keyframe animations
│   └── typography.css           # Font definitions
│
├── config/                       # Configuration files
│   ├── env.ts                   # Environment variables
│   ├── routes.ts                # Route definitions
│   └── theme.ts                 # Theme configuration
│
├── middleware/                   # Express-like middleware
│   └── auth.ts                  # Auth middleware
│
└── constants/                    # Hardcoded constants
    ├── navigation.ts            # Navigation menu items
    ├── messages.ts              # UI messages
    └── apiEndpoints.ts          # API endpoints
```

---

## 📋 Penjelasan Setiap Folder

### 1. **`app/`** - Next.js App Router
- Struktur routing berbasis file
- Layout nesting untuk organized hierarchy
- Menggunakan `(groups)` untuk logical grouping tanpa path
- Separasi layout untuk dashboard dan auth pages

**Best Practice:**
- Minimal logic, sebagian besar ke components
- Layout bersarang untuk reusable wrappers

---

### 2. **`components/`** - Reusable UI Components
Dibagi berdasarkan scope dan penggunaan:

#### a. `ui/` - Design System
- Generated oleh shadcn/ui CLI
- Komponen atomic (Button, Input, Card, dll)
- Fully customizable dan accessible

#### b. `common/` - Shared Components
- Digunakan di multiple pages
- Header, Sidebar, Footer, Loading, Error states
- Independently testable

#### c. `layout/` - Layout Wrappers
- DashboardLayout: Sidebar + Header + Content
- AuthLayout: Centered form layout
- ContentLayout: Padding, max-width management

#### d. `dashboard/` - Feature-Specific Components
- Widgets: Statistik, charts, lists
- Forms: Input forms dengan validation
- Tables: Data tables dengan sorting, pagination

**Best Practice:**
- 1 komponen = 1 file
- Props clearly typed dengan TypeScript
- No hardcoded strings (gunakan constants)

---

### 3. **`hooks/`** - Custom React Hooks
Reusable logic yang independent:

```typescript
// useAuth.ts - Authentication logic
export const useAuth = () => { /* ... */ }

// useFetch.ts - Data fetching dengan loading, error states
export const useFetch = (url) => { /* ... */ }

// useLocalStorage.ts - Safe local storage access
export const useLocalStorage = (key, initialValue) => { /* ... */ }
```

**Best Practice:**
- Logic terpisah dari component UI
- Mudah untuk testing dan reusability
- Consistent hook naming (use prefix)

---

### 4. **`services/`** - API & Business Logic

#### a. `api/` - HTTP Client
```typescript
// client.ts - Axios instance dengan interceptor
// auth.ts - export const loginUser = (credentials) => api.post('/auth/login')
// users.ts - export const getUsers = () => api.get('/users')
```

#### b. `storage/` - Client Storage
- Wrapper untuk localStorage/sessionStorage
- Safe access dengan error handling

#### c. `cache/` - Query Client
- React Query configuration
- Cache invalidation rules

**Best Practice:**
- Centralized API calls
- Single point untuk auth/error handling
- Versioning untuk API endpoints

---

### 5. **`utils/`** - Pure Utility Functions

```typescript
// formatters.ts
export const formatCurrency = (amount) => { /* ... */ }
export const formatDate = (date) => { /* ... */ }

// validators.ts
export const validateEmail = (email) => { /* ... */ }

// helpers.ts
export const debounce = (fn, delay) => { /* ... */ }
```

**Best Practice:**
- Pure functions (no side effects)
- Comprehensive test coverage
- Single Responsibility Principle

---

### 6. **`types/`** - TypeScript Interfaces & Types

```typescript
// auth.ts
export interface User {
  id: string
  email: string
  name: string
}

export interface LoginRequest {
  email: string
  password: string
}

// Centralized type definitions
```

**Best Practice:**
- Satu file = satu domain (auth, user, dashboard)
- Export dari index.ts untuk clean imports
- Consistency dalam naming conventions

---

### 7. **`store/`** - State Management (Opsional)

```typescript
// authStore.ts (Zustand)
export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}))
```

**Best Practice:**
- Minimal state, bukan untuk setiap data
- Hanya untuk global state (auth, theme, UI)
- Separasi per domain (auth, user, ui)

---

### 8. **`styles/`** - Global CSS

```css
/* variables.css - CSS variables untuk theme */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #1f2937;
}

/* animations.css - Reusable animations */
@keyframes slideIn { /* ... */ }
```

**Best Practice:**
- Tailwind untuk styling utama
- CSS variables untuk dynamic theming
- Minimal custom CSS (80% Tailwind)

---

### 9. **`config/`** - Configuration

```typescript
// routes.ts
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile'
}

// env.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL
```

**Best Practice:**
- Single source of truth untuk constant values
- Environment variables yang aman
- Type-safe config objects

---

### 10. **`middleware/`** - Express-like Middleware

```typescript
// auth.ts
export const withAuth = (handler) => {
  return async (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    return handler(req, res)
  }
}
```

---

### 11. **`constants/`** - Hardcoded Values

```typescript
// navigation.ts
export const NAVIGATION_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Profile', href: '/dashboard/profile' }
]

// messages.ts
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Connection failed. Please try again.',
  INVALID_EMAIL: 'Invalid email format'
}
```

---

## 🎯 Best Practices Implementasi

### 1. **Import Organization**
```typescript
// Standard library
import React, { useState } from 'react'

// External libraries
import { useQuery } from '@tanstack/react-query'

// Internal absolute imports
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { formatCurrency } from '@/utils/formatters'

// Relative imports (jarang digunakan)
```

### 2. **File Naming**
```
✅ PascalCase - Components (UserProfile.tsx)
✅ camelCase - Hooks, utilities (useFetch.ts, formatDate.ts)
✅ kebab-case - Folders (components/common)
❌ index.ts - Hindari, gunakan named exports
```

### 3. **Component Structure**
```typescript
// hooks dan imports di atas
import { useState } from 'react'
import type { UserProps } from '@/types'

// interface definitions
interface Props {
  userId: string
}

// component
export const UserCard: React.FC<Props> = ({ userId }) => {
  const [state, setState] = useState()
  
  return <div>...</div>
}
```

### 4. **Error Handling Pattern**
```typescript
try {
  const data = await fetchData()
} catch (error) {
  const message = error instanceof CustomError 
    ? error.message 
    : 'Something went wrong'
  logger.error(message)
}
```

### 5. **Testing Structure**
```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
├── utils/
│   ├── formatters.ts
│   └── __tests__/
│       └── formatters.test.ts
```

---

## 🔄 Data Flow

```
Page Component
    ↓
├→ Custom Hooks (useAuth, useFetch)
│   ↓
│   └→ Services (API calls)
│       ↓
│       └→ Utils (formatters, validators)
│
├→ UI Components
│   ↓
│   └→ Shadcn UI
│
└→ State (Store/Context)
```

---

## ✨ Keunggulan Struktur Ini

✅ **Scalability** - Mudah menambah features  
✅ **Maintainability** - Clear separation of concerns  
✅ **Testability** - Isolated, independent modules  
✅ **Reusability** - Components & hooks bisa digunakan ulang  
✅ **Performance** - Code splitting otomatis  
✅ **Type Safety** - Full TypeScript coverage  
✅ **Clean Code** - Mudah dibaca dan dipahami team
