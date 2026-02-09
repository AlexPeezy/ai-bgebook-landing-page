'use client';

import { motion } from 'framer-motion';
import Section from './Section';

interface SocialTestimonial {
  name: string;
  platform: 'facebook' | 'instagram' | 'tiktok';
  text: string;
  timeAgo: string;
  likes: number;
  replies?: number;
}

const testimonials: SocialTestimonial[] = [
  {
    name: 'Мария Петрова',
    platform: 'facebook',
    text: 'След като прочетох книгата, значително увеличих приходите си. Промптите са точни, моделите работят. Чудесна инвестиция в обучението ми!',
    timeAgo: '2 дни',
    likes: 47,
    replies: 12,
  },
  {
    name: 'goshk0o',
    platform: 'instagram',
    text: 'Конкретна, практична книга без излишна теория. Започнах да използвам AI в работата си веднага и резултатите са впечатляващи. Препоръчвам!',
    timeAgo: '3 дни',
    likes: 89,
  },
  {
    name: 'eliii_d',
    platform: 'tiktok',
    text: 'Стратегиите от книгата ми помогнаха да започна AI-базиран бизнес. Съдържанието е изключително полезно за всеки, който иска да навлезе в сферата.',
    timeAgo: '5 дни',
    likes: 234,
  },
  {
    name: 'vankata03',
    platform: 'tiktok',
    text: 'AI промптите спестяват часове работа всеки ден. Създавам по-качествено съдържание много по-бързо. Книгата обяснява всичко ясно и достъпно.',
    timeAgo: '1 седмица',
    likes: 412,
  },
  {
    name: 'p.gancheva',
    platform: 'instagram',
    text: 'Ясно обяснение на prompt engineering на български! Примерите са реални, стратегиите работят. Препоръчвам на всеки, който иска да се развива.',
    timeAgo: '4 дни',
    likes: 156,
  },
  {
    name: 'Димитър Николов',
    platform: 'facebook',
    text: 'Автоматизирах много от задачите в бизнеса си с AI след прочитане. Имам повече време за стратегия и развитие. Книгата си заслужава!',
    timeAgo: '1 седмица',
    likes: 63,
    replies: 8,
  },
];

function FacebookComment({ testimonial, index }: { testimonial: SocialTestimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="p-4 flex-grow">
          <div className="bg-gray-100 rounded-2xl px-4 py-3">
            <div className="font-semibold text-[#1877F2] text-sm mb-1">
              {testimonial.name}
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">
              {testimonial.text}
            </p>
          </div>

          {/* Interaction row */}
          <div className="flex items-center gap-4 mt-2 px-2">
            <span className="text-xs font-semibold text-gray-500">Харесвам</span>
            <span className="text-xs font-semibold text-gray-500">Отговори</span>
            <span className="text-xs text-gray-400">{testimonial.timeAgo}</span>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-[#1877F2] flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 21h4V9H2v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                </svg>
              </div>
              <span className="text-xs text-gray-500">{testimonial.likes}</span>
            </div>
          </div>

          {testimonial.replies && (
            <div className="mt-2 px-2">
              <span className="text-xs text-gray-500">
                Виж {testimonial.replies} отговора
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function InstagramComment({ testimonial, index }: { testimonial: SocialTestimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 leading-relaxed">
                <span className="font-semibold mr-1.5">{testimonial.name}</span>
                {testimonial.text}
              </p>
            </div>

            {/* Heart icon */}
            <div className="flex-shrink-0 mt-1">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-gray-400">{testimonial.timeAgo}</span>
            <span className="text-xs font-semibold text-gray-400">
              {testimonial.likes} харесвания
            </span>
            <span className="text-xs font-semibold text-gray-400">Отговори</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TikTokComment({ testimonial, index }: { testimonial: SocialTestimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="bg-[#161823] rounded-lg border border-gray-700/50 shadow-sm hover:shadow-md hover:shadow-white/5 transition-shadow duration-300 h-full flex flex-col">
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-sm text-white/90 mb-0.5">
                {testimonial.name}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                {testimonial.text}
              </p>
            </div>

            {/* Heart + count */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-2">
              <svg className="w-5 h-5 text-[#FE2C55]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-[11px] text-gray-400">{testimonial.likes}</span>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-gray-500">{testimonial.timeAgo}</span>
            <span className="text-xs font-semibold text-gray-500">Отговори</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SocialComment({ testimonial, index }: { testimonial: SocialTestimonial; index: number }) {
  switch (testimonial.platform) {
    case 'facebook':
      return <FacebookComment testimonial={testimonial} index={index} />;
    case 'instagram':
      return <InstagramComment testimonial={testimonial} index={index} />;
    case 'tiktok':
      return <TikTokComment testimonial={testimonial} index={index} />;
  }
}

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      background="gradient"
      backgroundEffects={
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Subtle top gradient */}
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
            Какво казват читателите?
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Присъедини се към стотици предприемачи, които вече печелят с AI
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <SocialComment key={index} testimonial={testimonial} index={index} />
        ))}
      </div>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs text-gray-400 mt-8 max-w-2xl mx-auto"
      >
        * Отзивите представят типични резултати на наши клиенти. Индивидуалните резултати може да варират в зависимост от усилията и приложението на наученото.
      </motion.p>
    </Section>
  );
}
