// components/sections/ServicesOverview.tsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useBookingModal } from '@/context/BookingModalContext'; // Updated import
import { servicesOverviewContent } from '@/content/services-overview-content';

export default function ServicesOverview() {
  const { openModal } = useBookingModal(); // Updated hook usage
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:text-center">
          <p className="section-label-style">{servicesOverviewContent.label}</p>
          <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
            {servicesOverviewContent.title}
          </h2>
          <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
            {servicesOverviewContent.description}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 lg:gap-y-16">
          {servicesOverviewContent.services.map((service) => (
            <Card key={service.title} className="card-feature-styles bg-gray-50 dark:bg-gray-800/50 shadow-lg hover:shadow-xl">
              <CardHeader>
                <div className="relative h-48 w-full mb-4 rounded-t-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={service.imageHint}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <service.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="h3-style text-gray-900 dark:text-white">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription className="body-text-default text-gray-600 dark:text-gray-400 flex-grow">{service.description}</CardDescription>
                <div className="mt-6">
                  <Link href={service.link} passHref>
                    <Button variant="link" className="px-0 text-primary hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Button onClick={openModal} size="lg" className="button-primary-styles"> {/* Use openModal */}
            {servicesOverviewContent.ctaButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
