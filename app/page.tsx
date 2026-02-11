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

export default function Home() {
  return (
    <main className="min-h-screen">
      <MetaViewContent />
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
