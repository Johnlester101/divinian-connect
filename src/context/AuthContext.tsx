/**
 * AuthContext.tsx
 * ============================================================================
 * DIVINIAN CONNECT — AUTHENTICATION CONTEXT
 * ============================================================================
 *
 * Manages the signed-in user across the whole app.
 * Any component wrapped by <AuthProvider> can use useAuth() to:
 *   - Know who is logged in (user)
 *   - Log in (login)
 *   - Register a new account (register)
 *   - Log out (logout)
 *   - Check the user's role (isStudent, isModerator, isAdmin)
 * ============================================================================
 */

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { storage, type User, type UserRole } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (input: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    course?: string;
    yearLevel?: string;
  }) => { success: boolean; user?: User; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, 'name' | 'course' | 'yearLevel' | 'profilePicture'>>) => { success: boolean; error?: string };
  isStudent: boolean;
  isModerator: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for a saved user in localStorage when the app starts
  const loadUser = useCallback(() => {
    const saved = localStorage.getItem('divinian_connect_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as User;
        setUser(parsed);
      } catch {
        // ignore bad data
      }
    }
    setLoading(false);
  }, []);

  // In a real app we'd run this once. Using useEffect would be typical;
  // here we call it directly and guard loading state.
  if (typeof window !== 'undefined' && loading) {
    loadUser();
  }

  const login = useCallback(
    (email: string, password: string) => {
      const result = storage.authenticate(email, password);
      if ('error' in result) {
        return { success: false, error: result.error };
      }
      setUser(result.user);
      localStorage.setItem('divinian_connect_user', JSON.stringify(result.user));
      return { success: true };
    },
    []
  );

  const register = useCallback(
    (input: {
      name: string;
      email: string;
      password: string;
      role?: UserRole;
      course?: string;
      yearLevel?: string;
    }) => {
      const result = storage.registerUser(input);
      if ('error' in result) {
        return { success: false, error: result.error };
      }
      setUser(result.user);
      localStorage.setItem('divinian_connect_user', JSON.stringify(result.user));
      return { success: true, user: result.user };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('divinian_connect_user');
  }, []);

  const updateProfile = useCallback(
    (updates: Partial<Pick<User, 'name' | 'course' | 'yearLevel' | 'profilePicture'>>) => {
      if (!user) return { success: false, error: 'Not logged in.' };
      const result = storage.updateProfile(user.id, updates);
      if ('error' in result) {
        return { success: false, error: result.error };
      }
      setUser(result.user);
      localStorage.setItem('divinian_connect_user', JSON.stringify(result.user));
      return { success: true };
    },
    [user]
  );

  const isStudent = user?.role === 'student';
  const isModerator = user?.role === 'moderator';
  const isAdmin = user?.role === 'admin';

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isStudent,
    isModerator,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
