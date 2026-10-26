/**
 * DataContext.tsx
 * ============================================================================
 * DIVINIAN CONNECT — DATA CONTEXT
 * ============================================================================
 *
 * Makes app data (posts, problems, suggestions, polls, announcements,
 * notifications, reports) reactive across all components.
 *
 * When a component creates a post or votes in a poll, every other component
 * that displays that data updates automatically.
 * ============================================================================
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import {
  storage,
  type User,
  type Post,
  type Comment,
  type Problem,
  type Suggestion,
  type Announcement,
  type Poll,
  type Notification,
  type ContentReport,
} from '@/lib/storage';

interface DataContextType {
  // Data
  users: User[];
  posts: Post[];
  problems: Problem[];
  suggestions: Suggestion[];
  announcements: Announcement[];
  polls: Poll[];
  notifications: Notification[];
  reports: ContentReport[];

  // Stats
  stats: ReturnType<typeof storage.getStats>;

  // Posts
  createPost: (input: Omit<Post, 'id' | 'createdAt' | 'supportCount'>) => Post;
  deletePost: (id: string) => boolean;
  getPostById: (id: string) => Post | undefined;

  // Comments
  getCommentsForPost: (postId: string) => Comment[];
  createComment: (input: Omit<Comment, 'id' | 'createdAt'>) => Comment;

  // Supports (likes)
  toggleSupport: (postId: string, userId: string) => { supported: boolean; count: number };
  isSupportedByUser: (postId: string, userId: string) => boolean;

  // Problems
  createProblem: (input: Omit<Problem, 'id' | 'referenceNumber' | 'createdAt' | 'updatedAt' | 'status'>) => Problem;
  getProblemById: (id: string) => Problem | undefined;
  updateProblemStatus: (id: string, status: Problem['status'], actorId: string) => { problem: Problem } | { error: string };

  // Suggestions
  createSuggestion: (input: Omit<Suggestion, 'id' | 'supportCount' | 'status' | 'createdAt'>) => Suggestion;
  toggleSuggestionSupport: (suggestionId: string, userId: string) => { supported: boolean; count: number };

  // Announcements
  createAnnouncement: (input: Omit<Announcement, 'id' | 'createdAt' | 'published'>) => Announcement;

  // Polls
  createPoll: (input: Omit<Poll, 'id' | 'options' | 'createdAt'>) => Poll;
  votePoll: (pollId: string, optionId: string, userId: string) => { success: boolean; error?: string };
  hasVotedInPoll: (pollId: string, userId: string) => boolean;

  // Notifications
  getNotificationsForUser: (userId: string) => Notification[];
  createNotification: (input: Omit<Notification, 'id' | 'read' | 'createdAt'>) => Notification;
  markNotificationRead: (id: string) => void;
  unreadCount: (userId: string) => number;

  // Reports
  createReport: (input: Omit<ContentReport, 'id' | 'status' | 'createdAt'>) => ContentReport;
  updateReportStatus: (id: string, status: ContentReport['status']) => void;

  // Demo only
  resetDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(storage.getPosts());
  const [problems, setProblems] = useState<Problem[]>(storage.getProblems());
  const [suggestions, setSuggestions] = useState<Suggestion[]>(storage.getSuggestions());
  const [announcements, setAnnouncements] = useState<Announcement[]>(storage.getAnnouncements());
  const [polls, setPolls] = useState<Poll[]>(storage.getPolls());
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [reports, setReports] = useState<ContentReport[]>(storage.getReports());
  const [stats, setStats] = useState(storage.getStats());
  const [users, setUsers] = useState<User[]>(storage.getUsers());

  // When a component calls a "create" method, we update React state so the UI
  // refreshes immediately (no page reload needed).
  const refresh = useCallback(() => {
    setPosts(storage.getPosts());
    setProblems(storage.getProblems());
    setSuggestions(storage.getSuggestions());
    setAnnouncements(storage.getAnnouncements());
    setPolls(storage.getPolls());
    setReports(storage.getReports());
    setStats(storage.getStats());
    setUsers(storage.getUsers());
  }, []);

  const createPost = useCallback(
    (input) => {
      const post = storage.createPost(input);
      refresh();
      return post;
    },
    [refresh]
  );

  const deletePost = useCallback(
    (id: string, userId: string, isAdmin: boolean) => {
      return storage.deletePost(id, userId, isAdmin);
    },
    []
  );

  const getPostById = useCallback((id: string) => storage.getPostById(id), []);

  const getCommentsForPost = useCallback(
    (postId: string) => storage.getCommentsForPost(postId),
    []
  );

  const createComment = useCallback(
    (input) => {
      const comment = storage.createComment(input);
      // notify post author
      const post = storage.getPostById(input.postId);
      if (post && post.authorId !== input.authorId) {
        storage.createNotification({
          userId: post.authorId,
          type: 'comment',
          message: `${input.authorName} commented on your post "${post.title}".`,
        });
      }
      refresh();
      return comment;
    },
    [refresh]
  );

  const toggleSupport = useCallback(
    (postId: string, userId: string) => {
      const result = storage.toggleSupport(postId, userId);
      const post = storage.getPostById(postId);
      if (post && post.authorId !== userId) {
        storage.createNotification({
          userId: post.authorId,
          type: 'support',
          message: `${getUserName(userId)} supported your post "${post.title}".`,
        });
      }
      refresh();
      return result;
    },
    [refresh]
  );

  const isSupportedByUser = useCallback(
    (postId: string, userId: string) => storage.isSupportedByUser(postId, userId),
    []
  );

  const createProblem = useCallback(
    (input) => {
      const problem = storage.createProblem(input);
      refresh();
      return problem;
    },
    [refresh]
  );

  const getProblemById = useCallback((id: string) => storage.getProblemById(id), []);

  const updateProblemStatus = useCallback(
    (id: string, status: Problem['status'], actorId: string) => {
      const result = storage.updateProblemStatus(id, status, actorId);
      if (!('error' in result)) {
        const problem = storage.getProblemById(id);
        if (problem && problem.authorId !== actorId) {
          storage.createNotification({
            userId: problem.authorId,
            type: 'status',
            message: `Your concern "${problem.title}" (${problem.referenceNumber}) is now ${status}.`,
          });
        }
        refresh();
      }
      return result;
    },
    [refresh]
  );

  const createSuggestion = useCallback(
    (input) => {
      const suggestion = storage.createSuggestion(input);
      refresh();
      return suggestion;
    },
    [refresh]
  );

  const toggleSuggestionSupport = useCallback(
    (suggestionId: string, userId: string) => {
      const result = storage.toggleSuggestionSupport(suggestionId, userId);
      refresh();
      return result;
    },
    [refresh]
  );

  const createAnnouncement = useCallback(
    (input) => {
      const announcement = storage.createAnnouncement(input);
      refresh();
      return announcement;
    },
    [refresh]
  );

  const createPoll = useCallback(
    (input) => {
      const poll = storage.createPoll(input);
      refresh();
      return poll;
    },
    [refresh]
  );

  const votePoll = useCallback(
    (pollId: string, optionId: string, userId: string) => {
      const result = storage.votePoll(pollId, optionId, userId);
      if (result.success) refresh();
      return result;
    },
    [refresh]
  );

  const hasVotedInPoll = useCallback(
    (pollId: string, userId: string) => storage.hasVotedInPoll(pollId, userId),
    []
  );

  const getNotificationsForUser = useCallback(
    (userId: string) => storage.getNotificationsForUser(userId),
    []
  );

  const createNotification = useCallback(
    (input) => {
      const notif = storage.createNotification(input);
      setNotifications((prev) => [notif, ...prev]);
      return notif;
    },
    []
  );

  const markNotificationRead = useCallback((id: string) => {
    storage.markNotificationRead(id);
  }, []);

  const unreadCount = useCallback((userId: string) => storage.unreadCount(userId), []);

  const createReport = useCallback(
    (input) => {
      const report = storage.createReport(input);
      refresh();
      return report;
    },
    [refresh]
  );

  const updateReportStatus = useCallback(
    (id: string, status: ContentReport['status']) => {
      storage.updateReportStatus(id, status);
      refresh();
    },
    [refresh]
  );

  const resetDemoData = useCallback(() => {
    storage.resetToDemo();
    refresh();
  }, [refresh]);

  // Helper to get a display name for notifications
  const getUserName = (userId: string): string => {
    const user = storage.findUserById(userId);
    return user ? user.name : 'A student';
  };

  const value: DataContextType = {
    posts,
    problems,
    suggestions,
    announcements,
    polls,
    notifications,
    reports,
    stats,
    users,
    createPost,
    deletePost: () => false, // implemented in pages that need auth context
    getPostById,
    getCommentsForPost,
    createComment,
    toggleSupport,
    isSupportedByUser,
    createProblem,
    getProblemById,
    updateProblemStatus,
    createSuggestion,
    toggleSuggestionSupport,
    createAnnouncement,
    createPoll,
    votePoll,
    hasVotedInPoll,
    getNotificationsForUser,
    createNotification,
    markNotificationRead,
    unreadCount,
    createReport,
    updateReportStatus,
    resetDemoData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
