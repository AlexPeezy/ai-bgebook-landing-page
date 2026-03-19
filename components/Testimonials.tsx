'use client';

import { motion } from 'framer-motion';
import Section from './Section';

interface ContentCard {
  emoji: string;
  title: string;
  chapter: string;
  preview: string;
  highlight?: string;
}

const contentCards: ContentCard[] = [
  {
    emoji: '🎯',
    title: 'Формулата за силни промптове',
    chapter: 'Глава 2',
    preview: 'Петстъпковата рамка: Роля → Контекст → Задача → Формат → Ограничения. Разликата между слаб и силен промпт е конкретността.',
    highlight: 'Включва 50+ готови шаблона',
  },
  {
    emoji: '💼',
    title: '7 AI услуги за БГ пазара',
    chapter: 'Глава 5',
    preview: 'AI копирайтинг, ChatGPT консултации, автоматизация на задачи, AI обучения, генериране на съдържание, превод и редакция, дигитален асистент.',
    highlight: 'Стъпки за старт на всяка услуга',
  },
  {
    emoji: '📅',
    title: '30-дневен план за действие',
    chapter: 'Глава 8',
    preview: 'Седмица 1: основи и практика. Седмица 2: избор на услуга. Седмица 3: първо портфолио. Седмица 4: намиране на клиенти.',
    highlight: 'Ден по ден инструкции',
  },
  {
    emoji: '🤝',
    title: '4 стратегии за клиенти',
    chapter: 'Глава 9',
    preview: 'Как да намериш първите клиенти без платена реклама — LinkedIn аутрийч, Facebook групи, фрийлансинг платформи и локални бизнеси.',
    highlight: 'Готови скриптове за контакт',
  },
  {
    emoji: '⚠️',
    title: '7 грешки от старта',
    chapter: 'Глава 11',
    preview: 'Перфекционизъм преди старт, погрешен избор на инструменти, липса на ниша, подценяване на промптовете — и как да ги избегнеш.',
    highlight: 'Спести месеци лутане',
  },
  {
    emoji: '🛠️',
    title: 'AI инструменти в детайли',
    chapter: 'Глава 3',
    preview: 'ChatGPT, Claude, Midjourney, DALL-E, Perplexity и още. Кой инструмент за каква задача и как да ги комбинираш ефективно.',
    highlight: 'Сравнение и практически примери',
  },
];

function ContentPreviewCard({ card, index }: { card: ContentCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl">{card.emoji}</span>
          <div>
            <p className="text-xs text-gray-400 font-medium">{card.chapter}</p>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{card.title}</h3>
          </div>
        </div>

        {/* Preview text */}
        <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-3">
          {card.preview}
        </p>

        {/* Highlight pill */}
        {card.highlight && (
          <div className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-700 text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {card.highlight}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      background="gradient"
      backgroundEffects={
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-0 left-0 right-0 h-[400px]"
            style={{
              background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.08) 0%, transparent 100%)',
            }}
          />
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
          <span className="bg-gradient-to-r from-cyan via-blue to-cyan-dark bg-clip-text text-transparent">
            Какво ще намериш вътре
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Преглед на съдържанието на наръчника — глава по глава
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentCards.map((card, index) => (
          <ContentPreviewCard key={index} card={card} index={index} />
        ))}
      </div>

      {/* Legal disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-left text-[11px] text-gray-500 italic mt-8 max-w-4xl mx-auto"
      >
        * Описанието е илюстративно. Индивидуалните резултати зависят от усилията и пазарните условия.
      </motion.p>
    </Section>
  );
}
