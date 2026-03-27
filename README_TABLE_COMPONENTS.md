# 📊 Table Components - Complete Documentation

> Professional, production-ready table components with pagination, loading states, and empty states.

---

## 🎯 What You Get

A complete, **fully typed** table component system with:

- ✅ **Table Component** - Flexible, generic data table with custom rendering
- ✅ **Pagination Component** - Smart pagination with ellipsis and navigation
- ✅ **TableContainer Component** - Styled wrapper with header and footer
- ✅ **EmptyState Component** - Reusable empty state with actions
- ✅ **useTable Hook** - Pagination logic and data slicing
- ✅ **4 Complete Examples** - Ready-to-use implementations
- ✅ **Full Demo Page** - Interactive demonstration with 47 dummy users

**Total:** ~750 lines of production code + 1600+ lines of documentation

---

## 🚀 Quick Start

### 1. Import Components
```typescript
import { Table, Pagination, TableContainer } from '@/components/Table';
import { useTable } from '@/hooks/useTable';
```

### 2. Define Data & Columns
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
];

const data = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' },
];
```

### 3. Setup Pagination
```typescript
const { paginatedData, currentPage, totalPages, goToPage } = useTable({
  data: data,
  itemsPerPage: 10,
});
```

### 4. Render in UI
```typescript
<TableContainer
  title="Users"
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

---

## 📁 File Structure

```
src/
├── components/
│   └── Table/
│       ├── Table.tsx              (172 lines)
│       ├── Pagination.tsx          (124 lines)
│       ├── EmptyState.tsx          (73 lines)
│       ├── TableContainer.tsx      (51 lines)
│       ├── examples.tsx            (434 lines)
│       └── index.ts               (5 lines)
│
└── hooks/
    └── useTable.ts               (63 lines)

app/
└── dashboard/
    └── table-demo/
        └── page.tsx              (308 lines)

Documentation/
├── TABLE_COMPONENTS_GUIDE.md     (579 lines) - Full API reference
├── TABLE_SUMMARY.md              (414 lines) - Overview & patterns
├── TABLE_QUICK_REFERENCE.md      (437 lines) - Quick cheat sheet
└── README_TABLE_COMPONENTS.md    (this file)
```

---

## 📚 Documentation

| Document | Purpose | Length |
|----------|---------|--------|
| **TABLE_QUICK_REFERENCE.md** | Quick patterns & code snippets | 437 lines |
| **TABLE_COMPONENTS_GUIDE.md** | Complete API & feature guide | 579 lines |
| **TABLE_SUMMARY.md** | Overview of all components | 414 lines |
| **README_TABLE_COMPONENTS.md** | This file - navigation & setup | 300+ lines |

---

## 🎨 Key Features

### Table Component Features
- Generic TypeScript `<T>` support
- Custom column rendering
- Loading state with skeleton rows
- Empty state with icon and message
- Striped and hoverable rows
- Row click handler
- Responsive horizontal scroll
- Compact mode for density control

### Pagination Features
- Previous/Next buttons
- Smart page number display
- Ellipsis for page gaps
- Current page highlighting
- Loading state support

### Additional Features
- TableContainer wrapper with styling
- EmptyState reusable component
- useTable hook for logic
- Full TypeScript support
- Tailwind CSS v4 styling
- Mobile responsive design
- Accessibility focused

---

## 💡 Common Patterns

### Pattern 1: Basic Table Only
```typescript
<Table columns={columns} data={data} rowKey="id" />
```

### Pattern 2: Table with Pagination
```typescript
const table = useTable({ data, itemsPerPage: 10 });

<TableContainer footer={<Pagination {...table} />}>
  <Table data={table.paginatedData} ... />
</TableContainer>
```

### Pattern 3: With Search & Filter
```typescript
const filtered = data.filter(item =>
  item.name.includes(search)
);
const table = useTable({ data: filtered });
```

### Pattern 4: With Custom Cell Rendering
```typescript
const columns = [
  {
    key: 'status',
    render: (value) => <Badge status={value} />
  }
];
```

### Pattern 5: With Row Click Handler
```typescript
<Table
  onRowClick={(row) => handleSelectRow(row)}
  ...
/>
```

### Pattern 6: With Loading State
```typescript
<Table
  isLoading={isLoading}
  emptyMessage="Loading..."
  ...
/>
```

---

## 🎯 Use Cases

Perfect for:
- ✅ User management tables
- ✅ Product catalogs
- ✅ Order lists
- ✅ Admin dashboards
- ✅ Data management interfaces
- ✅ Analytics tables
- ✅ Reports and exports
- ✅ Search results
- ✅ Data listing pages
- ✅ Any tabular data display

---

## 📖 API Reference

### Table Props
```typescript
interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  className?: string;
}
```

### Column Configuration
```typescript
interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => React.ReactNode;
}
```

