# 🚀 Table Components - Quick Reference

## 📦 Quick Imports

```typescript
// Components
import { Table, Pagination, TableContainer, EmptyState } from '@/components/Table';

// Hook
import { useTable } from '@/hooks/useTable';
```

---

## 🎯 Quick Patterns

### Pattern 1: Minimal Table
```typescript
<Table
  columns={columns}
  data={data}
  rowKey="id"
/>
```

### Pattern 2: Complete Table with Pagination
```typescript
const { paginatedData, currentPage, totalPages, goToPage } = useTable({
  data: data,
  itemsPerPage: 10,
});

<TableContainer
  title="My Table"
  footer={
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={goToPage}
    />
  }
>
  <Table
    columns={columns}
    data={paginatedData}
    rowKey="id"
  />
</TableContainer>
```

### Pattern 3: With Search
```typescript
const [search, setSearch] = useState('');
const filtered = data.filter(item =>
  item.name.includes(search)
);

const { paginatedData, ... } = useTable({
  data: filtered,
  itemsPerPage: 10,
});

<input
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<Table data={paginatedData} ... />
```

### Pattern 4: With Loading State
```typescript
<Table
  columns={columns}
  data={paginatedData}
  rowKey="id"
  isLoading={isLoading}
/>
```

### Pattern 5: With Custom Cell Rendering
```typescript
const columns = [
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span className="px-2 py-1 rounded bg-green-100">
        {value}
      </span>
    ),
  },
];
```

### Pattern 6: With Row Click
```typescript
<Table
  columns={columns}
  data={data}
  rowKey="id"
  onRowClick={(row) => handleSelectRow(row)}
/>
```

---

## 🎨 Column Configuration

```typescript
interface Column<T> {
  key: keyof T;           // Data key
  label: string;          // Header text
  width?: string;         // Custom width
  sortable?: boolean;     // Show sort icon
  align?: 'left' | 'center' | 'right';  // Alignment
  render?: (value, row) => ReactNode;   // Custom render
}

// Example
const columns: Column<User>[] = [
  {
    key: 'name',
    label: 'Full Name',
    sortable: true,
    render: (value) => <strong>{value}</strong>,
  },
  {
    key: 'email',
    label: 'Email Address',
    align: 'left',
  },
  {
    key: 'status',
    label: 'Status',
    align: 'center',
    render: (value) => (
      <span className={value === 'active' ? 'text-green-600' : 'text-red-600'}>
        {value}
      </span>
    ),
  },
];
```

---

## 🎨 Styling Classes

### Table Props
```typescript
<Table
  striped={true}          // Alternate row colors
  hoverable={true}        // Hover effect
  compact={true}          // Smaller padding
  className="custom-css"  // Additional classes
/>
```

### Container Props
```typescript
<TableContainer
  title="Title"
  description="Description"
  footer={<Pagination ... />}
  className="custom-css"
>
  {/* Content */}
</TableContainer>
```

---

## 🧪 Complete Example

```typescript
'use client';

import { useState } from 'react';
import { Table, Pagination, TableContainer, Column } from '@/components/Table';
import { useTable } from '@/hooks/useTable';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999, stock: 5 },
  { id: 2, name: 'Mouse', price: 29, stock: 50 },
  // ... more products
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search)
  );

  const { paginatedData, currentPage, totalPages, goToPage } = useTable({
    data: filtered,
    itemsPerPage: 10,
  });

  const columns: Column<Product>[] = [
    { key: 'name', label: 'Product' },
    {
      key: 'price',
      label: 'Price',
      align: 'right',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      key: 'stock',
      label: 'Stock',
      align: 'center',
      render: (stock) => (
        <span className={stock > 0 ? 'text-green-600' : 'text-red-600'}>
          {stock}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />

      <TableContainer
        title="Products"
        footer={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        }
      >
        <Table
          columns={columns}
          data={paginatedData}
          rowKey="id"
          hoverable
        />
      </TableContainer>
    </div>
  );
}
```

---

## 📋 Common Props

