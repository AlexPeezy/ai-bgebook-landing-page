import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-darker to-navy-dark flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-cyan/20 mb-4 font-heading">404</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
          Страницата не е намерена
        </h1>
        <p className="text-gray-400 mb-8 text-lg">
          Страницата, която търсите, не съществува или е била преместена.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#2563eb] text-white font-semibold rounded-lg px-8 py-4 text-lg hover:bg-[#2563eb]/90 hover:shadow-lg hover:shadow-blue-900/50 transition-all duration-300"
        >
          Към началната страница
        </Link>
      </div>
    </div>
  );
}
