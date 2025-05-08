// app/services/dj-services/page.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Disc3, Zap, Music, Users, CalendarCheck2, Headphones } from 'lucide-react';
import Link from 'next/link';
import { useBookingModal } from '@/context/BookingModalContext';

const djPackages = [
  {
    name: 'Essential Beats',
    icon: Disc3,
    priceInfo: 'Perfect for smaller gatherings & budgets',
    features: [
      'Up to 4 hours of DJ service',
      'Professional DJ & MC',
      'Sound system for up to 100 guests',
      'Basic dance floor lighting',
      'VIBO App for music planning',
    ],
    image: 'https://picsum.photos/600/400?random=30',
    imageHint: "DJ setup small event"
  },
  {
    name: 'Premium Sound & Light',
    icon: Zap,
    priceInfo: 'Ideal for weddings & mid-sized events',
    features: [
      'Up to 5 hours of DJ service',
      'Experienced DJ & engaging MC',
      'Upgraded sound system for up to 200 guests',
      'Enhanced intelligent lighting package',
      'Wireless microphone for speeches',
      'VIBO App Pro access',
    ],
    image: 'https://picsum.photos/600/400?random=31',
    imageHint: "wedding DJ lights"
  },
  {
    name: 'Ultimate Experience',
    icon: Music,
    priceInfo: 'For large events & the ultimate party',
    features: [
      'Up to 6 hours of DJ service (or full event coverage)',
      'Top-tier DJ, MC & event coordinator',
      'Concert-grade sound system (200+ guests)',
      'Customized intelligent lighting & effects (e.g., uplighting, monogram)',
      'Multiple wireless microphones',
      'Ceremony sound system (if applicable)',
      'VIBO App Premium & personal consultation',
    ],
    image: 'https://picsum.photos/600/400?random=32',
    imageHint: "large event DJ concert"
  },
];

const djProfiles = [
 {
    name: 'DJ RICE',
    specialties: ['Weddings', 'Corporate', 'Top 40', 'Hip Hop'],
    bio: 'With over 10 years of experience, DJ RICE knows how to read a crowd and keep the energy high. His seamless transitions and diverse music knowledge make him a versatile choice for any event.',
    image: 'https://picsum.photos/300/300?random=33',
    imageHint: "DJ portrait"
  },
  {
    name: 'DJ Nova',
    specialties: ['Electronic Dance Music', 'House', 'Private Parties', 'Latin'],
    bio: 'DJ Nova brings a fresh, energetic vibe to every event. Specializing in modern beats and electronic music, she creates an unforgettable party atmosphere.',
    image: 'https://picsum.photos/300/300?random=34',
    imageHint: "female DJ portrait"
  },
];

export default function DjServicesPage() {
  const { openModal } = useBookingModal();

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 lg:pt-20">
        <Image
          src="https://picsum.photos/1920/1080?random=35"
          alt="DJ mixing console with vibrant lights"
          data-ai-hint="DJ console lights"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 hero-overlay-gradient from-black/80 via-black/60 to-black/30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="section-label-style text-indigo-300">Set The Mood</p>
          <h1 className="mt-2 h1-style text-white">
            Professional DJ Services
          </h1>
          <p className="mt-6 body-text-large text-gray-200 max-w-3xl mx-auto">
            Our experienced DJs bring the perfect energy and soundtrack to any event. From elegant weddings to high-energy corporate parties, we tailor the music to your unique style and guests.
          </p>
          <div className="mt-10">
            <Button onClick={openModal} size="lg" className="button-primary-styles">
              Get a DJ Quote
            </Button>
          </div>
        </div>
      </div>

      {/* DJ Packages Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">Our Offerings</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              DJ Packages for Every Occasion
            </h2>
            <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
              Choose from our curated DJ packages, or let us customize one to perfectly match your event's needs and budget.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {djPackages.map((pkg) => (
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
                        <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                   <Button onClick={openModal} className="button-primary-styles w-full mt-auto">
                    Select Package
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
             <p className="section-label-style text-indigo-200">Your Music, Your Way</p>
            <h2 className="mt-2 h2-style text-white">
              Plan with VIBO - Our Exclusive Music App
            </h2>
            <p className="mt-6 body-text-large text-gray-300">
              All our DJ packages include access to the VIBO app, allowing you to easily plan your music, make requests, and collaborate with your DJ. No more endless email chains or spreadsheets!
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: CalendarCheck2, text: 'Organize your event timeline and music cues.' },
                { icon: Music, text: 'Browse popular song choices and build your playlists.' },
                { icon: Users, text: 'Invite guests to make song requests (optional).' },
              ].map(item => (
                <li key={item.text} className="flex items-start">
                  <item.icon className="h-6 w-6 text-indigo-300 mr-3 mt-1 shrink-0" />
                  <span className="text-gray-200">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/vibo-app" passHref>
                <Button variant="transparent" size="lg" className="button-transparent-styles" hasShimmer>
                  Explore VIBO App Features
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <Image
              src="https://picsum.photos/800/700?random=36"
              alt="VIBO App screenshot on a tablet"
              data-ai-hint="music planning app tablet"
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
              <p className="section-label-style">Quality Sound & Presentation</p>
              <h3 className="mt-2 h2-style text-gray-900 dark:text-white">Our Equipment & Approach</h3>
              <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
                We invest in top-of-the-line audio and lighting equipment to ensure crystal-clear sound and a visually stunning atmosphere. Our DJs are professionals who dress appropriately for your event and work seamlessly with other vendors.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><CheckCircle className="inline h-5 w-5 text-green-500 mr-2" />State-of-the-art sound systems (QSC, JBL, EV).</li>
                <li><CheckCircle className="inline h-5 w-5 text-green-500 mr-2" />Professional DJ controllers and mixers (Pioneer, Rane).</li>
                <li><CheckCircle className="inline h-5 w-5 text-green-500 mr-2" />Intelligent DMX lighting, uplighting, and custom effects.</li>
                <li><CheckCircle className="inline h-5 w-5 text-green-500 mr-2" />Clean and professional booth setups.</li>
                <li><CheckCircle className="inline h-5 w-5 text-green-500 mr-2" />Extensive music library spanning all genres and eras.</li>
              </ul>
            </div>
            <div>
              <p className="section-label-style">Meet Our Talent</p>
              <h3 className="mt-2 h2-style text-gray-900 dark:text-white">Our Professional DJs</h3>
              <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
                Our team of skilled DJs are passionate about music and dedicated to creating the perfect vibe for your event.
              </p>
              <div className="mt-10 space-y-8">
                {djProfiles.map(profile => (
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
            Let's Get Your Party Started!
          </h2>
          <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
            Ready to discuss your event's music and entertainment needs? Our team is here to help you choose the perfect DJ and package.
          </p>
          <div className="mt-10">
             <Button onClick={openModal} size="lg" className="button-primary-styles">
              Book a DJ Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
