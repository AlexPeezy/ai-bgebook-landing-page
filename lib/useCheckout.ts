'use client';

import { useState } from 'react';
import { trackInitiateCheckout } from '@/lib/meta-pixel';

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiateCheckout = async (priceType: 'early_bird' | 'regular', email?: string) => {
    setLoading(true);
    setError(null);
    trackInitiateCheckout();

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceType, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Грешка при създаване на поръчката');
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Нещо се обърка. Моля, опитайте отново.');
      setLoading(false);
    }
  };

  return { initiateCheckout, loading, error };
}
