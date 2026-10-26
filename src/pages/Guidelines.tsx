/**
 * Guidelines.tsx
 * Community Guidelines page.
 */

export function Guidelines() {
  return (
    <div className="container-page">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Community Guidelines</h1>
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Be respectful and responsible</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Divinian Connect is a place for Divine Word College of San Jose students to
            share concerns, ideas, and discussions. Please treat every member with
            kindness and respect.
          </p>

          <h3 className="text-md font-semibold text-gray-900 mb-2">Do:</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4 leading-relaxed space-y-1">
            <li>Post school-related concerns, suggestions, and questions.</li>
            <li>Use respectful language in posts and comments.</li>
            <li>Report content that violates these guidelines.</li>
            <li>Protect your personal information and others' privacy.</li>
          </ul>

          <h3 className="text-md font-semibold text-gray-900 mb-2">Don't:</h3>
          <ul className="list-disc list-inside text-gray-600 mb-4 leading-relaxed space-y-1">
            <li>Post hate speech, threats, or harassment.</li>
            <li>Share private phone numbers, addresses, or student numbers.</li>
            <li>Make unverified accusations against individuals.</li>
            <li>Post spam or repeated submissions.</li>
            <li>Pretend to be an official DWCSJ statement unless authorized.</li>
          </ul>

          <h3 className="text-md font-semibold text-gray-900 mb-2">Anonymity</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Anonymous feedback hides your name from other students, but moderators
            may still access your identity for serious or urgent concerns. Absolute
            anonymity is not guaranteed.
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
