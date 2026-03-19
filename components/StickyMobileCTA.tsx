'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { useCheckout } from '@/lib/useCheckout';
import { trackAddToCart } from '@/lib/meta-pixel';
import { isBonusFree } from '@/lib/bonus';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { initiateCheckout, loading } = useCheckout();
  const bonusFree = isBonusFree();

  useEffect(() => {
    const threshold = window.innerHeight * 0.8;
    const handleScroll = () => setIsVisible(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    trackAddToCart();
    initiateCheckout(bonusFree ? 'ebook_with_free_bonus' : 'ebook_only');
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-navy-darker/95 backdrop-blur-lg border-b border-cyan/20 px-4 py-3"
          >
            <Button
              size="lg"
              fullWidth
              onClick={handleClick}
              isLoading={loading}
            >
              {bonusFree ? 'КУПИ ЗА €25 + БОНУС' : 'КУПИ ЗА €25'}
            </Button>
            <p className="text-center text-xs text-gray-500 mt-1.5">
              🔒 Сигурно плащане чрез Stripe
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
