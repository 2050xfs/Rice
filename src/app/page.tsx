"use client"; // Make it a client component to use useEffect and window

import { useEffect } from 'react';
// import { useSearchParams } from 'next/navigation'; // Not needed if using hash

import HeroSection from '@/components/sections/HeroSection';
import DealsBar from '@/components/sections/DealsBar';
import ServicesOverview from '@/components/sections/ServicesOverview';
import PartnersSection from '@/components/sections/PartnersSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CallToAction from '@/components/sections/CallToAction';
import ViboAppHighlight from '@/components/sections/ViboAppHighlight';
import ImageGallerySection from '@/components/sections/ImageGallerySection';

export default function Home() {
  useEffect(() => {
    // Check for hash on mount and scroll if present
    // This delay helps ensure the target element is rendered, especially after a redirect.
    const scrollWithDelay = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1); // Remove #
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Optionally, remove the hash from the URL after scrolling to prevent re-scrolling on refresh
          // Be cautious with this if you want the hash to persist for direct linking.
          // window.history.replaceState(null, '', window.location.pathname + window.location.search);
        } else {
          console.warn(`Element with ID ${targetId} not found for scrolling.`);
        }
      }
    };

    // Add a small delay to allow the page to fully render, especially after a redirect
    const timer = setTimeout(scrollWithDelay, 100);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Empty dependency array ensures this runs once on mount and after navigation

  return (
    <>
      <HeroSection />
      <DealsBar />
      <ServicesOverview />
      <PartnersSection />
      <ViboAppHighlight />
      <ImageGallerySection />
      <TestimonialsSection />
      <CallToAction />
    </>
  );
}
