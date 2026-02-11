'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import EmailCaptureModal from './EmailCaptureModal';
import { useCheckout } from '@/lib/useCheckout';
import { useCountdown } from '@/lib/useCountdown';

const navLinks = [
  { name: 'За книгата', href: '#showcase' },
  { name: 'Отзиви', href: '#testimonials' },
  { name: 'ЧЗВ', href: '#faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { initiateCheckout, loading } = useCheckout();
  const countdown = useCountdown();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Transparent → solid background transition
      setIsScrolled(currentScrollY > 100);

      // Mobile: auto-hide on scroll down, show on scroll up
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsHidden(true);
          setIsMobileMenuOpen(false);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBuyClick = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleEmailSubmit = (email: string) => {
    initiateCheckout('early_bird', email);
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-navy-darker/95 backdrop-blur-lg border-b border-cyan/10 ${
          isScrolled ? 'shadow-lg shadow-black/10' : ''
        } ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-lg font-bold bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent font-heading flex-shrink-0"
            >
              AI в Реален Доход
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-sm text-gray-300 hover:text-cyan transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Timer + CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Glowing countdown timer */}
              {countdown.isExpired ? (
                <span className="text-red-400 text-xs font-medium">Офертата изтече</span>
              ) : (
                <div className="flex items-center gap-2 bg-white/5 border border-cyan/20 rounded-full px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  <div className="flex items-center gap-0.5 font-mono text-sm tracking-wider">
                    <span className="text-cyan font-bold" style={{ textShadow: '0 0 8px rgba(34,211,238,0.5)' }}>
                      {String(countdown.hours).padStart(2, '0')}
                    </span>
                    <span className="text-cyan/60 animate-pulse">:</span>
                    <span className="text-cyan font-bold" style={{ textShadow: '0 0 8px rgba(34,211,238,0.5)' }}>
                      {String(countdown.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-cyan/60 animate-pulse">:</span>
                    <span className="text-cyan font-bold" style={{ textShadow: '0 0 8px rgba(34,211,238,0.5)' }}>
                      {String(countdown.seconds).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <Button size="sm" onClick={handleBuyClick} isLoading={loading}>
                КУПИ САМО СЕГА ЗА €15
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-cyan/10"
              >
                <nav className="py-4 space-y-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="block px-4 py-2 text-gray-300 hover:text-cyan hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}

                  {/* Mobile timer */}
                  {!countdown.isExpired && (
                    <div className="mx-4 py-3 flex items-center justify-center">
                      <div className="flex items-center gap-2 bg-white/5 border border-cyan/20 rounded-full px-4 py-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                        <div className="flex items-center gap-0.5 font-mono text-sm tracking-wider">
                          <span className="text-cyan font-bold" style={{ textShadow: '0 0 8px rgba(34,211,238,0.5)' }}>
                            {String(countdown.hours).padStart(2, '0')}
                          </span>
                          <span className="text-cyan/60 animate-pulse">:</span>
                          <span className="text-cyan font-bold" style={{ textShadow: '0 0 8px rgba(34,211,238,0.5)' }}>
                            {String(countdown.minutes).padStart(2, '0')}
                          </span>
                          <span className="text-cyan/60 animate-pulse">:</span>
                          <span className="text-cyan font-bold" style={{ textShadow: '0 0 8px rgba(34,211,238,0.5)' }}>
                            {String(countdown.seconds).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="px-4 pt-2">
                    <Button size="sm" fullWidth onClick={handleBuyClick} isLoading={loading}>
                      КУПИ САМО СЕГА ЗА €15
                    </Button>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Email capture modal */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEmailSubmit}
        isLoading={loading}
      />
    </>
  );
}
