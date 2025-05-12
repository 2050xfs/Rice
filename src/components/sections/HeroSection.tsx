// components/sections/HeroSection.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext'; // Updated import
import { heroSectionContent } from '@/content/hero-section-content';
import LottieScrollIndicator from '@/components/common/LottieScrollIndicator';

export default function HeroSection() {
  const { openModal } = useBookingModal(); // Updated hook usage
  return (
    <div className="relative isolate overflow-hidden pt-14 min-h-[calc(100vh-6rem-7rem)] flex flex-col justify-between">
      <Image
        src={heroSectionContent.backgroundImage}
        alt={heroSectionContent.backgroundImageAlt}
        data-ai-hint={heroSectionContent.backgroundImageHint}
        layout="fill"
        className="absolute inset-0 h-full w-full hero-image" // Applies object-fit, brightness, and z-index from globals.css
        priority
      />
      {/* Primary Overlay: From Top to Bottom */}
      <div className="absolute inset-0 -z-10 hero-overlay-gradient" />
      {/* Secondary Overlay: From Left to Right */}
      <div className="absolute inset-0 -z-10 secondary-hero-overlay" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20 text-center relative z-0 flex-grow flex items-center justify-center"> {/* Reduced padding and added flex */}
        <div className="max-w-3xl mx-auto"> {/* Increased max-width slightly for longer title */}
          <h1 className="h1-style text-white">
            <span className="text-gradient-highlight">{heroSectionContent.titleHighlight1}</span>
            {heroSectionContent.titlePart1}
            <span className="text-gradient-highlight">{heroSectionContent.titlePart2Highlight}</span>
          </h1>
          <p className="mt-6 body-text-large text-white"> {/* Changed text color to white */}
            {heroSectionContent.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={openModal} size="lg" className="button-primary-styles"> {/* Use openModal */}
              {heroSectionContent.ctaButton1Text}
            </Button>
            <Button variant="transparent" size="lg" className="button-transparent-styles" hasShimmer>
              {heroSectionContent.ctaButton2Text} <span aria-hidden="true">→</span> {/* Added arrow */}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="flex justify-center pb-4">
        <LottieScrollIndicator />
      </div>
    </div>
  );
}
