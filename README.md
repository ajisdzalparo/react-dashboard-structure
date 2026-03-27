# Dashboard Application - React + Next.js + Tailwind CSS

Modern dashboard dengan clean architecture, responsive design, dan best practices industri.

## 📁 Struktur Folder

```
src/
├── components/        # Reusable UI Components
│   ├── Sidebar.tsx    # Sidebar menu component
│   ├── Navbar.tsx     # Top navigation bar
│   └── StatCard.tsx   # Reusable stat card
├── contexts/          # React Context untuk state management
│   └── SidebarContext.tsx
├── hooks/             # Custom React Hooks
│   └── useSidebar.ts
├── layouts/           # Layout wrappers
│   └── MainLayout.tsx # Main app layout
├── pages/             # Page components
│   └── Dashboard.tsx
├── styles/            # Global CSS
│   └── globals.css
└── utils/             # Utility functions
    └── cn.ts
```

## ✨ Fitur Utama

### 1. **Sidebar Responsive**
- ✅ Collapse/expand functionality
- ✅ Auto-collapse di mobile
- ✅ Active navigation state
- ✅ Badge support
- ✅ User profile footer

### 2. **Layout System**
- ✅ Sticky navbar
- ✅ Responsive grid
- ✅ Clean content area
- ✅ Proper spacing & padding

### 3. **Components Reusable**
- ✅ StatCard dengan color variants
- ✅ Navigation items
- ✅ Responsive design

### 4. **State Management**
- ✅ Context API untuk sidebar state
- ✅ Custom hooks untuk akses context
- ✅ Error boundary untuk development

## 🚀 Quick Start

### 1. Installation

```bash
# Install dependencies
npm install
# atau
pnpm install
```

### 2. Development

```bash
npm run dev
# Server berjalan di http://localhost:3000
```

### 3. Build Production

```bash
npm run build
npm start
```

## 📝 Cara Menggunakan Component

### MainLayout - Wrapper untuk seluruh app

```tsx
import { MainLayout } from '@/layouts/MainLayout'

export default function Page() {
  return (
    <MainLayout>
      <h1>Your content here</h1>
    </MainLayout>
  )
}
```

### Mengakses Sidebar State

```tsx
import { useSidebar } from '@/hooks/useSidebar'

export function MyComponent() {
  const { isOpen, toggle, close, open } = useSidebar()

  return (
    <button onClick={toggle}>
      {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
    </button>
  )
}
```

### StatCard Component

```tsx
import { StatCard } from '@/components/StatCard'
import { Users } from 'lucide-react'

<StatCard
  label="Total Users"
  value="12,543"
  change="+12.5%"
  icon={<Users size={24} />}
  color="blue"
/>
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f97316)
- **Error**: Red (#ef4444)
- **Neutral**: Slate (50-950)

### Typography
- **Font**: System UI (SF Pro Display, Segoe UI)
- **Heading**: Bold, 3xl - 2xl
- **Body**: Regular, sm - base

### Spacing
- Menggunakan Tailwind spacing scale
- Primary gap: 4 (1rem)
- Padding content: 6-8 (1.5-2rem)

## 🔧 Best Practices Implemented

### 1. **Component Architecture**
- Functional components only
- Single responsibility principle
- Props destructuring
- TypeScript strict mode

### 2. **State Management**
- Context API untuk global state
- Custom hooks untuk abstraction
- No prop drilling

### 3. **Performance**
- Code splitting
- Lazy loading ready
- Optimized re-renders
- Memoization where needed

### 4. **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

### 5. **Code Quality**
- TypeScript strict mode
- Proper error handling
- Consistent naming conventions
- Clear documentation

## 📦 Dependencies

- **React 18**: UI library
- **Next.js 14**: Framework
- **Tailwind CSS 3**: Styling
- **Lucide Icons**: Icon library
- **TypeScript**: Type safety

## 🛠️ Development Tools

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build & start
npm run build
npm start
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Layout otomatis menyesuaikan menggunakan Tailwind responsive prefixes (sm:, md:, lg:, xl:)

## 🎯 Next Steps

1. Tambahkan lebih banyak pages
2. Integrasikan dengan API backend
3. Tambahkan authentication
4. Implementasikan data fetching
5. Setup CI/CD pipeline

## 📚 Dokumentasi Tambahan

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Next.js Docs](https://nextjs.org)
- [React Docs](https://react.dev)
- [Lucide Icons](https://lucide.dev)

---

**Created with ❤️ using React + Next.js + Tailwind CSS**
