/**
 * Profile.tsx
 * Student profile — view and edit profile details.
 */

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { User, LogOut, GraduationCap } from 'lucide-react';

export function Profile() {
  const { user, updateProfile, logout, isAdmin, isModerator } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? '',
    course: user?.course ?? '',
    yearLevel: user?.yearLevel ?? '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const result = updateProfile({
      name: form.name.trim(),
      course: form.course.trim() || undefined,
      yearLevel: form.yearLevel.trim() || undefined,
    });
    if (result.success) {
      setMessage('Profile updated successfully.');
    } else {
      setError(result.error || 'Update failed.');
    }
  };

  const roleLabel = isAdmin
    ? 'Administrator'
    : isModerator
      ? 'Moderator'
      : 'Student';

  return (
    <div className="container-page">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex flex-col items-center">
            <Avatar name={user?.name ?? 'Student'} size="lg" className="mb-3" />
            <h2 className="text-xl font-bold text-gray-900">
              {user?.name ?? 'Student'}
            </h2>
            <Badge variant="navy" className="text-[10px]">
              {roleLabel}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>
        <div className="hidden md:block border-l border-gray-200 pl-8">
          <p className="text-sm text-gray-500 mb-2">
            <User className="w-4 h-4 inline mr-1" /> Member since
          </p>
          <p className="text-sm text-gray-900 mb-4">
            {new Date(user?.createdAt ?? Date.now()).toLocaleDateString()}
          </p>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-navy-600" />
            <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
          </div>
          <form onSubmit={handleSave} className="space-y-4 max-w-md">
            <Input
              label="Display name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Course"
                placeholder="BS Information Technology"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                icon={<GraduationCap className="w-4 h-4 text-gray-400" />}
              />
              <Input
                label="Year level"
                placeholder="3rd Year"
                value={form.yearLevel}
                onChange={(e) => setForm({ ...form, yearLevel: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
          {message && (
            <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
