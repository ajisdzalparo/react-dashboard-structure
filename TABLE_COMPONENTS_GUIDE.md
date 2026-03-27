# Table Components Guide

Comprehensive guide untuk menggunakan table components yang reusable dengan pagination, loading, dan empty states.

## 📦 Komponen yang Tersedia

### 1. **Table Component** (`src/components/Table/Table.tsx`)

Komponen table utama yang fully customizable dan reusable.

#### Props Interface

```typescript
interface Column<T> {
  key: keyof T;           // Key dari data object
  label: string;          // Label header
  width?: string;         // Custom width (optional)
  sortable?: boolean;     // Show sortable indicator
  render?: (value: any, row: T) => React.ReactNode;  // Custom render function
  align?: 'left' | 'center' | 'right';  // Text alignment
}

interface TableProps<T> {
  columns: Column<T>[];   // Column definitions
  data: T[];              // Data rows
  isLoading?: boolean;    // Show loading state
  isEmpty?: boolean;      // Force empty state
  emptyMessage?: string;  // Custom empty message
  rowKey: keyof T;        // Unique key for each row
  onRowClick?: (row: T) => void;  // Row click handler
  striped?: boolean;      // Alternate row colors
  hoverable?: boolean;    // Hover effect on rows
  compact?: boolean;      // Compact padding
  className?: string;     // Additional CSS classes
}
```

#### Features

- **Loading State**: Animated skeleton rows saat loading
- **Empty State**: Icon dan message saat tidak ada data
- **Custom Rendering**: Render custom content per cell
- **Responsive**: Horizontal scroll pada mobile
- **Hover Effect**: Optional hover effect pada rows
- **Striped Rows**: Optional alternating row colors
- **Row Click Handler**: Click event pada setiap row

#### Basic Usage

```typescript
import { Table, Column } from '@/components/Table';

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: 'id', label: 'ID', width: '80px' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
];

const users: User[] = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' },
];

export default function MyTable() {
  return (
    <Table
      columns={columns}
      data={users}
      rowKey="id"
      onRowClick={(row) => console.log(row)}
    />
  );
}
```

#### Advanced Usage with Custom Rendering

```typescript
const columns: Column<User>[] = [
  {
    key: 'name',
    label: 'User Name',
    render: (value, row) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-500" />
        <span className="font-semibold">{value}</span>
      </div>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    align: 'center',
    render: (value) => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    ),
  },
  {
    key: 'actions',
    label: 'Actions',
    align: 'center',
    render: (_, row) => (
      <button
        onClick={() => handleEdit(row)}
        className="text-blue-600 hover:underline"
      >
        Edit
      </button>
    ),
  },
];
```

---

### 2. **Pagination Component** (`src/components/Table/Pagination.tsx`)

Komponen pagination yang smart dengan ellipsis untuk navigasi.

#### Props Interface

```typescript
interface PaginationProps {
  currentPage: number;         // Current page number
  totalPages: number;          // Total number of pages
  onPageChange: (page: number) => void;  // Page change handler
  isLoading?: boolean;         // Disable pagination saat loading
  className?: string;          // Additional CSS classes
}
```

#### Features

- **Smart Page Numbers**: Menampilkan ellipsis (...) untuk page gap
- **Previous/Next Buttons**: Navigation buttons dengan disabled state
- **Current Page Indicator**: Visual indicator untuk halaman aktif
- **Responsive**: Menyesuaikan dengan ukuran screen
- **Loading State**: Disable semua buttons saat loading

#### Basic Usage

```typescript
import { Pagination } from '@/components/Table';
import { useState } from 'react';

export default function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
    />
  );
}
```

---

### 3. **TableContainer Component** (`src/components/Table/TableContainer.tsx`)

Wrapper component untuk styling table dengan header, footer, dan card styling.

#### Props Interface

```typescript
interface TableContainerProps {
  children: React.ReactNode;     // Table content
  title?: string;                 // Table title
  description?: string;           // Table description
  footer?: React.ReactNode;       // Footer content (biasanya pagination)
  className?: string;             // Additional CSS classes
}
```

#### Features

- **Card Styling**: Border, shadow, dan rounded corners
- **Header Section**: Title dan description
- **Footer Section**: Untuk pagination atau action buttons
- **Responsive**: Responsive padding dan styling

#### Basic Usage

```typescript
import { TableContainer, Table, Pagination } from '@/components/Table';

export default function MyTable() {
  return (
    <TableContainer
      title="Users List"
      description="Manage your users here"
      footer={
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => console.log(page)}
        />
      }
    >
      <Table
        columns={columns}
        data={data}
        rowKey="id"
      />
    </TableContainer>
  );
}
```

---

### 4. **EmptyState Component** (`src/components/Table/EmptyState.tsx`)

Komponen untuk menampilkan empty state dengan icon dan action button.

#### Props Interface

```typescript
interface EmptyStateProps {
  title: string;              // Empty state title
  description?: string;       // Optional description
  icon?: React.ReactNode;     // Custom icon
  action?: {                  // Optional action button
    label: string;
    onClick: () => void;
  };
  className?: string;         // Additional CSS classes
}
```

#### Features

- **Default Icon**: Icon bawaan jika tidak custom
- **Action Button**: Optional button untuk action
- **Responsive**: Responsive padding dan sizing
- **Accessible**: Proper semantic HTML

#### Basic Usage

```typescript
import { EmptyState } from '@/components/Table';

export default function MyComponent() {
  return (
    <EmptyState
      title="No results found"
      description="Try adjusting your filters"
      action={{
        label: 'Clear Filters',
        onClick: () => handleClearFilters(),
      }}
    />
  );
}
```

