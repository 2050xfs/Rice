// src/content/testimonials-section-content.ts
import { 
  testimonialSarahTomImg, testimonialTechCorpImg, testimonialDavidLisaImg 
} from '@/lib/image-urls';

export interface TestimonialItem {
  id: string;
  name: string;
  eventDate: string;
  eventType: 'Wedding' | 'Corporate' | 'Private Party' | 'Other';
  serviceUsed: 'DJ' | 'Photo Booth' | 'Both' | 'Other';
  rating: number;
  quote: string;
  image?: string;
  imageHint?: string;
  isFeatured?: boolean;
}

export const testimonialsSectionContent = {
  label: "Client Experiences",
  title: "Hear From Our Happy Customers",
  description: "We pride ourselves on delivering exceptional experiences. See what our clients have to say about Rice Entertainment.",
  testimonials: [
    {
      id: '1',
      name: 'Sarah & Tom L.',
      eventDate: 'October 15, 2023',
      eventType: 'Wedding',
      serviceUsed: 'DJ',
      rating: 5,
      quote: "Rice Entertainment made our wedding reception unforgettable! The DJ was phenomenal, kept everyone dancing all night. VIBO app was a lifesaver for planning.",
      image: testimonialSarahTomImg,
      imageHint: "happy couple",
      isFeatured: true,
    },
    {
      id: '2',
      name: 'TechCorp Inc.',
      eventDate: 'September 5, 2023',
      eventType: 'Corporate',
      serviceUsed: 'Photo Booth',
      rating: 5,
      quote: "The 360 Photo Booth was a massive hit at our annual corporate event. Professional setup and super fun for all employees. Highly recommend!",
      image: testimonialTechCorpImg,
      imageHint: "corporate event",
    },
    {
      id: '3',
      name: 'Emily R.',
      eventDate: 'July 22, 2023',
      eventType: 'Private Party',
      serviceUsed: 'Both',
      rating: 4,
      quote: "Great DJ and the photo booth was so much fun for my birthday party. The team was friendly and helpful. A bit pricey but worth it for the quality.",
    },
     {
      id: '4',
      name: 'David & Lisa K.',
      eventDate: 'June 10, 2023',
      eventType: 'Wedding',
      serviceUsed: 'Both',
      rating: 5,
      quote: "Absolutely fantastic! The DJ understood our music taste perfectly, and the Luxx Booth photos are stunning. Made our special day even more magical.",
      image: testimonialDavidLisaImg,
      imageHint: "wedding guests",
      isFeatured: true,
    },
    {
      id: '5',
      name: 'Innovate Solutions',
      eventDate: 'November 18, 2023',
      eventType: 'Corporate',
      serviceUsed: 'DJ',
      rating: 5,
      quote: "Our holiday party was a blast thanks to Rice Entertainment's DJ. Professional, great music selection, and kept the energy high.",
    },
  ] as TestimonialItem[],
  filterOptions: {
    services: ['All', 'DJ', 'Photo Booth'],
    eventTypes: ['All', 'Wedding', 'Corporate', 'Private Party'],
  },
  noMatchMessage: "No testimonials match your current filters."
};
