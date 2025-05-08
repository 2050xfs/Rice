// components/sections/HeroSection.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { heroSectionContent } from '@/content/hero-section-content';

export default function HeroSection() {
  const { openModal } = useBookingModal();
  return (
    <div className="relative isolate overflow-hidden pt-14 min-h-[calc(100vh-5rem)] flex items-center justify-center">
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
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center relative z-0"> {/* Added z-0 to ensure content is above -z-10 elements */}
        <div className="max-w-3xl mx-auto"> {/* Increased max-width slightly for longer title */}
          <h1 className="h1-style text-white">
            <span className="text-gradient-highlight">{heroSectionContent.titleHighlight1}</span>
            {heroSectionContent.titlePart1}
            <span className="text-gradient-highlight">{heroSectionContent.titlePart2Highlight}</span>
          </h1>
          <p className="mt-6 body-text-large text-gray-200"> {/* Changed text-gray-300 to text-gray-200 */}
            {heroSectionContent.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={openModal} size="lg" className="button-primary-styles">
              {heroSectionContent.ctaButton1Text}
            </Button>
            <Button variant="transparent" size="lg" className="button-transparent-styles" hasShimmer>
              {heroSectionContent.ctaButton2Text} <span aria-hidden="true">→</span> {/* Added arrow */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
