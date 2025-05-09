import HeroSection from '@/components/sections/HeroSection';
import DealsBar from '@/components/sections/DealsBar';
import ServicesOverview from '@/components/sections/ServicesOverview';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CallToAction from '@/components/sections/CallToAction';
import ViboAppHighlight from '@/components/sections/ViboAppHighlight';
import ImageGallerySection from '@/components/sections/ImageGallerySection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <DealsBar />
      <ServicesOverview />
      <ViboAppHighlight />
      <ImageGallerySection />
      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
