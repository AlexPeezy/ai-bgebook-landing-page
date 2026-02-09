'use client';

import { useState } from 'react';

interface UseConsultationReturn {
  submitConsultation: (
    name: string,
    email: string,
    message: string,
    phone?: string
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useConsultation(): UseConsultationReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitConsultation = async (
    name: string,
    email: string,
    message: string,
    phone?: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/consultation-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Нещо се обърка');
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Не успяхме да изпратим запитването. Моля, опитайте отново.'
      );
    } finally {
      setLoading(false);
    }
  };

  return { submitConsultation, loading, error, success };
}
