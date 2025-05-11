// app/services/photo-booths/page.tsx
"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookingModal } from '@/context/BookingModalContext';
import { photoBoothsPageContent } from '@/content/photo-booths-page-content';
import PageHero from '@/components/sections/PageHero';
import VideoThumbnail from '@/components/common/VideoThumbnail';
import EndlessCarousel, { CarouselImage } from '@/components/common/EndlessCarousel';
import { cn } from '@/lib/utils';

export default function PhotoBoothsPage() {
  const { openModal } = useBookingModal();
  const { hero, booths, addOns, cta } = photoBoothsPageContent;
  const FeatureIcon = booths.featureIcon;

  const handleScheduleDemo = () => {
    // For photo booths, "Schedule a Demo" might open the same booking modal
    // or a different one if specialized demo requests are handled differently.
    // Assuming it opens the standard booking modal for now.
    openModal();
  };

  const handleViewGallery = () => {
    const galleryElement = document.getElementById('booth-types-section');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <PageHero
        badgeText={hero.badgeText}
        titleParts={hero.titleParts}
        subtitle={hero.description}
        features={hero.features}
        primaryCta={{ text: hero.ctaButtonText, action: handleScheduleDemo }}
        secondaryCta={hero.secondaryCtaText && hero.secondaryCtaLink ? { text: hero.secondaryCtaText, action: handleViewGallery } : undefined}
        imageSrc={hero.image}
        imageAlt={hero.imageAlt}
        imageHint={hero.imageHint}
      />

      {/* Booth Types Section */}
      <div id="booth-types-section" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">{booths.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {booths.title}
            </h2>
          </div>

          <Tabs defaultValue={booths.items[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-12 gap-1 bg-gray-200 dark:bg-gray-700/50 p-1 rounded-lg shadow-inner">
              {booths.items.map((booth) => (
                <TabsTrigger
                  key={booth.id}
                  value={booth.id}
                  className="flex items-center justify-center gap-2 rounded-md py-2.5 px-3 text-sm font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:bg-primary/10 data-[state=inactive]:hover:text-primary"
                >
                  <booth.icon className="h-5 w-5 mr-0" /> {/* Removed mr-2 as gap-2 on trigger handles spacing */}
                  {booth.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {booths.items.map((booth) => (
              <TabsContent key={booth.id} value={booth.id}>
                <Card className="overflow-hidden shadow-lg bg-white dark:bg-gray-900 border-0 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative min-h-[300px] md:min-h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4 md:p-8">
                      {booth.id === 'luxxbooth' ? (
                        <VideoThumbnail
                          src={booth.image}
                          alt={booth.name}
                          dataAiHint={booth.imageHint}
                          layout="fill"
                          objectFit="cover"
                        />
                      ) : (
                        <Image
                          src={booth.image}
                          alt={booth.name}
                          data-ai-hint={booth.imageHint}
                          layout="fill"
                          objectFit="contain" 
                          className="max-h-[400px] md:max-h-full w-auto h-auto"
                        />
                      )}
                    </div>
                    <div className={cn(
                        "p-8 md:p-12",
                        booth.id === 'socialbooth' && "p-6 md:p-8" // Scaled down padding for social booth
                      )}>
                      <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900 px-3 py-1 text-sm font-medium text-primary dark:text-indigo-300 mb-2">
                        {booth.tagline}
                      </span>
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="h3-style text-gray-900 dark:text-white">{booth.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="body-text-default text-gray-600 dark:text-gray-300 mb-6">{booth.description}</p>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Key Features:</h4>
                        <ul className="space-y-2 mb-6">
                          {booth.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <FeatureIcon className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2"><strong>Dimensions:</strong> {booth.dimensions}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400"><strong>Outputs:</strong> {booth.outputs.join(', ')}</p>
                      </CardContent>
                    </div>
                  </div>
                  {/* Gallery Section within Tab - Now using EndlessCarousel */}
                  <div className={cn(
                      "p-8 md:p-12 border-t border-gray-200 dark:border-gray-700",
                      booth.id === 'socialbooth' && "p-6 md:p-8" // Scaled down padding for social booth gallery
                    )}>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">Gallery</h4>
                    <div className="h-[400px] w-full">
                      <EndlessCarousel
                        images={booth.gallery.map(img => ({
                          src: img.src,
                          alt: img.alt,
                          width: 800,
                          height: 600,
                          caption: img.alt
                        }))}
                        autoPlay={false}
                        showControls={true}
                        showIndicators={true}
                        className="h-full rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-950"> 
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style text-primary dark:text-indigo-400">{addOns.label}</p> 
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {addOns.title}
            </h2>
            <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
              {addOns.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addOns.items.map((addon) => (
              <Card key={addon.name} className="bg-white dark:bg-gray-800/50 shadow-lg border border-gray-200 dark:border-gray-700"> 
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                    <addon.icon className="h-6 w-6 mr-3 text-primary dark:text-indigo-400" /> 
                    {addon.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gray-100 dark:bg-gray-900 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="h2-style text-gray-900 dark:text-white">
            {cta.title}
          </h2>
          <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
            {cta.description}
          </p>
          <div className="mt-10">
             <Button onClick={openModal} size="lg" className="button-primary-styles">
              {cta.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
