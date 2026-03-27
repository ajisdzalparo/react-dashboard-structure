'use client';

import React, { useState } from 'react';
import { Table, Pagination, TableContainer, Column } from './index';
import { useTable } from '@/hooks/useTable';

// ============================================
// EXAMPLE 1: Simple Products Table
// ============================================

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Wireless Mouse', sku: 'WM-001', price: 29.99, quantity: 150 },
  { id: 2, name: 'USB-C Cable', sku: 'UC-001', price: 9.99, quantity: 500 },
  { id: 3, name: 'Laptop Stand', sku: 'LS-001', price: 49.99, quantity: 75 },
  { id: 4, name: 'Mechanical Keyboard', sku: 'MK-001', price: 129.99, quantity: 45 },
  { id: 5, name: '4K Monitor', sku: 'MON-001', price: 499.99, quantity: 20 },
];

export function SimpleProductsTable() {
  const { paginatedData, currentPage, totalPages, goToPage } = useTable({
    data: sampleProducts,
    itemsPerPage: 3,
  });

  const columns: Column<Product>[] = [
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'sku', label: 'SKU' },
    {
      key: 'price',
      label: 'Price',
      align: 'right',
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: 'quantity',
      label: 'Quantity',
      align: 'center',
      render: (value) => (
        <span className={value < 50 ? 'text-red-600 font-semibold' : ''}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <TableContainer
      title="Products"
      description="Manage your product inventory"
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
  );
}

// ============================================
// EXAMPLE 2: Orders Table with Custom Rendering
// ============================================

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

const sampleOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'Acme Corp',
    total: 2599.99,
    status: 'shipped',
    date: '2024-01-15',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'Tech Solutions',
    total: 899.50,
    status: 'processing',
    date: '2024-01-14',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Innovation Labs',
    total: 4299.00,
    status: 'pending',
    date: '2024-01-13',
  },
];

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
};

export function OrdersTableWithCustomRendering() {
  const { paginatedData, currentPage, totalPages, goToPage } = useTable({
    data: sampleOrders,
    itemsPerPage: 5,
  });

  const columns: Column<Order>[] = [
    {
      key: 'orderNumber',
      label: 'Order Number',
      sortable: true,
      render: (value) => (
        <a href="#" className="text-blue-600 hover:underline font-semibold">
          {value}
        </a>
      ),
    },
    { key: 'customer', label: 'Customer' },
    {
      key: 'total',
      label: 'Amount',
      align: 'right',
      render: (value) => (
        <span className="font-semibold">${value.toFixed(2)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[value]}`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    { key: 'date', label: 'Date' },
  ];

  return (
    <TableContainer
      title="Recent Orders"
      description="View all orders from the last 30 days"
      footer={
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Total Orders: <span className="font-semibold">{sampleOrders.length}</span>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>
      }
    >
      <Table
        columns={columns}
        data={paginatedData}
        rowKey="id"
        hoverable
        onRowClick={(row) => console.log('Order selected:', row)}
      />
    </TableContainer>
  );
}

// ============================================
// EXAMPLE 3: Team Members Table with Actions
// ============================================

interface TeamMember {
  id: number;
  name: string;
  role: 'Manager' | 'Developer' | 'Designer' | 'Analyst';
  email: string;
  joinDate: string;
  active: boolean;
}

const sampleTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Manager',
    email: 'alice@company.com',
    joinDate: '2022-01-15',
    active: true,
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Developer',
    email: 'bob@company.com',
    joinDate: '2022-03-20',
    active: true,
  },
  {
    id: 3,
    name: 'Carol Davis',
    role: 'Designer',
    email: 'carol@company.com',
    joinDate: '2022-06-10',
    active: false,
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Developer',
    email: 'david@company.com',
    joinDate: '2023-02-01',
    active: true,
  },
];

export function TeamMembersTableWithActions() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { paginatedData, currentPage, totalPages, goToPage } = useTable({
    data: sampleTeamMembers,
    itemsPerPage: 5,
  });

  const columns: Column<TeamMember>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    { key: 'role', label: 'Role' },
    {
      key: 'email',
      label: 'Email',
      render: (value) => (
        <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
          {value}
        </a>
      ),
    },
    {
      key: 'active',
      label: 'Status',
      align: 'center',
      render: (value) => (
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            value ? 'bg-green-500' : 'bg-gray-400'
          }`}
          title={value ? 'Active' : 'Inactive'}
        />
      ),
    },
    {
      key: 'id',
      label: 'Actions',
      align: 'center',
      render: (_, row) => (
        <button
          onClick={() => setSelectedMember(row)}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <TableContainer
      title="Team Members"
      description={`${sampleTeamMembers.length} total members`}
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
        striped
        hoverable
      />
      {selectedMember && (
        <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-semibold text-blue-900">
            Selected: {selectedMember.name}
          </p>
          <p className="text-sm text-blue-700">{selectedMember.email}</p>
        </div>
      )}
    </TableContainer>
  );
}

// ============================================
// EXAMPLE 4: Data Table with Search & Loading
// ============================================

interface DataItem {
  id: number;
  title: string;
  description: string;
  category: string;
  created: string;
}

const sampleData: DataItem[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `This is the description for item ${i + 1}`,
  category: ['Category A', 'Category B', 'Category C'][i % 3],
  created: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
}));

export function DataTableWithSearchAndLoading() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredData = sampleData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { paginatedData, currentPage, totalPages, goToPage } = useTable({
    data: filteredData,
    itemsPerPage: 5,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    goToPage(1);
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const columns: Column<DataItem>[] = [
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    { key: 'description', label: 'Description' },
    {
      key: 'category',
      label: 'Category',
      align: 'center',
      render: (value) => (
        <span className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs">
          {value}
        </span>
      ),
    },
    { key: 'created', label: 'Created Date' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 rounded border border-slate-300 px-4 py-2"
        />
        <button
          onClick={simulateLoading}
          disabled={isLoading}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-slate-400"
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <TableContainer
        title="Data Items"
        description={`Found ${filteredData.length} items`}
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
          isEmpty={filteredData.length === 0}
          emptyMessage="No items found matching your search"
        />
      </TableContainer>
    </div>
  );
}
