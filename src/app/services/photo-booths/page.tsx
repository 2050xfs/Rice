// app/services/photo-booths/page.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Gem, Users, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookingModal } from '@/context/BookingModalContext';

const boothTypes = [
  {
    id: '360booth',
    name: '360 Photo Booth',
    icon: Zap,
    tagline: 'Dynamic Videos, Unforgettable Moments',
    description: 'Step onto the platform and let our camera spin around you, capturing stunning 360-degree slow-motion videos. Perfect for high-energy events and creating shareable content.',
    features: [
      'Slow-motion video capture',
      'Instant sharing via QR/email/text',
      'Customizable overlays & music',
      'Professional lighting',
      'On-site attendant',
    ],
    dimensions: 'Platform: 3-4 ft diameter, Requires approx. 10x10 ft space',
    outputs: ['MP4 Video Files', 'GIFs'],
    image: 'https://picsum.photos/800/600?random=10',
    imageHint: '360 photo booth action',
    gallery: [
      { src: 'https://picsum.photos/400/300?random=11', alt: '360 Booth Output Example 1', hint: "video booth spin" },
      { src: 'https://picsum.photos/400/300?random=12', alt: '360 Booth Setup Example', hint: "event setup" },
      { src: 'https://picsum.photos/400/300?random=13', alt: 'Guests enjoying 360 Booth', hint: "party fun" },
    ],
  },
  {
    id: 'luxxbooth',
    name: 'Luxx Booth',
    icon: Gem,
    tagline: 'Glamorous Photos, Timeless Elegance',
    description: 'Our Luxx Booth delivers high-quality, studio-style photos with a flattering beauty filter. Ideal for weddings and upscale events where a touch of glamour is desired.',
    features: [
      'High-resolution DSLR camera',
      'Beauty filter for flawless skin',
      'Choice of premium backdrops',
      'Professional studio lighting',
      'Instant prints & digital sharing',
    ],
    dimensions: 'Requires approx. 8x8 ft space',
    outputs: ['High-Quality Prints (2x6, 4x6)', 'Digital Photos'],
    image: 'https://picsum.photos/800/600?random=14',
    imageHint: 'luxury photo booth',
    gallery: [
      { src: 'https://picsum.photos/400/300?random=15', alt: 'Luxx Booth Glam Shot', hint: "glamour portrait" },
      { src: 'https://picsum.photos/400/300?random=16', alt: 'Luxx Booth Print Example', hint: "photo strip" },
      { src: 'https://picsum.photos/400/300?random=17', alt: 'Luxx Booth Setup Detail', hint: "elegant setup" },
    ],
  },
  {
    id: 'socialbooth',
    name: 'Social Booth',
    icon: Users,
    tagline: 'Fun & Shareable, Instantly Engaging',
    description: 'The Social Booth is all about fun, animated GIFs, boomerangs, and digital props. Designed for maximum social media engagement and easy sharing.',
    features: [
      'Photos, GIFs, Boomerangs',
      'Digital props & filters',
      'Instant sharing to social media',
      'Customizable branding',
      'Compact setup',
    ],
    dimensions: 'Requires approx. 6x6 ft space',
    outputs: ['Digital Photos', 'GIFs', 'Boomerangs'],
    image: 'https://picsum.photos/800/600?random=18',
    imageHint: 'social media photo booth',
    gallery: [
      { src: 'https://picsum.photos/400/300?random=19', alt: 'Social Booth GIF Example', hint: "animated gif" },
      { src: 'https://picsum.photos/400/300?random=20', alt: 'Guests with Digital Props', hint: "digital props" },
      { src: 'https://picsum.photos/400/300?random=21', alt: 'Social Booth Sharing Interface', hint: "sharing screen" },
    ],
  },
];

const addOns = [
  { name: 'Custom Backdrops', description: 'Tailor the look with a unique backdrop matching your theme.' },
  { name: 'Premium Prop Box', description: 'An extensive collection of high-quality, themed props.' },
  { name: 'Guest Book Album', description: 'A beautiful album where guests can leave a copy of their photo strip and a message.' },
  { name: 'Roaming Photographer Add-on', description: 'Capture candid moments throughout your event.' },
  { name: 'Extended Hours', description: 'Keep the fun going longer!' },
  { name: 'Custom Start Screens & Animations', description: 'Brand the entire experience, from start to finish.' },
];

export default function PhotoBoothsPage() {
  const { openModal } = useBookingModal();

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 lg:pt-20">
        <Image
          src="https://picsum.photos/1920/1080?random=22"
          alt="Array of fun photo booth images"
          data-ai-hint="photo booth collage"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 hero-overlay-gradient from-black/80 via-black/60 to-black/30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="section-label-style text-indigo-300">Capture Every Moment</p>
          <h1 className="mt-2 h1-style text-white">
            Interactive Photo Booth Experiences
          </h1>
          <p className="mt-6 body-text-large text-gray-200 max-w-3xl mx-auto">
            Elevate your event with our cutting-edge photo booths. From dynamic 360 videos to glamorous stills and fun social shares, we have the perfect booth to make your celebration unforgettable.
          </p>
          <div className="mt-10">
            <Button onClick={openModal} size="lg" className="button-primary-styles">
              Book a Photo Booth
            </Button>
          </div>
        </div>
      </div>

      {/* Booth Types Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">Choose Your Booth</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              Find the Perfect Fit for Your Event
            </h2>
          </div>

          <Tabs defaultValue={boothTypes[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-12 gap-2 bg-indigo-100 dark:bg-gray-800 p-2 rounded-lg">
              {boothTypes.map((booth) => (
                <TabsTrigger key={booth.id} value={booth.id} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg py-3 text-base font-medium">
                  <booth.icon className="h-5 w-5 mr-2" /> {booth.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {boothTypes.map((booth) => (
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
                              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 shrink-0" />
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
                     <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">Sample Outputs & Setup</h4>
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
            <p className="section-label-style text-indigo-200">Enhance Your Experience</p>
            <h2 className="mt-2 h2-style text-white">
              Popular Add-Ons & Customizations
            </h2>
            <p className="mt-6 body-text-large text-gray-300">
              Personalize your photo booth experience with our range of exciting add-ons.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addOns.map((addon) => (
              <Card key={addon.name} className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-semibold text-white">
                    <SlidersHorizontal className="h-6 w-6 mr-3 text-indigo-300" />
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
            Ready to Add Some Fun to Your Event?
          </h2>
          <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
            Our photo booths are more than just pictures; they're memory-making machines. Let's discuss how we can customize the perfect photo experience for your guests.
          </p>
          <div className="mt-10">
             <Button onClick={openModal} size="lg" className="button-primary-styles">
              Inquire About Photo Booths
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
