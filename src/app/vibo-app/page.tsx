// app/vibo-app/page.tsx
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Music, Edit3, Users, Share2, MessageSquare, ListChecks, Smile } from 'lucide-react';
import { useBookingModal } from '@/context/BookingModalContext';

const viboFeatures = [
  {
    icon: Music,
    title: 'Extensive Music Library',
    description: 'Browse millions of songs, curated playlists, and popular charts to find the perfect tracks for every part of your event.',
  },
  {
    icon: ListChecks,
    title: 'Intuitive Playlist Builder',
    description: 'Easily create and organize playlists for different segments like cocktail hour, dinner, and dancing. Drag and drop songs with ease.',
  },
  {
    icon: Edit3,
    title: 'Personalize Your Requests',
    description: 'Add "Must Play", "Play If Possible", and "Do Not Play" lists. Leave specific notes for your DJ on certain songs or moments.',
  },
  {
    icon: Users,
    title: 'Guest Song Requests (Optional)',
    description: 'Allow your guests to suggest songs before the event, giving you insight into their preferences (you have final approval).',
  },
  {
    icon: Share2,
    title: 'Seamless DJ Collaboration',
    description: 'Your DJ gets direct access to your VIBO plan, ensuring they understand your vision perfectly. No miscommunications!',
  },
  {
    icon: MessageSquare,
    title: 'Timeline Integration',
    description: 'Coordinate special songs with key moments of your event timeline, like first dance, cake cutting, or grand entrance.',
  },
];

const viboBenefits = [
  {
    icon: Smile,
    title: 'Stress-Free Planning',
    description: 'VIBO simplifies music selection, making it a fun and easy part of your event preparation.',
  },
  {
    icon: CheckCircle,
    title: 'Your Event, Your Vibe',
    description: 'Ensure the music perfectly reflects your style and preferences, creating the atmosphere you envision.',
  },
  {
    icon: Users,
    title: 'Engage Your Guests',
    description: 'Optional guest request features can make attendees feel more involved and excited for the event.',
  },
];

export default function ViboAppPage() {
  const { openModal } = useBookingModal();

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 lg:pt-20 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600">
        <Image
          src="https://picsum.photos/1920/800?random=40"
          alt="Abstract background representing music and technology"
          data-ai-hint="music technology abstract"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6 shadow-lg">
            <Music className="h-10 w-10 text-white" />
          </div>
          <h1 className="h1-style text-white">
            VIBO: Your Personal Event Music Planner
          </h1>
          <p className="mt-6 body-text-large text-gray-200 max-w-3xl mx-auto">
            Take full control of your event's soundtrack with VIBO, our exclusive, easy-to-use music planning app. Craft the perfect atmosphere for every moment.
          </p>
          <div className="mt-10">
            <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
              Book Services & Get VIBO Access
            </Button>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
       <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">Simple & Powerful</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              How VIBO Elevates Your Music Planning
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Access VIBO', description: 'Once you book our DJ services, you\'ll receive exclusive access to your personalized VIBO event planning portal.', image: 'https://picsum.photos/600/400?random=41', imageHint: 'app login screen' },
              { step: 2, title: 'Curate Playlists', description: 'Browse songs, add to must-play/do-not-play lists, and organize music for different parts of your event.', image: 'https://picsum.photos/600/400?random=42', imageHint: 'playlist creation interface' },
              { step: 3, title: 'Collaborate & Finalize', description: 'Your DJ reviews your plan, offers suggestions, and ensures everything is set for an amazing event.', image: 'https://picsum.photos/600/400?random=43', imageHint: 'DJ collaboration chat' },
            ].map(item => (
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
            <p className="section-label-style">Packed with Features</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              Everything You Need for Perfect Event Music
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {viboFeatures.map((feature) => (
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
              <p className="section-label-style">The VIBO Advantage</p>
              <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
                Why You'll Love Planning with VIBO
              </h2>
              <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
                VIBO isn't just an app; it's your partner in creating the perfect musical backdrop for your special day. Enjoy a seamless, fun, and collaborative planning experience.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-300 lg:max-w-none">
                {viboBenefits.map((benefit) => (
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
                src="https://picsum.photos/800/900?random=44"
                alt="Mobile and tablet screens showing VIBO app interface"
                data-ai-hint="app interface mobile tablet"
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
            Ready to Craft Your Perfect Event Soundtrack?
          </h2>
          <p className="mt-4 body-text-large text-indigo-100">
            Book any of our DJ services and gain exclusive access to the VIBO app. Let's make your event's music unforgettable.
          </p>
          <div className="mt-8">
            <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
              Book Now & Plan with VIBO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
