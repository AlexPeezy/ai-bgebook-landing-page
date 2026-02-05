import { useState, useEffect } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  formatted: string;
}

// Set the deadline - can be configured via env var or changed here
// Default: 7 days from now for initial load, but uses a fixed date in production
const getDeadline = (): Date => {
  // You can set a fixed deadline in production like:
  // return new Date('2026-02-10T23:59:59');

  // Or use an environment variable:
  if (process.env.NEXT_PUBLIC_EARLY_BIRD_DEADLINE) {
    return new Date(process.env.NEXT_PUBLIC_EARLY_BIRD_DEADLINE);
  }

  // Default: 3 days from now (for demo purposes)
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 3);
  deadline.setHours(23, 59, 59, 999);
  return deadline;
};

export function useCountdown(): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    formatted: '',
  });

  useEffect(() => {
    const deadline = getDeadline();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;

      if (distance < 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          formatted: 'Офертата изтече',
        };
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Format the countdown string
      let formatted = '';
      if (days > 0) {
        formatted += `${days} ${days === 1 ? 'ден' : 'дни'} `;
      }
      if (hours > 0 || days > 0) {
        formatted += `${hours} ${hours === 1 ? 'час' : 'часа'} `;
      }
      if (days === 0) {
        formatted += `${minutes} мин`;
      }

      return {
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
        formatted: formatted.trim(),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
