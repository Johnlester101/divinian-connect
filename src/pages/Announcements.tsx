/**
 * Announcements.tsx
 * ============================================================================
 * DIVINIAN CONNECT — ANNOUNCEMENTS
 * ============================================================================
 *
 * Official announcements from authorized accounts. Student-created content is
 * clearly labeled so it cannot be mistaken for an official DWCSJ statement.
 * ============================================================================
 */

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GraduationCap, Megaphone, User } from 'lucide-react';

export function Announcements() {
  const { user, isAdmin, isModerator } = useAuth();
  const { announcements, createAnnouncement } = useData();

  const [form, setForm] = useState({
    title: '',
    body: '',
    isOfficial: false,
  });
  const [error, setError] = useState('');

  const canPublish = isAdmin || isModerator;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.body.trim()) {
      setError('Please fill in title and body.');
      return;
    }
    createAnnouncement({
      title: form.title,
      body: form.body,
      authorId: user!.id,
      authorName: user!.name,
      isOfficial: form.isOfficial && canPublish,
    });
    setForm({ title: '', body: '', isOfficial: false });
  };

  return (
    <div className="container-page">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-500 text-sm">
            Official updates from the school and student organizations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Publish form */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              {!canPublish ? (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="flex items-start gap-3">
                    <Megaphone className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-amber-800">
                        Authorized accounts only
                      </h3>
                      <p className="text-xs text-amber-700 mt-1">
                        Only administrators and moderators can publish official
                        announcements. Student posts are labeled separately.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="w-5 h-5 text-navy-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      Publish announcement
                    </h2>
                  </div>
                  <Input
                    label="Title"
                    placeholder="e.g. Enrollment begins August 1"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                  <Textarea
                    label="Announcement details"
                    placeholder="What do students need to know?"
                    value={form.body}
                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                    rows={4}
                    required
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="official"
                      checked={form.isOfficial}
                      onChange={(e) => setForm({ ...form, isOfficial: e.target.checked })}
                      className="w-4 h-4 text-navy-600 border-gray-300 rounded focus:ring-navy-500"
                    />
                    <label htmlFor="official" className="text-sm text-gray-700">
                      Mark as official DWCSJ announcement
                    </label>
                  </div>
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <Button type="submit" className="w-full">
                    Publish Announcement
                  </Button>
                </form>
              )}
            </div>
          </Card>
        </div>

        {/* Announcements list */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h2>
              {announcements.length === 0 ? (
                <p className="text-gray-500 text-center py-6 text-sm">No announcements yet.</p>
              ) : (
                <div className="space-y-4">
                  {announcements.map((a) => (
                    <AnnouncementCard key={a.id} announcement={a} />
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AnnouncementCard({ announcement }: { announcement: any }) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white">
      <div className="flex items-start gap-3 mb-2">
        <Badge
          variant={announcement.isOfficial ? 'navy' : 'gold'}
          className="text-[10px]"
        >
          {announcement.isOfficial ? 'OFFICIAL' : 'STUDENT POST'}
        </Badge>
        <span className="text-[10px] text-gray-400">
          {new Date(announcement.createdAt).toLocaleDateString()}
        </span>
      </div>
      <h4 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
        {announcement.title}
      </h4>
      <p className="text-xs text-gray-600 line-clamp-2">{announcement.body}</p>
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <User className="w-3 h-3" />
        <span>{announcement.authorName}</span>
      </div>
    </div>
  );
}