### Table Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | Column<T>[] | - | Column definitions |
| data | T[] | - | Table data |
| rowKey | keyof T | - | Unique row identifier |
| isLoading | boolean | false | Show loading skeleton |
| isEmpty | boolean | false | Force empty state |
| emptyMessage | string | 'No data' | Empty state message |
| striped | boolean | true | Alternate row colors |
| hoverable | boolean | true | Hover effect |
| compact | boolean | false | Smaller padding |
| onRowClick | (row: T) => void | - | Row click handler |

### Pagination Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| currentPage | number | - | Current page number |
| totalPages | number | - | Total pages count |
| onPageChange | (page) => void | - | Page change handler |
| isLoading | boolean | false | Disable during loading |

### useTable Hook Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| data | T[] | - | Data to paginate |
| itemsPerPage | number | 10 | Items per page |
| initialPage | number | 1 | Starting page |

---

## 🎯 State Management Pattern

```typescript
// 1. Store original data
const [allData, setAllData] = useState(initialData);

// 2. Store filters/search
const [filters, setFilters] = useState({ search: '' });

// 3. Apply filters
const filtered = allData.filter(/* ... */);

// 4. Paginate filtered data
const table = useTable({ data: filtered, itemsPerPage: 10 });

// 5. Reset to page 1 when filter changes
useEffect(() => {
  table.goToPage(1);
}, [filters]);
```

---

## 🔧 Customization Examples

### Custom Loading State
```typescript
<Table
  isLoading={isLoading}
  emptyMessage="Loading data..."
  data={data}
  columns={columns}
  rowKey="id"
/>
```

### Custom Empty State
```typescript
{data.length === 0 ? (
  <EmptyState
    title="No data found"
    description="Try adjusting your filters"
    action={{
      label: 'Reset Filters',
      onClick: () => resetFilters(),
    }}
  />
) : (
  <Table columns={columns} data={data} rowKey="id" />
)}
```

### Custom Styling
```typescript
<TableContainer className="shadow-2xl">
  <Table
    className="text-sm"
    data={data}
    columns={columns}
    rowKey="id"
    compact
  />
</TableContainer>
```

---

## ⚡ Performance Tips

1. **Memoize columns** untuk avoid re-render
```typescript
const columns = useMemo(() => [...], []);
```

2. **Use key prop correctly** untuk list optimization
```typescript
rowKey="id"  // Unique identifier
```

3. **Filter before paginate** untuk efficiency
```typescript
const filtered = data.filter(...)  // Once
const table = useTable({ data: filtered })  // Then paginate
```

4. **Lazy load large datasets**
```typescript
const [data, setData] = useState([]);
useEffect(() => {
  fetchData().then(setData);
}, []);
```

---

## 🐛 Troubleshooting

### Table not updating
✅ Make sure `rowKey` is unique and stable
✅ Pass new data object reference, not mutate existing

### Pagination not working
✅ Ensure `totalPages` is calculated correctly
✅ Check `onPageChange` is updating state

### Styling issues
✅ Import Tailwind CSS in globals.css
✅ Check className prop syntax
✅ Use `cn()` utility for conditional classes

### Loading state not showing
✅ Pass `isLoading={true}` to Table component
✅ Remove data or set empty when loading

---

## 📚 Documentation Links

- Full Guide: `TABLE_COMPONENTS_GUIDE.md`
- Summary: `TABLE_SUMMARY.md`
- Demo: `/dashboard/table-demo`
- Examples: `src/components/Table/examples.tsx`

---

## ✅ Checklist for New Tables

- [ ] Define TypeScript interface for data
- [ ] Create Column array with key, label
- [ ] Add render functions for custom columns
- [ ] Use `useTable` hook for pagination
- [ ] Wrap in `TableContainer` with title
- [ ] Add `Pagination` in footer
- [ ] Handle loading states
- [ ] Add search/filter logic
- [ ] Test on mobile (responsive)
- [ ] Verify accessibility

---

## 🎉 Ready to Go!

Copy & paste patterns above, customize as needed. Enjoy! 🚀
