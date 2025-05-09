// app/events/[eventType]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useBookingModal } from '@/context/BookingModalContext'; // Updated import
import { eventTypeContentMap, defaultEventTypeContent } from '@/content/event-type-content';
import ImageGallerySection from '@/components/sections/ImageGallerySection';

export default function EventTypePage() {
  const params = useParams();
  const { openModal } = useBookingModal(); // Updated hook usage
  const eventType = typeof params.eventType === 'string' ? params.eventType : 'default';
  const details = eventTypeContentMap[eventType.toLowerCase()] || defaultEventTypeContent;

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 lg:pt-20">
        <Image
          src={details.heroImage}
          alt={`Hero image for ${details.title}`}
          data-ai-hint={details.heroImageHint}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay-gradient from-black/80 via-black/60 to-black/30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="section-label-style text-indigo-300">{details.tagline}</p>
          <h1 className="mt-2 h1-style text-white">
            {details.title}
          </h1>
          <p className="mt-6 body-text-large text-gray-200 max-w-3xl mx-auto">
            {details.description}
          </p>
          <div className="mt-10">
            <Button onClick={openModal} size="lg" className="button-primary-styles"> {/* Use openModal */}
              {details.ctaText || "Book This Event Type"}
            </Button>
          </div>
        </div>
      </div>

      {/* Service Highlights Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">What We Offer For {details.title}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              Tailored Services for Your {eventType.charAt(0).toUpperCase() + eventType.slice(1).replace('-', ' ')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {details.serviceHighlights.map((highlight) => (
              <div key={highlight.title} className="relative pl-16">
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <highlight.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {highlight.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{highlight.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Gallery Section */}
      <ImageGallerySection />

      {/* Why Choose Us Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center">
            <p className="section-label-style">The Rice Entertainment Difference</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">Why Choose Us For Your {details.title}?</h2>
            <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
                {details.whyChooseText}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:mx-auto sm:max-w-2xl sm:grid-cols-1 lg:max-w-none lg:grid-cols-3">
            {details.whyChooseReasons.map((reason) => (
                <Card key={reason.name} className="bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                            <CheckCircle className="h-6 w-6 mr-3 text-green-500" />
                            {reason.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{reason.description}</p>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="h2-style text-white">
            {details.finalCtaTitle}
          </h2>
          <p className="mt-6 body-text-large text-indigo-100">
            {details.finalCtaDescription}
          </p>
          <div className="mt-10">
             <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100"> {/* Use openModal */}
              {details.finalCtaButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
