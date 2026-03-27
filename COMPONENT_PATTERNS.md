# 🎯 Component Patterns & Best Practices

Dokumentasi lengkap mengenai pola dan best practices yang digunakan dalam project ini.

## 📐 Architecture Overview

```
┌─────────────────────────────────────┐
│         App (Root Layout)           │
│  ✓ SidebarProvider wraps children   │
└─────────────────────────────────────┘
              │
              ↓
┌─────────────────────────────────────┐
│      Pages (app/dashboard/*)        │
│  - Dashboard Page                   │
│  - Users Page                       │
│  - Settings Page                    │
└─────────────────────────────────────┘
              │
         ┌────┴────┐
         ↓         ↓
    ┌────────┐ ┌───────┐
    │Sidebar │ │Navbar │
    └────────┘ └───────┘
         │
         ↓
    ┌────────────────┐
    │ NavItems Array │
    │ - label        │
    │ - href         │
    │ - icon         │
    │ - badge?       │
    └────────────────┘
```

---

## 🔌 Component Integration Pattern

### Pattern: Layout dengan Sidebar + Navbar

**File: `app/dashboard/page.tsx`**

```tsx
export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar - Left Navigation */}
      <Sidebar />

      {/* Main Content - Right Section */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar - Top Bar */}
        <Navbar />

        {/* Content Area - Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-8">
            {/* Your page content here */}
          </div>
        </main>
      </div>
    </div>
  )
}
```

**Key Points:**
- ✅ Sidebar selalu fixed di sebelah kiri
- ✅ Main content flex-1 untuk fill remaining space
- ✅ Navbar sticky di atas content
- ✅ Content scrollable dengan overflow-y-auto
- ✅ Responsive classes handle mobile

---

## 🎨 Component Types

### 1. Page Component (RSC - React Server Component)

**Pattern:**
```tsx
// app/dashboard/reports/page.tsx
export default function ReportsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-8">
            {/* Content */}
          </div>
        </main>
      </div>
    </div>
  )
}
```

**Usage:**
- Menampilkan full layout dengan sidebar & navbar
- Bisa fetch data langsung di server
- Ideal untuk SEO

---

### 2. Client Component (dengan 'use client')

**Pattern:**
```tsx
'use client'

import { useSidebar } from '@/hooks/useSidebar'

export function MyComponent() {
  const { isOpen, toggle } = useSidebar()

  return (
    <button onClick={toggle}>
      Toggle Sidebar
    </button>
  )
}
```

**Usage:**
- Ketika perlu state/interactivity
- Ketika perlu hooks (useState, useEffect, dll)
- Ketika perlu access browser APIs

---

### 3. Reusable UI Component

**Pattern:**
```tsx
interface ComponentProps {
  label: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function MyInput({ label, value, onChange, disabled }: ComponentProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-900">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
      />
    </div>
  )
}
```

**Usage:**
- Simple, presentational components
- No complex logic
- Reusable across app
- Prop-based configuration

---

## 🔄 State Management Patterns

### Pattern 1: Context API + Custom Hook

**Setup:**
```tsx
// 1. Create Context
const MyContext = createContext<MyContextType | undefined>(undefined)

// 2. Create Provider Component
export function MyProvider({ children }) {
  const [state, setState] = useState(initialValue)
  
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  )
}

// 3. Create Custom Hook untuk Easy Access
export function useMyContext() {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be within MyProvider')
  }
  return context
}

// 4. Wrap App
export default function App() {
  return (
    <MyProvider>
      <YourApp />
    </MyProvider>
  )
}

// 5. Use dalam Components
'use client'
export function MyComponent() {
  const { state, setState } = useMyContext()
  return <div>State: {state}</div>
}
```

**Benefits:**
- ✅ No prop drilling
- ✅ Clean API
- ✅ Type-safe
- ✅ Easy to test

---

### Pattern 2: Props untuk Local State

**Usage:**
```tsx
interface Props {
  initialValue: string
  onValueChange: (value: string) => void
}

export function MyComponent({ initialValue, onValueChange }: Props) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onValueChange(newValue)
  }

  return <input value={value} onChange={(e) => handleChange(e.target.value)} />
}
```

**Benefits:**
- ✅ Component reusable
- ✅ Easy to test
- ✅ Controlled component

---

## 📱 Responsive Design Patterns

### Pattern 1: Mobile-First Grid

**❌ Bad - Desktop first:**
```tsx
<div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
```

**✅ Good - Mobile first:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* 
    - Default (mobile): 1 column
    - Medium+ (tablet): 2 columns
    - Large+ (desktop): 4 columns
  */}
</div>
```

---

### Pattern 2: Responsive Navbar

```tsx
<nav className="sticky top-0 z-20">
  <div className="flex items-center justify-between px-4 md:px-6">
    {/* Mobile: Hamburger Menu */}
    <button className="lg:hidden">
      <Menu size={20} />
    </button>

    {/* Desktop: Full Menu */}
    <div className="hidden lg:flex gap-6">
      {/* Menu items */}
    </div>

    {/* Icons - Always visible */}
    <div className="flex items-center gap-4">
      {/* Icons */}
    </div>
  </div>
