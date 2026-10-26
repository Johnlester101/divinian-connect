/**
 * Footer.tsx
 * Simple footer with prototype disclaimer and links.
 */

import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-navy-900 text-navy-100 mt-auto py-10">
      <div className="container-page flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-gold-400" />
          <span className="text-sm font-medium">Divinian Connect</span>
        </div>

        <div className="hidden md:flex gap-6 text-xs text-navy-300">
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

        <div className="flex items-center gap-3 text-xs text-navy-400">
          <div className="flex items-center gap-1">
            <Mail className="w-3 h-3" />
            <span>support@dwcsj.edu.ph (demo)</span>
          </div>
        </div>

        <p className="text-[10px] text-navy-500">
          School project prototype — not an official DWCSJ website unless
          officially approved.
        </p>
      </div>
    </footer>
  );
}
