import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { Bell, Lock, Users, Zap } from 'lucide-react'

const SETTINGS_SECTIONS = [
  {
    title: 'Account Settings',
    description: 'Manage your account information and preferences',
    icon: <Users size={20} />,
    items: [
      { label: 'Email Address', value: 'john@example.com' },
      { label: 'Full Name', value: 'John Doe' },
      { label: 'Profile Picture', value: 'Edit' },
    ],
  },
  {
    title: 'Security',
    description: 'Keep your account secure with strong passwords',
    icon: <Lock size={20} />,
    items: [
      { label: 'Password', value: 'Change' },
      { label: 'Two-Factor Authentication', value: 'Disabled' },
      { label: 'Active Sessions', value: '1' },
    ],
  },
  {
    title: 'Notifications',
    description: 'Control what notifications you receive',
    icon: <Bell size={20} />,
    items: [
      { label: 'Email Notifications', value: 'Enabled' },
      { label: 'Push Notifications', value: 'Disabled' },
      { label: 'Marketing Emails', value: 'Enabled' },
    ],
  },
  {
    title: 'Preferences',
    description: 'Customize your dashboard experience',
    icon: <Zap size={20} />,
    items: [
      { label: 'Theme', value: 'Light' },
      { label: 'Language', value: 'English' },
      { label: 'Timezone', value: 'UTC' },
    ],
  },
]

export default function SettingsPage() {
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
              <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
              <p className="mt-2 text-slate-600">
                Manage your account settings and preferences.
              </p>
            </div>

            {/* Settings Grid */}
            <div className="space-y-6">
              {SETTINGS_SECTIONS.map((section) => (
                <div key={section.title} className="rounded-lg bg-white shadow">
                  {/* Section Header */}
                  <div className="border-b border-slate-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600">{section.icon}</div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                          {section.title}
                        </h2>
                        <p className="text-sm text-slate-600">{section.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Section Items */}
                  <div className="px-6 py-4">
                    <div className="space-y-4">
                      {section.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-slate-900">{item.label}</p>
                            <p className="text-sm text-slate-600">Current: {item.value}</p>
                          </div>
                          <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
                            {item.value === 'Edit' || item.value === 'Change'
                              ? 'Update'
                              : 'Configure'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Danger Zone */}
              <div className="rounded-lg border border-red-200 bg-red-50 p-6">
                <h3 className="font-semibold text-red-900">Danger Zone</h3>
                <p className="mt-2 text-sm text-red-700">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
