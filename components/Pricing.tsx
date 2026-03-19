'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from './Section';
import Card from './Card';
import Button from './Button';
import WithdrawalModal from './WithdrawalModal';
import { useCheckout } from '@/lib/useCheckout';
import { trackAddToCart } from '@/lib/meta-pixel';
import { useIsMobile } from '@/lib/useIsMobile';
import { isBonusFree } from '@/lib/bonus';
import { useState } from 'react';

const baseFeatures = [
  '12 глави практическо съдържание',
  'Формулата за силни AI промптове (5 стъпки)',
  '7 AI услуги без програмиране',
  'Готов 30-дневен план стъпка по стъпка',
  '4 стратегии за намиране на клиенти без реклама',
  'Как да създадеш първата си оферта с AI',
  '7 грешки, които да избегнеш от старта',
  'Написана изцяло за българския пазар',
  '10 безплатни AI консултации за купувачи (24-часов отговор)',
  'Моментално получаване (PDF)',
  'Достъп от всички устройства',
];

export default function Pricing() {
  const { initiateCheckout, loading, error } = useCheckout();
  const isMobile = useIsMobile();
  const bonusFree = isBonusFree();
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [pendingCheckoutType, setPendingCheckoutType] = useState<'ebook_with_free_bonus' | 'ebook_only' | 'ebook_with_bonus'>('ebook_only');

  const handleBuyNow = () => {
    trackAddToCart();
    setPendingCheckoutType(bonusFree ? 'ebook_with_free_bonus' : 'ebook_only');
    setIsWithdrawalOpen(true);
  };

  const handleBuyBundle = () => {
    trackAddToCart();
    setPendingCheckoutType('ebook_with_bonus');
    setIsWithdrawalOpen(true);
  };

  const handleWithdrawalConfirm = () => {
    setIsWithdrawalOpen(false);
    initiateCheckout(pendingCheckoutType);
  };

  return (
    <Section
      id="pricing"
      background="dark"
      backgroundEffects={
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 right-0 h-[700px]" style={{ background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[600px]" style={{ background: 'linear-gradient(0deg, rgba(59, 130, 246, 0.18) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 100%)' }} />
          <div className="absolute top-[10%] right-0 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 60%)', filter: 'blur(120px)' }} />
          <div className="absolute bottom-[10%] left-0 w-[550px] h-[550px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 60%)', filter: 'blur(120px)' }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
      }
    >
      {/* Book cover */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center mb-12">
        <motion.div className="relative" style={{ filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.2))' }} animate={isMobile ? undefined : { y: [0, -15, 0], x: [0, 5, 0, -5, 0], rotate: [0, 1, 0, -1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <motion.div animate={isMobile ? undefined : { opacity: [0.3, 0.6, 0.3], scale: [1.08, 1, 1.08] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -inset-8 bg-gradient-to-tr from-blue/30 via-cyan/40 to-blue/30 rounded-2xl blur-3xl" />
          <motion.div animate={isMobile ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className="absolute -inset-4 bg-gradient-to-r from-cyan/30 via-blue/40 to-cyan/30 rounded-xl blur-2xl" />
          {!isMobile && (
            <motion.div className="absolute inset-0 rounded-xl overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{ x: ['-200%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }} />
            </motion.div>
          )}
          <Image src="/ebook-cover.webp" alt="AI Ebook Cover" width={400} height={600} sizes="(max-width: 768px) 280px, 350px" quality={90} className="relative z-10 max-w-[280px] md:max-w-[350px]" style={{ boxShadow: '0 0 30px rgba(34, 197, 230, 0.25), 0 0 60px rgba(59, 130, 246, 0.15)', mixBlendMode: 'lighten', filter: 'contrast(1.15) saturate(1.1)' }} />
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">Вземи книгата сега</h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">Инвестирай в себе си днес.</p>
      </motion.div>

      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Card glass hover className="h-full relative transition-all duration-300 border-2 border-cyan shadow-2xl shadow-cyan/20">
            {/* Badge */}
            <div className="mb-6">
              <div className="inline-block bg-gradient-to-r from-cyan to-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                {bonusFree ? 'КНИГА + БОНУС ПРОМПТА' : 'НАРЪЧНИКЪТ ЗА AI ДОХОД'}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                Как да превърнеш AI в реален доход
              </h3>
              <p className="text-gray-400 text-sm">
                {bonusFree ? 'Включва безплатен бонус PDF с 30 Промпта за Напреднали' : 'Пълният наръчник за Prompt Engineering'}
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-end gap-2 mb-1">
                <motion.span animate={isMobile ? undefined : { textShadow: ['0 0 10px rgba(34, 197, 230, 0)', '0 0 20px rgba(34, 197, 230, 0.4)', '0 0 10px rgba(34, 197, 230, 0)'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="text-5xl font-bold text-white">
                  €25
                </motion.span>
                {bonusFree && (
                  <span className="bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1.5 rounded-full mb-2">+ БОНУС БЕЗПЛАТНО</span>
                )}
              </motion.div>
              <p className="text-gray-500 text-xs mb-1">вкл. ДДС 20%</p>
              {!bonusFree && <p className="text-gray-500 text-xs mb-2">Или €30 с бонус промптовете</p>}
            </div>

            {/* Bonus badge during free period */}
            {bonusFree && (
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-3 mb-6 text-center">
                <p className="text-green-400 text-xs font-bold uppercase tracking-wide mb-1">🎁 Включен безплатен бонус</p>
                <p className="text-white text-sm font-semibold">30 Промпта за Напреднали</p>
                <p className="text-gray-400 text-xs">PDF на стойност €15 — безплатно с книгата</p>
              </div>
            )}

            {/* Features */}
            <div className="space-y-3 mb-8">
              {bonusFree && (
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.65, duration: 0.3 }} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-green-400 text-sm font-medium">🎁 БОНУС: 30 Промпта за Напреднали (PDF)</span>
                </motion.div>
              )}
              {baseFeatures.map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 + idx * 0.05, duration: 0.3 }} className="flex items-start gap-3">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 + idx * 0.05 + 0.2, type: 'spring', stiffness: 400, damping: 15 }} className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-cyan to-blue flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 + idx * 0.05 + 0.3, duration: 0.3, ease: 'easeOut' }} strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <motion.span className="text-gray-300 text-sm" whileHover={{ x: 3, color: '#ffffff' }} transition={{ duration: 0.2 }}>{feature}</motion.span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            {bonusFree ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }} className="relative overflow-hidden rounded-lg">
                <Button variant="primary" size="lg" fullWidth onClick={handleBuyNow} isLoading={loading} className="relative z-10">
                  ВЗЕМИ НАРЪЧНИКА + БОНУС ГОТОВИ СПЕЦИАЛИЗИРАНИ ПРОМПТОВЕ ЗА €25
                </Button>
                {!loading && !isMobile && (
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" animate={{ x: ['-200%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }} />
                )}
              </motion.div>
            ) : (
              <div className="space-y-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }} className="relative overflow-hidden rounded-lg">
                  <Button variant="primary" size="lg" fullWidth onClick={handleBuyBundle} isLoading={loading} className="relative z-10">
                    ВЗЕМИ ДВАТА PDF-А ЗА €30
                  </Button>
                </motion.div>
                <button onClick={handleBuyNow} disabled={loading} className="w-full text-gray-400 text-sm underline hover:text-white transition-colors py-1">
                  Само книгата — €25
                </button>
              </div>
            )}

            <div className="mt-4 text-center text-xs text-gray-400">🔒 Сигурно плащане чрез Stripe</div>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-red-400 text-xs">
                {error}
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>

      <WithdrawalModal
        isOpen={isWithdrawalOpen}
        onClose={() => setIsWithdrawalOpen(false)}
        onConfirm={handleWithdrawalConfirm}
      />
    </Section>
  );
}
