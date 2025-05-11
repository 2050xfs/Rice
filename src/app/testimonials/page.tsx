// app/testimonials/page.tsx
"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Filter, MessageSquareQuote, CalendarDays, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useBookingModal } from '@/context/BookingModalContext'; // Updated import
import { testimonialsPageContent, type TestimonialPageItem } from '@/content/testimonials-page-content';
import Link from 'next/link';


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
  const [filteredTestimonials, setFilteredTestimonials] = useState<TestimonialPageItem[]>(testimonialsPageContent.testimonials);
  const { openModal } = useBookingModal(); // Updated hook usage

  useEffect(() => {
    let testimonials = testimonialsPageContent.testimonials;
    if (filterService !== 'All') {
      testimonials = testimonials.filter(t => t.serviceUsed === filterService || (filterService === 'Photo Booth' && t.serviceUsed === 'Both') || (filterService === 'DJ' && t.serviceUsed === 'Both'));
    }
    if (filterEventType !== 'All') {
      testimonials = testimonials.filter(t => t.eventType === filterEventType);
    }
    testimonials.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
    setFilteredTestimonials(testimonials);
  }, [filterService, filterEventType]);

  const { hero, filters, testimonials, noMatchMessage, cta } = testimonialsPageContent;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 py-20 sm:py-28 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            data-ai-hint={hero.imageHint}
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="section-label-style text-indigo-200">{hero.label}</p>
          <h1 className="mt-2 h1-style text-white">
            {hero.title}
          </h1>
          <p className="mt-6 body-text-large text-gray-100 max-w-3xl mx-auto">
            {hero.description}
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
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{filters.title}</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={filterService} onValueChange={setFilterService}>
                  <SelectTrigger className="w-full sm:w-[200px] input-styles dark:bg-gray-800 dark:text-white">
                    <SelectValue placeholder="Filter by Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {filters.serviceOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterEventType} onValueChange={setFilterEventType}>
                  <SelectTrigger className="w-full sm:w-[200px] input-styles dark:bg-gray-800 dark:text-white">
                    <SelectValue placeholder="Filter by Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {filters.eventTypeOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
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
                         {/* Add Modal/Accordion logic here to show fullStory */}
                         Read Full Story
                       </Button>
                    )}
                  </CardContent>
                  <div className={cn("border-t p-4 text-xs space-y-1", testimonial.isFeatured ? "border-white/20 bg-black/10" : "border-gray-700 bg-gray-900/50")}>
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
                {noMatchMessage}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA to share experience or book */}
      <div className="bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32">
          <div className="relative isolate overflow-hidden bg-gray-900/50 dark:bg-black/30 px-6 py-16 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-16 md:py-24">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#6366F1" />
                  <stop offset={1} stopColor="#4F46E5" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="h2-style text-white">
                {cta.title}
              </h2>
              <p className="mt-6 body-text-large text-gray-300">
                {cta.description}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
                <Button onClick={openModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
                  {cta.button1Text}
                </Button>
                {/* Assuming cta.button2Link is for sharing, it might link to a contact form or specific review page */}
                {cta.button2Text && (
                  <Button size="lg" variant="transparent" className="button-transparent-styles" hasShimmer>
                    {cta.button2Text} <span aria-hidden="true">→</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
