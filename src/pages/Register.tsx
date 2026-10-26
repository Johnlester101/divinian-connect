/**
 * Register.tsx
 * Student registration page.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Mail, Lock, User, GraduationCap } from 'lucide-react';

export function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    course: '',
    yearLevel: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email address.';
    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const result = register({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: 'student',
      course: form.course.trim() || undefined,
      yearLevel: form.yearLevel.trim() || undefined,
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors({ email: result.error || 'Registration failed. Please try again.' });
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
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Create an account</h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            Join the Divinian community
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full name"
              type="text"
              placeholder="Juan Dela Cruz"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
              icon={<User className="w-4 h-4 text-gray-400" />}
              required
            />
            <Input
              label="School email"
              type="email"
              placeholder="name@dwcsj.edu.ph"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              icon={<Mail className="w-4 h-4 text-gray-400" />}
              helperText="Use your school-approved email address."
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              icon={<Lock className="w-4 h-4 text-gray-400" />}
              required
            />
            <Input
              label="Course (optional)"
              type="text"
              placeholder="BS Information Technology"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              icon={<GraduationCap className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="Year level (optional)"
              type="text"
              placeholder="3rd Year"
              value={form.yearLevel}
              onChange={(e) => setForm({ ...form, yearLevel: e.target.value })}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-navy-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

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
