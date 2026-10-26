/**
 * Login.tsx
 * Student / administrator login page.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Mail, Lock } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="px-8 py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-navy-600 flex items-center justify-center text-white">
              <GraduationCapIcon className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-navy-600">Divinian Connect</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Welcome back</h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            Sign in to your Divinian Connect account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="name@dwcsj.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4 text-gray-400" />}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4 text-gray-400" />}
              required
            />
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-navy-600 font-medium hover:underline">
              Create an account
            </Link>
          </p>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 mb-2">Demo accounts:</p>
            <div className="flex justify-center gap-4 text-xs text-gray-500">
              <span>student@dwcsj.edu.ph / password123</span>
              <span className="text-gray-300">|</span>
              <span>admin@dwcsj.edu.ph / admin123</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Simple inline icon to avoid extra file
function GraduationCapIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l3 3m0 0L14 10m-5 5 3-3M4 7v2c0 .552.226 1.053.592 1.416a2 2 0 001.412.584h9.796a2 2 0 001.412-.584C17.774 9.053 18 8.552 18 7V7m-8 9V7m0 0l3-3m3 3 3 3m-6 0h.01M13 20h-3v-2a2 2 0 012-2h2a2 2 0 012 2v2z" />
    </svg>
  );
}
