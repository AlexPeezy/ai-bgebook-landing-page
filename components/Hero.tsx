'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedText from './AnimatedText';
import Button from './Button';
import { useCheckout } from '@/lib/useCheckout';
import { trackAddToCart } from '@/lib/meta-pixel';
import { useIsMobile } from '@/lib/useIsMobile';
import { isBonusFree } from '@/lib/bonus';

export default function Hero() {
  const { initiateCheckout, loading, error } = useCheckout();
  const isMobile = useIsMobile();

  const bonusFree = isBonusFree();

  const handleBuyNow = () => {
    trackAddToCart();
    initiateCheckout(bonusFree ? 'ebook_with_free_bonus' : 'ebook_only');
  };

  const handleBuyBundle = () => {
    trackAddToCart();
    initiateCheckout('ebook_with_bonus');
  };

  return (
    <section className="relative min-h-[calc(100vh-48px)] flex items-center justify-center bg-gradient-to-br from-navy-darker via-navy-dark to-navy overflow-hidden">
      {/* Glowing background effects - desktop only (heavy blur/GPU cost on mobile) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {!isMobile && (
          <>
            {/* Large glowing horizon arc - bottom-left corner */}
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
            {/* Floating orb - top-left corner */}
            <div
              className="absolute top-[2%] left-[2%] w-[200px] h-[200px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
            {/* Floating orb - top-right corner */}
            <div
              className="absolute top-[2%] right-[2%] w-[220px] h-[220px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            {/* Subtle diagonal accent - bottom-right */}
            <div
              className="absolute bottom-[15%] right-[-5%] w-[400px] h-[1px] rotate-[-25deg]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.2), transparent)',
                filter: 'blur(1px)',
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
              }}
            />
          </>
        )}

        {/* Dot grid pattern - cheap, keep on all devices */}
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
          {/* Left column - Text content (shown second on mobile) */}
          <div className="text-white space-y-8 order-2 lg:order-1">
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
                Практическият наръчник за prompt engineering и AI услуги на български език — от основите до намиране на клиенти
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
                '7 конкретни AI услуги без програмиране',
                'Готов 30-дневен план за действие стъпка по стъпка',
                'Стратегии, създадени специално за българския пазар',
                '50 персонализирани AI консултации (до 24 часа)',
                'Безплатни актуализации',
                'Моментален достъп (PDF)',
                '12 глави от основи до практическо приложение',
                'Написана изцяло за българския пазар',
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
              {bonusFree && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-green-400 font-medium">🎁 БОНУС: 30 Промпта за Напреднали (PDF)</span>
                </motion.div>
              )}
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-6 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>150+ стр. практическо съдържание</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Моментално получаване</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - Book + Pricing Card (shown first on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2"
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
                    src="/ebook-cover.webp"
                    alt="Как да превърнеш AI в реален доход - Book Cover"
                    width={240}
                    height={360}
                    priority
                    fetchPriority="high"
                    sizes="240px"
                    quality={90}
                    className="relative z-10 rounded-lg border border-cyan/20 shadow-lg"
                  />
                </div>
              </div>

              {/* Pricing display */}
              <div className="mb-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-4xl font-bold text-white">€25</span>
                  {bonusFree && (
                    <span className="bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1.5 rounded-full">
                      + БОНУС БЕЗПЛАТНО
                    </span>
                  )}
                </div>
                {!bonusFree && (
                  <p className="text-gray-500 text-xs mb-1">Или €30 с бонус промптовете</p>
                )}
                <div className="inline-block bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">
                  Еднократно плащане • Без абонамент
                </div>
              </div>

              {/* Bonus badge during free period */}
              {bonusFree && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-3 mb-4 text-center">
                  <p className="text-green-400 text-xs font-bold uppercase tracking-wide mb-1">🎁 Включен безплатен бонус</p>
                  <p className="text-white text-sm font-semibold">30 Промпта за Напреднали</p>
                  <p className="text-gray-400 text-xs">PDF на стойност €15 — безплатно с книгата</p>
                </div>
              )}

              {/* One-time payment note */}
              <div className="text-center text-gray-300 text-xs mb-4">
                Моментален достъп след плащане
              </div>

              {/* CTA Button(s) */}
              {bonusFree ? (
                <Button size="lg" fullWidth onClick={handleBuyNow} isLoading={loading}>
                  ВЗЕМИ НАРЪЧНИКА + БОНУС ГОТОВИ СПЕЦИАЛИЗИРАНИ ПРОМПТОВЕ ЗА €25
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button size="lg" fullWidth onClick={handleBuyBundle} isLoading={loading}>
                    ВЗЕМИ ДВАТА PDF-А ЗА €30
                  </Button>
                  <button
                    onClick={handleBuyNow}
                    disabled={loading}
                    className="w-full text-gray-400 text-sm underline hover:text-white transition-colors py-1"
                  >
                    Само книгата — €25
                  </button>
                </div>
              )}

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

      {/* Bottom gradient fade - dark to dark into BonusSection */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0f172a] pointer-events-none z-10" />

    </section>
  );
}
