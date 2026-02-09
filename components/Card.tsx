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
      whileHover={
        hover
          ? {
              y: -5,
              boxShadow: glass
                ? '0 20px 40px rgba(34, 197, 230, 0.15), 0 10px 20px rgba(59, 130, 246, 0.1)'
                : '0 20px 40px rgba(0, 0, 0, 0.1)',
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : {}
      }
      className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${glassStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
