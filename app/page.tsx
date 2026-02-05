import PromoBar from '@/components/PromoBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import Comparison from '@/components/Comparison';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen pt-10">
      <PromoBar />
      <Header />
      <Hero />
      <Showcase />
      <Comparison />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
