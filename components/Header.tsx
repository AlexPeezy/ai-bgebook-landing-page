'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import EmailCaptureModal from './EmailCaptureModal';
import { useCheckout } from '@/lib/useCheckout';

const navLinks = [
  { name: 'За книгата', href: '#showcase' },
  { name: 'Отзиви', href: '#testimonials' },
  { name: 'ЧЗВ', href: '#faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initiateCheckout, loading } = useCheckout();

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling past the hero section (roughly 100vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
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
      <AnimatePresence>
        {isScrolled && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-10 left-0 right-0 z-50 bg-navy-darker/95 backdrop-blur-lg border-b border-cyan/10"
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
                  className="text-lg font-bold bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent font-heading"
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

                {/* Desktop CTA */}
                <div className="hidden md:block">
                  <Button size="sm" onClick={handleBuyClick} isLoading={loading}>
                    Купи за €12.99
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
                      <div className="px-4 pt-2">
                        <Button size="sm" fullWidth onClick={handleBuyClick} isLoading={loading}>
                          Купи за €12.99
                        </Button>
                      </div>
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

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
