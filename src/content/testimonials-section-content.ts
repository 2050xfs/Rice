// src/content/testimonials-section-content.ts
import {
  testimonialMountainHouse, testimonialOceanHotel, testimonialMadreya,
  testimonialJackieG, testimonialAyaD, testimonialPlaceholder8,
  testimonialCheriM, testimonialMichaelNew, testimonialJasonW,
  testimonialMichaelOld
} from '@/lib/image-urls';

export interface TestimonialItem {
  id: string;
  name: string;
  eventDate: string;
  eventType: 'Wedding' | 'Corporate' | 'Private Party' | 'Other' | 'School Event';
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
      id: '2',
      name: 'Innovate Solutions',
      eventDate: 'December 8, 2023',
      eventType: 'Corporate',
      serviceUsed: 'DJ',
      rating: 5,
      quote: "Our annual holiday party was a massive success, largely thanks to the fantastic DJ services from Rice Entertainment. Professional and engaging.",
      image: testimonialOceanHotel,
      imageHint: "corporate event setup",
    },
     {
      id: '4',
      name: 'Mark & Chen W.',
      eventDate: 'July 1, 2023',
      eventType: 'Wedding',
      serviceUsed: 'DJ',
      rating: 5,
      quote: "DJ Nova was incredible for our multicultural wedding. She blended different genres seamlessly and everyone had a fantastic time.",
      image: testimonialMadreya, // Using madreya_testimonoal_image.png
      imageHint: "wedding party",
      isFeatured: true,
    },
    {
      id: '5',
      name: 'Northwood High',
      eventDate: 'May 20, 2023',
      eventType: 'School Event',
      serviceUsed: 'Both',
      rating: 5,
      quote: "Rice Entertainment is our go-to for prom! The students love the DJ and the Social Booth is always a hit. Reliable and professional.",
      image: testimonialPlaceholder8, // Using the generic placeholder
      imageHint: "school event dance",
    },
    {
      id: '6',
      name: 'GreenTech Summit',
      eventDate: 'October 2, 2023',
      eventType: 'Corporate',
      serviceUsed: 'Photo Booth',
      rating: 5,
      quote: "The branded Social Photo Booth was perfect for our conference. Great for engagement and getting our hashtag out there. Smooth process.",
      image: testimonialMountainHouse,
      imageHint: "conference attendees"
    },
    {
      id: '7',
      name: 'Cheri M.',
      eventDate: 'April 10, 2023',
      eventType: 'Wedding',
      serviceUsed: 'Photo Booth',
      rating: 5,
      quote: "The photo booth was a fantastic addition to our wedding reception! Our guests loved the props and instant prints.",
      image: testimonialCheriM,
      imageHint: "wedding guest portrait",
    },
    {
      id: '8',
      name: 'Aya D.',
      eventDate: 'June 5, 2023',
      eventType: 'Private Party',
      serviceUsed: 'DJ',
      rating: 5,
      quote: "DJ Rice brought the energy to my graduation party! Played all the right songs and kept everyone dancing.",
      image: testimonialAyaD,
      imageHint: "client portrait happy",
    },
    {
      id: '9',
      name: 'Jason W.',
      eventDate: 'September 15, 2023',
      eventType: 'Wedding',
      serviceUsed: 'Both',
      rating: 5,
      quote: "Absolutely phenomenal service for our wedding. The DJ nailed the vibe, and the photo booth pictures are priceless memories.",
      image: testimonialJasonW,
      imageHint: "groom portrait",
       isFeatured: true,
    },
    {
      id: '11',
      name: 'Michael B.',
      eventDate: 'February 14, 2024',
      eventType: 'Private Party',
      serviceUsed: 'DJ',
      rating: 5,
      quote: "Hired Rice Entertainment for a Valentine's Day party. DJ was great, played romantic hits and fun dance tracks.",
      image: testimonialMichaelNew, // Using michael-new.png
      imageHint: "client portrait event",
    },
    {
      id: '12',
      name: 'Jackie G.',
      eventDate: 'January 8, 2024',
      eventType: 'Wedding',
      serviceUsed: 'Photo Booth',
      rating: 5,
      quote: "The social booth was perfect for our wedding guests who love sharing online. Easy to use and fun filters!",
      image: testimonialJackieG,
      imageHint: "wedding guest happy",
    },
  ] as TestimonialItem[],
  filterOptions: {
    services: ['All', 'DJ', 'Photo Booth', 'Both'],
    eventTypes: ['All', 'Wedding', 'Corporate', 'Private Party', 'School Event'],
  },
  noMatchMessage: "No testimonials match your current filters."
};
