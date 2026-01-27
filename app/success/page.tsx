'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading check
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-darker to-navy-dark">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan mx-auto mb-4"></div>
          <p className="text-lg">Обработваме поръчката...</p>
        </div>
      </div>
    );
  }

  return (
    <Section background="dark" className="min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-cyan rounded-full flex items-center justify-center text-6xl">
            ✓
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            Благодарим за покупката! 🎉
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Вашата поръчка е обработена успешно
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card glass className="mb-8">
            <div className="text-left space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📧</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Проверете имейла си
                  </h3>
                  <p className="text-gray-300">
                    Изпратихме ви имейл с връзка за изтегляне на вашата електронна книга.
                    Проверете и в папката за спам, ако не го виждате в основната входяща поща.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📚</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Какво следва?
                    </h3>
                    <ul className="text-gray-300 space-y-2 text-left">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan">•</span>
                        <span>Изтеглете PDF файла на вашето устройство</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan">•</span>
                        <span>Запазете го за лесен достъп</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan">•</span>
                        <span>Започнете да учите и прилагате знанията веднага!</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💬</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Нужна е помощ?
                    </h3>
                    <p className="text-gray-300">
                      Ако имате въпроси или проблеми с изтеглянето, свържете се с нас на{' '}
                      <a
                        href="mailto:support@example.com"
                        className="text-cyan hover:underline"
                      >
                        support@example.com
                      </a>
                    </p>
                  </div>
                </div>
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
          <Button size="lg" variant="primary">
            Отвори имейла
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline">
              Връщане към началото
            </Button>
          </Link>
        </motion.div>

        {sessionId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-500 text-sm mt-8"
          >
            ID на поръчката: {sessionId.slice(-12)}
          </motion.p>
        )}
      </div>
    </Section>
  );
}
