import { useState, useEffect } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  formatted: string;
}

// Real early bird deadline — do NOT reset or extend this
const EARLY_BIRD_DEADLINE = new Date('2026-03-22T15:10:00+02:00');

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
    const calculateTimeLeft = (): CountdownResult => {
      const distance = EARLY_BIRD_DEADLINE.getTime() - new Date().getTime();

      if (distance <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, formatted: '' };
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
