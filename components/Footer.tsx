'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Полезни връзки',
      links: [
        { name: 'За книгата', href: '#showcase' },
        { name: 'Отзиви', href: '#testimonials' },
        { name: 'ЧЗВ', href: '#faq' },
      ],
    },
    {
      title: 'Информация',
      links: [
        { name: 'Правила за ползване', href: '/legal/terms' },
        { name: 'Политика за поверителност', href: '/legal/privacy' },
        { name: 'Условия за плащане', href: '/legal/terms' },
      ],
    },
  ];

  // Social links removed - add real URLs when available
  const socialLinks: { name: string; icon: React.ReactNode; href: string }[] = [];

  return (
    <footer className="bg-gradient-to-br from-navy-darker via-navy-dark to-navy text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top gradient glow */}
        <div
          className="absolute top-0 left-0 right-0 h-[350px]"
          style={{
            background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)',
          }}
        />
        {/* Bottom gradient glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[250px]"
          style={{
            background: 'linear-gradient(0deg, rgba(59, 130, 246, 0.12) 0%, transparent 100%)',
          }}
        />
        {/* Right orb */}
        <div
          className="absolute bottom-[15%] right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Left orb */}
        <div
          className="absolute top-[25%] left-0 w-[350px] h-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan to-blue bg-clip-text text-transparent font-heading">
              AI в Реален Доход
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Научи се да превърнеш AI в твоето конкурентно предимство. Пълният наръчник за Prompt Engineering и бизнес стратегии на български език.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-cyan/20 hover:border-cyan/50 transition-all duration-300 border border-white/20"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links columns */}
          {footerLinks.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: columnIndex * 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-cyan">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>© {currentYear} AI в Реален Доход. Всички права запазени.</p>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>100% Сигурно плащане</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>Направено с</span>
            <span className="text-cyan">❤️</span>
            <span>в България</span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="pb-8">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>SSL Криптиране</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Моментална доставка</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue">🇪🇺</span>
              <span>GDPR Съвместимост</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
