// src/content/testimonials-page-content.ts
import { 
  testimonialsHeroBg, testimonialJessicaMichaelImg, testimonialInnovateSolutionsImg, 
  testimonialMarkChenImg, testimonialGreenTechImg 
} from '@/lib/image-urls';
import type { TestimonialItem as BaseTestimonialItem } from './testimonials-section-content'; // Reuse the type

export interface TestimonialPageItem extends BaseTestimonialItem {
  fullStory?: string; // Optional longer version for this page
}

export const testimonialsPageContent = {
  hero: {
    label: "Real Stories, Real Satisfaction",
    title: "What Our Clients Are Saying",
    description: "We're passionate about creating unforgettable events. Read first-hand accounts from clients who've experienced the Rice Entertainment difference.",
    image: testimonialsHeroBg,
    imageAlt: "Happy people at an event",
    imageHint: "event crowd celebration",
  },
  filters: {
    title: "Filter Testimonials:",
    serviceOptions: ['All', 'DJ', 'Photo Booth', 'Both', 'Event Planning'],
    eventTypeOptions: ['All', 'Wedding', 'Corporate', 'Private Party', 'School Event'],
  },
  testimonials: [
     {
      id: '1',
      name: 'Jessica & Michael P.',
      eventDate: 'November 12, 2023',
      eventType: 'Wedding',
      serviceUsed: 'Both',
      rating: 5,
      quote: "Rice Entertainment was the BEST decision for our wedding! DJ RICE kept the dance floor packed, and the Luxx Photo Booth was a huge hit. The VIBO app made music planning so easy!",
      fullStory: "From our first consultation to the last song of the night, Rice Entertainment exceeded all our expectations. DJ RICE was incredibly intuitive, playing the perfect mix of songs that catered to all our guests. The VIBO app was a fantastic tool that allowed us to meticulously plan our music and make special requests. The Luxx Photo Booth added such a fun and glamorous element; our guests are still talking about their photos! Professional, responsive, and truly talented – we can't recommend them enough.",
      image: testimonialJessicaMichaelImg,
      imageHint: "bride groom",
      isFeatured: true,
    },
    {
      id: '2',
      name: 'Innovate Solutions Ltd.',
      eventDate: 'December 8, 2023',
      eventType: 'Corporate',
      serviceUsed: 'DJ',
      rating: 5,
      quote: "Our annual holiday party was a massive success, largely thanks to the fantastic DJ services from Rice Entertainment. Professional, engaging, and perfectly curated music.",
      image: testimonialInnovateSolutionsImg,
      imageHint: "corporate team",
    },
    {
      id: '3',
      name: 'Sophia K.',
      eventDate: 'August 5, 2023',
      eventType: 'Private Party',
      serviceUsed: 'Photo Booth',
      rating: 4,
      quote: "The 360 Photo Booth was the highlight of my 30th birthday! So much fun and the videos look amazing. Setup was quick and the attendant was super helpful.",
      fullStory: "I booked the 360 Photo Booth for my 30th birthday bash, and it was an absolute blast! My friends and I had so much fun creating dynamic videos. The setup was efficient, and the on-site attendant was friendly and guided everyone through the process. The quality of the videos was excellent, and sharing them was super easy. My only minor feedback would be to have a slightly wider selection of props, but overall, it was a fantastic experience and definitely worth it!",
    },
     {
      id: '4',
      name: 'Mark & Chen W.',
      eventDate: 'July 1, 2023',
      eventType: 'Wedding',
      serviceUsed: 'DJ',
      rating: 5,
      quote: "DJ Nova was incredible for our multicultural wedding. She blended different genres seamlessly and everyone had a fantastic time. The VIBO app was also very user-friendly.",
      image: testimonialMarkChenImg,
      imageHint: "wedding party",
      isFeatured: true,
    },
    {
      id: '5',
      name: 'Northwood High School',
      eventDate: 'May 20, 2023',
      eventType: 'School Event',
      serviceUsed: 'Both',
      rating: 5,
      quote: "Rice Entertainment is our go-to for prom! The students love the DJ and the Social Booth is always a hit. Reliable, professional, and great with teenagers.",
    },
    {
      id: '6',
      name: 'GreenTech Summit',
      eventDate: 'October 2, 2023',
      eventType: 'Corporate',
      serviceUsed: 'Photo Booth',
      rating: 5,
      quote: "The branded Social Photo Booth was perfect for our conference. Great for engagement and getting our hashtag out there. Smooth process from booking to execution.",
      image: testimonialGreenTechImg,
      imageHint: "conference attendees"
    },
  ] as TestimonialPageItem[],
  noMatchMessage: "No testimonials match your current filters. Try adjusting your filters or check back later for more client stories.",
  cta: {
    title: "Experienced Rice Entertainment?",
    description: "We'd love to hear about your event! Your feedback helps us grow and continue to provide top-notch service. Or, if you're ready to create your own unforgettable moments:",
    button1Text: "Book Your Event",
    button2Text: "Share Your Story",
    // Note: Add functionality for 'Share Your Story' button if required.
  },
};
