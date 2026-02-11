'use client';

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/lib/meta-pixel';

const MILESTONES = [25, 50, 75, 100];

export default function MetaScrollTracker() {
  const firedRef = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
