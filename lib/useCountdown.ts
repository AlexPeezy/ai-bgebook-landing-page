import { useState, useEffect } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  formatted: string;
}

const STORAGE_KEY = 'earlyBirdDeadline';
const DURATION_DAYS = 3;

function getOrCreateDeadline(): Date {
  if (typeof window === 'undefined') {
    // SSR fallback
    const d = new Date();
    d.setDate(d.getDate() + DURATION_DAYS);
    d.setHours(23, 59, 59, 999);
    return d;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const storedDate = new Date(stored);
    if (storedDate > new Date()) {
      return storedDate;
    }
  }

  // Expired or not set — create a new rolling deadline
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + DURATION_DAYS);
  deadline.setHours(23, 59, 59, 999);
  localStorage.setItem(STORAGE_KEY, deadline.toISOString());
  return deadline;
}

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
    let deadline = getOrCreateDeadline();

    const calculateTimeLeft = (): CountdownResult => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;

      if (distance < 0) {
        // Auto-renew: set a new deadline and keep counting
        deadline = getOrCreateDeadline();
        const newDistance = deadline.getTime() - new Date().getTime();
        return buildResult(newDistance);
      }

      return buildResult(distance);
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

function buildResult(distance: number): CountdownResult {
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  let formatted = '';
  if (days > 0) formatted += `${days} ${days === 1 ? 'ден' : 'дни'} `;
  if (hours > 0 || days > 0) formatted += `${hours} ${hours === 1 ? 'час' : 'часа'} `;
  if (days === 0) formatted += `${minutes} мин`;

  return { days, hours, minutes, seconds, isExpired: false, formatted: formatted.trim() };
}
