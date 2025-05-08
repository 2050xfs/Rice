// components/sections/HeroSection.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { heroBackgroundImage } from '@/lib/image-urls';

export default function HeroSection() {
  const { openModal } = useBookingModal();
  return (
    <div className="relative isolate overflow-hidden pt-14 min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <Image
        src={heroBackgroundImage}
        alt="High-energy DJ performance with excited crowd and vibrant lighting"
        data-ai-hint="DJ crowd"
        layout="fill"
        className="absolute inset-0 h-full w-full hero-image" // Applies object-fit, brightness, and z-index from globals.css
        priority
      />
      {/* Primary Overlay: From Top to Bottom */}
      <div className="absolute inset-0 -z-10 hero-overlay-gradient" />
      {/* Secondary Overlay: From Left to Right */}
      <div className="absolute inset-0 -z-10 secondary-hero-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center relative z-0"> {/* Added z-0 to ensure content is above -z-10 elements */}
        <div className="max-w-2xl mx-auto">
          <h1 className="h1-style text-white">
            Unforgettable Events, <span className="text-gradient-highlight">Expertly Crafted</span>
          </h1>
          <p className="mt-6 body-text-large text-gray-300">
            From pulsating DJ sets to interactive photo booths, Rice Entertainment brings your vision to life. Let's create memories that last a lifetime.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={openModal} size="lg" className="button-primary-styles">
              Get a Quote
            </Button>
            <Button variant="transparent" size="lg" className="button-transparent-styles" hasShimmer>
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
