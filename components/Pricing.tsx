'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from './Section';
import Card from './Card';
import Button from './Button';
import EmailCaptureModal from './EmailCaptureModal';
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

const pricingPlan = {
  name: 'Early Bird',
  badge: 'ОГРАНИЧЕНА ОФЕРТА',
  badgeColor: 'bg-gradient-to-r from-cyan to-blue',
  price: '12.99',
  originalPrice: '24.99',
  discount: '48%',
  features: features,
  cta: 'Купи Early Bird',
  spots: 53,
  description: 'Специална цена за първите купувачи',
};

export default function Pricing() {
  const { initiateCheckout, loading, error } = useCheckout();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyEarlyBird = () => {
    setIsModalOpen(true);
  };

  const handleEmailSubmit = (email: string) => {
    initiateCheckout('early_bird', email);
  };

  return (
    <Section
      id="pricing"
      background="dark"
      backgroundEffects={
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top arc glow */}
          <div
            className="absolute top-0 left-0 right-0 h-[700px]"
            style={{
              background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 100%)',
            }}
          />
          {/* Bottom arc glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[600px]"
            style={{
              background: 'linear-gradient(0deg, rgba(59, 130, 246, 0.18) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 100%)',
            }}
          />
          {/* Right orb */}
          <div
            className="absolute top-[10%] right-0 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 60%)',
              filter: 'blur(120px)',
            }}
          />
          {/* Left orb */}
          <div
            className="absolute bottom-[10%] left-0 w-[550px] h-[550px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
              filter: 'blur(120px)',
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      }
    >
      {/* Book cover with glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mb-12"
      >
        <div
          className="relative"
          style={{ filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15))' }}
        >
          {/* Outer glow */}
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1.05, 1, 1.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-6 bg-gradient-to-tr from-blue/20 via-cyan/30 to-blue/20 rounded-2xl blur-2xl"
          />
          {/* Inner glow */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -inset-3 bg-gradient-to-r from-cyan/20 via-blue/30 to-cyan/20 rounded-xl blur-xl"
          />
          <Image
            src="/logoo.png"
            alt="AI Ebook Cover"
            width={280}
            height={420}
            className="relative z-10 rounded-xl border border-cyan/20 max-w-[200px] md:max-w-[250px]"
            style={{
              boxShadow: '0 0 20px rgba(34, 197, 230, 0.15), 0 0 40px rgba(59, 130, 246, 0.1)',
            }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">
          Вземи книгата сега
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Инвестирай в себе си днес. 30-дневна гаранция за връщане на парите.
        </p>
      </motion.div>

      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card
            glass
            hover
            className="h-full relative transition-all duration-300 border-2 border-cyan shadow-2xl shadow-cyan/20"
          >
            {/* Badge */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div
                  className={`inline-block ${pricingPlan.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-4`}
                >
                  {pricingPlan.badge}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                  {pricingPlan.name}
                </h3>
                <p className="text-gray-400 text-sm">{pricingPlan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-cyan text-xs font-semibold">
                  Останаха
                </div>
                <div className="text-white text-2xl font-bold">
                  {pricingPlan.spots}
                </div>
                <div className="text-gray-400 text-xs">копия</div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-bold text-white">
                  €{pricingPlan.price}
                </span>
                <span className="text-2xl text-gray-500 line-through mb-2">
                  €{pricingPlan.originalPrice}
                </span>
              </div>
              <div className="inline-block bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">
                Спестяваш {pricingPlan.discount}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {pricingPlan.features.map((feature, idx) => (
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
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleBuyEarlyBird}
              isLoading={loading}
            >
              {pricingPlan.cta}
            </Button>

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
          </Card>
        </motion.div>
      </div>

      {/* Money-back guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Card glass className="inline-block border-2 border-cyan/30 bg-cyan/5 shadow-lg shadow-cyan/10">
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

      {/* Email capture modal */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEmailSubmit}
        isLoading={loading}
      />
    </Section>
  );
}
