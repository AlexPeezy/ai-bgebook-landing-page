'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  delay?: number;
}

export default function AnimatedText({
  children,
  className = '',
  gradient = false,
  delay = 0,
}: AnimatedTextProps) {
  const gradientStyles = gradient
    ? 'bg-gradient-to-r from-cyan via-blue to-cyan-dark bg-clip-text text-transparent animate-gradient'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`${gradientStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
