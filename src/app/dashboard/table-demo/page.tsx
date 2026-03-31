'use client';

import { useState } from 'react';
import { Table, Pagination, TableContainer, EmptyState } from '@/components/Table';
import { useTable } from '@/hooks/useTable';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: 'admin' | 'user' | 'editor';
  joinDate: string;
  lastLogin: string;
}

// Dummy Data
const generateDummyUsers = (count: number): User[] => {
  const roles = ['admin', 'user', 'editor'] as const;
  const statuses = ['active', 'inactive', 'pending'] as const;
  const names = [
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Williams',
    'Tom Brown',
    'Emily Davis',
    'Robert Wilson',
    'Lisa Anderson',
    'David Martinez',
    'Jennifer Taylor',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length] + ` ${Math.floor(i / names.length) + 1}`,
    email: `user${i + 1}@example.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
  }));
};

// Badge Component
const StatusBadge = ({ status }: { status: User['status'] }) => {
  const statusConfig = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        statusConfig[status]
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const RoleBadge = ({ role }: { role: User['role'] }) => {
  const roleConfig = {
    admin: 'bg-blue-100 text-blue-800',
    user: 'bg-slate-100 text-slate-800',
    editor: 'bg-purple-100 text-purple-800',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        roleConfig[role]
      }`}
    >
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

// Main Component
export default function TableDemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const allUsers = generateDummyUsers(47);

  // Filter users based on search term
  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  } = useTable({
    data: filteredUsers,
    itemsPerPage: 10,
  });

  // Simulate loading
  const handleSimulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Column definitions
  const columns = [
    {
      key: 'name' as const,
      label: 'Name',
      sortable: true,
      align: 'left' as const,
    },
    {
      key: 'email' as const,
      label: 'Email',
      align: 'left' as const,
    },
    {
      key: 'role' as const,
      label: 'Role',
      align: 'center' as const,
      render: (value: User['role']) => <RoleBadge role={value} />,
    },
    {
      key: 'status' as const,
      label: 'Status',
      align: 'center' as const,
      render: (value: User['status']) => <StatusBadge status={value} />,
    },
    {
      key: 'joinDate' as const,
      label: 'Join Date',
      align: 'left' as const,
    },
    {
      key: 'lastLogin' as const,
      label: 'Last Login',
      align: 'left' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Table Components Demo</h1>
        <p className="text-slate-600">
          Comprehensive example of reusable table components with pagination, loading, and empty states.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg bg-white p-4 border border-slate-200">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              goToPage(1); // Reset to first page on search
            }}
            className="w-full rounded border border-slate-300 px-4 py-2 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSimulateLoading}
          disabled={isLoading}
          className="rounded bg-blue-600 px-4 py-2 text-white font-medium transition-colors hover:bg-blue-700 disabled:bg-slate-400"
        >
          {isLoading ? 'Loading...' : 'Simulate Loading'}
        </button>
      </div>

      {/* Table */}
      <TableContainer
        title="Users Table"
        description={`Showing ${paginatedData.length} of ${filteredUsers.length} users`}
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
        {filteredUsers.length === 0 ? (
          <EmptyState
            title="No users found"
            description="Try adjusting your search criteria"
          />
        ) : (
          <Table<User>
            columns={columns}
            data={paginatedData}
            rowKey="id"
            isLoading={isLoading}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        )}
      </TableContainer>

      {/* Info Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-sm font-medium text-slate-600">Total Users</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{allUsers.length}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-sm font-medium text-slate-600">Filtered Results</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{filteredUsers.length}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-sm font-medium text-slate-600">Current Page</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">
            {currentPage} / {totalPages}
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Implementation Guide</h2>
        
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Basic Usage</h3>
          <pre className="overflow-x-auto rounded bg-slate-800 p-4 text-sm text-slate-100">
            {`import { Table, Pagination, TableContainer } from '@/components/Table';
import { useTable } from '@/hooks/useTable';

export default function MyTablePage() {
  const { paginatedData, currentPage, totalPages, goToPage } = useTable({
    data: myData,
    itemsPerPage: 10,
  });

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ];

  return (
    <TableContainer title="My Table">
      <Table
        columns={columns}
        data={paginatedData}
        rowKey="id"
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </TableContainer>
  );
}`}
          </pre>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-900 mb-3">With Custom Rendering</h3>
          <pre className="overflow-x-auto rounded bg-slate-800 p-4 text-sm text-slate-100">
            {`const columns = [
  {
    key: 'name',
    label: 'Name',
    render: (value, row) => (
      <div className="font-bold">{value}</div>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    align: 'center' as const,
    render: (value) => (
      <span className="px-2 py-1 rounded bg-green-100 text-green-800">
        {value}
      </span>
    ),
  },
];`}
          </pre>
        </div>
      </div>
    </div>
  );
}
