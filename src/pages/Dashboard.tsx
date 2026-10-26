/**
 * Dashboard.tsx
 * Student dashboard — overview of recent activity.
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import {
  MessageSquare,
  ShieldAlert,
  ThumbsUp,
  CheckCircle2,
} from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const { posts, problems, stats } = useData();
  const [recentPosts, setRecentPosts] = useState(posts);

  useEffect(() => {
    setRecentPosts(posts.slice(0, 3));
  }, [posts]);

  return (
    <div className="container-page">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {user?.name}. Here's what's happening on campus.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/feed">
            <button className="px-4 py-2 rounded-xl bg-navy-600 text-white text-sm font-medium hover:bg-navy-700">
              New Post
            </button>
          </Link>
          <Link to="/problems">
            <button className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50">
              Report a Problem
            </button>
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={MessageSquare}
          label="Community Posts"
          value={stats.totalPosts}
          color="bg-blue-50 text-blue-600 border-blue-100"
        />
        <StatCard
          icon={ShieldAlert}
          label="Open Concerns"
          value={stats.openProblems}
          color="bg-amber-50 text-amber-600 border-amber-100"
        />
        <StatCard
          icon={CheckCircle2}
          label="Resolved"
          value={stats.resolvedProblems}
          color="bg-green-50 text-green-600 border-green-100"
        />
        <StatCard
          icon={ThumbsUp}
          label="Suggestions"
          value={stats.totalSuggestions}
          color="bg-purple-50 text-purple-600 border-purple-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent posts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
            </CardHeader>
            <CardContent>
              {recentPosts.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No posts yet. Be the first to share!</p>
              ) : (
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <Avatar src={user?.profilePicture} name={post.authorName} size="sm" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-600">{post.authorName}</span>
                          <Badge variant="default" className="text-[10px]">
                            {post.category}
                          </Badge>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {post.body}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                          <span>{post.supportCount} supports</span>
                          <span>•</span>
                          <span>New</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick actions / open problems */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Open Concerns</h2>
            </CardHeader>
            <CardContent>
              {problems.filter((p) => p.status === 'Open').length === 0 ? (
                <p className="text-gray-500 text-center py-4">No open concerns.</p>
              ) : (
                <div className="space-y-3">
                  {problems
                    .filter((p) => p.status === 'Open')
                    .slice(0, 4)
                    .map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <Badge variant="warning" className="text-[10px]">
                          {p.status}
                        </Badge>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-900 truncate">{p.title}</div>
                          <div className="text-[10px] text-gray-500">#{p.referenceNumber.split('-').pop()}</div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>
      </div>
    </Card>
  );
}
