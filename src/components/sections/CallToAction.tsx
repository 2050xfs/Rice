// components/sections/CallToAction.tsx
"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useBookingModal } from '@/context/BookingModalContext';

export default function CallToAction() {
  const { openModal } = useBookingModal();
  return (
    <div className="primary-gradient">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32">
        <div className="relative isolate overflow-hidden bg-gray-900/50 dark:bg-black/30 px-6 pt-16 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
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
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="h2-style text-white">
              Ready to Elevate Your Event?
            </h2>
            <p className="mt-6 body-text-large text-gray-300">
              Let Rice Entertainment transform your next celebration into an extraordinary experience. Contact us today for a personalized quote.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
                Book Your Event
              </Button>
              <Link href="/contact" passHref>
                <Button variant="transparent" size="lg" className="button-transparent-styles" hasShimmer>
                  Contact Us <span aria-hidden="true">→</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="https://picsum.photos/1152/768?random=8"
              alt="App screenshot showing event planning interface"
              data-ai-hint="event planning app"
              width={1824}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
