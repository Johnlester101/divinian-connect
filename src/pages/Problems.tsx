/**
 * Problems.tsx
 * ============================================================================
 * DIVINIAN CONNECT — REPORT A PROBLEM
 * ============================================================================
 *
 * Students can report campus problems (facilities, Wi-Fi, cleanliness, etc.).
 * Each report gets a reference number and a status (Open, Under Review, In Progress, Resolved).
 * Only admins/moderators can change the status.
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
import { ShieldAlert, List, Clock2, User, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  'Classroom Facilities & Equipment',
  'Internet & Wi-Fi Connectivity',
  'School Cleanliness & Comfort Rooms',
  'Class Schedules & Academic Concerns',
  'Library & Laboratory Resources',
  'Campus Safety & Accessibility',
  'Student Organization Activities',
  'Other Campus Concerns',
];

const URGENCIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const STATUS_COLORS: Record<string, string> = {
  Open: 'bg-amber-50 text-amber-700 border-amber-100',
  'Under Review': 'bg-blue-50 text-blue-700 border-blue-100',
  'In Progress': 'bg-indigo-50 text-indigo-700 border-indigo-100',
  Resolved: 'bg-green-50 text-green-700 border-green-100',
};

export function Problems() {
  const { user, isAdmin, isModerator } = useAuth();
  const {
    problems,
    createProblem,
    updateProblemStatus,
    getProblemById,
  } = useData();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    urgency: 'medium' as const,
    isAnonymous: false,
  });
  const [error, setError] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.description.trim()) {
      setError('Please fill in both title and description.');
      return;
    }
    createProblem({
      title: form.title,
      description: form.description,
      category: form.category,
      urgency: form.urgency,
      authorId: user!.id,
      authorName: form.isAnonymous ? 'Anonymous' : user!.name,
      isAnonymous: form.isAnonymous,
    });
    setForm({
      title: '',
      description: '',
      category: CATEGORIES[0],
      urgency: 'medium',
      isAnonymous: false,
    });
  };

  const canModerate = isAdmin || isModerator;

  return (
    <div className="container-page">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Report a Problem</h1>
          <p className="text-gray-500 text-sm">
            Report campus issues and track their status until they are resolved.
          </p>
        </div>
        {canModerate && (
          <div className="text-right">
            <p className="text-xs text-gray-500">Moderator view — you can update statuses.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report form */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-navy-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Submit a concern</h2>
                </div>

                <Input
                  label="Title"
                  placeholder="e.g. Projector not working in Room 201"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />

                <Textarea
                  label="Description"
                  placeholder="Describe the problem in detail. Include location and what is affected."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                      className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                    <select
                      value={form.urgency}
                      onChange={(e) => setForm({ ...form, urgency: e.target.value as any })}
                      className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500"
                    >
                      {URGENCIES.map((u) => (
                        <option key={u.value} value={u.value}>
                          {u.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={form.isAnonymous}
                    onChange={(e) =>
                      setForm({ ...form, isAnonymous: e.target.checked })
                    }
                    className="w-4 h-4 text-navy-600 border-gray-300 rounded focus:ring-navy-500"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-700">
                    Submit anonymously (moderators can still see your identity)
                  </label>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Submit Report
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* My reported problems */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Reports</h2>
              {problems.filter((p) => p.authorId === user!.id).length === 0 ? (
                <p className="text-gray-500 text-center py-6 text-sm">You haven't reported any problems yet.</p>
              ) : (
                <div className="space-y-3">
                  {problems
                    .filter((p) => p.authorId === user!.id)
                    .map((p) => (
                      <ProblemCard
                        key={p.id}
                        problem={p}
                        canModerate={canModerate}
                        onUpdateStatus={updateProblemStatus}
                      />
                    ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Problem detail modal (simplified as inline expansion) */}
      {selectedProblem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full bg-white">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-gray-900">{selectedProblem.title}</h2>
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-700 mb-4">{selectedProblem.description}</p>
              <div className="flex gap-3 mb-6">
                <Badge variant="default">{selectedProblem.category}</Badge>
                <Badge
                  variant={selectedProblem.urgency === 'urgent' ? 'danger' : 'warning'}
                  className="text-[10px]"
                >
                  {selectedProblem.urgency}
                </Badge>
                <Badge
                  variant={
                    selectedProblem.status === 'Resolved'
                      ? 'success'
                      : selectedProblem.status === 'Open'
                        ? 'default'
                        : 'info'
                  }
                >
                  {selectedProblem.status}
                </Badge>
              </div>
              <div className="flex gap-2 text-xs text-gray-500">
                <span>Ref: {selectedProblem.referenceNumber}</span>
                <span>•</span>
                <span>By: {selectedProblem.authorName}</span>
              </div>
              {canModerate && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Update Status</h3>
                  <div className="flex gap-2">
                    {['Open', 'Under Review', 'In Progress', 'Resolved'].map((s) => (
                      <Button
                        key={s}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          updateProblemStatus(selectedProblem.id, s, user!.id);
                          setSelectedProblem(null);
                        }}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function ProblemCard({
  problem,
  canModerate,
  onUpdateStatus,
}: {
  problem: any;
  canModerate: boolean;
  onUpdateStatus: (id: string, status: any, actorId: string) => any;
}) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white hover:shadow-card transition-shadow cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-navy-700">{problem.referenceNumber}</span>
        <Badge variant="default">{problem.status}</Badge>
      </div>
      <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">{problem.title}</h4>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{problem.description}</p>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-400">{problem.category}</span>
        {canModerate && (
          <button className="text-xs text-navy-600 hover:underline font-medium">
            Edit status {<ChevronRight className="w-3 h-3" />}
          </button>
        )}
      </div>
      {canModerate && (
        <div className="mt-3 flex gap-2">
          {['Open', 'Under Review', 'In Progress', 'Resolved'].map((s) => (
            <button
              key={s}
              onClick={() => onUpdateStatus(problem.id, s, 'moderator')}
              className={`flex-1 px-2 py-1 text-[10px] rounded border transition-colors ${
                problem.status === s
                  ? 'bg-navy-100 text-navy-700 border-navy-200'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
