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
    <Section id="showcase" background="gradient" className="relative overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
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

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="text-center">
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
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                <div className="flex-1">
                  <div className="text-2xl md:text-3xl font-bold mb-1 text-navy-dark">
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
        className="text-center mt-16"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan/10 to-blue/10 rounded-full border border-cyan/30">
          <span className="text-2xl">🎉</span>
          <span className="text-navy-dark font-semibold">
            Всичко това за <span className="text-cyan font-bold">€12.99</span> вместо €24.99
          </span>
        </div>
      </motion.div>
    </Section>
  );
}
