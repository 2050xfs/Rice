// components/sections/CallToAction.tsx
"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useBookingModal } from '@/context/BookingModalContext';
import Image from 'next/image';
import { callToActionContent } from '@/content/call-to-action-content';

export default function CallToAction() {
  const { openModal } = useBookingModal();
  return (
    <div className="bg-gray-100 dark:bg-gray-900"> {/* Outer container for section padding */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32"> {/* Section padding */}
        {/* Inner card-like container */}
        <div className="relative isolate overflow-hidden bg-gray-900/50 dark:bg-black/30 px-6 pt-16 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:items-center lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="absolute inset-0 -z-10 overlay-gradient opacity-30" />
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#6366F1" /> {/* Indigo-500 */}
                <stop offset={1} stopColor="#4F46E5" /> {/* Indigo-600 */}
              </radialGradient>
            </defs>
          </svg>
          {/* Text block */}
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="h2-style text-white">
              {callToActionContent.title}
            </h2>
            <p className="mt-6 body-text-large text-gray-300">
              {callToActionContent.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
                {callToActionContent.ctaButton1Text}
              </Button>
              <Link href={callToActionContent.ctaButton2Link} passHref>
                <Button variant="transparent" size="lg" className="button-transparent-styles" hasShimmer>
                  {callToActionContent.ctaButton2Text} <span aria-hidden="true">→</span>
                </Button>
              </Link>
            </div>
          </div>
          {/* Image block container */}
          <div className="relative mt-16 h-80 lg:mt-0 lg:flex-shrink-0 lg:w-1/2"> {/* Changed lg:mt-8 to lg:mt-0 to allow items-center to fully manage vertical alignment */}
            <Image
              className="absolute inset-0 h-full w-full object-cover rounded-md bg-white/5 ring-1 ring-white/10"
              src={callToActionContent.imageSrc}
              alt={callToActionContent.imageAlt}
              data-ai-hint={callToActionContent.imageHint}
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
