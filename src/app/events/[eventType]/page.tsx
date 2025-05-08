// app/events/[eventType]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Sparkles, Gift, Users, Music, Camera } from 'lucide-react';
import Link from 'next/link';
import { useBookingModal } from '@/context/BookingModalContext';
import { 
  weddingsHeroImage, weddingsGalleryImage1, weddingsGalleryImage2, weddingsGalleryImage3,
  corporateHeroImage, corporateGalleryImage1, corporateGalleryImage2, corporateGalleryImage3,
  privatePartiesHeroImage, privatePartiesGalleryImage1, privatePartiesGalleryImage2, privatePartiesGalleryImage3,
  defaultEventHeroImage
} from '@/lib/image-urls';


interface EventTypeDetails {
  title: string;
  heroImage: string;
  heroImageHint: string;
  tagline: string;
  description: string;
  serviceHighlights: {
    icon: React.ElementType;
    title: string;
    description: string;
  }[];
  gallery?: { src: string; alt: string; hint: string }[];
  ctaText?: string;
}

const eventDetailsMap: Record<string, EventTypeDetails> = {
  weddings: {
    title: "Unforgettable Weddings",
    heroImage: weddingsHeroImage,
    heroImageHint: "wedding reception elegant",
    tagline: "Crafting Your Dream Wedding Experience",
    description: "Your wedding day is one of the most important days of your life. Rice Entertainment specializes in creating magical wedding experiences with personalized DJ services, elegant photo booths, and seamless coordination. Let us help you make memories that last a lifetime.",
    serviceHighlights: [
      { icon: Music, title: "Personalized DJ & MC Services", description: "Custom playlists, professional MCing, and top-tier sound to keep your guests entertained." },
      { icon: Camera, title: "Elegant Photo Booths", description: "Capture fun memories with our Luxx Booth or engaging 360 Booth, complete with custom backdrops and props." },
      { icon: Sparkles, title: "VIBO Music Planning App", description: "Collaborate on your perfect soundtrack with ease using our intuitive planning tool." },
      { icon: Users, title: "Guest Engagement", description: "Interactive elements to keep your guests involved and the energy high throughout the celebration." },
    ],
    gallery: [
        { src: weddingsGalleryImage1, alt: 'Bride and groom first dance', hint: 'wedding first dance' },
        { src: weddingsGalleryImage2, alt: 'Wedding guests dancing', hint: 'party dance floor' },
        { src: weddingsGalleryImage3, alt: 'Elegant wedding photo booth setup', hint: 'photo booth wedding' },
    ],
    ctaText: "Plan Your Perfect Wedding Day"
  },
  corporate: {
    title: "Professional Corporate Events",
    heroImage: corporateHeroImage,
    heroImageHint: "corporate event conference",
    tagline: "Elevating Your Brand and Engaging Your Audience",
    description: "From holiday parties and awards galas to conferences and brand activations, Rice Entertainment provides polished and professional DJ and photo booth services that align with your corporate image and objectives.",
    serviceHighlights: [
      { icon: Music, title: "Sophisticated DJ Entertainment", description: "Appropriate music selection and professional MCing for any corporate function." },
      { icon: Camera, title: "Branded Photo Booths", description: "Customizable photo booths with company logos and themes for brand reinforcement and guest engagement." },
      { icon: Users, title: "Team Building & Networking", description: "Interactive entertainment options to facilitate connections and create a positive atmosphere." },
      { icon: Sparkles, title: "Seamless AV & Presentation Support", description: "Reliable audio-visual solutions for presentations and announcements." },
    ],
     gallery: [
        { src: corporateGalleryImage1, alt: 'Corporate event presentation', hint: 'business presentation stage' },
        { src: corporateGalleryImage2, alt: 'Networking at a corporate function', hint: 'business networking' },
        { src: corporateGalleryImage3, alt: 'Branded photo booth at a trade show', hint: 'corporate branding booth' },
    ],
    ctaText: "Elevate Your Next Corporate Event"
  },
  'private-parties': {
    title: "Vibrant Private Parties",
    heroImage: privatePartiesHeroImage,
    heroImageHint: "birthday party celebration",
    tagline: "Creating Unforgettable Celebrations, Big or Small",
    description: "Birthdays, anniversaries, graduations, or just a get-together – Rice Entertainment brings the fun! Our versatile DJs and exciting photo booths can turn any private party into a memorable bash.",
    serviceHighlights: [
      { icon: Music, title: "High-Energy DJ Sets", description: "DJs who know how to get the party started and keep it going with music tailored to your tastes." },
      { icon: Camera, title: "Fun & Interactive Photo Booths", description: "360 Booths, Social Booths, and more to capture all the fun moments with friends and family." },
      { icon: Gift, title: "Themed Entertainment", description: "We can work with your party theme to customize music, lighting, and photo booth props." },
      { icon: Sparkles, title: "Customizable Packages", description: "Flexible options to fit the scale and budget of your private celebration." },
    ],
    gallery: [
        { src: privatePartiesGalleryImage1, alt: 'Guests enjoying a birthday party', hint: 'party friends fun' },
        { src: privatePartiesGalleryImage2, alt: 'Colorful private party lighting', hint: 'event lighting design' },
        { src: privatePartiesGalleryImage3, alt: 'Social photo booth at a graduation party', hint: 'graduation party fun' },
    ],
    ctaText: "Make Your Private Party Epic"
  },
};

