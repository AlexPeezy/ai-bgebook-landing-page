'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import Card from './Card';
import AnimatedCounter from './AnimatedCounter';
import TypingText from './TypingText';
import { useIsMobile } from '@/lib/useIsMobile';

const features = [
  {
    icon: '🎯',
    value: 5,
    title: 'Стъпки формула за промптове',
    description: 'Роля, контекст, цел, формат и ограничения',
  },
  {
    icon: '💰',
    value: 7,
    suffix: '+',
    title: 'Модела за доход с AI',
    description: 'Без програмиране, за българския пазар',
  },
  {
    icon: '📅',
    value: 30,
    title: 'Дневен план за действие',
    description: 'Седмица по седмица до първите приходи',
  },
  {
    icon: '🤝',
    value: 4,
    title: 'Стратегии за клиенти',
    description: 'Как да намериш клиенти без реклама',
  },
  {
    icon: '📖',
    value: 12,
    title: 'Глави обучение',
    description: 'От основи до реални приходи стъпка по стъпка',
  },
  {
    icon: '⚠️',
    value: 7,
    title: 'Грешки да избегнеш',
    description: 'Спести си месеци лутане от самото начало',
  },
];

export default function Showcase() {
  const isMobile = useIsMobile();
  return (
    <>
      {/* White Section - Terminal */}
      <Section
        id="showcase"
        background="white"
        backgroundEffects={
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Subtle top gradient */}
            <div
              className="absolute top-0 left-0 right-0 h-[400px]"
              style={{
                background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, transparent 100%)',
              }}
            />
          </div>
        }
      >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
          <span className="bg-gradient-to-r from-cyan via-blue to-cyan-dark bg-clip-text text-transparent">
            AI революцията е тук
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Не чакай другите да те изпреварят. Започни днес и превърни AI в твоя конкурентно предимство.
        </p>
      </motion.div>

      {/* Prompt Lab Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto mb-16"
      >
        <div className="bg-gray-50 rounded-xl border border-cyan/30 overflow-hidden shadow-2xl shadow-cyan/10">
          {/* Window header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 border-b border-cyan/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-cyan text-sm font-medium ml-2">Промпт Лаборатория</span>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* User prompt - basic */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">ВАШИЯТ ПРОМПТ:</div>
              <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 font-mono text-sm">Напиши ми бизнес идея с AI.</p>
              </div>
            </motion.div>

            {/* Arrow with pulse */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <motion.div
                animate={isMobile ? undefined : { y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-cyan text-2xl"
              >
                ↓
              </motion.div>
            </motion.div>

            {/* Optimized prompt with typing */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="text-cyan text-xs uppercase tracking-wider mb-2">ОПТИМИЗИРАН С НАРЪЧНИКА:</div>
              <div className="bg-gradient-to-br from-cyan/10 to-blue/5 rounded-lg p-4 border border-cyan/30">
                <TypingText
                  text="Действай като бизнес консултант с 15г. опит в дигитален маркетинг. Създай 5 конкретни начина да печеля пари с ChatGPT, включващи: необходими умения, начални инвестиции, потенциален месечен доход и стъпки за стартиране. Фокусирай се върху българския пазар."
                  delay={800}
                  speed={25}
                  className="text-gray-700 font-mono text-sm leading-relaxed"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Научи се да превръщаш слаби промптове в мощни инструкции
        </p>
      </motion.div>
    </Section>

      {/* White Section - Features Grid */}
      <Section
        id="features"
        background="white"
      >
        {/* Features/Content value grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 font-heading text-navy-dark">
            Какво ще получиш?
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                <Card className="h-full bg-white border border-gray-200 hover:border-cyan/30 hover:shadow-xl hover:shadow-cyan/10 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    {/* Icon with rotation on hover */}
                    <motion.div
                      className="text-4xl flex-shrink-0"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {feature.icon}
                    </motion.div>

                    <div className="flex-1">
                      {/* Counter with gradient shift on hover */}
                      <div className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-cyan via-blue to-cyan-dark bg-clip-text text-transparent group-hover:from-blue group-hover:via-cyan group-hover:to-blue transition-all duration-500">
                        <AnimatedCounter
                          value={feature.value}
                          suffix={feature.suffix}
                        />
                      </div>

                      <h4 className="text-lg font-semibold mb-2 text-navy group-hover:text-navy-dark transition-colors duration-300">
                        {feature.title}
                      </h4>

                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan/10 to-blue/5 rounded-full border border-cyan/30 shadow-lg shadow-cyan/5 hover:shadow-cyan/10 transition-all duration-300">
            <span className="text-2xl">🎉</span>
            <span className="text-navy-dark font-semibold">
              Всичко това за само <span className="text-cyan font-bold">€15</span>
            </span>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