</nav>
```

---

### Pattern 3: Responsive Sidebar

```tsx
<aside
  className={`fixed left-0 top-0 z-40 h-screen w-64 transform lg:relative lg:translate-x-0 ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
>
  {/* Sidebar content */}
</aside>
```

**Key:**
- `fixed` + `transform` untuk mobile animation
- `lg:relative` untuk desktop (selalu visible)
- `z-40` untuk modal, `z-30` untuk overlay

---

## 🎯 Styling Patterns

### Pattern 1: Conditional Classes

**❌ Bad:**
```tsx
const bgColor = isActive ? '#3b82f6' : '#e2e8f0'
const textColor = isActive ? '#ffffff' : '#0f172a'

<div style={{ backgroundColor: bgColor, color: textColor }}>
```

**✅ Good:**
```tsx
<div className={`px-4 py-2 rounded-lg ${
  isActive
    ? 'bg-blue-600 text-white'
    : 'bg-slate-100 text-slate-900'
}`}>
```

---

### Pattern 2: Hover/Active States

```tsx
<button
  className={`
    px-4 py-2 rounded-lg transition-all duration-200
    ${isActive
      ? 'bg-blue-600 text-white shadow-lg'
      : 'bg-white text-slate-900 hover:bg-slate-100'
    }
  `}
>
  Click me
</button>
```

---

### Pattern 3: Dark Mode (Optional)

```tsx
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  {/* Auto switches based on system preference */}
</div>
```

---

## 📊 Data Fetching Patterns

### Pattern 1: Server-Side Fetching (RSC)

```tsx
// app/dashboard/page.tsx
async function getData() {
  const response = await fetch('https://api.example.com/data')
  return response.json()
}

export default async function Page() {
  const data = await getData()

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
```

**Benefits:**
- ✅ Data fetched on server
- ✅ No loading state needed
- ✅ Better performance
- ✅ Simpler code

---

### Pattern 2: Client-Side Fetching (SWR/React Query)

```tsx
'use client'

import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export function MyComponent() {
  const { data, isLoading, error } = useSWR(
    '/api/users',
    fetcher
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

**Benefits:**
- ✅ Auto-revalidation
- ✅ Error handling
- ✅ Cache management
- ✅ Background updates

---

### Pattern 3: API Service Layer

```tsx
// src/services/userService.ts
export const userService = {
  async getUsers() {
    const response = await fetch('/api/users')
    return response.json()
  },

  async getUser(id: string) {
    const response = await fetch(`/api/users/${id}`)
    return response.json()
  },

  async createUser(data: UserData) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.json()
  },
}

// In component
'use client'
import { userService } from '@/services/userService'

export function MyComponent() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getUsers().then(setUsers)
  }, [])

  return <div>{/* ... */}</div>
}
```

**Benefits:**
- ✅ Centralized API logic
- ✅ Easy to test
- ✅ Consistent error handling
- ✅ Type-safe

---

## 🧪 Testing Patterns

### Pattern: Component Test Example

```tsx
// src/components/__tests__/StatCard.test.tsx
import { render, screen } from '@testing-library/react'
import { StatCard } from '../StatCard'
import { Users } from 'lucide-react'

describe('StatCard', () => {
  it('renders label and value', () => {
    render(
      <StatCard
        label="Total Users"
        value="1,234"
        change="+10%"
        icon={<Users />}
        color="blue"
      />
    )

    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
  })

  it('displays correct change color for positive change', () => {
    const { container } = render(
      <StatCard
        label="Total Users"
        value="1,234"
        change="+10%"
        icon={<Users />}
        color="blue"
      />
    )

    expect(screen.getByText('+10%')).toHaveClass('text-green-600')
  })
})
```

---

## 🔐 Security Patterns

### Pattern 1: Input Validation

```tsx
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setError('Invalid email format')
      return
    }

    // Proceed with login
  }

  return (
    <>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      {error && <p className="text-red-600">{error}</p>}
    </>
  )
}
```

---

### Pattern 2: Safe Type Guards

```tsx
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'email' in data &&
    'name' in data
  )
}

// Usage
async function fetchUser(id: string) {
  const response = await fetch(`/api/users/${id}`)
  const data = await response.json()

  if (!isUser(data)) {
    throw new Error('Invalid user data')
  }

  return data // TypeScript knows this is User
}
```

---

## ✨ Performance Optimization Patterns

### Pattern 1: Memoization

```tsx
import { memo } from 'react'

interface UserCardProps {
  user: User
  isSelected: boolean
  onSelect: (userId: string) => void
}

export const UserCard = memo(function UserCard({
  user,
  isSelected,
  onSelect,
}: UserCardProps) {
  return (
    <div
      className={`p-4 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-white'}`}
      onClick={() => onSelect(user.id)}
    >
      {user.name}
    </div>
  )
})
```

---

### Pattern 2: Code Splitting

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
})

export function Page() {
  return (
    <div>
      <HeavyComponent />
    </div>
  )
}
```

---

## 📋 Checklist: Sebelum Create Component Baru

```
□ Apakah component ini sudah ada?
□ Apakah nama component jelas & deskriptif?
□ Apakah semua props di-type dengan TypeScript?
□ Apakah component memiliki single responsibility?
□ Apakah component mobile-responsive?
□ Apakah component accessible (ARIA labels)?
□ Apakah ada unit tests?
□ Apakah code sudah clean & documented?
□ Apakah menggunakan consistent naming conventions?
□ Apakah performance optimal?
```

---

## 🎓 Summary

✅ **Do's:**
- Use TypeScript strictly
- Component composition over inheritance
- Props untuk configuration
- Context untuk global state
- Mobile-first responsive design
- Semantic HTML & ARIA
- Clear naming conventions
- Proper error handling

❌ **Don'ts:**
- Don't use `any` type
- Don't over-complicate components
- Don't prop drill multiple levels
- Don't hardcode values
- Don't forget mobile view
- Don't mix concerns
- Don't skip TypeScript checks
- Don't ignore performance

---

**Pertanyaan? Lihat file lain di documentation folder!**
