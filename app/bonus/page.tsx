'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/Button';
import { useCheckout } from '@/lib/useCheckout';
import { isBonusFree } from '@/lib/bonus';
import { trackAddToCart } from '@/lib/meta-pixel';

const prompts = [
  'Prompt за бизнес яснота и стратегия',
  'Prompt за опростяване на текст и ясно послание',
  'Prompt за създаване на 5 рекламни ъгъла',
  'Prompt за откриване на слабости в оферта',
  'Prompt за имейл последователност за продажби',
  'Prompt за 10 социални поста от една идея',
  'Prompt за анализ на конкуренция и стратегия',
  'Prompt за проверка на убедителност на текст',
  'Prompt за превръщане на сложна идея в обучение',
  'Prompt за създаване на оферта и ценообразуване',
];

export default function BonusPage() {
  const { initiateCheckout, loading, error } = useCheckout();
  const bonusFree = isBonusFree();

  const handleBuy = () => {
    trackAddToCart();
    initiateCheckout('bonus_only');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-darker via-navy-dark to-navy flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl border border-cyan/20 p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <span className="inline-block bg-gradient-to-r from-cyan to-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Самостоятелен продукт
            </span>
            <h1 className="text-3xl font-bold text-white mb-3 font-heading">
              🎁 БОНУС: 30 Промпта за Напреднали (PDF)
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              30 структурирани инструмента за работа с AI — за по-ясно мислене, по-силен маркетинг и по-добри бизнес решения.
            </p>
          </div>

          <div className="space-y-2 mb-8">
            {prompts.map((prompt, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-cyan to-blue flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">{prompt}</span>
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-white mb-1">€15</div>
            <p className="text-gray-500 text-xs">Еднократно плащане • PDF изтегляне</p>
          </div>

          {bonusFree ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center mb-4">
              <p className="text-green-400 text-sm font-semibold">
                🎁 Получи тези промпта БЕЗПЛАТНО когато купиш книгата!
              </p>
              <Link
                href="/#pricing"
                className="inline-block mt-2 text-cyan text-sm underline hover:text-white transition-colors"
              >
                Виж офертата за книгата →
              </Link>
            </div>
          ) : (
            <>
              <Button size="lg" fullWidth onClick={handleBuy} isLoading={loading}>
                КУПИ ЗА €15
              </Button>
              {error && (
                <p className="mt-2 text-red-400 text-xs text-center">{error}</p>
              )}
              <p className="mt-3 text-center text-xs text-gray-500">
                🔒 Сигурно плащане чрез Stripe
              </p>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
