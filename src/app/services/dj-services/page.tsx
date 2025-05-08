// app/services/dj-services/page.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { useBookingWidget } from '@/context/BookingWidgetContext'; // Updated import
import { djServicesPageContent } from '@/content/dj-services-page-content';


export default function DjServicesPage() {
  const { openWidget } = useBookingWidget(); // Updated hook usage
  const { hero, packages, vibo, equipmentAndDjs, cta } = djServicesPageContent;
  const EquipmentPointIcon = equipmentAndDjs.equipment.pointIcon;

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 lg:pt-20">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          data-ai-hint={hero.imageHint}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay-gradient from-black/80 via-black/60 to-black/30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="section-label-style text-indigo-300">{hero.label}</p>
          <h1 className="mt-2 h1-style text-white">
            {hero.title}
          </h1>
          <p className="mt-6 body-text-large text-gray-200 max-w-3xl mx-auto">
            {hero.description}
          </p>
          <div className="mt-10">
            <Button onClick={openWidget} size="lg" className="button-primary-styles"> {/* Use openWidget */}
              {hero.ctaButtonText}
            </Button>
          </div>
        </div>
      </div>

      {/* DJ Packages Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">{packages.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {packages.title}
            </h2>
            <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
              {packages.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.items.map((pkg) => (
              <Card key={pkg.name} className="card-feature-styles bg-white dark:bg-gray-900 shadow-xl hover:shadow-2xl flex flex-col">
                <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
                   <Image src={pkg.image} alt={pkg.name} data-ai-hint={pkg.imageHint} layout="fill" objectFit="cover" />
                </div>
                <CardHeader className="items-center text-center">
                  <pkg.icon className="h-12 w-12 text-primary mb-2" />
                  <CardTitle className="h3-style text-gray-900 dark:text-white">{pkg.name}</CardTitle>
                  <CardDescription className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{pkg.priceInfo}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <EquipmentPointIcon className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                   <Button onClick={openWidget} className="button-primary-styles w-full mt-auto"> {/* Use openWidget */}
                    {packages.ctaButtonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* VIBO App Integration Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
          <div className="lg:pr-8">
             <p className="section-label-style text-indigo-200">{vibo.label}</p>
            <h2 className="mt-2 h2-style text-white">
              {vibo.title}
            </h2>
            <p className="mt-6 body-text-large text-gray-300">
              {vibo.description}
            </p>
            <ul className="mt-8 space-y-4">
              {vibo.features.map(item => (
                <li key={item.text} className="flex items-start">
                  <item.icon className="h-6 w-6 text-indigo-300 mr-3 mt-1 shrink-0" />
                  <span className="text-gray-200">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href={vibo.ctaButtonLink} passHref>
                <Button variant="transparent" size="lg" className="button-transparent-styles" hasShimmer>
                  {vibo.ctaButtonText}
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <Image
              src={vibo.image}
              alt={vibo.imageAlt}
              data-ai-hint={vibo.imageHint}
              width={800}
              height={700}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
      
      {/* Equipment & DJ Profiles Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="section-label-style">{equipmentAndDjs.equipment.label}</p>
              <h3 className="mt-2 h2-style text-gray-900 dark:text-white">{equipmentAndDjs.equipment.title}</h3>
              <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
                {equipmentAndDjs.equipment.description}
              </p>
              <ul className="mt-8 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                {equipmentAndDjs.equipment.points.map((point, idx) => (
                   <li key={idx}><EquipmentPointIcon className="inline h-5 w-5 text-green-500 mr-2" />{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="section-label-style">{equipmentAndDjs.djs.label}</p>
              <h3 className="mt-2 h2-style text-gray-900 dark:text-white">{equipmentAndDjs.djs.title}</h3>
              <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
                {equipmentAndDjs.djs.description}
              </p>
              <div className="mt-10 space-y-8">
                {equipmentAndDjs.djs.profiles.map(profile => (
                  <Card key={profile.name} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white dark:bg-gray-900 shadow-lg">
                    <Image src={profile.image} alt={profile.name} data-ai-hint={profile.imageHint} width={100} height={100} className="rounded-full object-cover w-24 h-24 sm:w-28 sm:h-28" />
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{profile.name}</h4>
                      <p className="text-sm text-primary dark:text-indigo-400 font-medium">{profile.specialties.join(', ')}</p>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{profile.bio}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
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
             <Button onClick={openWidget} size="lg" className="button-primary-styles"> {/* Use openWidget */}
              {cta.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
