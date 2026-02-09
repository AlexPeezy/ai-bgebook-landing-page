'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import Button from './Button';
import ConsultationModal from './ConsultationModal';

export default function ConsultationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Section
      id="consultation"
      background="gradient"
      backgroundEffects={
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 right-0 h-[500px]"
            style={{
              background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.1) 0%, transparent 100%)',
            }}
          />
        </div>
      }
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan to-blue rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
            <span className="bg-gradient-to-r from-cyan via-blue to-cyan-dark bg-clip-text text-transparent">
              Имаш въпрос за AI промптове?
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Получи <strong>безплатна AI консултация</strong> от експерт - реални решения за твоя бизнес.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: '⚡', title: 'Бърз отговор', desc: 'До 24 часа' },
              { icon: '🎯', title: 'Персонализиран', desc: 'За твоята ситуация' },
              { icon: '💡', title: 'Експертен', desc: 'Работещи решения' },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="text-4xl mb-2">{benefit.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="mx-auto"
            >
              Задай безплатен въпрос →
            </Button>
          </motion.div>

          {/* Fine print */}
          <div className="mt-6 inline-block bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-lg px-6 py-3">
            <p className="text-base text-gray-800 font-semibold">
              💎 Купувачите на книгата получават <span className="text-cyan-600">50+ безплатни консултации</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Section>
  );
}
