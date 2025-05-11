// app/vibo-app/page.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBookingModal } from '@/context/BookingModalContext';
import { viboAppPageContent } from '@/content/vibo-app-page-content';
import Link from 'next/link';


export default function ViboAppPage() {
  const { openModal } = useBookingModal();
  const { hero, howItWorks, features, benefits, cta } = viboAppPageContent;

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-600 to-purple-700 py-24 sm:py-32">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          data-ai-hint={hero.imageHint}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 opacity-30"
          priority
        />
        <div className="absolute inset-0 -z-10 bg-black/40" /> {/* Dark overlay for better text contrast */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="mb-8">
            <hero.icon className="h-16 w-16 text-white mx-auto" />
          </div>
          <h1 className="h1-style text-white">
            {hero.title}
          </h1>
          <p className="mt-6 body-text-large text-gray-200 max-w-3xl mx-auto">
            {hero.description}
          </p>
          <div className="mt-10">
            <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
              {hero.ctaButtonText}
            </Button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">{howItWorks.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {howItWorks.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {howItWorks.steps.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="relative w-full max-w-[300px] h-auto mb-6 rounded-lg overflow-hidden shadow-xl">
                  <Image src={step.image} alt={step.title} data-ai-hint={step.imageHint} width={400} height={300} className="object-contain"/>
                </div>
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl mb-4">
                  {step.step}
                </span>
                <h3 className="h3-style text-xl text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="body-text-default text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 dark:bg-gray-900 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
             <p className="section-label-style">{features.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {features.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.items.map((feature) => (
              <Card key={feature.title} className="card-feature-styles bg-white dark:bg-gray-800/50 shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20">
                     <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text-default text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
          <div className="relative mb-12 lg:mb-0">
            <Image
              src={benefits.image}
              alt={benefits.imageAlt}
              data-ai-hint={benefits.imageHint}
              width={800}
              height={700}
              className="rounded-xl shadow-2xl object-contain"
            />
          </div>
          <div>
            <p className="section-label-style">{benefits.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {benefits.title}
            </h2>
            <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
              {benefits.description}
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-300 lg:max-w-none">
              {benefits.items.map((benefit) => (
                <div key={benefit.title} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900 dark:text-white">
                    <benefit.icon className="absolute left-1 top-1 h-5 w-5 text-green-500" aria-hidden="true" />
                    {benefit.title}
                  </dt>
                  <dd className="mt-1 block">{benefit.description}</dd>
                </div>
              ))}
            </dl>
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
