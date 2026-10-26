/**
 * Landing.tsx
 * ============================================================================
 * DIVINIAN CONNECT — LANDING PAGE
 * ============================================================================
 *
 * The public home page. Welcomes visitors and explains what the platform is.
 * Includes a clear prototype disclaimer.
 * ============================================================================
 */

import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, MessageSquare, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-navy-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container-page text-center px-4">
          <Badge variant="gold" className="mb-6 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-800" />
            SCHOOL PROJECT PROTOTYPE
          </Badge>

          <div className="inline-block relative">
            <div className="absolute inset-0 bg-navy-600/10 rounded-full blur-xl" />
            <GraduationCap className="relative w-20 h-20 text-navy-600" />
          </div>

          <h1 className="mt-8 text-4xl md:text-6xl font-bold text-balance text-gray-900 tracking-tight">
            Your Voice.<br />
            Your Campus.<br />
            Your Community.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A student community platform for Divine Word College of San Jose.
            Share campus concerns, submit suggestions, join discussions, vote in
            polls, and stay updated with announcements — all in one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 text-lg font-semibold rounded-xl bg-navy-600 text-white hover:bg-navy-700 shadow-soft transition-colors"
            >
              Get Started — Register
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 text-lg font-semibold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Already have an account? Login
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FeatureCard
              icon={MessageSquare}
              title="Community Feed"
              description="Post discussions, comment, and support fellow Divinians."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Report a Problem"
              description="Report campus issues and track their status until resolved."
            />
            <FeatureCard
              icon={ThumbsUp}
              title="Suggestions & Polls"
              description="Submit improvement ideas and vote on campus decisions."
            />
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-gray-200 bg-gray-50">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard number="1" title="Create an account" description="Register with your school email and set up your student profile." />
            <StepCard number="2" title="Join the conversation" description="Post a concern, share a suggestion, or comment on a fellow student's post." />
            <StepCard number="3" title="See change happen" description="Track problem statuses, vote in polls, and receive notifications." />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-soft">
      <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center mb-4 text-navy-600">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string | number; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-soft flex flex-col gap-3">
      <div className="w-8 h-8 rounded-full bg-navy-600 text-white flex items-center justify-center text-sm font-bold">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
