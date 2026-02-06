'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';

function DownloadErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'Възникна грешка при изтеглянето';

  return (
    <Section background="dark" className="min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center text-5xl mb-8">
          ⚠️
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
          Проблем с изтеглянето
        </h1>

        <p className="text-xl text-gray-300 mb-8">{message}</p>

        <Card glass className="mb-8">
          <div className="text-left space-y-4">
            <h3 className="text-lg font-semibold text-white">Какво можете да направите:</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-cyan">•</span>
                <span>Проверете имейла си за оригиналния линк за изтегляне</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan">•</span>
                <span>Уверете се, че не сте използвали линка повече от 5 пъти</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan">•</span>
                <span>
                  Свържете се с нас на{' '}
                  <a href="mailto:contact@aidohod.com" className="text-cyan hover:underline">
                    contact@aidohod.com
                  </a>{' '}
                  за нов линк
                </span>
              </li>
            </ul>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:contact@aidohod.com?subject=Проблем с изтеглянето">
            <Button size="lg" variant="primary">
              Свържи се с поддръжката
            </Button>
          </a>
          <Link href="/">
            <Button size="lg" variant="outline">
              Към началната страница
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}

export default function DownloadErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <DownloadErrorContent />
    </Suspense>
  );
}
