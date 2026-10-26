/**
 * Suggestions.tsx
 * ============================================================================
 * DIVINIAN CONNECT — SUGGESTIONS & IDEAS
 * ============================================================================
 *
 * Students can submit improvement ideas. Others can support and comment.
 * Most-supported suggestions are shown first.
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
import { Avatar } from '@/components/ui/Avatar';
import { ThumbsUp, Lightbulb, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  'Facilities',
  'Internet & Wi-Fi',
  'Study Areas',
  'Student Activities',
  'Student Services',
  'Environmental & Sustainability',
  'Other',
];

export function Suggestions() {
  const { user } = useAuth();
  const {
    suggestions,
    createSuggestion,
    toggleSuggestionSupport,
  } = useData();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    isAnonymous: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    createSuggestion({
      title: form.title,
      description: form.description,
      category: form.category,
      authorId: user!.id,
      authorName: form.isAnonymous ? 'Anonymous' : user!.name,
      isAnonymous: form.isAnonymous,
    });
    setForm({ title: '', description: '', category: CATEGORIES[0], isAnonymous: false });
  };

  return (
    <div className="container-page">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suggestions & Ideas</h1>
          <p className="text-gray-500 text-sm">
            Submit ideas to improve campus life. Support the ideas you care about.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit form */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-900">Submit a suggestion</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Title"
                  placeholder="e.g. More power outlets in classrooms"
                  value={form.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, title: e.target.value })}
                  required
                />
                <Textarea
                  label="Description"
                  placeholder="Explain your idea and how it would help students."
                  value={form.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anon-sugg"
                    checked={form.isAnonymous}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, isAnonymous: e.target.checked })}
                    className="w-4 h-4 text-navy-600 border-gray-300 rounded focus:ring-navy-500"
                  />
                  <label htmlFor="anon-sugg" className="text-sm text-gray-700">
                    Submit anonymously
                  </label>
                </div>
                <Button type="submit" className="w-full">
                  Submit Suggestion
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Suggestions list */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Most Supported</h2>
              {suggestions.length === 0 ? (
                <p className="text-gray-500 text-center py-6 text-sm">No suggestions yet.</p>
              ) : (
                <div className="space-y-3">
                  {suggestions.slice(0, 6).map((s) => (
                    <SuggestionCard key={s.id} suggestion={s} />
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* All suggestions with support buttons */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Suggestions</h2>
        <div className="space-y-3">
          {suggestions.map((s) => (
            <SuggestionRow key={s.id} suggestion={s} currentUser={user!} toggleSuggestionSupport={toggleSuggestionSupport} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SuggestionCard({ suggestion }: { suggestion: any }) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white">
      <Badge variant="default" className="text-[10px] mb-2 block">
        {suggestion.status}
      </Badge>
      <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
        {suggestion.title}
      </h4>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{suggestion.description}</p>
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1 text-gray-600 font-medium">
          {suggestion.supportCount}
        </div>
        <span className="text-gray-400">supports</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-400">{suggestion.authorName}</span>
      </div>
    </div>
  );
}

function SuggestionRow({
  suggestion,
  currentUser,
  toggleSuggestionSupport,
}: {
  suggestion: any;
  currentUser: any;
  toggleSuggestionSupport: (suggestionId: string, userId: string) => { supported: boolean; count: number };
}) {
  const [supported, setSupported] = useState(false);

  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Avatar name={suggestion.authorName} size="sm" />
          <span className="text-xs font-medium text-gray-700 truncate">
            {suggestion.authorName}
          </span>
          <Badge variant="default" className="text-[10px]">
            {suggestion.category}
          </Badge>
        </div>
        <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
          {suggestion.title}
        </h4>
        <p className="text-xs text-gray-500 line-clamp-1">{suggestion.description}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xs text-gray-500">
          {suggestion.supportCount} supports
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const res = toggleSuggestionSupport(suggestion.id, currentUser.id);
            setSupported(res.supported);
          }}
          className={supported ? 'bg-navy-600 text-white border-navy-600' : ''}
        >
          <ThumbsUp className="w-3 h-3 mr-1" /> Support
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href="#" className="text-xs text-gray-600 hover:text-navy-600">
            Discuss {<ChevronRight className="w-3 h-3 inline" />}
          </a>
        </Button>
      </div>
    </div>
  );
}
