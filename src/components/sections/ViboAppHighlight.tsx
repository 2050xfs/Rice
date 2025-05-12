// components/sections/ViboAppHighlight.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { viboAppHighlightContent } from '@/content/vibo-app-highlight-content';
import { useBookingModal } from '@/context/BookingModalContext';

export default function ViboAppHighlight() {
  const { openModal } = useBookingModal();
  
  return (
    <div id="vibo-app-highlight-section" className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 section-spacing">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Mobile First Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-12 items-center mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center lg:text-left">
            <p className="section-label-style text-indigo-500">{viboAppHighlightContent.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {viboAppHighlightContent.titlePart1}
              <span className="text-gradient-highlight">{viboAppHighlightContent.titlePart2Highlight}</span>
            </h2>
            <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
              {viboAppHighlightContent.description}
            </p>
            <div className="mt-8 sm:mt-10">
              <Button onClick={openModal} size="lg" className="button-primary-styles w-full sm:w-auto">
                {viboAppHighlightContent.ctaButtonText}
              </Button>
            </div>
          </div>
          <div className="relative group flex justify-center lg:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-lg">
              <Image
                src={viboAppHighlightContent.mainImage.src}
                alt={viboAppHighlightContent.mainImage.alt}
                data-ai-hint={viboAppHighlightContent.mainImage.hint}
                width={600}
                height={800}
                className="rounded-xl shadow-2xl ring-1 ring-gray-900/10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-indigo-400/30 object-contain"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 400px, 600px"
                priority
              />
            </div>
            <div className="absolute -inset-4 rounded-xl border-2 border-dashed border-indigo-300/50 dark:border-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-95 group-hover:scale-100" />
          </div>
        </div>

        {/* Features Section - Mobile Optimized */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="h3-style text-gray-900 dark:text-white">Everything You Need for Perfect Event Music</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {viboAppHighlightContent.features.map((feature) => (
              <Card key={feature.name} className="relative p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <dt className="font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                    <feature.icon className="h-6 w-6 text-primary flex-shrink-0" aria-hidden="true" />
                    <span>{feature.name}</span>
                  </dt>
                  <dd className="mt-3 text-gray-600 dark:text-gray-300">{feature.description}</dd>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section - Mobile Optimized */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="h3-style text-gray-900 dark:text-white">{viboAppHighlightContent.howItWorks.title}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
            {viboAppHighlightContent.howItWorks.steps.map(item => (
              <div key={item.step} className="text-center flex flex-col items-center">
                <div className="relative w-full max-w-[200px] sm:max-w-[250px] h-auto mb-4 sm:mb-6 mx-auto">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    data-ai-hint={item.imageHint} 
                    width={300} 
                    height={300} 
                    className="rounded-lg shadow-lg object-contain"
                    sizes="(max-width: 640px) 200px, 250px"
                  />
                </div>
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 max-w-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section - Mobile Optimized */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-x-16 items-center">
            <div className="relative order-2 lg:order-1">
              <Image
                src={viboAppHighlightContent.benefits.image}
                alt={viboAppHighlightContent.benefits.imageAlt}
                data-ai-hint={viboAppHighlightContent.benefits.imageHint}
                width={800}
                height={700}
                className="rounded-xl shadow-2xl object-contain mx-auto"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 800px, 1200px"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="h3-style text-gray-900 dark:text-white">
                {viboAppHighlightContent.benefits.title}
              </h3>
              <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
                {viboAppHighlightContent.benefits.description}
              </p>
              <dl className="mt-8 sm:mt-10 max-w-xl space-y-6 sm:space-y-8 text-base leading-7 text-gray-600 dark:text-gray-300 lg:max-w-none">
                {viboAppHighlightContent.benefits.items.map((benefit) => (
                  <Card key={benefit.title} className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <dt className="font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                        <benefit.icon className="h-5 w-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                        {benefit.title}
                      </dt>
                      <dd className="mt-2 sm:mt-3">{benefit.description}</dd>
                    </CardContent>
                  </Card>
                ))}
              </dl>
              <div className="mt-8 sm:mt-10">
                <Button onClick={openModal} size="lg" className="button-primary-styles w-full sm:w-auto">
                  {viboAppHighlightContent.ctaButtonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
