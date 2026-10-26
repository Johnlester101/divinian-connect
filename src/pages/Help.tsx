/**
 * Help.tsx
 * Help & Frequently Asked Questions page.
 */

export function Help() {
  const faqs = [
    {
      q: 'Who can use Divinian Connect?',
      a:
        'Students of Divine Word College of San Jose, student organization officers, and authorized administrators/moderators.',
    },
    {
      q: 'Do I need a school email to register?',
      a:
        'Yes. Register with your school-approved email address so we can verify you are part of the DWCSJ community.',
    },
    {
      q: 'Is this an official DWCSJ website?',
      a:
        'No. This is a school project prototype. It is not an official DWCSJ website unless officially approved by the school.',
    },
    {
      q: 'Can I post anonymously?',
      a:
        'Yes. Anonymous posts hide your name from other students, but moderators may still access your identity for serious concerns.',
    },
    {
      q: "Who can change a concern's status?",
      a:
        'Only authorized moderators or administrators can update a concern status (Open, Under Review, In Progress, Resolved).',
    },
    {
      q: 'Is my password safe?',
      a:
        'In this prototype, data is stored in your browser only. In a real deployment, passwords would be hashed and never stored in plaintext.',
    },
  ];

  return (
    <div className="container-page">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Help & FAQ</h1>
      <Card>
        <div className="p-6">
          {faqs.map((faq, i) => (
            <div key={i} className="mb-6 border-b border-gray-100 pb-6 last:border-none last:mb-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{faq.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
