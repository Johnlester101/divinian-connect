/**
 * Navbar.tsx
 * ============================================================================
 * DIVINIAN CONNECT — NAVIGATION BAR
 * ============================================================================
 *
 * Desktop: sidebar-style top navigation with links.
 * Mobile: hamburger menu that opens a drawer.
 *
 * Shows/hides links based on whether the user is logged in and their role.
 * ============================================================================
 */

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  MessageSquare,
  ThumbsUp,
  User,
  ShieldAlert,
  GraduationCap,
  LogOut,
  Bell,
  BarChart3,
  Users,
  Mail,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Community Feed', href: '/feed', icon: MessageSquare },
  { name: 'Report a Problem', href: '/problems', icon: ShieldAlert },
  { name: 'Suggestions', href: '/suggestions', icon: ThumbsUp },
  { name: 'Polls', href: '/polls', icon: Mail },
  { name: 'Announcements', href: '/announcements', icon: GraduationCap },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Profile', href: '/profile', icon: User },
];

const adminItems = [
  { name: 'Admin Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'User Management', href: '/admin/users', icon: Users },
];

export function Navbar() {
  const { user, logout, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return null;

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-page flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-navy-600 tracking-tight"
          onClick={() => setMobileMenuOpen(false)}
        >
          <GraduationCap className="w-7 h-7 text-gold-600" />
          <span>Divinian Connect</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-colors',
                      isActive(item.href)
                        ? 'bg-navy-50 text-navy-600 shadow-soft'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-navy-600'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
              {isAdmin && (
                <>
                  <div className="h-6 w-px bg-gray-300 mx-2" />
                  {adminItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-colors',
                          isActive(item.href)
                            ? 'bg-navy-50 text-navy-600 shadow-soft'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-navy-600'
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    );
                  })}
                </>
              )}
              <div className="h-6 w-px bg-gray-300 mx-2" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-navy-600 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium rounded-xl bg-navy-600 text-white px-4 py-2 hover:bg-navy-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && user && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors',
                    isActive(item.href)
                      ? 'bg-navy-50 text-navy-600 shadow-soft'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-navy-600'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
            {isAdmin && (
              <>
                <div className="mx-4 mt-2 mb-1 h-px bg-gray-200" />
                {adminItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors',
                        isActive(item.href)
                          ? 'bg-navy-50 text-navy-600 shadow-soft'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-navy-600'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </>
            )}
            <div className="mx-4 mt-4" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
