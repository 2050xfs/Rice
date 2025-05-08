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
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center mb-20">
          <div>
            <p className="section-label-style text-indigo-500">{viboAppHighlightContent.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {viboAppHighlightContent.titlePart1}
              <span className="text-gradient-highlight">{viboAppHighlightContent.titlePart2Highlight}</span>
            </h2>
            <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
              {viboAppHighlightContent.description}
            </p>
            <div className="mt-10">
              <Button onClick={openModal} size="lg" className="button-primary-styles">
                {viboAppHighlightContent.ctaButtonText}
              </Button>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative group flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src={viboAppHighlightContent.mainImage.src}
                alt={viboAppHighlightContent.mainImage.alt}
                data-ai-hint={viboAppHighlightContent.mainImage.hint}
                width={600}
                height={800}
                className="rounded-xl shadow-2xl ring-1 ring-gray-900/10 transition-all duration-500 group-hover:scale-105 group-hover:shadow-indigo-400/30 object-contain"
              />
            </div>
            <div className="absolute -inset-4 rounded-xl border-2 border-dashed border-indigo-300/50 dark:border-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-95 group-hover:scale-100" />
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="h3-style text-gray-900 dark:text-white">Everything You Need for Perfect Event Music</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {viboAppHighlightContent.features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-gray-900 dark:text-white flex items-center">
                  <feature.icon className="absolute left-0 top-1 h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="ml-2">{feature.name}</span>
                </dt>
                <dd className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="h3-style text-gray-900 dark:text-white">{viboAppHighlightContent.howItWorks.title}</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {viboAppHighlightContent.howItWorks.steps.map(item => (
              <div key={item.step} className="text-center flex flex-col items-center">
                <div className="relative w-full max-w-[250px] h-auto mb-6">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    data-ai-hint={item.imageHint} 
                    width={300} 
                    height={300} 
                    className="rounded-lg shadow-lg object-contain" 
                  />
                </div>
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 max-w-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-center">
            <div className="relative mb-12 lg:mb-0">
              <Image
                src={viboAppHighlightContent.benefits.image}
                alt={viboAppHighlightContent.benefits.imageAlt}
                data-ai-hint={viboAppHighlightContent.benefits.imageHint}
                width={800}
                height={700}
                className="rounded-xl shadow-2xl object-contain"
              />
            </div>
            <div>
              <h3 className="h3-style text-gray-900 dark:text-white">
                {viboAppHighlightContent.benefits.title}
              </h3>
              <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
                {viboAppHighlightContent.benefits.description}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-300 lg:max-w-none">
                {viboAppHighlightContent.benefits.items.map((benefit) => (
                  <div key={benefit.title} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-white">
                      <benefit.icon className="absolute left-1 top-1 h-5 w-5 text-green-500" aria-hidden="true" />
                      {benefit.title}
                    </dt>
                    <dd className="mt-1 block">{benefit.description}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <Button onClick={openModal} size="lg" className="button-primary-styles">
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
