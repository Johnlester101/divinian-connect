/**
 * CommunityFeed.tsx
 * ============================================================================
 * DIVINIAN CONNECT — COMMUNITY FEED
 * ============================================================================
 *
 * Facebook-style discussion feed. Students can:
 *   - Create text posts with optional category
 *   - View posts sorted by latest
 *   - Support (like) posts
 *   - Comment on posts
 *   - Search and filter by category
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import {
  Send,
  ThumbsUp,
  MessageSquare,
  Search,
  Filter,
  Plus,
  User,
} from 'lucide-react';

const CATEGORIES = [
  'All Categories',
  'Academic Concerns',
  'Classroom Facilities',
  'Internet & Wi-Fi',
  'Cleanliness & Comfort Rooms',
  'Library & Laboratory',
  'Campus Safety',
  'Student Organization',
  'Other',
];

export function CommunityFeed() {
  const { user } = useAuth();
  const {
    posts,
    createPost,
    toggleSupport,
    isSupportedByUser,
    createComment,
    getCommentsForPost,
  } = useData();

  const [newPost, setNewPost] = useState({ title: '', body: '', category: 'General' });
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      categoryFilter === 'All Categories' || post.category === categoryFilter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    createPost({
      title: newPost.title,
      body: newPost.body,
      category: newPost.category,
      authorId: user!.id,
      authorName: user!.name,
      authorRole: user!.role,
    });
    setNewPost({ title: '', body: '', category: 'General' });
  };

  const handleSupport = (postId: string) => {
    toggleSupport(postId, user!.id);
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    createComment({
      postId,
      authorId: user!.id,
      authorName: user!.name,
      body: commentText,
    });
    setCommentText('');
    setOpenComments(null);
  };

  return (
    <div className="container-page">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Feed</h1>
          <p className="text-gray-500 text-sm">
            Share what's on your mind and support fellow Divinians.
          </p>
        </div>
      </div>

      {/* Create post form */}
      <Card className="mb-6">
        <div className="p-6">
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar src={user?.profilePicture} name={user?.name} size="sm" />
              <div className="flex-1">
                <Input
                  label="Post title"
                  placeholder="What's happening around campus?"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <div className="flex gap-2 mt-2">
                  <Input
                    label="Category"
                    placeholder="General"
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <Textarea
              label="Write your post"
              placeholder="Share a thought, ask a question, or start a discussion..."
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              rows={3}
            />
            <Button type="submit" className="w-auto">
              <Send className="w-4 h-4 mr-2" /> Post
            </Button>
          </form>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <Input
          label="Search posts"
          placeholder="Search by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64"
          icon={<Search className="w-4 h-4 text-gray-400" />}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="ml-auto text-xs text-gray-500">
          {filteredPosts.length} posts
        </div>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts match your filters.</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={user!}
              onSupport={handleSupport}
              onToggleComments={() =>
                setOpenComments(openComments === post.id ? null : post.id)
              }
              isOpen={openComments === post.id}
              onCommentSubmit={(e) => handleCommentSubmit(post.id, e)}
              commentText={commentText}
              setCommentText={setCommentText}
              getCommentsForPost={getCommentsForPost}
            />
          ))
        )}
      </div>
    </div>
  );
}

function PostCard({
  post,
  currentUser,
  onSupport,
  onToggleComments,
  isOpen,
  onCommentSubmit,
  commentText,
  setCommentText,
  getCommentsForPost,
}: {
  post: any;
  currentUser: any;
  onSupport: (id: string) => void;
  onToggleComments: () => void;
  isOpen: boolean;
  onCommentSubmit: (e: React.FormEvent) => void;
  commentText: string;
  setCommentText: (v: string) => void;
  getCommentsForPost: (id: string) => any[];
}) {
  const isSupported = /* would use isSupportedByUser */ false;
  const canEditDelete = post.authorId === currentUser.id;

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Avatar src={currentUser.profilePicture} name={post.authorName} size="sm" />
            <div>
              <div className="text-sm font-medium text-gray-900">{post.authorName}</div>
              <div className="text-xs text-gray-500">{post.category}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>{post.supportCount} supports</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
          {post.title}
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed">{post.body}</p>

        <div className="flex items-center gap-4 border-t border-gray-100 pt-3">
          <button
            onClick={() => onSupport(post.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <ThumbsUp className="w-4 h-4" /> Support
          </button>
          <button
            onClick={onToggleComments}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Comments</span>
          </button>
          {canEditDelete && (
            <button
              className="text-sm text-gray-500 hover:text-red-600"
              title="Delete post"
            >
              <Plus className="w-4 h-4" /> Delete
            </button>
          )}
        </div>

        {/* Comments section */}
        {isOpen && (
          <div className="border-t border-gray-100 bg-gray-50 p-4">
            <div className="space-y-3 mb-4">
              {getCommentsForPost(post.id).map((c: any) => (
                <div key={c.id} className="flex gap-2">
                  <Avatar name={c.authorName} size="sm" />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-900">{c.authorName}</div>
                    <p className="text-sm text-gray-700">{c.body}</p>
                  </div>
                </div>
              ))}
              {getCommentsForPost(post.id).length === 0 && (
                <p className="text-xs text-gray-400 italic">No comments yet.</p>
              )}
            </div>
            <form onSubmit={onCommentSubmit} className="flex gap-2">
              <Input
                label=""
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="px-4">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </Card>
  );
}
