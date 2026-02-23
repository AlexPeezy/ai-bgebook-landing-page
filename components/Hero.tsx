'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedText from './AnimatedText';
import Button from './Button';
import EmailCaptureModal from './EmailCaptureModal';
import { useCheckout } from '@/lib/useCheckout';
import { trackAddToCart } from '@/lib/meta-pixel';
import { useIsMobile } from '@/lib/useIsMobile';

export default function Hero() {
  const { initiateCheckout, loading, error } = useCheckout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleBuyNow = () => {
    trackAddToCart();
    setIsModalOpen(true);
  };

  const handleEmailSubmit = (email: string) => {
    initiateCheckout('early_bird', email);
  };

  return (
    <section className="relative min-h-[calc(100vh-48px)] flex items-center justify-center bg-gradient-to-br from-navy-darker via-navy-dark to-navy overflow-hidden">
      {/* Glowing background effects - REPOSITIONED to safe zones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glowing horizon arc - REPOSITIONED to bottom-left corner */}
        <div
          className="absolute left-[-20%] bottom-[-60%] w-[120vw] h-[80vh] rounded-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.4) 0%, rgba(59, 130, 246, 0.2) 40%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Brighter inner arc - bottom-left */}
        <div
          className="absolute left-[-15%] bottom-[-50%] w-[100vw] h-[60vh] rounded-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.5) 0%, rgba(59, 130, 246, 0.3) 30%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Sharp glowing edge - bottom-left accent */}
        <div
          className="absolute left-[-10%] bottom-[-40%] w-[80vw] h-[50vh] rounded-[50%]"
          style={{
            background: 'transparent',
            boxShadow: '0 0 80px 20px rgba(6, 182, 212, 0.5), 0 0 120px 40px rgba(59, 130, 246, 0.3)',
          }}
        />

        {/* Floating orb - top-left corner (safe zone) */}
        <div
          className="absolute top-[2%] left-[2%] w-[200px] h-[200px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Floating orb - top-right corner (safe zone) */}
        <div
          className="absolute top-[2%] right-[2%] w-[220px] h-[220px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Subtle diagonal accent - bottom-right safe zone */}
        <div
          className="absolute bottom-[15%] right-[-5%] w-[400px] h-[1px] rotate-[-25deg]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent)',
            filter: 'blur(1px)',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
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

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-white space-y-8">
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
                Практическият наръчник за печелене с AI на български език — от промптове до първите ти клиенти
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
                'Формулата за силни промптове в 5 стъпки',
                '7 реални начина да печелиш с AI без програмиране',
                'Готов 30-дневен план за първите ти приходи',
                'Стратегии, създадени специално за българския пазар',
                '50+ безплатни AI консултации (24-часов отговор)',
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
              className="flex items-center gap-6 text-sm text-gray-300"
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
                    animate={isMobile ? undefined : {
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
                    src="/ebook-cover.png"
                    alt="Как да превърнеш AI в реален доход - Book Cover"
                    width={200}
                    height={300}
                    priority
                    sizes="200px"
                    quality={85}
                    className="relative z-10 rounded-lg border border-cyan/20 shadow-lg"
                  />
                </div>
              </div>

              {/* Early Bird Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#2563eb] text-white text-xs font-bold px-3 py-1 rounded-full">
                  EARLY BIRD
                </div>
                <div className="text-right">
                  <div className="text-cyan text-xs font-semibold">Останаха</div>
                  <div className="text-white text-xl font-bold">53 <span className="text-gray-400 text-xs font-normal">копия</span></div>
                </div>
              </div>

              {/* Pricing - clean display */}
              <div className="mb-4">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">€15</span>
                </div>
                <div className="inline-block bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">
                  Еднократно плащане • Без абонамент
                </div>
              </div>

              {/* One-time payment note */}
              <div className="text-center text-gray-300 text-xs mb-4">
                Моментален достъп след плащане
              </div>

              {/* Key features */}
              <div className="space-y-2 mb-6 text-sm">
                {[
                  '12 глави от основи до реален доход',
                  '7 модела за доход без програмиране',
                  'Написана изцяло за българския пазар',
                  'Безплатни актуализации',
                  'Моментален достъп (PDF)',
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

              <div className="mt-3 text-center text-xs text-gray-300">
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

      {/* Bottom gradient fade - FIXED for dark-to-light transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-navy-dark/50 to-white pointer-events-none z-10" />

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
