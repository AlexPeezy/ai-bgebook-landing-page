import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Showcase />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
