# Panduan Implementasi Dashboard

## 📋 Daftar Isi
1. [Setup Awal](#setup-awal)
2. [Struktur File](#struktur-file)
3. [Cara Menggunakan Component](#cara-menggunakan-component)
4. [Best Practices](#best-practices)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Setup Awal

### Step 1: Clone/Download Project
```bash
# Download project
git clone <repository-url>
cd dashboard-app
```

### Step 2: Install Dependencies
```bash
pnpm install
# atau npm install
```

### Step 3: Run Development Server
```bash
pnpm dev
# Server berjalan di http://localhost:3000
```

### Step 4: Build untuk Production
```bash
pnpm build
pnpm start
```

---

## 📁 Struktur File Lengkap

```
dashboard-app/
├── app/
│   ├── layout.tsx                 # Root layout dengan SidebarProvider
│   ├── page.tsx                   # Home page (redirect ke /dashboard)
│   └── dashboard/
│       ├── page.tsx               # Dashboard main page
│       ├── users/
│       │   └── page.tsx           # Users management page
│       └── settings/
│           └── page.tsx           # Settings page
│
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx            # Sidebar navigation component
│   │   ├── Navbar.tsx             # Top navigation bar
│   │   └── StatCard.tsx           # Reusable stat card component
│   │
│   ├── contexts/
│   │   └── SidebarContext.tsx      # Sidebar state management
│   │
│   ├── hooks/
│   │   └── useSidebar.ts          # Custom hook untuk sidebar
│   │
│   ├── layouts/
│   │   └── MainLayout.tsx         # Main layout wrapper (deprecated - use app layout)
│   │
│   ├── styles/
│   │   └── globals.css            # Global styles & Tailwind config
│   │
│   └── utils/
│       └── cn.ts                  # Utility function untuk class merging
│
├── public/
│   └── (static assets)
│
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── next.config.mjs                # Next.js configuration
├── package.json                   # Dependencies & scripts
├── postcss.config.js              # PostCSS configuration
└── README.md                      # Project README
```

---

## 💻 Cara Menggunakan Component

### 1. MainLayout (Legacy - Gunakan App Router Sebaliknya)

```tsx
// Deprecated - gunakan struktur app router
import { MainLayout } from '@/layouts/MainLayout'

export default function Page() {
  return (
    <MainLayout>
      <h1>Your Content</h1>
    </MainLayout>
  )
}
```

### 2. Sidebar - State Management

#### Context Provider Setup (sudah ada di app/layout.tsx)
```tsx
import { SidebarProvider } from '@/contexts/SidebarContext'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}
```

#### Mengakses Sidebar State
```tsx
'use client'

import { useSidebar } from '@/hooks/useSidebar'

export function MyComponent() {
  const { isOpen, toggle, close, open } = useSidebar()

  return (
    <>
      <button onClick={toggle}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <p>Sidebar is {isOpen ? 'open' : 'closed'}</p>
    </>
  )
}
```

### 3. StatCard - Reusable Component

```tsx
import { StatCard } from '@/components/StatCard'
import { Users } from 'lucide-react'

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Users"
        value="12,543"
        change="+12.5%"
        icon={<Users size={24} />}
        color="blue"
      />
      {/* More stat cards */}
    </div>
  )
}
```

**Props:**
- `label` (string) - Card title
- `value` (string) - Main value
- `change` (string) - Change percentage (+/-)
- `icon` (ReactNode) - Icon component
- `color` ('blue' | 'green' | 'purple' | 'orange') - Color theme

### 4. Sidebar Navigation Items

Edit `src/components/Sidebar.tsx` untuk menambah/mengubah menu items:

```tsx
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
    badge: 'New',  // Optional badge
  },
  // Add more items as needed
]
```

---

## ✅ Best Practices Implemented

### 1. Component Architecture
```tsx
// ✅ Good - Functional component dengan single responsibility
export function StatCard({ label, value, change, icon, color }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      {/* Component content */}
    </div>
  )
}

// ❌ Bad - Class component atau handling multiple concerns
```

### 2. State Management dengan Context
```tsx
// ✅ Good - Using Context API untuk global state
const { isOpen, toggle } = useSidebar()

// ❌ Bad - Prop drilling multiple levels
<Sidebar isOpen={isOpen} toggle={toggle} />
  <NavBar isOpen={isOpen} toggle={toggle} />
    <Content isOpen={isOpen} />
```

### 3. Type Safety
```tsx
// ✅ Good - Full TypeScript typing
interface StatCardProps {
  label: string
  value: string
  change: string
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple' | 'orange'
}

// ❌ Bad - Any types atau missing types
export function StatCard(props: any) {
  // ...
}
```

### 4. Responsive Design
```tsx
// ✅ Good - Mobile-first with Tailwind prefixes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Content */}
</div>

// ❌ Bad - Fixed width atau hardcoded breakpoints
<div style={{ width: '1200px' }}>
  {/* Content */}
</div>
```

### 5. Conditional Styling
```tsx
// ✅ Good - Using conditional classes
className={`px-4 py-2 rounded-lg ${
  isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'
}`}

// ❌ Bad - Inline styles untuk conditional styling
style={{
  backgroundColor: isActive ? '#2563eb' : '#f1f5f9',
  color: isActive ? '#ffffff' : '#0f172a'
}}
```

---

## 🔧 Konfigurasi

### Tailwind CSS Config
Edit `tailwind.config.js` untuk custom colors, spacing, dll:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add custom colors
        primary: '#3b82f6',
      },
      spacing: {
        // Add custom spacing
        safe: 'max(1rem, env(safe-area-inset-bottom))',
      },
    },
  },
}
```

### TypeScript Paths
Edit `tsconfig.json` untuk path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./app/*"]
    }
  }
}
```

