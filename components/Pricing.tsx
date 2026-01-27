'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import Card from './Card';
import Button from './Button';
import { useCheckout } from '@/lib/useCheckout';

const features = [
  'Пълен достъп до всички 150+ страници',
  '50+ готови AI промпта',
  '30+ проверени бизнес модела',
  '20+ реални case studies',
  '12 модула обучение',
  'Бонус: AI Tools справочник',
  'Бонус: Шаблони за автоматизация',
  'Безплатни актуализации',
  'Моментално получаване (PDF)',
  'Достъп от всички устройства',
];

const pricingPlans = [
  {
    name: 'Early Bird',
    badge: 'ОГРАНИЧЕНА ОФЕРТА',
    badgeColor: 'bg-gradient-to-r from-cyan to-blue',
    price: '12.99',
    originalPrice: '24.99',
    discount: '48%',
    features: features,
    cta: 'Купи Early Bird',
    highlighted: true,
    spots: 53,
    description: 'Специална цена за първите купувачи',
  },
  {
    name: 'Редовна цена',
    badge: 'СКОРО',
    badgeColor: 'bg-gray-400',
    price: '24.99',
    features: features,
    cta: 'Скоро достъпна',
    highlighted: false,
    description: 'Редовна цена след изчерпване на оферта',
    disabled: true,
  },
];

export default function Pricing() {
  const { initiateCheckout, loading, error } = useCheckout();

  const handleBuyEarlyBird = () => {
    initiateCheckout('early_bird');
  };

  return (
    <Section id="pricing" background="dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
          Избери своя план
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Инвестирай в себе си днес. 30-дневна гаранция за връщане на парите.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={plan.highlighted ? 'md:scale-105' : ''}
          >
            <Card
              glass
              hover={plan.highlighted}
              className={`h-full relative ${
                plan.highlighted
                  ? 'border-2 border-cyan shadow-2xl shadow-cyan/20'
                  : ''
              }`}
            >
              {/* Badge */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div
                    className={`inline-block ${plan.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-4`}
                  >
                    {plan.badge}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>
                {plan.highlighted && (
                  <div className="text-right">
                    <div className="text-cyan text-xs font-semibold">
                      Останаха
                    </div>
                    <div className="text-white text-2xl font-bold">
                      {plan.spots}
                    </div>
                    <div className="text-gray-400 text-xs">копия</div>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-5xl font-bold text-white">
                    €{plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through mb-2">
                      €{plan.originalPrice}
                    </span>
                  )}
                </div>
                {plan.discount && (
                  <div className="inline-block bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">
                    Спестяваш {plan.discount}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-cyan to-blue flex items-center justify-center mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button
                variant={plan.highlighted ? 'primary' : 'outline'}
                size="lg"
                fullWidth
                disabled={plan.disabled}
                onClick={plan.highlighted ? handleBuyEarlyBird : undefined}
                isLoading={plan.highlighted && loading}
              >
                {plan.cta}
              </Button>

              {plan.highlighted && (
                <>
                  <div className="mt-4 text-center text-xs text-gray-400">
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
                </>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Money-back guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Card glass className="inline-block">
          <div className="flex items-center gap-4">
            <div className="text-5xl">✅</div>
            <div className="text-left">
              <div className="text-white font-bold text-lg mb-1">
                30-дневна гаранция
              </div>
              <div className="text-gray-400 text-sm">
                Не харесаш книгата? Връщаме ти парите, без въпроси.
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Section>
  );
}
