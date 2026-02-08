'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import Card from './Card';
import AnimatedCounter from './AnimatedCounter';

const stats = [
  {
    icon: '🚀',
    value: 40,
    suffix: '%',
    label: 'Годишен растеж на AI индустрията',
    color: 'from-cyan to-blue',
  },
  {
    icon: '💰',
    value: 2000,
    prefix: '€',
    suffix: '+',
    label: 'Месечни приходи на завършили',
    color: 'from-blue to-cyan-dark',
  },
  {
    icon: '📈',
    value: 300,
    suffix: '%',
    label: 'Увеличение на търсенето на AI умения',
    color: 'from-cyan-dark to-blue-dark',
  },
  {
    icon: '👥',
    value: 500,
    suffix: '+',
    label: 'Обучени предприемачи',
    color: 'from-blue-dark to-cyan',
  },
];

const features = [
  {
    icon: '📚',
    value: 150,
    suffix: '+',
    title: 'Страници съдържание',
    description: 'Детайлни обяснения и практически примери',
  },
  {
    icon: '💡',
    value: 50,
    suffix: '+',
    title: 'Готови AI промпта',
    description: 'За директна употреба в твоя бизнес',
  },
  {
    icon: '🎯',
    value: 30,
    suffix: '+',
    title: 'Бизнес модела',
    description: 'Доказани стратегии за печалба с AI',
  },
  {
    icon: '📊',
    value: 20,
    suffix: '+',
    title: 'Case Studies',
    description: 'Реални истории от български предприемачи',
  },
  {
    icon: '🎓',
    value: 12,
    title: 'Модула обучение',
    description: 'От основи до напреднали техники',
  },
  {
    icon: '⚡',
    value: 30,
    title: 'Дни до първи приходи',
    description: 'Следвай стъпките и виж резултати',
  },
];

export default function Showcase() {
  return (
    <Section
      id="showcase"
      background="gradient"
      backgroundEffects={
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Subtle top gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-[400px]"
            style={{
              background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.1) 0%, transparent 100%)',
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
        <div className="bg-navy-darker rounded-xl border border-cyan/30 overflow-hidden shadow-2xl shadow-cyan/10">
          {/* Window header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-navy-dark/80 border-b border-cyan/20">
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
            <div>
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">ВАШИЯТ ПРОМПТ:</div>
              <div className="bg-navy-dark/50 rounded-lg p-4 border border-gray-700">
                <p className="text-gray-300 font-mono text-sm">Напиши ми бизнес идея с AI.</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-cyan text-2xl">↓</div>
            </div>

            {/* Optimized prompt */}
            <div>
              <div className="text-cyan text-xs uppercase tracking-wider mb-2">ОПТИМИЗИРАН С НАРЪЧНИКА:</div>
              <div className="bg-gradient-to-br from-cyan/10 to-blue/5 rounded-lg p-4 border border-cyan/30">
                <p className="text-gray-200 font-mono text-sm leading-relaxed">
                  Действай като бизнес консултант с 15г. опит в дигитален маркетинг. Създай 5 конкретни начина да печеля пари с ChatGPT, включващи: необходими умения, начални инвестиции, потенциален месечен доход и стъпки за стартиране. Фокусирай се върху българския пазар.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-gray-500 text-sm mt-4">
          50+ готови промпта като този в книгата
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="text-center border border-cyan/10 border-b-2 border-b-cyan/30 hover:shadow-lg hover:shadow-cyan/10 transition-all duration-300">
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Features/Content value grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 font-heading">
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
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full border border-cyan/10 hover:shadow-lg hover:shadow-cyan/20 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                <div className="flex-1">
                  <div className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-cyan via-blue to-cyan-dark bg-clip-text text-transparent">
                    <AnimatedCounter
                      value={feature.value}
                      suffix={feature.suffix}
                    />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-navy">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
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
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan/20 to-blue/10 rounded-full border border-cyan/30 shadow-lg shadow-cyan/10 hover:shadow-cyan/20 transition-all duration-300">
          <span className="text-2xl">🎉</span>
          <span className="text-navy-dark font-semibold">
            Всичко това за <span className="text-cyan font-bold">€12.99</span> вместо €24.99
          </span>
        </div>
      </motion.div>
    </Section>
  );
}
