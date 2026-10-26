/**
 * Landing.tsx
 * ============================================================================
 * PPT-STYLE PRESENTATION DESIGN
 * ============================================================================
 * Presentation-style landing page with slide carousel,
 * bullet-point sections, and deck-like layout.
 * ============================================================================
 */

import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Users, MessageSquare, ThumbsUp, Bell, CheckCircle2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SlideCarousel } from '@/components/layout/SlideCarousel';

const features = [
  {
    icon: MessageSquare,
    title: 'Community Feed',
    points: [
      'Post discussions & announcements',
      'Comment & reply to posts',
      'Support ideas with likes',
      'Search & filter by category',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Report a Problem',
    points: [
      'Reference numbers for tracking',
      'Status: Open → Resolved',
      'Urgency levels',
      'Admin status updates',
    ],
  },
  {
    icon: ThumbsUp,
    title: 'Suggestions & Polls',
    points: [
      'Submit improvement ideas',
      'Support fellow students',
      'Vote in campus polls',
      'Track poll results',
    ],
  },
];

const steps = [
  { number: '01', title: 'Register', description: 'Create your student account with school email' },
  { number: '02', title: 'Post', description: 'Share concerns, suggestions, or ideas' },
  { number: '03', title: 'Track', description: 'Watch problems get resolved' },
];

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* PPT Hero Slide Deck */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 to-navy-800" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
        <div className="absolute left-0 top-0 h-full w-[1px] bg-white/20" />
        <div className="absolute right-0 top-0 h-full w-[1px] bg-white/20" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 h-full flex flex-col justify-center">
          {/* PPT Title Bar */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-gold-400" />
              <span className="text-sm font-semibold text-gray-300 uppercase tracking-widest">
                Divinian Connect
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-gray-300 border-gray-600 hover:text-white hover:border-white px-4 py-2 text-sm">
                Login
              </Button>
              <Button className="bg-gold-500 text-navy-900 hover:bg-gold-400 px-6 py-2 text-sm font-bold">
                Register
              </Button>
            </div>
          </div>

          <SlideCarousel />
        </div>
      </section>

      {/* PPT Section: Features */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-navy-600 font-semibold text-sm tracking-widest uppercase">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Everything Divinians Need</h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-xl transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.icon === MessageSquare ? 'bg-blue-100 text-blue-600' : feature.icon === ShieldCheck ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  {feature.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-gold-500 font-bold mt-0.5">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PPT Section: How It Works */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-semibold text-sm tracking-widest uppercase">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Three Simple Steps</h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center mx-auto mb-6 text-navy-900 font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PPT Section: CTA */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Be Heard?</h2>
          <p className="text-gray-600 text-lg mb-10">
            Join hundreds of Divinians improving campus life together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button className="px-8 py-3 text-lg font-bold bg-navy-600 text-white hover:bg-navy-700 shadow-lg">
                Get Started — Register
              </Button>
            </Link>
            <Link to="/login" className="text-navy-600 font-medium hover:underline text-sm">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-navy-900 text-navy-300 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-gold-400" />
            <span className="font-semibold text-gray-200">Divinian Connect</span>
          </div>
          <div className="flex gap-6">
            <Link to="/guidelines" className="hover:text-white transition-colors">
              Community Guidelines
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/help" className="hover:text-white transition-colors">
              Help & FAQ
            </Link>
          </div>
          <p className="text-[10px] text-gray-500">
            School project prototype — not official DWCSJ unless approved.
          </p>
        </div>
      </footer>
    </div>
  );
}
