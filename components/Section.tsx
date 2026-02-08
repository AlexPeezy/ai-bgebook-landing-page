import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'dark' | 'gradient';
  backgroundEffects?: ReactNode;
}

export default function Section({
  children,
  className = '',
  id,
  background = 'white',
  backgroundEffects,
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    dark: 'bg-gradient-to-br from-navy-darker to-navy-dark text-white',
    gradient: 'bg-gradient-to-br from-cyan/10 via-blue/5 to-transparent',
  };

  // Determine transition gradient colors based on background type
  const topFade = background === 'dark'
    ? 'from-white/10 to-transparent'
    : background === 'white'
    ? 'from-navy-darker/5 to-transparent'
    : 'from-navy-darker/5 to-transparent';

  const bottomFade = background === 'dark'
    ? 'from-transparent to-white/10'
    : background === 'white'
    ? 'from-transparent to-navy-darker/5'
    : 'from-transparent to-navy-darker/5';

  return (
    <section
      id={id}
      className={`py-16 md:py-24 relative overflow-hidden ${backgrounds[background]} ${className}`}
    >
      {/* Top transition gradient */}
      <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${topFade} pointer-events-none z-[1]`} />
      {backgroundEffects}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        {children}
      </div>
      {/* Bottom transition gradient */}
      <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b ${bottomFade} pointer-events-none z-[1]`} />
    </section>
  );
}
