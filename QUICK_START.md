# 🚀 Quick Start Dashboard

Panduan cepat untuk memulai menggunakan dashboard template ini.

## ⚡ 5 Menit Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
```

### 3. Open Browser
```
http://localhost:3000
```

**Done! 🎉 Dashboard sudah berjalan!**

---

## 📱 What's Included?

✅ **3 Pages Siap Pakai:**
- Dashboard - Main overview page
- Users - User management table
- Settings - Settings configuration

✅ **Responsive Layout:**
- Sidebar yang bisa collapse di mobile
- Navbar dengan action buttons
- Responsive grid & tables

✅ **Reusable Components:**
- Sidebar navigation
- StatCard untuk metrics
- Navigation bar

✅ **Clean Architecture:**
- Context API untuk state management
- Custom hooks
- TypeScript strict mode
- Tailwind CSS v4

---

## 🎯 Next: Customize untuk Proyek Anda

### A. Ubah Sidebar Menu Items
File: `src/components/Sidebar.tsx`

```tsx
const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <BarChart3 size={20} />,
  },
  // Tambah menu items di sini
  {
    label: 'Reports',
    href: '/dashboard/reports',
    icon: <FileText size={20} />,
  },
]
```

### B. Ubah Colors & Theme
File: `tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',    // Ganti warna primary
      secondary: '#10b981',   // Ganti warna secondary
    },
  },
}
```

### C. Tambah Halaman Baru
```bash
# 1. Create folder
mkdir -p app/dashboard/reports

# 2. Create file
touch app/dashboard/reports/page.tsx

# 3. Copy paste struktur dari dashboard/page.tsx
# 4. Customize sesuai kebutuhan
```

---

## 📚 File & Folder Penting

```
src/
├── components/
│   ├── Sidebar.tsx      👈 Menu navigation
│   ├── Navbar.tsx       👈 Top bar
│   └── StatCard.tsx     👈 Stat metrics
│
├── contexts/
│   └── SidebarContext.tsx  👈 Sidebar state
│
├── hooks/
│   └── useSidebar.ts       👈 Access sidebar state
│
└── styles/
    └── globals.css         👈 Global styles

app/
├── layout.tsx           👈 Root layout
├── page.tsx             👈 Home (redirects to /dashboard)
└── dashboard/
    ├── page.tsx         👈 Dashboard page
    ├── users/page.tsx   👈 Users page
    └── settings/page.tsx 👈 Settings page
```

---

## 💡 Contoh: Membuat StatCard Baru

```tsx
import { StatCard } from '@/components/StatCard'
import { ShoppingCart } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        label="Total Orders"
        value="1,234"
        change="+15.3%"
        icon={<ShoppingCart size={24} />}
        color="blue"
      />
    </div>
  )
}
```

---

## 🔗 Useful Links

- [Lucide Icons](https://lucide.dev) - 4000+ icons
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors) - Color customization
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [React Docs](https://react.dev) - React documentation

---

## ❓ FAQ

**Q: How do I use the sidebar state?**
```tsx
'use client'
import { useSidebar } from '@/hooks/useSidebar'

export function MyComponent() {
  const { isOpen, toggle } = useSidebar()
  return <button onClick={toggle}>Toggle</button>
}
```

**Q: How do I add a new navigation item?**
Edit `src/components/Sidebar.tsx` dan tambah ke `NAV_ITEMS` array.

**Q: How do I customize colors?**
Edit `tailwind.config.js` di theme section.

**Q: Apa bedanya dengan MainLayout?**
MainLayout adalah legacy pattern. Gunakan struktur app directory (pages di app/) yang sudah modern.

---

## 🚀 Deploy ke Vercel

```bash
# 1. Push ke GitHub
git push origin main

# 2. Go to vercel.com
# 3. Click "New Project"
# 4. Import dari GitHub repository
# 5. Deploy!
```

---

**Happy coding! 🎉**

Pertanyaan? Lihat `IMPLEMENTATION_GUIDE.md` untuk dokumentasi lengkap.
