'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import Card from './Card';

const testimonials = [
  {
    name: 'Мария П.',
    role: 'Фрийлансър, София',
    initials: 'МП',
    rating: 5,
    text: 'След като прочетох книгата, значително увеличих приходите си. Промптите са точни, моделите работят. Чудесна инвестиция в обучението ми!',
    highlight: 'Значително увеличих приходите си',
  },
  {
    name: 'Георги И.',
    role: 'Дигитален маркетолог, Пловдив',
    initials: 'ГИ',
    rating: 5,
    text: 'Конкретна, практична книга без излишна теория. Започнах да използвам AI в работата си веднага и резултатите са впечатляващи. Препоръчвам!',
    highlight: 'Впечатляващи резултати',
  },
  {
    name: 'Елена Д.',
    role: 'Предприемач, Варна',
    initials: 'ЕД',
    rating: 5,
    text: 'Стратегиите от книгата ми помогнаха да започна AI-базиран бизнес. Съдържанието е изключително полезно за всеки, който иска да навлезе в сферата.',
    highlight: 'Изключително полезно съдържание',
  },
  {
    name: 'Иван С.',
    role: 'Създател на съдържание, София',
    initials: 'ИС',
    rating: 5,
    text: 'AI промптите спестяват часове работа всеки ден. Създавам по-качествено съдържание много по-бързо. Книгата обяснява всичко ясно и достъпно.',
    highlight: 'Спестява часове работа',
  },
  {
    name: 'Петя Г.',
    role: 'Онлайн консултант, Бургас',
    initials: 'ПГ',
    rating: 5,
    text: 'Ясно обяснение на prompt engineering на български! Примерите са реални, стратегиите работят. Препоръчвам на всеки, който иска да се развива.',
    highlight: 'Ясно и достъпно обяснение',
  },
  {
    name: 'Димитър Н.',
    role: 'E-commerce собственик, Русе',
    initials: 'ДН',
    rating: 5,
    text: 'Автоматизирах много от задачите в бизнеса си с AI след прочитане. Имам повече време за стратегия и развитие. Книгата си заслужава!',
    highlight: 'Повече време за стратегия',
  },
];

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      background="gradient"
      backgroundEffects={
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top gradient glow */}
          <div
            className="absolute top-0 left-0 right-0 h-[450px]"
            style={{
              background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)',
            }}
          />
          {/* Bottom gradient glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[400px]"
            style={{
              background: 'linear-gradient(0deg, rgba(59, 130, 246, 0.12) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 100%)',
            }}
          />
          {/* Right orb */}
          <div
            className="absolute top-[15%] right-0 w-[450px] h-[450px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 60%)',
              filter: 'blur(100px)',
            }}
          />
          {/* Left orb */}
          <div
            className="absolute bottom-[15%] left-0 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
              filter: 'blur(100px)',
            }}
          />
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
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
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col border border-gray-200 shadow-sm hover:shadow-lg hover:shadow-cyan/10 transition-all duration-300">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 mb-4 flex-grow leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Highlight */}
              <div className="bg-gradient-to-r from-cyan/10 to-blue/10 border-l-4 border-cyan px-4 py-2 rounded mb-4">
                <p className="text-sm font-semibold text-navy-dark">
                  {testimonial.highlight}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t-2 border-cyan/20">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan to-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-navy-dark">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <div className="inline-flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-white to-cyan/5 rounded-2xl shadow-lg shadow-cyan/10 p-8 border border-cyan/10">
          <div className="text-center">
            <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
            <div className="text-gray-600">Отлични оценки</div>
          </div>
          <div className="h-16 w-px bg-gray-300 hidden md:block" />
          <div className="text-center">
            <div className="text-5xl font-bold text-navy-dark mb-2">100+</div>
            <div className="text-gray-600">Доволни читатели</div>
          </div>
          <div className="h-16 w-px bg-gray-300 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-gray-600">Практично съдържание</div>
          </div>
        </div>
      </motion.div>

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
