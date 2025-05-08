// app/testimonials/page.tsx
"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Filter, MessageSquareQuote, CalendarDays, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useBookingModal } from '@/context/BookingModalContext';

interface Testimonial {
  id: string;
  name: string;
  eventDate: string;
  eventType: 'Wedding' | 'Corporate' | 'Private Party' | 'School Event' | 'Other';
  serviceUsed: 'DJ' | 'Photo Booth' | 'Both' | 'Event Planning' | 'Other';
  rating: number;
  quote: string;
  fullStory?: string; // Optional longer version of the testimonial
  image?: string;
  imageHint?: string;
  isFeatured?: boolean;
}

const allTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jessica & Michael P.',
    eventDate: 'November 12, 2023',
    eventType: 'Wedding',
    serviceUsed: 'Both',
    rating: 5,
    quote: "Rice Entertainment was the BEST decision for our wedding! DJ RICE kept the dance floor packed, and the Luxx Photo Booth was a huge hit. The VIBO app made music planning so easy!",
    fullStory: "From our first consultation to the last song of the night, Rice Entertainment exceeded all our expectations. DJ RICE was incredibly intuitive, playing the perfect mix of songs that catered to all our guests. The VIBO app was a fantastic tool that allowed us to meticulously plan our music and make special requests. The Luxx Photo Booth added such a fun and glamorous element; our guests are still talking about their photos! Professional, responsive, and truly talented – we can't recommend them enough.",
    image: 'https://picsum.photos/120/120?random=50',
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
    image: 'https://picsum.photos/120/120?random=51',
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
    image: 'https://picsum.photos/120/120?random=52',
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
    image: 'https://picsum.photos/120/120?random=53',
    imageHint: "conference attendees"
  },
];

const StarRating = ({ rating, color = "text-yellow-400" }: { rating: number, color?: string }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? `fill-current ${color}` : 'text-gray-300 dark:text-gray-600'}`} />
    ))}
  </div>
);

export default function TestimonialsPage() {
  const [filterService, setFilterService] = useState('All');
  const [filterEventType, setFilterEventType] = useState('All');
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>(allTestimonials);
  const { openModal } = useBookingModal();

  useEffect(() => {
    let testimonials = allTestimonials;
    if (filterService !== 'All') {
      testimonials = testimonials.filter(t => t.serviceUsed === filterService || (filterService === 'Photo Booth' && t.serviceUsed === 'Both') || (filterService === 'DJ' && t.serviceUsed === 'Both'));
    }
    if (filterEventType !== 'All') {
      testimonials = testimonials.filter(t => t.eventType === filterEventType);
    }
    testimonials.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
    setFilteredTestimonials(testimonials);
  }, [filterService, filterEventType]);

  const serviceOptions = ['All', 'DJ', 'Photo Booth', 'Both', 'Event Planning'];
  const eventTypeOptions = ['All', 'Wedding', 'Corporate', 'Private Party', 'School Event'];

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 py-20 sm:py-28 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://picsum.photos/1920/500?random=55"
            alt="Happy people at an event"
            data-ai-hint="event crowd celebration"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="section-label-style text-indigo-200">Real Stories, Real Satisfaction</p>
          <h1 className="mt-2 h1-style text-white">
            What Our Clients Are Saying
          </h1>
          <p className="mt-6 body-text-large text-gray-100 max-w-3xl mx-auto">
            We're passionate about creating unforgettable events. Read first-hand accounts from clients who've experienced the Rice Entertainment difference.
          </p>
        </div>
      </div>

      {/* Filters and Testimonials Grid */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Filter Testimonials:</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={filterService} onValueChange={setFilterService}>
                  <SelectTrigger className="w-full sm:w-[200px] input-styles dark:bg-gray-800 dark:text-white">
                    <SelectValue placeholder="Filter by Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterEventType} onValueChange={setFilterEventType}>
                  <SelectTrigger className="w-full sm:w-[200px] input-styles dark:bg-gray-800 dark:text-white">
                    <SelectValue placeholder="Filter by Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypeOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {filteredTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className={cn(
                  "card-testimonial-styles flex flex-col overflow-hidden", 
                  testimonial.isFeatured ? "bg-gradient-to-br from-indigo-700 to-indigo-600 dark:from-indigo-600 dark:to-indigo-500 shadow-2xl ring-2 ring-indigo-300 dark:ring-indigo-500" : "bg-gray-800 dark:bg-gray-800 shadow-xl"
                )}>
                  <CardHeader className="p-6">
                    <div className="flex items-start gap-x-4">
                      {testimonial.image ? (
                        <Image
                          className="h-16 w-16 rounded-full bg-gray-50 object-cover ring-2 ring-white/50"
                          src={testimonial.image}
                          alt={testimonial.name}
                          data-ai-hint={testimonial.imageHint || "client headshot"}
                          width={64}
                          height={64}
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-400 text-white text-2xl font-semibold ring-2 ring-white/50">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <CardTitle className={cn("font-semibold text-lg", testimonial.isFeatured ? "text-white" : "text-indigo-300")}>{testimonial.name}</CardTitle>
                        <StarRating rating={testimonial.rating} color={testimonial.isFeatured ? "text-yellow-300" : "text-yellow-400"} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <blockquote className={cn("leading-relaxed italic text-base flex-grow", testimonial.isFeatured ? "text-gray-100" : "text-gray-300")}>
                      <MessageSquareQuote className="h-8 w-8 text-indigo-400 dark:text-indigo-300 opacity-50 mb-2 inline-block" />
                      <p>&ldquo;{testimonial.quote}&rdquo;</p>
                    </blockquote>
                    {testimonial.fullStory && (
                       <Button variant="link" className={cn("mt-3 px-0 text-sm self-start", testimonial.isFeatured ? "text-indigo-200 hover:text-white" : "text-indigo-400 hover:text-indigo-300")}>
                         Read Full Story
                       </Button>
                    )}
                  </CardContent>
                  <div className="border-t p-4 text-xs space-y-1",
                    className={cn("border-t p-4 text-xs space-y-1", testimonial.isFeatured ? "border-white/20 bg-black/10" : "border-gray-700 bg-gray-900/50")}>
                    <p className={cn("flex items-center", testimonial.isFeatured ? "text-indigo-200" : "text-gray-400")}>
                      <CalendarDays className="h-4 w-4 mr-2" /> Event: {testimonial.eventType} on {testimonial.eventDate}
                    </p>
                    <p className={cn("flex items-center", testimonial.isFeatured ? "text-indigo-200" : "text-gray-400")}>
                      <Tag className="h-4 w-4 mr-2" /> Service: {testimonial.serviceUsed}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquareQuote className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="h3-style text-gray-700 dark:text-gray-300">No Testimonials Found</p>
              <p className="body-text-default text-gray-500 dark:text-gray-400 mt-2">
                Try adjusting your filters or check back later for more client stories.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* CTA to share experience or book */}
      <div className="bg-gray-100 dark:bg-gray-900 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="h2-style text-gray-900 dark:text-white">
            Experienced Rice Entertainment?
          </h2>
          <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
            We'd love to hear about your event! Your feedback helps us grow and continue to provide top-notch service. Or, if you're ready to create your own unforgettable moments:
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button onClick={openModal} size="lg" className="button-primary-styles">
              Book Your Event
            </Button>
            <Button size="lg" variant="outline" className="button-secondary-styles" hasShimmer>
              Share Your Story
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
