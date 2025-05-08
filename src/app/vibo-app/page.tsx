// app/vibo-app/page.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBookingModal } from '@/context/BookingModalContext';
import { viboAppPageContent } from '@/content/vibo-app-page-content';

export default function ViboAppPage() {
  const { openModal } = useBookingModal();
  const { hero, howItWorks, features, benefits, cta } = viboAppPageContent;

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 lg:pt-20 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          data-ai-hint={hero.imageHint}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
          priority
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6 shadow-lg">
            <hero.icon className="h-10 w-10 text-white" />
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

      {/* How it Works Section */}
       <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">{howItWorks.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {howItWorks.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorks.steps.map(item => (
              <Card key={item.step} className="card-feature-styles bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl">
                 <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                   <Image src={item.image} alt={item.title} data-ai-hint={item.imageHint} layout="fill" objectFit="cover" />
                 </div>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground mr-3 font-bold text-sm">{item.step}</span>
                    <span className="h3-style text-xl text-gray-900 dark:text-white">{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="body-text-default text-gray-600 dark:text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {features.items.map((feature) => (
              <div key={feature.title} className="relative pl-12">
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
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
            <div className="mt-12 lg:mt-0 relative">
              <Image
                src={benefits.image}
                alt={benefits.imageAlt}
                data-ai-hint={benefits.imageHint}
                width={800}
                height={900}
                className="rounded-xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500">
        <div className="max-w-4xl mx-auto text-center py-16 px-6 sm:py-20 lg:px-8">
          <h2 className="h2-style text-white">
            {cta.title}
          </h2>
          <p className="mt-4 body-text-large text-indigo-100">
            {cta.description}
          </p>
          <div className="mt-8">
            <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
              {cta.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
