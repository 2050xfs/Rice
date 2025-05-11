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
import { cn } from '@/lib/utils';

export default function PhotoBoothsPage() {
  const { openModal } = useBookingModal();
  const { hero, booths, addOns, cta } = photoBoothsPageContent;
  const FeatureIcon = booths.featureIcon;

  const handleScheduleDemo = () => {
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
                  className="flex items-center justify-center gap-2 rounded-md py-2.5 px-3 text-sm font-medium transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:bg-primary/10 data-[state=inactive]:hover:text-primary"
                >
                  <booth.icon className="h-5 w-5 mr-0" />
                  {booth.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {booths.items.map((booth) => (
              <TabsContent key={booth.id} value={booth.id}>
                <Card className="overflow-hidden shadow-lg bg-white dark:bg-gray-900 border-0 rounded-xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative min-h-[300px] md:min-h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4 md:p-8">
                      {booth.id === 'luxxbooth' && booth.image.endsWith('.mp4') ? (
                        <VideoThumbnail
                          src={booth.image} // This is the MP4 URL
                          poster={booth.poster} // This is the image URL for the thumbnail
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
                        booth.id === 'socialbooth' && "p-6 md:p-8" 
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
                  {/* Updated Gallery Section within Tab */}
                  <div className={cn(
                      "p-8 md:p-12 border-t border-gray-200 dark:border-gray-700",
                      booth.id === 'socialbooth' && "p-6 md:p-8"
                    )}>
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">{booths.galleryTitle}</h4>
                    <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 pr-2">
                      {booth.gallery && booth.gallery.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {booth.gallery.map((img, imgIndex) => (
                            <div key={`${booth.id}-gallery-${imgIndex}`} className="relative aspect-square rounded-lg overflow-hidden shadow-md group">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                data-ai-hint={img.hint}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                              />
                               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                                <p className="text-white text-xs font-medium line-clamp-2">{img.alt}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No gallery images available for this booth.</p>
                      )}
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
                {cta.title}
              </h2>
              <p className="mt-6 body-text-large text-gray-300">
                {cta.description}
              </p>
              <div className="mt-10">
                <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
                  {cta.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
