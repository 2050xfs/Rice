// src/content/services-overview-content.ts
import type { LucideIcon } from 'lucide-react';
import { Disc3, Camera, Sparkles } from 'lucide-react';
import { serviceOverviewDjImg, serviceOverviewPhotoBoothImg, viboAppPhoneMockup } from '@/lib/image-urls'; // Updated import

export interface ServiceOverviewItem {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imageHint: string;
  link: string;
}

export const servicesOverviewContent = {
  label: "Our Expertise",
  title: "Services Tailored to Your Celebration",
  description: "We offer a comprehensive suite of services to make your event truly special. Explore how we can elevate your next gathering.",
  services: [
    {
      icon: Disc3,
      title: 'Dynamic DJ Services',
      description: 'Our professional DJs curate the perfect soundtrack for your event, ensuring an electrifying atmosphere and a packed dance floor.',
      image: serviceOverviewDjImg, 
      imageHint: "DJ mixing vibrant", 
      link: '/services/dj-services',
    },
    {
      icon: Camera,
      title: 'Interactive Photo Booths',
      description: 'Capture fun memories with our state-of-the-art photo booths, including 360, Luxx, and Social Booths with custom props and backdrops.',
      image: serviceOverviewPhotoBoothImg,
      imageHint: "photo booth setup",
      link: '/services/photo-booths',
    },
    {
      icon: Sparkles,
      title: 'VIBO Music Planning',
      description: 'Seamlessly plan your event\'s music with the intuitive VIBO app. Collaborate with your DJ and make requests with ease.',
      image: viboAppPhoneMockup, // Updated image
      imageHint: "VIBO app phone", // Updated hint
      link: '/vibo-app',
    },
  ] as ServiceOverviewItem[],
  ctaButtonText: "Ready to Plan? Book Now!",
};

    