---

### 5. **useTable Hook** (`src/hooks/useTable.ts`)

Custom hook untuk mengelola pagination logic secara mudah.

#### Interface

```typescript
interface UseTableOptions<T> {
  data: T[];                // Data array
  itemsPerPage?: number;    // Items per page (default: 10)
  initialPage?: number;     // Initial page (default: 1)
}

interface UseTableReturn<T> {
  currentPage: number;      // Current page number
  totalPages: number;       // Total pages
  paginatedData: T[];       // Data for current page
  isFirstPage: boolean;     // Is on first page
  isLastPage: boolean;      // Is on last page
  goToPage: (page: number) => void;  // Go to specific page
  nextPage: () => void;     // Go to next page
  prevPage: () => void;     // Go to previous page
  totalItems: number;       // Total items count
}
```

#### Features

- **Automatic Calculation**: Auto-calculate total pages
- **Data Slicing**: Auto-slice data berdasarkan halaman
- **Helper Methods**: nextPage, prevPage, goToPage
- **Page Validation**: Auto-validate page number boundaries

#### Basic Usage

```typescript
import { useTable } from '@/hooks/useTable';

export default function MyComponent() {
  const data = [/* ... */];
  
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
  } = useTable({
    data,
    itemsPerPage: 10,
  });

  return (
    <>
      <Table data={paginatedData} columns={columns} rowKey="id" />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </>
  );
}
```

---

## 🎯 Complete Example

Berikut adalah contoh lengkap implementasi semua components:

```typescript
'use client';

import { useState } from 'react';
import {
  Table,
  Pagination,
  TableContainer,
  EmptyState,
  Column,
} from '@/components/Table';
import { useTable } from '@/hooks/useTable';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
}

const dummyProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 999, stock: 5, status: 'active' },
  { id: 2, name: 'Mouse', price: 29, stock: 50, status: 'active' },
  { id: 3, name: 'Keyboard', price: 79, stock: 0, status: 'inactive' },
  // ... more products
];

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products
  const filteredProducts = dummyProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  } = useTable({
    data: filteredProducts,
    itemsPerPage: 10,
  });

  // Column definitions
  const columns: Column<Product>[] = [
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,
    },
    {
      key: 'price',
      label: 'Price',
      align: 'right',
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: 'stock',
      label: 'Stock',
      align: 'center',
      render: (value) => (
        <span
          className={value > 0 ? 'text-green-600' : 'text-red-600'}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          goToPage(1);
        }}
        className="w-full rounded border border-slate-300 px-4 py-2"
      />

      {/* Table */}
      <TableContainer
        title="Products"
        description={`${filteredProducts.length} products found`}
        footer={
          filteredProducts.length > 0 && totalPages > 1 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              isLoading={isLoading}
            />
          ) : null
        }
      >
        {filteredProducts.length === 0 ? (
          <EmptyState
            title="No products found"
            description="Try adjusting your search criteria"
          />
        ) : (
          <Table
            columns={columns}
            data={paginatedData}
            rowKey="id"
            isLoading={isLoading}
            onRowClick={(row) => console.log('Selected:', row)}
          />
        )}
      </TableContainer>
    </div>
  );
}
```

---

## 🎨 Customization

### Custom Styling

Anda bisa override styling dengan menambahkan custom CSS atau Tailwind classes:

```typescript
<TableContainer className="shadow-lg">
  <Table
    className="border-2 border-blue-500"
    data={data}
    columns={columns}
    rowKey="id"
  />
</TableContainer>
```

### Custom Column Rendering

Untuk setiap kolom, Anda bisa mendefinisikan custom render function:

```typescript
{
  key: 'avatar',
  label: 'Avatar',
  render: (_, row) => (
    <img
      src={row.avatarUrl}
      alt={row.name}
      className="h-8 w-8 rounded-full"
    />
  ),
}
```

### Custom Empty State

Gunakan EmptyState component untuk custom empty state:

```typescript
{filteredData.length === 0 ? (
  <EmptyState
    title="No data available"
    description="Create your first item to get started"
    icon={<MyCustomIcon />}
    action={{
      label: 'Create Item',
      onClick: () => openCreateModal(),
    }}
  />
) : (
  <Table {...props} />
)}
```

---

## 📱 Responsive Behavior

- **Desktop**: Full table dengan semua columns
- **Tablet**: Horizontal scroll untuk columns yang tidak fit
- **Mobile**: Horizontal scroll activated untuk semua tables

---

## ✅ Best Practices

1. **Always Provide rowKey**: Gunakan unique identifier untuk key prop
2. **Use Custom Rendering**: Leverage render function untuk UI yang lebih baik
3. **Handle Loading States**: Gunakan isLoading prop saat fetching data
4. **Implement Search**: Filter data sebelum paginate
5. **Provide Empty States**: Selalu tampilkan meaningful empty message
6. **Type Safety**: Gunakan TypeScript untuk column dan data definitions
7. **Performance**: Untuk large datasets (>1000 items), gunakan virtual scrolling

---

## 🔗 File Locations

- Components: `src/components/Table/`
- Hook: `src/hooks/useTable.ts`
- Demo Page: `app/dashboard/table-demo/page.tsx`

---

## 📝 Notes

- Components menggunakan `'use client'` directive untuk client-side functionality
- Semua styling menggunakan Tailwind CSS v4
- Components fully typed dengan TypeScript
- Export barrel (`index.ts`) untuk clean imports

Selamat menggunakan! Happy coding! 🚀
