'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({
  children,
  className = '',
  hover = true,
  glass = false,
}: CardProps) {
  const glassStyles = glass
    ? 'bg-white/10 backdrop-blur-lg border border-white/20'
    : 'bg-white border border-gray-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`rounded-xl p-6 shadow-lg ${glassStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
