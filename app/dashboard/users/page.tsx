import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { Search, MoreVertical } from 'lucide-react'

const USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: 'Jan 15, 2024',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
    joinDate: 'Feb 20, 2024',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Moderator',
    status: 'Inactive',
    joinDate: 'Mar 10, 2024',
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'User',
    status: 'Active',
    joinDate: 'Apr 5, 2024',
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'User',
    status: 'Active',
    joinDate: 'Apr 18, 2024',
  },
]

export default function UsersPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Users</h1>
              <p className="mt-2 text-slate-600">Manage and view all users in your system.</p>
            </div>

            {/* Table Section */}
            <div className="rounded-lg bg-white shadow">
              {/* Toolbar */}
              <div className="border-b border-slate-200 px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>
                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Add User
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.role === 'Admin'
                                ? 'bg-purple-100 text-purple-800'
                                : user.role === 'Moderator'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{user.joinDate}</td>
                        <td className="px-6 py-4 text-center">
                          <button className="rounded-lg p-2 hover:bg-slate-100">
                            <MoreVertical size={18} className="text-slate-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 px-6 py-4">
                <p className="text-sm text-slate-600">Showing 1 to 5 of {USERS.length} users</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
