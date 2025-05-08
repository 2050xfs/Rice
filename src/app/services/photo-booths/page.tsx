// app/services/photo-booths/page.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookingModal } from '@/context/BookingModalContext';
import { photoBoothsPageContent } from '@/content/photo-booths-page-content';

export default function PhotoBoothsPage() {
  const { openModal } = useBookingModal();
  const { hero, booths, addOns, cta } = photoBoothsPageContent;
  const FeatureIcon = booths.featureIcon;


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
            <Button onClick={openModal} size="lg" className="button-primary-styles">
              {hero.ctaButtonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Booth Types Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">{booths.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {booths.title}
            </h2>
          </div>

          <Tabs defaultValue={booths.items[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-12 gap-2 bg-indigo-100 dark:bg-gray-800 p-2 rounded-lg">
              {booths.items.map((booth) => (
                <TabsTrigger key={booth.id} value={booth.id} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg py-3 text-base font-medium">
                  <booth.icon className="h-5 w-5 mr-2" /> {booth.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {booths.items.map((booth) => (
              <TabsContent key={booth.id} value={booth.id}>
                <Card className="overflow-hidden shadow-xl bg-white dark:bg-gray-900 border-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative min-h-[300px] md:min-h-full">
                      <Image
                        src={booth.image}
                        alt={booth.name}
                        data-ai-hint={booth.imageHint}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-8 md:p-12">
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
                  {/* Gallery Section within Tab */}
                  <div className="p-8 md:p-12 border-t border-gray-200 dark:border-gray-700">
                     <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">{booths.galleryTitle}</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {booth.gallery.map((img, idx) => (
                            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden shadow-md group">
                                <Image src={img.src} alt={img.alt} data-ai-hint={img.hint} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <p className="text-white text-sm p-2 bg-black/50 rounded">{img.alt}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style text-indigo-200">{addOns.label}</p>
            <h2 className="mt-2 h2-style text-white">
              {addOns.title}
            </h2>
            <p className="mt-6 body-text-large text-gray-300">
              {addOns.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addOns.items.map((addon) => (
              <Card key={addon.name} className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-white">
                    <addon.icon className="h-6 w-6 mr-3 text-indigo-300" />
                    {addon.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-200">{addon.description}</p>
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
