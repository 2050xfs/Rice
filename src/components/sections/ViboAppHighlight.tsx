// components/sections/ViboAppHighlight.tsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { viboAppHighlightContent } from '@/content/vibo-app-highlight-content';
import { useBookingModal } from '@/context/BookingModalContext';


export default function ViboAppHighlight() {
  const { openModal } = useBookingModal();
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
          <div>
            <p className="section-label-style text-indigo-500">{viboAppHighlightContent.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {viboAppHighlightContent.titlePart1}
              <span className="text-gradient-highlight">{viboAppHighlightContent.titlePart2Highlight}</span>
            </h2>
            <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
              {viboAppHighlightContent.description}
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-300 lg:max-w-none">
              {viboAppHighlightContent.features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900 dark:text-white">
                    <feature.icon className="absolute left-1 top-1 h-5 w-5 text-primary" aria-hidden="true" />
                    {feature.name}
                  </dt>{' '}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <Link href="/vibo-app" passHref>
                 <Button size="lg" className="button-primary-styles">
                  {viboAppHighlightContent.ctaButtonText}
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative group flex justify-center">
            {/* Adjusted image container for better centering/sizing */}
            <div className="relative w-full max-w-md lg:max-w-lg"> 
              <Image
                src={viboAppHighlightContent.imageSrc}
                alt={viboAppHighlightContent.imageAlt}
                data-ai-hint={viboAppHighlightContent.imageHint}
                width={600} // Adjusted width
                height={800} // Adjusted height based on image aspect ratio
                className="rounded-xl shadow-2xl ring-1 ring-gray-900/10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-indigo-400/30 object-contain" // Changed to object-contain
              />
            </div>
            <div className="absolute -inset-4 rounded-xl border-2 border-dashed border-indigo-300/50 dark:border-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-95 group-hover:scale-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
