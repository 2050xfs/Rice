import HeroSection from '@/components/sections/HeroSection';
import ServicesOverview from '@/components/sections/ServicesOverview';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CallToAction from '@/components/sections/CallToAction';
import ViboAppHighlight from '@/components/sections/ViboAppHighlight';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <ViboAppHighlight />
      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
