// app/events/[eventType]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useBookingModal } from '@/context/BookingModalContext';
import { eventTypeContentMap, defaultEventTypeContent } from '@/content/event-type-content';
import ImageGallerySection from '@/components/sections/ImageGallerySection';
import PageHero from '@/components/sections/PageHero'; // Import the new hero

export default function EventTypePage() {
  const params = useParams();
  const { openModal } = useBookingModal();
  const eventType = typeof params.eventType === 'string' ? params.eventType : 'default';
  const details = eventTypeContentMap[eventType.toLowerCase()] || defaultEventTypeContent;

  // Function to scroll to a specific section if needed by secondary CTA
  const handleViewDetails = () => {
    const detailsSection = document.getElementById('service-highlights-section');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <PageHero
        badgeText={details.badgeText}
        titleParts={details.titleParts}
        subtitle={details.description}
        features={details.heroFeatures}
        primaryCta={{ text: details.ctaText || "Book This Event", action: openModal }}
        secondaryCta={details.secondaryCtaText ? { text: details.secondaryCtaText, action: handleViewDetails } : undefined}
        imageSrc={details.heroImage}
        imageAlt={`Hero image for ${details.title}`}
        imageHint={details.heroImageHint}
      />

      {/* Service Highlights Section */}
      <div id="service-highlights-section" className="py-24 sm:py-32">
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

      {/* Enhanced Gallery Section - Conditionally render if event type has gallery images */}
      {details.gallery && details.gallery.length > 0 && (
        <ImageGallerySection 
          title="Creating Unforgettable Moments"
          subtitle="Event Gallery"
          description="Experience the energy and excitement of our events through our gallery. From elegant weddings to dynamic corporate gatherings, we bring the perfect atmosphere to every celebration."
          showControls={false}
        />
      )}

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
      <div className="bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32">
          <div className="relative isolate overflow-hidden bg-gray-900/50 dark:bg-black/30 px-6 py-16 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-16 md:py-24">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#6366F1" />
                  <stop offset={1} stopColor="#4F46E5" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="h2-style text-white">
                {details.finalCtaTitle}
              </h2>
              <p className="mt-6 body-text-large text-gray-300">
                {details.finalCtaDescription}
              </p>
              <div className="mt-10">
                <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
                  {details.finalCtaButtonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
