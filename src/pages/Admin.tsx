/**
 * Admin.tsx
 * ============================================================================
 * DIVINIAN CONNECT — ADMIN DASHBOARD
 * ============================================================================
 *
 * Protected admin panel with statistics, user management, content moderation,
 * and reporting tools.
 * ============================================================================
 */

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import {
  Users,
  MessageSquare,
  ShieldAlert,
  ThumbsUp,
  BarChart3,
  Bell,
  Flag,
  Trash2,
  Edit,
} from 'lucide-react';

export function Admin() {
  const { user } = useAuth();
  const {
    stats,
    users: allUsers,
    posts,
    problems,
    suggestions,
    reports,
    updateReportStatus,
    resetDemoData,
  } = useData();

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container-page">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Welcome, {user?.name}. Manage users, content, and reports.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => resetDemoData()}>
          Reset Demo Data
        </Button>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats.totalUsers}
          color="bg-blue-50 text-blue-600 border-blue-100"
        />
        <StatCard
          icon={MessageSquare}
          label="Total Posts"
          value={stats.totalPosts}
          color="bg-indigo-50 text-indigo-600 border-indigo-100"
        />
        <StatCard
          icon={ShieldAlert}
          label="Open Concerns"
          value={stats.openProblems}
          color="bg-amber-50 text-amber-600 border-amber-100"
        />
        <StatCard
          icon={ThumbsUp}
          label="Suggestions"
          value={stats.totalSuggestions}
          color="bg-purple-50 text-purple-600 border-purple-100"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'users', label: 'User Management' },
          { key: 'content', label: 'Content Moderation' },
          { key: 'reports', label: 'Reported Content' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-navy-600 text-navy-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Concerns</h3>
            <div className="space-y-3">
              {problems.slice(0, 5).map((p) => (
                <div key={p.id} className="p-3 rounded-xl border border-gray-200 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {p.title}
                    </h4>
                    <Badge variant="default">{p.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                    {p.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{p.referenceNumber}</span>
                    <span>•</span>
                    <span>{p.authorName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Suggestions</h3>
            <div className="space-y-3">
              {suggestions.slice(0, 5).map((s) => (
                <div key={s.id} className="p-3 rounded-xl border border-gray-200 bg-white">
                  <div className="flex justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {s.title}
                    </h4>
                    <span className="text-xs font-medium text-gray-600">
                      {s.supportCount} supports
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <UserManagement users={allUsers} />
      )}

      {activeTab === 'content' && (
        <ContentModeration posts={posts} problems={problems} suggestions={suggestions} />
      )}

      {activeTab === 'reports' && (
        <ReportsManagement reports={reports} onUpdateStatus={updateReportStatus} />
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
}

function UserManagement({ users }: { users: any[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Registered Users</h3>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 font-medium text-gray-600">Email</th>
              <th className="px-4 py-3 font-medium text-gray-600">Role</th>
              <th className="px-4 py-3 font-medium text-gray-600">Joined</th>
              <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={u.name} size="sm" />
                    <span className="text-gray-900">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{u.email}</td>
                <td className="px-4 py-3">
                  <Badge variant="navy" className="text-[10px]">
                    {u.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" size="sm" onClick={() => {}}>
                    <Edit className="w-3 h-3" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContentModeration({ posts, problems, suggestions }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">All Content</h3>
      <div className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Posts ({posts.length})</h4>
          <div className="space-y-3">
            {posts.slice(0, 5).map((p: any) => (
              <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 truncate">{p.title}</div>
                  <div className="text-xs text-gray-500">{p.authorName} • {p.category}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsManagement({
  reports,
  onUpdateStatus,
}: {
  reports: any[];
  onUpdateStatus: (id: string, status: any) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reported Content</h3>
      {reports.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No reported content.</p>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 font-medium text-gray-600">Content</th>
                <th className="px-4 py-3 font-medium text-gray-600">Reason</th>
                <th className="px-4 py-3 font-medium text-gray-600">Reported By</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600 truncate max-w-xs">
                    #{r.contentId} ({r.contentType})
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{r.reason}</td>
                  <td className="px-4 py-3 text-gray-600">{r.reportedBy}</td>
                  <td className="px-4 py-3">
                    <Badge variant="default">{r.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {r.status !== 'resolved' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onUpdateStatus(r.id, 'resolved')}
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
