'use client';

import { motion } from 'framer-motion';
import { isBonusFree } from '@/lib/bonus';

const categories = [
  {
    emoji: '📊',
    title: 'Бизнес стратегия',
    description: 'Яснота на бизнес модела, позициониране и пътна карта за растеж',
  },
  {
    emoji: '💰',
    title: 'Оферти & Продажби',
    description: 'Неустоими оферти, ценообразуване и техники за затваряне на сделки',
  },
  {
    emoji: '✍️',
    title: 'Маркетинг текстове',
    description: 'Рекламни ъгли, убедителни текстове и опростяване на сложни идеи',
  },
  {
    emoji: '📧',
    title: 'Имейл маркетинг',
    description: 'Последователности за продажби и задържане на клиенти',
  },
  {
    emoji: '📱',
    title: 'Социални мрежи',
    description: 'Превърни една идея в 10+ публикации и планирай съдържание за месец',
  },
  {
    emoji: '🔍',
    title: 'Анализ & Изследване',
    description: 'Анализ на конкуренцията, пазарни ниши и проучване на клиенти',
  },
];

export default function BonusSection() {
  const bonusFree = isBonusFree();

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#0f172a] via-[#0d1f1a] to-[#0f172a] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Green glow — top left */}
        <div
          className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Emerald glow — bottom right */}
        <div
          className="absolute bottom-0 right-[-10%] w-[450px] h-[450px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.10) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Center soft glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(34, 197, 94, 0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Bottom gradient fade into Testimonials (light background) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#0f172a]/50 to-white pointer-events-none z-10" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Gift badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Безплатен бонус с книгата</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading">
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent">
              🎁 БОНУС: 30 Промпта
            </span>
            <br />
            <span className="text-white">за Напреднали (PDF)</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Готови за копиране промптове, структурирани по категории — директно приложими в реална работа с AI.
          </p>

          {/* Count pill */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="text-center">
              <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">30</span>
              <p className="text-gray-500 text-xs mt-1 uppercase tracking-wide">Промпта</p>
            </div>
            <div className="w-px h-12 bg-green-500/20" />
            <div className="text-center">
              <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">6</span>
              <p className="text-gray-500 text-xs mt-1 uppercase tracking-wide">Категории</p>
            </div>
            <div className="w-px h-12 bg-green-500/20" />
            <div className="text-center">
              <span className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                {bonusFree ? '€0' : '€15'}
              </span>
              <p className="text-gray-500 text-xs mt-1 uppercase tracking-wide">{bonusFree ? 'С книгата' : 'Самостоятелно'}</p>
            </div>
          </div>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(34,197,94,0.4)' }}
              className="bg-white/5 backdrop-blur-lg border border-green-500/15 rounded-xl p-5 transition-colors duration-200 hover:bg-white/8"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-xl">
                  {cat.emoji}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">{cat.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{cat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/25 rounded-2xl p-6 text-center"
        >
          {bonusFree ? (
            <>
              <p className="text-green-400 font-bold text-base mb-1">
                🎁 Получаваш този бонус БЕЗПЛАТНО с покупката на книгата
              </p>
              <p className="text-gray-500 text-sm">
                PDF на стойност €15 — включен автоматично при поръчка
              </p>
            </>
          ) : (
            <>
              <p className="text-white font-bold text-base mb-1">
                Добави бонуса към книгата за само €5 повече
              </p>
              <p className="text-gray-500 text-sm">
                Или го вземи самостоятелно за €15 от{' '}
                <a href="/bonus" className="text-green-400 underline hover:text-green-300">тук</a>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
