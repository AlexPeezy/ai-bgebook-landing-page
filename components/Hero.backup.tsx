'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedText from './AnimatedText';
import Button from './Button';
import Card from './Card';
import { useCheckout } from '@/lib/useCheckout';
import { useCountdown } from '@/lib/useCountdown';

export default function Hero() {
  const { initiateCheckout, loading, error } = useCheckout();
  const countdown = useCountdown();

  const handleBuyNow = () => {
    initiateCheckout('ebook_only');
  };

  const handleScrollToContent = () => {
    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-darker via-navy-dark to-navy overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-cyan/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-blue/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-white space-y-8">
            {/* Urgency badges */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-4"
            >
              <Card glass hover={false} className="inline-flex items-center gap-2 px-4 py-2">
                <span className="text-cyan text-2xl">⏰</span>
                <span className="text-sm font-medium">
                  {countdown.isExpired ? (
                    <span className="text-red-400">Офертата изтече</span>
                  ) : (
                    <>
                      <span className="text-cyan">{countdown.formatted}</span> до края на оферта
                    </>
                  )}
                </span>
              </Card>
              <Card glass hover={false} className="inline-flex items-center gap-2 px-4 py-2">
                <span className="text-blue text-2xl">🔥</span>
                <span className="text-sm font-medium">
                  Само <span className="text-cyan font-bold">53 копия</span> Early Bird
                </span>
              </Card>
            </motion.div>

            {/* Main headline */}
            <AnimatedText delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading">
                <span className="bg-gradient-to-r from-cyan via-blue to-cyan-dark bg-clip-text text-transparent">
                  Как да превърнеш AI в реален доход
                </span>
              </h1>
            </AnimatedText>

            {/* Subheader */}
            <AnimatedText delay={0.4}>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Научи се да печелиш с AI. Пълният наръчник за Prompt Engineering и бизнес стратегии на български език
              </p>
            </AnimatedText>

            {/* Key benefits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              {[
                'Master AI prompt engineering',
                'Discover 30+ proven AI business models',
                '50+ готови AI промпта за директна употреба',
                'Научи се да печелиш €500+ месечно с AI',
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan to-blue flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-200">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 sm:flex-initial"
                  onClick={handleBuyNow}
                  isLoading={loading}
                >
                  <span className="flex flex-col items-center sm:flex-row sm:gap-2">
                    <span>Купи сега за €12.99</span>
                    <span className="text-xs line-through opacity-70">€24.99</span>
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleScrollToContent}
                >
                  Виж съдържанието
                </Button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex items-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span>4.9/5 (127 отзива)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Моментално получаване</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - Ebook cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Animated glow effect */}
              <motion.div
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-4 bg-gradient-to-r from-cyan via-blue to-cyan rounded-2xl blur-2xl opacity-50"
              />
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1.05, 1, 1.05],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute -inset-8 bg-gradient-to-tr from-blue via-cyan to-blue rounded-2xl blur-3xl opacity-40"
              />

              {/* Book cover image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl shadow-cyan/30">
                <Image
                  src="/logoo.png"
                  alt="Как да превърнеш AI в реален доход - Book Cover"
                  width={400}
                  height={600}
                  className="relative z-10 w-auto h-auto max-w-[320px] md:max-w-[380px] lg:max-w-[420px]"
                  priority
                />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 z-20 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20"
              >
                <span className="text-cyan font-bold">€12.99</span>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-4 z-20 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20"
              >
                <span className="text-white font-bold">🇧🇬 На български</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs">Разгледай надолу</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
