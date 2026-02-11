'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Section from './Section';

const faqs = [
  {
    question: 'За кого е тази книга?',
    answer:
      'Книгата е подходяща за всеки, който иска да научи как да използва AI за печалба - предприемачи, фрийлансъри, маркетолози, студенти, или просто любопитни хора. Не са необходими технически знания.',
  },
  {
    question: 'Нужни ли са ми предварителни знания за AI?',
    answer:
      'Не! Книгата е написана на разбираем български език и започва от основите. Обяснявам всичко стъпка по стъпка, от базови концепции до напреднали стратегии.',
  },
  {
    question: 'Какво съдържа книгата?',
    answer:
      'Получаваш 150+ страници съдържание, включително: Master AI prompt engineering техники, 30+ проверени бизнес модела, 50+ готови промпта, 20+ реални case studies, 12 модула обучение, бонус ресурси и още много.',
  },
  {
    question: 'Във какъв формат получавам книгата?',
    answer:
      'Книгата е в PDF формат, който можеш да четеш от всяко устройство - компютър, таблет, телефон. Получаваш го моментално след покупка на имейла си.',
  },
  {
    question: 'Каква е разликата между Early Bird и редовната цена?',
    answer:
      'Цената е само €15 за пълния наръчник с всички стратегии, промптове и бонуси. Еднократно плащане, без скрити такси.',
  },
  {
    question: 'Как се извършва плащането?',
    answer:
      'Плащането е 100% сигурно чрез Stripe - водещата платформа за онлайн плащания. Приемаме всички основни карти (Visa, Mastercard) и различни методи като Apple Pay и Google Pay.',
  },
  {
    question: 'Колко време ще ми отнеме да прочета книгата?',
    answer:
      'Повечето хора четат книгата за 3-5 часа. Но не е нужно да я четеш наведнъж - можеш да се върнеш към различните модули когато имаш нужда. Промптите и стратегиите са готови за директна употреба.',
  },
  {
    question: 'Ще има ли актуализации?',
    answer:
      'Да! AI светът се развива бързо, затова книгата се актуализира редовно с нови промпти, стратегии и case studies. Всички актуализации са безплатни за хора, които са купили книгата.',
  },
  {
    question: 'Мога ли да използвам промптите в моя бизнес?',
    answer:
      'Разбира се! Всички промпти, стратегии и модели от книгата са за твоя лична и комерсиална употреба. Използвай ги свободно в бизнеса си и печели.',
  },
  {
    question: 'Какво да направя ако не получа имейл?',
    answer:
      'Първо провери папката за спам/нежелана поща. Ако и там няма имейл, пиши ни на contact@bgpromptbook.shop с номера на поръчката и ще ти изпратим книгата ръчно веднага. Имаш и възможност за директно изтегляне от страницата след успешно плащане.',
  },
  {
    question: 'Има ли видео съдържание?',
    answer:
      'Книгата е в PDF формат с текст и илюстрации. Не включва видео съдържание, но всички обяснения са детайлни и стъпка по стъпка, така че да можеш лесно да следваш инструкциите.',
  },
  {
    question: 'Какви AI инструменти са включени?',
    answer:
      'Книгата покрива работа с ChatGPT, Claude, Midjourney, DALL-E и други популярни AI инструменти. Фокусът е върху prompt engineering техники, които работят с повечето AI модели.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section
      id="faq"
      background="white"
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
            Често задавани въпроси
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Всичко, което трябва да знаеш преди да започнеш
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <div
              className={`bg-white border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'border-cyan shadow-lg shadow-cyan/20'
                  : 'border-gray-200 hover:border-cyan/50'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-navy-dark pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-6 h-6 text-cyan"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Still have questions CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <div className="inline-block bg-gradient-to-br from-cyan/15 to-blue/10 rounded-2xl p-8 border border-cyan/30 shadow-lg shadow-cyan/10">
          <p className="text-lg text-navy-dark mb-4">
            Все още имаш въпроси?
          </p>
          <p className="text-gray-600 mb-6">
            Пиши ни на{' '}
            <a
              href="mailto:contact@bgpromptbook.shop"
              className="text-cyan font-semibold hover:underline hover:text-cyan-dark transition-colors duration-300"
            >
              contact@bgpromptbook.shop
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Обикновено отговаряме в рамките на 24 часа
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
