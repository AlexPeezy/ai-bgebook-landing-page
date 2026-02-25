'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONSENT_KEY = 'cookie_consent';

function loadTrackingScripts() {
  // GA4
  const gaScript = document.createElement('script');
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`;
  gaScript.async = true;
  document.head.appendChild(gaScript);

  const gaInit = document.createElement('script');
  gaInit.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(gaInit);

  // Meta Pixel
  const metaInit = document.createElement('script');
  metaInit.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(metaInit);
}

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
      loadTrackingScripts();
    }
    // Reading external state from localStorage to show/hide banner — intentional pattern
    setVisible(!consent); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    loadTrackingScripts();
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-5"
        >
          <div className="max-w-4xl mx-auto bg-[#0d1117]/95 backdrop-blur-lg border border-cyan/20 rounded-2xl shadow-2xl shadow-black/50 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 leading-relaxed">
                Използваме бисквитки за анализ (Google Analytics) и реклама (Meta Pixel). Без тях тези функции няма да работят.{' '}
                <a href="/legal/privacy" className="text-cyan hover:underline text-xs">
                  Научи повече
                </a>
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={handleReject}
                className="flex-1 sm:flex-none text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 whitespace-nowrap"
              >
                Отказвам
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none text-sm font-semibold text-white bg-gradient-to-r from-cyan to-blue px-4 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Приемам всички
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
