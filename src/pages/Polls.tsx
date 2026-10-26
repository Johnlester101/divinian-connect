/**
 * Polls.tsx
 * ============================================================================
 * DIVINIAN CONNECT — POLLS & VOTING
 * ============================================================================
 *
 * Authorized users (students in this prototype) can create polls.
 * Students vote once per poll. Duplicate votes are prevented.
 * Results are shown after voting or after the poll closes.
 * ============================================================================
 */

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Mail } from 'lucide-react';

export function Polls() {
  const { user } = useAuth();
  const { polls, createPoll, votePoll, hasVotedInPoll } = useData();

  const [form, setForm] = useState({
    question: '',
    options: ['Option 1', 'Option 2'],
    expiresAt: '',
  });
  const [error, setError] = useState('');

  const addOption = () => {
    setForm({ ...form, options: [...form.options, `Option ${form.options.length + 1}`] });
  };
  const removeOption = (index: number) => {
    if (form.options.length > 2) {
      setForm({ ...form, options: form.options.filter((_, i) => i !== index) });
    }
  };
  const updateOption = (index: number, value: string) => {
    const options = [...form.options];
    options[index] = value;
    setForm({ ...form, options });
  };

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.question.trim()) {
      setError('Please enter a poll question.');
      return;
    }
    if (form.options.some((o) => !o.trim())) {
      setError('Please fill in all options.');
      return;
    }
    if (!form.expiresAt) {
      setError('Please select a closing date.');
      return;
    }
    createPoll({
      question: form.question,
      options: form.options.filter((o) => o.trim()),
      createdBy: user!.id,
      createdByName: user!.name,
      expiresAt: form.expiresAt,
    });
    setForm({ question: '', options: ['Option 1', 'Option 2'], expiresAt: '' });
  };

  const handleVote = (pollId: string, optionId: string) => {
    const result = votePoll(pollId, optionId, user!.id);
    if (!result.success) {
      setError(result.error || 'Voting failed.');
    }
  };

  const now = new Date().toISOString().slice(0, 16);

  return (
    <div className="container-page">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Polls & Voting</h1>
          <p className="text-gray-500 text-sm">
            Vote on campus decisions. Each student votes once per poll.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create poll */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-navy-600" />
                <h2 className="text-lg font-semibold text-gray-900">Create a poll</h2>
              </div>
              <form onSubmit={handleCreatePoll} className="space-y-4">
                <Input
                  label="Poll question"
                  placeholder="e.g. What school activity would you like next?"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  required
                />
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Options</label>
                  {form.options.map((opt, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        label={`Option ${i + 1}`}
                        value={opt}
                        onChange={(e) => updateOption(i, e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(i)}
                        disabled={form.options.length <= 2}
                        className="h-[38px] px-3"
                      >
                        −
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addOption}
                    className="w-auto text-sm"
                  >
                    + Add option
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Closes on (date & time)"
                    type="datetime-local"
                    value={form.expiresAt}
                    onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                    min={now}
                    required
                  />
                </div>
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full">
                  Create Poll
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Active polls */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Polls</h2>
              {polls.length === 0 ? (
                <p className="text-gray-500 text-center py-6 text-sm">No active polls.</p>
              ) : (
                <div className="space-y-3">
                  {polls.map((p) => (
                    <PollCard key={p.id} poll={p} onVote={handleVote} currentUser={user!} hasVotedInPoll={hasVotedInPoll} />
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

function PollCard({
  poll,
  onVote,
  currentUser,
  hasVotedInPoll,
}: {
  poll: any;
  onVote: (pollId: string, optionId: string) => void;
  currentUser: any;
  hasVotedInPoll: (pollId: string, userId: string) => boolean;
}) {
  const hasVoted = hasVotedInPoll(poll.id, currentUser.id);
  const totalVotes = poll.options.reduce((sum: number, o: any) => sum + o.voteCount, 0);
  const isClosed = new Date(poll.expiresAt) < new Date();

  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-semibold text-gray-900 leading-tight">
          {poll.question}
        </h4>
        <Badge
          variant={isClosed ? 'default' : 'info'}
          className="text-[10px]"
        >
          {isClosed ? 'Closed' : 'Open'}
        </Badge>
      </div>
      <p className="text-xs text-gray-500 mb-3">
        By {poll.createdByName} • Closes {new Date(poll.expiresAt).toLocaleString()}
      </p>
      <div className="space-y-2 mb-3">
        {poll.options.map((o: any) => {
          const pct = totalVotes > 0 ? Math.round((o.voteCount / totalVotes) * 100) : 0;
          const alreadyVoted = hasVoted;
          return (
            <div key={o.id} className="flex items-center gap-3">
              <div className="text-sm text-gray-700">{o.text}</div>
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    alreadyVoted ? 'bg-navy-600' : 'bg-gray-200'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="w-12 text-xs text-gray-500 text-right">
                {o.voteCount} ({pct}%)
              </div>
            </div>
          );
        })}
      </div>
      {!hasVoted && !isClosed ? (
        <div className="space-y-2">
          {poll.options.map((o: any) => (
            <button
              key={o.id}
              onClick={() => onVote(poll.id, o.id)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Vote: {o.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-xs text-gray-500">
          {isClosed ? 'This poll has closed.' : 'You have already voted.'}
        </div>
      )}
    </div>
  );
}
