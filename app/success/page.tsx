'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface SessionData {
  valid: boolean;
  customerEmail?: string;
  amountPaid?: number;
  currency?: string;
  error?: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    async function verifySession() {
      if (!sessionId) {
        setSessionData({ valid: false, error: 'No session ID provided' });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data = await response.json();
        setSessionData(data);
      } catch {
        setSessionData({ valid: false, error: 'Failed to verify payment' });
      } finally {
        setLoading(false);
      }
    }

    verifySession();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-darker to-navy-dark">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan mx-auto mb-4"></div>
          <p className="text-lg">Проверяваме плащането...</p>
        </div>
      </div>
    );
  }

  // Show error state if session is invalid
  if (!sessionData?.valid) {
    return (
      <Section background="dark" className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center text-6xl">
              ✕
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
              Невалидна сесия
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {sessionData?.error || 'Не успяхме да потвърдим плащането.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card glass className="mb-8">
              <div className="text-center space-y-4">
                <p className="text-gray-300">
                  Ако вече сте направили плащане, моля свържете се с нас на{' '}
                  <a
                    href="mailto:contact@aidohod.com"
                    className="text-cyan hover:underline"
                  >
                    contact@aidohod.com
                  </a>
                </p>
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
                Към началната страница
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>
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
          <div className="relative inline-block">
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-4 bg-gradient-to-r from-green-400 via-cyan to-blue rounded-xl blur-2xl opacity-50"
            />
            <Image
              src="/logoo.png"
              alt="AI Ebook"
              width={180}
              height={270}
              className="relative z-10 rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-3 -right-3 z-20 w-12 h-12 bg-gradient-to-r from-green-400 to-cyan rounded-full flex items-center justify-center text-2xl shadow-lg">
              ✓
            </div>
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
                    Изпратихме ви имейл{sessionData.customerEmail && (
                      <> на <span className="text-cyan">{sessionData.customerEmail}</span></>
                    )} с връзка за изтегляне на вашата електронна книга.
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
                        href="mailto:contact@aidohod.com"
                        className="text-cyan hover:underline"
                      >
                        contact@aidohod.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Direct download button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card glass className="border-2 border-cyan/30 bg-cyan/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">📥</div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">
                    Директно изтегляне
                  </h3>
                  <p className="text-sm text-gray-400">
                    Не чакай имейла - изтегли веднага
                  </p>
                </div>
              </div>
              <a href={`/api/download?session_id=${sessionId}`}>
                <Button size="lg" variant="primary">
                  Изтегли PDF
                </Button>
              </a>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
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

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-darker to-navy-dark">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan mx-auto mb-4"></div>
          <p className="text-lg">Зареждане...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
