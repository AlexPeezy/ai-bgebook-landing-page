'use client';

import { motion } from 'framer-motion';
import Section from './Section';

export default function Comparison() {
  return (
    <Section
      id="comparison"
      background="dark"
      backgroundEffects={
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-0 left-0 right-0 h-[400px]"
            style={{
              background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[300px]"
            style={{
              background: 'linear-gradient(0deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)',
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
          От <span className="text-yellow-400">объркване</span> към{' '}
          <span className="bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent">реални доходи</span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Виж разликата между случаен подход и стратегията от AI в Реален Доход
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Left card - Without the book */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-navy-darker rounded-xl border border-gray-700 overflow-hidden h-full">
            {/* Window header */}
            <div className="flex items-center justify-between px-4 py-3 bg-navy-dark/50 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-sm">Обикновен резултат</span>
              <span className="text-red-400">✕</span>
            </div>
            {/* Content */}
            <div className="p-6 font-mono text-sm">
              <p className="text-gray-400 mb-4">Ето няколко начина да печелите с AI:</p>
              <div className="space-y-2 text-gray-500">
                <p>1. Създавайте съдържание</p>
                <p>2. Правете преводи</p>
                <p>3. Предлагайте услуги</p>
              </div>
              <p className="text-gray-600 mt-6 italic">Опитайте и ще успеете...</p>
              <div className="mt-8 pt-4 border-t border-gray-700/50">
                <p className="text-red-400/70 text-xs">❌ Без конкретни стъпки</p>
                <p className="text-red-400/70 text-xs mt-1">❌ Без реални примери</p>
                <p className="text-red-400/70 text-xs mt-1">❌ Без готови промпти</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right card - With the book */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-navy-darker rounded-xl border border-cyan/30 overflow-hidden h-full shadow-lg shadow-cyan/10">
            {/* Window header */}
            <div className="flex items-center justify-between px-4 py-3 bg-cyan/10 border-b border-cyan/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-cyan text-sm font-medium">Резултатът с AI в Реален Доход</span>
              <span className="text-green-400">✓</span>
            </div>
            {/* Content */}
            <div className="p-6 font-mono text-sm">
              <p className="text-cyan mb-4">💰 5 ДОКАЗАНИ НАЧИНА ЗА AI ДОХОДИ В БЪЛГАРИЯ</p>

              <p className="text-blue-400 mb-3">📊 БИЗНЕС СТРАТЕГИЯ:</p>

              {/* Table */}
              <div className="text-xs overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="pb-2 pr-2">Услуга</th>
                      <th className="pb-2 pr-2">Инвестиция</th>
                      <th className="pb-2 pr-2">Месечен доход</th>
                      <th className="pb-2">Старт</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 pr-2 text-white">AI Copywriting</td>
                      <td className="py-2 pr-2 text-green-400">0 лв</td>
                      <td className="py-2 pr-2">2000-5000 лв</td>
                      <td className="py-2">1 седмица</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 pr-2 text-white">ChatGPT Консултант</td>
                      <td className="py-2 pr-2 text-green-400">0 лв</td>
                      <td className="py-2 pr-2">3000-8000 лв</td>
                      <td className="py-2">2 седмици</td>
                    </tr>
                    <tr className="border-b border-gray-700/50">
                      <td className="py-2 pr-2 text-white">AI Автоматизация</td>
                      <td className="py-2 pr-2 text-yellow-400">500 лв</td>
                      <td className="py-2 pr-2">5000-15000 лв</td>
                      <td className="py-2">1 месец</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-2 text-white">AI Обучения</td>
                      <td className="py-2 pr-2 text-yellow-400">200 лв</td>
                      <td className="py-2 pr-2">4000-10000 лв</td>
                      <td className="py-2">3 седмици</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-cyan mt-4">📝 &quot;Стъпка по стъпка план за всяка услуга!&quot;</p>

              <div className="mt-4 pt-4 border-t border-cyan/20">
                <p className="text-green-400/90 text-xs">✓ Конкретни стъпки и инструкции</p>
                <p className="text-green-400/90 text-xs mt-1">✓ 20+ реални case studies</p>
                <p className="text-green-400/90 text-xs mt-1">✓ 50+ готови промпти</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
