/**
 * storage.ts
 * ============================================================================
 * DIVINIAN CONNECT — DATA LAYER (Frontend-Only Prototype)
 * ============================================================================
 *
 * This file manages all application data using the browser's localStorage.
 * When you refresh the page, your data is still there.
 *
 * LIMITATION (important for beginners):
 *   - Data is stored only on YOUR computer/browser.
 *   - Other people cannot see your posts or account.
 *   - If you clear browser data, everything is deleted.
 *
 * LATER STEP: We will replace this with Supabase (a real shared database)
 * so all students can see the same posts and accounts.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. TYPE DEFINITIONS
// These describe the shape of every piece of data in the app.
// ---------------------------------------------------------------------------

export type UserRole = 'student' | 'moderator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  course?: string;
  yearLevel?: string;
  profilePicture?: string;
  createdAt: string;
  // NOTE: In a real app, never store passwords. Store a secure hash instead.
  // For this prototype we store a simple hash-like value only for demo login.
  passwordHash: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  category: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  imageUrl?: string;
  createdAt: string;
  supportCount: number;
  isAnonymous?: boolean;
  isOfficial?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface Problem {
  id: string;
  referenceNumber: string;
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  status: 'Open' | 'Under Review' | 'In Progress' | 'Resolved';
  authorId: string;
  authorName: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  isAnonymous?: boolean;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  authorId: string;
  authorName: string;
  supportCount: number;
  status: 'Open' | 'Under Review' | 'In Progress' | 'Resolved';
  createdAt: string;
  isAnonymous?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  authorId: string;
  authorName: string;
  isOfficial: boolean;
  published: boolean;
  createdAt: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdBy: string;
  createdByName: string;
  expiresAt: string;
  createdAt: string;
}

export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  type:
    | 'comment'
    | 'reply'
    | 'support'
    | 'status'
    | 'announcement';
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ContentReport {
  id: string;
  contentType: 'post' | 'comment' | 'problem' | 'suggestion';
  contentId: string;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface Support {
  postId: string;
  userId: string;
}

export interface PollVote {
  pollId: string;
  userId: string;
  optionId: string;
}

// ---------------------------------------------------------------------------
// 2. COMPLETE DATABASE STATE SHAPE
// ---------------------------------------------------------------------------

export interface DBState {
  users: User[];
  posts: Post[];
  comments: Comment[];
  problems: Problem[];
  suggestions: Suggestion[];
  announcements: Announcement[];
  polls: Poll[];
  notifications: Notification[];
  reports: ContentReport[];
  supports: Support[];
  pollVotes: PollVote[];
}

// ---------------------------------------------------------------------------
// 3. STORAGE KEYS & HELPERS
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'divinian_connect_db_v1';

const now = (): string => new Date().toISOString();

const makeId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// A very simple demo-only "hash". NOT secure for production!
// Replace with real password hashing (bcrypt/argon2) when adding a backend.
const demoHash = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // convert to 32-bit integer
  }
  return 'demo_' + Math.abs(hash).toString(16);
};

// ---------------------------------------------------------------------------
// 4. SAMPLE DEMO DATA
// ============================================================================
// NOTE: This is a SCHOOL PROJECT PROTOTYPE.
// We do NOT invent official DWCSJ announcements, contact details, or
// official endorsements. Everything here is clearly sample demonstration data.
// ============================================================================

const demoUsers: User[] = [
  {
    id: 'user_1',
    name: 'Juan Dela Cruz',
    email: 'student@dwcsj.edu.ph',
    role: 'student',
    course: 'BS Information Technology',
    yearLevel: '3rd Year',
    createdAt: now(),
    passwordHash: demoHash('password123'),
  },
  {
    id: 'user_2',
    name: 'Maria Santos',
    email: 'maria@dwcsj.edu.ph',
    role: 'student',
    course: 'BS Education',
    yearLevel: '2nd Year',
    createdAt: now(),
    passwordHash: demoHash('password123'),
  },
  {
    id: 'user_3',
    name: 'Admin Moderator',
    email: 'admin@dwcsj.edu.ph',
    role: 'admin',
    createdAt: now(),
    passwordHash: demoHash('admin123'),
  },
];

const demoPosts: Post[] = [
  {
    id: 'post_1',
    title: 'Wi-Fi is slow in the library',
    body:
      'The internet connection in the library has been very slow this week. It is hard to do research and submit assignments online. Hope this can be looked into.',
    category: 'Internet & Wi-Fi',
    authorId: 'user_1',
    authorName: 'Juan Dela Cruz',
    authorRole: 'student',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    supportCount: 12,
    isAnonymous: false,
  },
  {
    id: 'post_2',
    title: 'Comfort rooms need cleaning',
    body:
      'The comfort rooms near the IT building are not cleaned regularly. There is no soap or tissue most of the time. Please improve sanitation.',
    category: 'Cleanliness & Comfort Rooms',
    authorId: 'user_2',
    authorName: 'Maria Santos',
    authorRole: 'student',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    supportCount: 8,
    isAnonymous: false,
  },
  {
    id: 'post_3',
    title: 'Suggestion: More study areas',
    body:
      'Can we have more quiet study areas with power outlets? Many students struggle to find a place to review for exams.',
    category: 'Student Services',
    authorId: 'user_1',
    authorName: 'Juan Dela Cruz',
    authorRole: 'student',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    supportCount: 15,
    isAnonymous: false,
  },
];

const demoProblems: Problem[] = [
  {
    id: 'prob_1',
    referenceNumber: 'DWCSJ-2026-001',
    title: 'Projector not working in Room 201',
    description:
      'The projector in Room 201 does not turn on. IT classes cannot proceed properly.',
    category: 'Classroom Facilities & Equipment',
    urgency: 'high',
    status: 'Open',
    authorId: 'user_2',
    authorName: 'Maria Santos',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    isAnonymous: false,
  },
  {
    id: 'prob_2',
    referenceNumber: 'DWCSJ-2026-002',
    title: 'Broken faucet at comfort room near cafeteria',
    description:
      'One of the faucets at the comfort room near the cafeteria is leaking and cannot be closed properly.',
    category: 'Cleanliness & Comfort Rooms',
    urgency: 'medium',
    status: 'Under Review',
    authorId: 'user_1',
    authorName: 'Juan Dela Cruz',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    isAnonymous: false,
  },
];

const demoSuggestions: Suggestion[] = [
  {
    id: 'sugg_1',
    title: 'Additional power outlets in classrooms',
    description:
      'Please add more power outlets in classrooms so students can charge laptops during lectures.',
    category: 'Facilities',
    authorId: 'user_1',
    authorName: 'Juan Dela Cruz',
    supportCount: 20,
    status: 'Under Review',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    isAnonymous: false,
  },
  {
    id: 'sugg_2',
    title: 'Recycling bins around campus',
    description:
      'Add clearly labeled recycling bins to support environmental sustainability.',
    category: 'Environmental & Sustainability',
    authorId: 'user_2',
    authorName: 'Maria Santos',
    supportCount: 9,
    status: 'Open',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    isAnonymous: false,
  },
];

const initialState: DBState = {
  users: demoUsers,
  posts: demoPosts,
  comments: [],
  problems: demoProblems,
  suggestions: demoSuggestions,
  announcements: [],
  polls: [],
  notifications: [],
  reports: [],
  supports: [],
  pollVotes: [],
};

// ---------------------------------------------------------------------------
// 5. STORAGE CLASS
// ============================================================================
// All data lives here. Each method reads from or writes to localStorage.
// ============================================================================
export class DivinianStorage {
  private state: DBState;

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        this.state = JSON.parse(saved) as DBState;
        // Ensure every expected key exists (defensive, in case schema changes)
        this.state = this.mergeDefaults(this.state);
      } catch {
        this.state = { ...initialState };
        this.save();
      }
    } else {
      this.state = { ...initialState };
      this.save();
    }
  }

  private mergeDefaults(partial: Partial<DBState>): DBState {
    return {
      users: partial.users ?? [],
      posts: partial.posts ?? [],
      comments: partial.comments ?? [],
      problems: partial.problems ?? [],
      suggestions: partial.suggestions ?? [],
      announcements: partial.announcements ?? [],
      polls: partial.polls ?? [],
      notifications: partial.notifications ?? [],
      reports: partial.reports ?? [],
      supports: partial.supports ?? [],
      pollVotes: partial.pollVotes ?? [],
    };
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }

  // ---------------------------------------------------------------------------
  // AUTH / USERS
  // ---------------------------------------------------------------------------

  getUsers(): User[] {
    return [...this.state.users];
  }

  findUserByEmail(email: string): User | undefined {
    return this.state.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id: string): User | undefined {
    return this.state.users.find((u) => u.id === id);
  }

  registerUser(input: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    course?: string;
    yearLevel?: string;
  }): { user: User } | { error: string } {
    const existing = this.findUserByEmail(input.email);
    if (existing) {
      return { error: 'An account with this email already exists.' };
    }

    const user: User = {
      id: 'user_' + makeId(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      role: input.role ?? 'student',
      course: input.course,
      yearLevel: input.yearLevel,
      createdAt: now(),
      passwordHash: demoHash(input.password),
    };

    this.state.users.push(user);
    this.save();
    return { user };
  }

  authenticate(email: string, password: string): { user: User } | { error: string } {
    const user = this.findUserByEmail(email);
    if (!user) {
      return { error: 'Invalid email or password.' };
    }
    if (user.passwordHash !== demoHash(password)) {
      return { error: 'Invalid email or password.' };
    }
    return { user };
  }

  updateProfile(userId: string, updates: Partial<Pick<User, 'name' | 'course' | 'yearLevel' | 'profilePicture'>>): { user: User } | { error: string } {
    const idx = this.state.users.findIndex((u) => u.id === userId);
    if (idx === -1) return { error: 'User not found.' };

    this.state.users[idx] = { ...this.state.users[idx], ...updates };
    this.save();
    return { user: this.state.users[idx] };
  }

  // ---------------------------------------------------------------------------
  // POSTS
  // ---------------------------------------------------------------------------

  getPosts(): Post[] {
    return [...this.state.posts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getPostById(id: string): Post | undefined {
    return this.state.posts.find((p) => p.id === id);
  }

  createPost(input: {
    title: string;
    body: string;
    category: string;
    authorId: string;
    authorName: string;
    authorRole: UserRole;
    imageUrl?: string;
    isAnonymous?: boolean;
    isOfficial?: boolean;
  }): Post {
    const post: Post = {
      id: 'post_' + makeId(),
      title: input.title.trim(),
      body: input.body.trim(),
      category: input.category.trim(),
      authorId: input.authorId,
      authorName: input.authorName,
      authorRole: input.authorRole,
      imageUrl: input.imageUrl,
      createdAt: now(),
      supportCount: 0,
      isAnonymous: input.isAnonymous,
      isOfficial: input.isOfficial,
    };
    this.state.posts.push(post);
    this.save();
    return post;
  }

  deletePost(id: string, userId: string, isAdmin: boolean): boolean {
    const post = this.getPostById(id);
    if (!post) return false;
    if (!isAdmin && post.authorId !== userId) return false;

    this.state.posts = this.state.posts.filter((p) => p.id !== id);
    this.state.comments = this.state.comments.filter((c) => c.postId !== id);
    this.state.supports = this.state.supports.filter((s) => s.postId !== id);
    this.save();
    return true;
  }

  // ---------------------------------------------------------------------------
  // COMMENTS
  // ---------------------------------------------------------------------------

  getCommentsForPost(postId: string): Comment[] {
    return this.state.comments
      .filter((c) => c.postId === postId)
      .sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }

  createComment(input: {
    postId: string;
    authorId: string;
    authorName: string;
    body: string;
  }): Comment {
    const comment: Comment = {
      id: 'comment_' + makeId(),
      postId: input.postId,
      authorId: input.authorId,
      authorName: input.authorName,
      body: input.body.trim(),
      createdAt: now(),
    };
    this.state.comments.push(comment);
    this.save();
    return comment;
  }

  // ---------------------------------------------------------------------------
  // SUPPORTS (likes)
  // ---------------------------------------------------------------------------

  toggleSupport(postId: string, userId: string): { supported: boolean; count: number } {
    const existingIndex = this.state.supports.findIndex(
      (s) => s.postId === postId && s.userId === userId
    );

    if (existingIndex !== -1) {
      // Remove support (unlike)
      this.state.supports.splice(existingIndex, 1);
      const post = this.state.posts.find((p) => p.id === postId);
      if (post) post.supportCount = Math.max(0, (post.supportCount || 0) - 1);
      this.save();
      return { supported: false, count: post?.supportCount ?? 0 };
    }

    // Add support
    this.state.supports.push({ postId, userId });
    const post = this.state.posts.find((p) => p.id === postId);
    if (post) post.supportCount = (post.supportCount || 0) + 1;
    this.save();
    return { supported: true, count: post?.supportCount ?? 0 };
  }

  isSupportedByUser(postId: string, userId: string): boolean {
    return this.state.supports.some(
      (s) => s.postId === postId && s.userId === userId
    );
  }

  // ---------------------------------------------------------------------------
  // PROBLEMS / CONCERNS
  // ---------------------------------------------------------------------------

  getProblems(): Problem[] {
    return [...this.state.problems].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getProblemById(id: string): Problem | undefined {
    return this.state.problems.find((p) => p.id === id);
  }

  createProblem(input: {
    title: string;
    description: string;
    category: string;
    urgency: 'low' | 'medium' | 'high' | 'urgent';
    authorId: string;
    authorName: string;
    imageUrl?: string;
    isAnonymous?: boolean;
  }): Problem {
    const ref = 'DWCSJ-2026-' + String(100 + this.state.problems.length + 1).padStart(3, '0');
    const problem: Problem = {
      id: 'prob_' + makeId(),
      referenceNumber: ref,
      title: input.title.trim(),
      description: input.description.trim(),
      category: input.category.trim(),
      urgency: input.urgency,
      status: 'Open',
      authorId: input.authorId,
      authorName: input.authorName,
      imageUrl: input.imageUrl,
      createdAt: now(),
      updatedAt: now(),
      isAnonymous: input.isAnonymous,
    };
    this.state.problems.push(problem);
    this.save();
    return problem;
  }

  updateProblemStatus(
    id: string,
    status: Problem['status'],
    _actorId: string
  ): { problem: Problem } | { error: string } {
    const problem = this.state.problems.find((p) => p.id === id);
    if (!problem) return { error: 'Problem not found.' };

    problem.status = status;
    problem.updatedAt = now();
    this.save();
    return { problem };
  }

  // ---------------------------------------------------------------------------
  // SUGGESTIONS
  // ---------------------------------------------------------------------------

  getSuggestions(): Suggestion[] {
    return [...this.state.suggestions].sort(
      (a, b) => (b.supportCount || 0) - (a.supportCount || 0)
    );
  }

  createSuggestion(input: {
    title: string;
    description: string;
    category: string;
    authorId: string;
    authorName: string;
    isAnonymous?: boolean;
  }): Suggestion {
    const suggestion: Suggestion = {
      id: 'sugg_' + makeId(),
      title: input.title.trim(),
      description: input.description.trim(),
      category: input.category.trim(),
      authorId: input.authorId,
      authorName: input.authorName,
      supportCount: 0,
      status: 'Open',
      createdAt: now(),
      isAnonymous: input.isAnonymous,
    };
    this.state.suggestions.push(suggestion);
    this.save();
    return suggestion;
  }

  toggleSuggestionSupport(suggestionId: string, userId: string): {
    supported: boolean;
    count: number;
  } {
    const suggestion = this.state.suggestions.find((s) => s.id === suggestionId);
    if (!suggestion) return { supported: false, count: 0 };

    const existing = this.state.supports.find(
      (s) => s.postId === suggestionId && s.userId === userId
    );

    if (existing) {
      this.state.supports = this.state.supports.filter(
        (s) => !(s.postId === suggestionId && s.userId === userId)
      );
      suggestion.supportCount = Math.max(0, suggestion.supportCount - 1);
      this.save();
      return { supported: false, count: suggestion.supportCount };
    }

    this.state.supports.push({ postId: suggestionId, userId });
    suggestion.supportCount += 1;
    this.save();
    return { supported: true, count: suggestion.supportCount };
  }

  // ---------------------------------------------------------------------------
  // ANNOUNCEMENTS
  // ---------------------------------------------------------------------------

  getAnnouncements(): Announcement[] {
    return this.state.announcements
      .filter((a) => a.published)
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  createAnnouncement(input: {
    title: string;
    body: string;
    authorId: string;
    authorName: string;
    isOfficial: boolean;
  }): Announcement {
    const announcement: Announcement = {
      id: 'ann_' + makeId(),
      title: input.title.trim(),
      body: input.body.trim(),
      authorId: input.authorId,
      authorName: input.authorName,
      isOfficial: input.isOfficial,
      published: true,
      createdAt: now(),
    };
    this.state.announcements.push(announcement);
    this.save();
    return announcement;
  }

  // ---------------------------------------------------------------------------
  // POLLS
  // ---------------------------------------------------------------------------

  getPolls(): Poll[] {
    return [...this.state.polls].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  createPoll(input: {
    question: string;
    options: string[];
    createdBy: string;
    createdByName: string;
    expiresAt: string;
  }): Poll {
    const poll: Poll = {
      id: 'poll_' + makeId(),
      question: input.question.trim(),
      options: input.options.map((text) => ({
        id: 'opt_' + makeId(),
        text: text.trim(),
        voteCount: 0,
      })),
      createdBy: input.createdBy,
      createdByName: input.createdByName,
      expiresAt: input.expiresAt,
      createdAt: now(),
    };
    this.state.polls.push(poll);
    this.save();
    return poll;
  }

  votePoll(pollId: string, optionId: string, userId: string): { success: boolean; error?: string } {
    const poll = this.state.polls.find((p) => p.id === pollId);
    if (!poll) return { success: false, error: 'Poll not found.' };

    const nowDate = new Date();
    if (new Date(poll.expiresAt) < nowDate) {
      return { success: false, error: 'Poll has already closed.' };
    }

    const alreadyVoted = this.state.pollVotes.some(
      (v) => v.pollId === pollId && v.userId === userId
    );
    if (alreadyVoted) {
      return { success: false, error: 'You have already voted in this poll.' };
    }

    const option = poll.options.find((o) => o.id === optionId);
    if (!option) return { success: false, error: 'Invalid option.' };

    option.voteCount += 1;
    this.state.pollVotes.push({ pollId, userId, optionId });
    this.save();
    return { success: true };
  }

  hasVotedInPoll(pollId: string, userId: string): boolean {
    return this.state.pollVotes.some(
      (v) => v.pollId === pollId && v.userId === userId
    );
  }

  // ---------------------------------------------------------------------------
  // NOTIFICATIONS
  // ---------------------------------------------------------------------------

  getNotificationsForUser(userId: string): Notification[] {
    return this.state.notifications
      .filter((n) => n.userId === userId)
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  createNotification(input: {
    userId: string;
    type: Notification['type'];
    message: string;
  }): Notification {
    const notification: Notification = {
      id: 'notif_' + makeId(),
      userId: input.userId,
      type: input.type,
      message: input.message,
      read: false,
      createdAt: now(),
    };
    this.state.notifications.push(notification);
    this.save();
    return notification;
  }

  markNotificationRead(id: string): void {
    const notif = this.state.notifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      this.save();
    }
  }

  unreadCount(userId: string): number {
    return this.state.notifications.filter(
      (n) => n.userId === userId && !n.read
    ).length;
  }

  // ---------------------------------------------------------------------------
  // REPORTS
  // ---------------------------------------------------------------------------

  getReports(): ContentReport[] {
    return [...this.state.reports].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  createReport(input: {
    contentType: ContentReport['contentType'];
    contentId: string;
    reportedBy: string;
    reason: string;
  }): ContentReport {
    const report: ContentReport = {
      id: 'report_' + makeId(),
      contentType: input.contentType,
      contentId: input.contentId,
      reportedBy: input.reportedBy,
      reason: input.reason,
      status: 'pending',
      createdAt: now(),
    };
    this.state.reports.push(report);
    this.save();
    return report;
  }

  updateReportStatus(id: string, status: ContentReport['status']): void {
    const report = this.state.reports.find((r) => r.id === id);
    if (report) {
      report.status = status;
      this.save();
    }
  }

  // ---------------------------------------------------------------------------
  // STATS
  // ---------------------------------------------------------------------------

  getStats() {
    return {
      totalUsers: this.state.users.length,
      totalPosts: this.state.posts.length,
      totalComments: this.state.comments.length,
      openProblems: this.state.problems.filter((p) => p.status === 'Open').length,
      resolvedProblems: this.state.problems.filter((p) => p.status === 'Resolved').length,
      totalSuggestions: this.state.suggestions.length,
      totalReports: this.state.reports.length,
      totalPolls: this.state.polls.length,
    };
  }

  // ---------------------------------------------------------------------------
  // RESET (for demo / testing only)
  // ---------------------------------------------------------------------------

  resetToDemo(): void {
    this.state = { ...initialState };
    this.save();
  }
}

// ---------------------------------------------------------------------------
// 6. SINGLETON INSTANCE
// ---------------------------------------------------------------------------
// Import this one instance anywhere in the app:
//   import { storage } from '@/lib/storage';
export const storage = new DivinianStorage();
