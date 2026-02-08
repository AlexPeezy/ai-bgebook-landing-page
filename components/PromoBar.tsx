'use client';

import { useCountdown } from '@/lib/useCountdown';

export default function PromoBar() {
  const countdown = useCountdown();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-navy-darker/95 backdrop-blur-sm border-b border-cyan/10">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-6 md:gap-12 text-sm">
          {/* Price */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300">Промоционална цена:</span>
            <span className="text-cyan font-bold">12.99€</span>
            <span className="text-gray-500 line-through text-xs">24€</span>
          </div>

          {/* Divider - hidden on mobile */}
          <div className="hidden md:block w-px h-4 bg-gray-700" />

          {/* Countdown */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300 hidden sm:inline">Важи за следващите:</span>

            {countdown.isExpired ? (
              <span className="text-red-400 font-medium">Офертата изтече</span>
            ) : (
              <div className="flex items-center gap-1 font-mono">
                <div className="bg-navy-dark px-2 py-0.5 rounded text-white font-bold">
                  {String(countdown.hours).padStart(2, '0')}
                </div>
                <span className="text-gray-500">:</span>
                <div className="bg-navy-dark px-2 py-0.5 rounded text-white font-bold">
                  {String(countdown.minutes).padStart(2, '0')}
                </div>
                <span className="text-gray-500">:</span>
                <div className="bg-navy-dark px-2 py-0.5 rounded text-white font-bold">
                  {String(countdown.seconds).padStart(2, '0')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
