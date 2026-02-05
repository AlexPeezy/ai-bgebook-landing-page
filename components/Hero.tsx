'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedText from './AnimatedText';
import Button from './Button';
import Card from './Card';
import EmailCaptureModal from './EmailCaptureModal';
import { useCheckout } from '@/lib/useCheckout';
import { useCountdown } from '@/lib/useCountdown';

export default function Hero() {
  const { initiateCheckout, loading, error } = useCheckout();
  const countdown = useCountdown();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  const handleEmailSubmit = (email: string) => {
    initiateCheckout('early_bird', email);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-darker via-navy-dark to-navy overflow-hidden">
      {/* Glowing background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glowing horizon arc at bottom */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-50%] w-[200vw] h-[100vh] rounded-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.5) 0%, rgba(59, 130, 246, 0.25) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Brighter inner arc */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-40%] w-[160vw] h-[80vh] rounded-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.6) 0%, rgba(59, 130, 246, 0.35) 30%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Sharp glowing edge */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-35%] w-[140vw] h-[70vh] rounded-[50%]"
          style={{
            background: 'transparent',
            boxShadow: '0 0 100px 30px rgba(6, 182, 212, 0.7), 0 0 160px 60px rgba(59, 130, 246, 0.4)',
          }}
        />

        {/* Floating orb top-left */}
        <div
          className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Floating orb top-right */}
        <div
          className="absolute top-[5%] right-[10%] w-[250px] h-[250px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Diagonal light streak */}
        <div
          className="absolute top-[20%] right-[-10%] w-[600px] h-[2px] rotate-[-30deg]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)',
            filter: 'blur(2px)',
          }}
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 pb-20">
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
                'Овладей AI prompt engineering',
                'Открий 30+ доказани AI бизнес модела',
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

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <span className="text-yellow-400">★★★★</span>
                  <span className="text-yellow-400/50">★</span>
                </div>
                <span>4.5/5 (127 отзива)</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Моментално получаване</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - Book + Pricing Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-cyan/20 p-6 shadow-2xl shadow-cyan/10">
              {/* Book cover */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1.02, 1, 1.02],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -inset-4 bg-gradient-to-tr from-blue/20 via-cyan/30 to-blue/20 rounded-xl blur-xl"
                  />
                  <Image
                    src="/logoo.png"
                    alt="Как да превърнеш AI в реален доход - Book Cover"
                    width={200}
                    height={300}
                    className="relative z-10 rounded-lg border border-cyan/20 shadow-lg"
                    priority
                  />
                </div>
              </div>

              {/* Early Bird Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-cyan to-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                  EARLY BIRD
                </div>
                <div className="text-right">
                  <div className="text-cyan text-xs font-semibold">Останаха</div>
                  <div className="text-white text-xl font-bold">53 <span className="text-gray-400 text-xs font-normal">копия</span></div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">€12.99</span>
                  <span className="text-xl text-gray-500 line-through mb-1">€24.99</span>
                </div>
                <div className="inline-block bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">
                  Спестяваш 48%
                </div>
              </div>

              {/* One-time payment note */}
              <div className="text-center text-gray-400 text-xs mb-4">
                Еднократно плащане • Без абонамент
              </div>

              {/* Key features */}
              <div className="space-y-2 mb-6 text-sm">
                {[
                  '50+ промпт шаблона за печелене на пари',
                  'Доказани стратегии за AI монетизация',
                  'Техники за българския пазар',
                  'Безплатни актуализации',
                  'Моментален достъп до всички материали',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4 text-cyan flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                fullWidth
                onClick={handleBuyNow}
                isLoading={loading}
              >
                ЗАПОЧНИ ДА ПЕЧЕЛИШ СЕГА
              </Button>

              <div className="mt-3 text-center text-xs text-gray-400">
                🔒 Сигурно плащане чрез Stripe
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-red-400 text-xs"
                >
                  {error}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer z-20 group"
      >
        <div className="flex flex-col items-center gap-2 text-white/70 group-hover:text-cyan transition-colors">
          <span className="text-sm font-medium">Разгледай надолу</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.button>

      {/* Email capture modal */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEmailSubmit}
        isLoading={loading}
      />
    </section>
  );
}