const DefaultEventDetails: EventTypeDetails = {
  title: "Custom Event Solutions",
  heroImage: defaultEventHeroImage,
  heroImageHint: "versatile event setup",
  tagline: "Entertainment Tailored to Your Unique Event",
  description: "Have a unique event in mind? Rice Entertainment provides flexible and customizable DJ and photo booth services for a wide range of occasions. Contact us to discuss your specific needs.",
  serviceHighlights: [
    { icon: Music, title: "Adaptable DJ Services", description: "Music and MCing for any theme or atmosphere." },
    { icon: Camera, title: "Versatile Photo Booths", description: "A range of booth options to suit any event type." },
    { icon: Sparkles, title: "Customized Solutions", description: "We work with you to create the perfect entertainment package." },
  ],
  ctaText: "Discuss Your Unique Event"
};

export default function EventTypePage() {
  const params = useParams();
  const { openModal } = useBookingModal();
  const eventType = typeof params.eventType === 'string' ? params.eventType : 'default';
  const details = eventDetailsMap[eventType.toLowerCase()] || DefaultEventDetails;

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 lg:pt-20">
        <Image
          src={details.heroImage}
          alt={`Hero image for ${details.title}`}
          data-ai-hint={details.heroImageHint}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay-gradient from-black/80 via-black/60 to-black/30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="section-label-style text-indigo-300">{details.tagline}</p>
          <h1 className="mt-2 h1-style text-white">
            {details.title}
          </h1>
          <p className="mt-6 body-text-large text-gray-200 max-w-3xl mx-auto">
            {details.description}
          </p>
          <div className="mt-10">
            <Button onClick={openModal} size="lg" className="button-primary-styles">
              {details.ctaText || "Book This Event Type"}
            </Button>
          </div>
        </div>
      </div>

      {/* Service Highlights Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">What We Offer For {details.title}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              Tailored Services for Your {eventType.charAt(0).toUpperCase() + eventType.slice(1).replace('-', ' ')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {details.serviceHighlights.map((highlight) => (
              <div key={highlight.title} className="relative pl-16">
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <highlight.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {highlight.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">{highlight.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section (if exists) */}
      {details.gallery && details.gallery.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-900 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto lg:text-center mb-16">
              <p className="section-label-style">Visual Inspiration</p>
              <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
                Moments from Past {details.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {details.gallery.map((item, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group shadow-lg">
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    data-ai-hint={item.hint}
                    layout="fill" 
                    objectFit="cover" 
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">{item.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center">
            <p className="section-label-style">The Rice Entertainment Difference</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">Why Choose Us For Your {details.title}?</h2>
            <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
                We bring expertise, passion, and a commitment to excellence to every event. Our goal is to make your {eventType.replace('-', ' ')} stress-free and unforgettable.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:mx-auto sm:max-w-2xl sm:grid-cols-1 lg:max-w-none lg:grid-cols-3">
            {[
                { name: 'Experienced Professionals', description: 'Our team has years of experience in making events successful and memorable.' },
                { name: 'Customized Approach', description: 'We listen to your vision and tailor our services to match your specific needs and style.' },
                { name: 'Reliable & Punctual', description: 'You can count on us to be there on time and deliver flawless execution.' },
            ].map((reason) => (
                <Card key={reason.name} className="bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                            <CheckCircle className="h-6 w-6 mr-3 text-green-500" />
                            {reason.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{reason.description}</p>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="h2-style text-white">
            Ready to Plan Your {details.title}?
          </h2>
          <p className="mt-6 body-text-large text-indigo-100">
            Let's start creating an unforgettable experience. Contact us today for a personalized consultation and quote.
          </p>
          <div className="mt-10">
             <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
              {details.ctaText || "Book Your Event Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