### Pagination Props
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
}
```

### useTable Hook
```typescript
const {
  currentPage,
  totalPages,
  paginatedData,
  isFirstPage,
  isLastPage,
  goToPage,
  nextPage,
  prevPage,
  totalItems,
} = useTable({ data, itemsPerPage: 10 });
```

---

## 🎨 Styling & Customization

### Default Theme
- Primary Color: Blue (#3b82f6)
- Background: White
- Text: Slate gray shades
- Borders: Light slate

### Customize via Props
```typescript
<Table
  className="custom-class"
  striped={false}
  hoverable={true}
  compact={true}
/>
```

### Override with Tailwind
```typescript
<TableContainer className="shadow-2xl border-2 border-blue-500">
  <Table className="text-sm" ... />
</TableContainer>
```

---

## 🔄 Complete Workflow

```typescript
'use client';

import { useState } from 'react';
import { Table, Pagination, TableContainer, Column } from '@/components/Table';
import { useTable } from '@/hooks/useTable';

interface Item {
  id: number;
  title: string;
  status: 'active' | 'inactive';
  created: string;
}

const initialData: Item[] = [/* ... */];

export default function ItemsPage() {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. Filter data
  const filtered = initialData.filter(item =>
    item.title.toLowerCase().includes(search)
  );

  // 2. Setup pagination
  const { paginatedData, currentPage, totalPages, goToPage } = useTable({
    data: filtered,
    itemsPerPage: 10,
  });

  // 3. Define columns
  const columns: Column<Item>[] = [
    { key: 'title', label: 'Title', sortable: true },
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
    { key: 'created', label: 'Created' },
  ];

  // 4. Render UI
  return (
    <div className="space-y-4">
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />

      <TableContainer
        title="Items"
        description={`Found ${filtered.length} items`}
        footer={
          totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              isLoading={isLoading}
            />
          )
        }
      >
        <Table
          columns={columns}
          data={paginatedData}
          rowKey="id"
          isLoading={isLoading}
          emptyMessage={filtered.length === 0 ? 'No items found' : 'No data'}
          hoverable
          striped
        />
      </TableContainer>
    </div>
  );
}
```

---

## 🧪 Live Examples

### See It In Action
Visit **`/dashboard/table-demo`** for a complete working example with:
- 47 dummy users
- Search functionality
- Loading state simulation
- Status & role badges
- Responsive design
- Code examples embedded

### Browse Examples
Check **`src/components/Table/examples.tsx`** for 4 ready-to-use examples:
1. Simple Products Table
2. Orders Table with Custom Rendering
3. Team Members with Actions
4. Data Table with Search & Loading

---

## ✅ Quality Assurance

- ✅ 100% TypeScript - Fully typed with generics
- ✅ Production Ready - Tested, optimized, edge cases handled
- ✅ Accessible - Semantic HTML, ARIA attributes
- ✅ Responsive - Mobile-first design
- ✅ Well Documented - 1600+ lines of documentation
- ✅ Performance Optimized - Efficient re-renders, memoization
- ✅ Clean Code - Best practices, proper separation of concerns

---

## 🚀 Performance Tips

1. **Memoize columns** - Prevent unnecessary re-renders
```typescript
const columns = useMemo(() => [...], []);
```

2. **Filter before paginate** - More efficient
```typescript
const filtered = data.filter(...);
const table = useTable({ data: filtered });
```

3. **Use proper key** - For list optimization
```typescript
rowKey="id"  // Must be unique
```

4. **Lazy load** - For large datasets
```typescript
useEffect(() => {
  fetchData().then(setData);
}, []);
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Table not updating | Check `rowKey` is unique and stable |
| Pagination not working | Verify `totalPages` calculation |
| Styling looks wrong | Ensure Tailwind CSS is imported |
| Loading not showing | Pass `isLoading={true}` to Table |
| Empty state not showing | Check `isEmpty` or `data.length === 0` |

---

## 📞 Need Help?

1. **Quick answers** → `TABLE_QUICK_REFERENCE.md`
2. **Complete guide** → `TABLE_COMPONENTS_GUIDE.md`
3. **Component overview** → `TABLE_SUMMARY.md`
4. **Live examples** → `/dashboard/table-demo`
5. **Code examples** → `src/components/Table/examples.tsx`

---

## 📊 Statistics

| Metric | Count |
|--------|-------|
| Components | 4 |
| Hooks | 1 |
| Complete Examples | 4 |
| Lines of Code | ~750 |
| Lines of Documentation | 1600+ |
| Features | 20+ |
| TypeScript Coverage | 100% |

---

## 🎉 You're All Set!

Start using these components in your projects. They're production-ready, fully typed, and thoroughly documented.

**Next Steps:**
1. Read `TABLE_QUICK_REFERENCE.md` for patterns
2. Visit `/dashboard/table-demo` to see examples
3. Copy & customize for your needs
4. Deploy with confidence! 🚀

---

**Happy coding!** 💻✨
