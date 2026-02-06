'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function CancelPage() {
  return (
    <Section background="dark" className="min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-6xl">
            ✕
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            Плащането е отменено
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Вашата поръчка не е завършена
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card glass className="mb-8">
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">💭</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Имате въпроси или притеснения?
              </h3>
              <p className="text-gray-300 mb-4">
                Разбираме, че взимането на решение може да отнеме време. Нашата оферта все още е налична!
              </p>

              <div className="bg-cyan/10 border border-cyan/30 rounded-lg p-4 text-left">
                <h4 className="text-white font-semibold mb-2">Защо да изберете нас?</h4>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan">✓</span>
                    <span>30-дневна гаранция за връщане на парите</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan">✓</span>
                    <span>Моментално получаване след покупка</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan">✓</span>
                    <span>Проверено от 500+ доволни клиенти</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan">✓</span>
                    <span>Early Bird цената още е достъпна!</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-gray-300">
                  Имате въпроси? Свържете се с нас на{' '}
                  <a
                    href="mailto:contact@aidohod.com"
                    className="text-cyan hover:underline"
                  >
                    contact@aidohod.com
                  </a>
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/#pricing">
            <Button size="lg" variant="primary">
              Опитай отново
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">
              Връщане към началото
            </Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
