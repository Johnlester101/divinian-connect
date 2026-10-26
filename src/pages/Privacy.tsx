/**
 * Privacy.tsx
 * Privacy Policy page.
 */

import { Card } from '@/components/ui/Card';

export function Privacy() {
  return (
    <div className="container-page">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Your privacy matters</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            This privacy notice explains how Divinian Connect handles your
            information in this prototype.
          </p>

          <h3 className="text-md font-semibold text-gray-900 mb-2">What we collect</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4 leading-relaxed space-y-1">
            <li>Your name, email, course, and year level (profile).</li>
            <li>Posts, comments, suggestions, and polls you create.</li>
            <li>Your votes and supports on content.</li>
          </ul>

          <h3 className="text-md font-semibold text-gray-900 mb-2">How data is stored (prototype)</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            In this prototype, all data is saved in your browser's localStorage.
            This means:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 leading-relaxed space-y-1">
            <li>Only you can see your data on this device.</li>
            <li>Other students cannot see your posts or account.</li>
            <li>Clearing browser data deletes everything.</li>
          </ul>

          <h3 className="text-md font-semibold text-gray-900 mb-2">Anonymous submissions</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Your name is hidden from other users on anonymous submissions, but
            moderators may still access identity information for serious or urgent
            concerns.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed text-sm">
            When upgraded to a real backend (Supabase), passwords will never be
            stored in plaintext, and row-level security will protect private data.
          </p>

          <h3 className="text-md font-semibold text-gray-900 mb-2">Prototype notice</h3>
          <p className="text-gray-600 mb-4 leading-relaxed text-sm">
            This is a school project prototype. It is not an official DWCSJ website
            unless officially approved by the school.
          </p>
        </div>
      </Card>
    </div>
  );
}
