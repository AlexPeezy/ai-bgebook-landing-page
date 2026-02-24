import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MetaViewContent from '@/components/MetaViewContent';
import MetaScrollTracker from '@/components/MetaScrollTracker';
import StickyMobileCTA from '@/components/StickyMobileCTA';

const ConsultationSection = dynamic(() => import('@/components/ConsultationSection'), {
  loading: () => <div className="min-h-[400px]" aria-hidden="true" />,
});
const Showcase = dynamic(() => import('@/components/Showcase'), {
  loading: () => <div className="min-h-[800px]" aria-hidden="true" />,
});
const Comparison = dynamic(() => import('@/components/Comparison'), {
  loading: () => <div className="min-h-[500px]" aria-hidden="true" />,
});
const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="min-h-[600px]" aria-hidden="true" />,
});
const Pricing = dynamic(() => import('@/components/Pricing'), {
  loading: () => <div className="min-h-[900px]" aria-hidden="true" />,
});
const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="min-h-[800px]" aria-hidden="true" />,
});
const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-[300px]" aria-hidden="true" />,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <MetaViewContent />
      <MetaScrollTracker />
      <StickyMobileCTA />
      <Header />
      <Hero />
      <Testimonials />
      <ConsultationSection />
      <Showcase />
      <Comparison />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