---

## 🛠️ Menambah Halaman Baru

### Step 1: Create File
```bash
# Buat folder baru di app/
mkdir -p app/dashboard/reports

# Buat page.tsx
touch app/dashboard/reports/page.tsx
```

### Step 2: Write Component
```tsx
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'

export default function ReportsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-8">
            {/* Your content */}
          </div>
        </main>
      </div>
    </div>
  )
}
```

### Step 3: Add to Sidebar Navigation
```tsx
const NAV_ITEMS: NavItem[] = [
  // ... existing items
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: <FileText size={20} />,
  },
]
```

---

## 🎨 Styling dengan Tailwind

### Color Tokens
```tsx
// Background colors
bg-slate-50    // Lightest background
bg-slate-900   // Darkest background
bg-blue-600    // Primary color

// Text colors
text-slate-900 // Dark text
text-slate-600 // Secondary text
text-slate-400 // Tertiary text

// Interactive states
hover:bg-slate-100
focus:ring-2 focus:ring-blue-500
active:bg-slate-200
```

### Responsive Prefixes
```tsx
// Mobile first approach
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px
```

### Spacing Scale
```tsx
// Padding & Margin
p-2    // 0.5rem (8px)
p-4    // 1rem (16px)
p-6    // 1.5rem (24px)
p-8    // 2rem (32px)

// Gap (flex, grid)
gap-4  // 1rem spacing
gap-6  // 1.5rem spacing
gap-8  // 2rem spacing
```

---

## 🐛 Troubleshooting

### Sidebar tidak responsive?
**Solusi:** Pastikan SidebarProvider ada di root layout
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}
```

### 'use client' error?
**Solusi:** Tambahkan 'use client' directive di client components
```tsx
'use client'

import { useSidebar } from '@/hooks/useSidebar'

export function MyComponent() {
  // ...
}
```

### Styles tidak apply?
**Solusi:** 
1. Pastikan `src/styles/globals.css` di-import di root layout
2. Rebuild project: `pnpm build`
3. Clear cache: delete `.next` folder

### TypeScript errors?
**Solusi:**
1. Run type check: `pnpm type-check`
2. Pastikan `tsconfig.json` paths benar
3. Import types dengan benar: `import type { ... }`

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [TypeScript Docs](https://www.typescriptlang.org)

---

**Happy Coding! 🎉**
