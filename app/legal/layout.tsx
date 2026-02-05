import Link from 'next/link';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-darker via-navy-dark to-navy">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan hover:text-cyan-light transition-colors mb-8"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Обратно към началото
        </Link>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
