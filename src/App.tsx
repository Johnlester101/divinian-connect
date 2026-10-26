/**
 * App.tsx
 * ============================================================================
 * DIVINIAN CONNECT — MAIN APP
 * ============================================================================
 *
 * Sets up React Router and wraps the app with:
 *   - AuthProvider  (login/logout/user state)
 *   - DataProvider  (posts, problems, suggestions, polls, etc.)
 *
 * Routes:
 *   /          Landing page
 *   /login     Login
 *   /register  Register
 *   /dashboard Student dashboard
 *   /feed      Community feed
 *   /problems  Report a problem / view problems
 *   /suggestions Suggestions page
 *   /polls     Polls & voting
 *   /announcements Announcements
 *   /notifications Notifications
 *   /profile   Student profile
 *   /guidelines Community guidelines
 *   /privacy   Privacy policy
 *   /help      Help & FAQ
 *   /admin     Admin dashboard (protected)
 * ============================================================================
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Landing } from '@/pages/Landing';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Dashboard } from '@/pages/Dashboard';
import { CommunityFeed } from '@/pages/CommunityFeed';
import { Problems } from '@/pages/Problems';
import { Suggestions } from '@/pages/Suggestions';
import { Polls } from '@/pages/Polls';
import { Announcements } from '@/pages/Announcements';
import { Notifications } from '@/pages/Notifications';
import { Profile } from '@/pages/Profile';
import { Guidelines } from '@/pages/Guidelines';
import { Privacy } from '@/pages/Privacy';
import { Help } from '@/pages/Help';
import { Admin } from '@/pages/Admin';
import { useAuth } from '@/context/AuthContext';


// Pages that will be created in later steps (placeholder stubs)
// These prevent build errors while we build one page at a time.

// Protected route wrapper — only logged-in users can access
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// Admin-only route wrapper
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes (login required) */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/feed"
                  element={
                    <ProtectedRoute>
                      <CommunityFeed />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/problems"
                  element={
                    <ProtectedRoute>
                      <Problems />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/suggestions"
                  element={
                    <ProtectedRoute>
                      <Suggestions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/polls"
                  element={
                    <ProtectedRoute>
                      <Polls />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/announcements"
                  element={
                    <ProtectedRoute>
                      <Announcements />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <Notifications />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Public info pages */}
                <Route path="/guidelines" element={<Guidelines />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/help" element={<Help />} />

                {/* Admin routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  }
                />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
