import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import Comparison from '@/components/Comparison';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import ConsultationSection from '@/components/ConsultationSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import MetaViewContent from '@/components/MetaViewContent';
import MetaScrollTracker from '@/components/MetaScrollTracker';

export default function Home() {
  return (
    <main className="min-h-screen">
      <MetaViewContent />
      <MetaScrollTracker />
      <Header />
      <Hero />
      <ConsultationSection />
      <Showcase />
      <Comparison />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
