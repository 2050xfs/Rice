// components/sections/TestimonialsSection.tsx
"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { testimonialsSectionContent, type TestimonialItem } from '@/content/testimonials-section-content';


const StarRating = ({ rating, color = "text-yellow-400" }: { rating: number, color?: string }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? `fill-current ${color}` : 'text-gray-300 dark:text-gray-600'}`} />
    ))}
  </div>
);

export default function TestimonialsSection() {
  const [filterService, setFilterService] = useState('All');
  const [filterEventType, setFilterEventType] = useState('All');
  const [filteredTestimonials, setFilteredTestimonials] = useState<TestimonialItem[]>(testimonialsSectionContent.testimonials);

  useEffect(() => {
    let testimonials = testimonialsSectionContent.testimonials;
    if (filterService !== 'All') {
      testimonials = testimonials.filter(t => t.serviceUsed === filterService || (filterService === 'Photo Booth' && t.serviceUsed === 'Both') || (filterService === 'DJ' && t.serviceUsed === 'Both'));
    }
    if (filterEventType !== 'All') {
      testimonials = testimonials.filter(t => t.eventType === filterEventType);
    }
    // Prioritize featured testimonials
    testimonials.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    setFilteredTestimonials(testimonials);
  }, [filterService, filterEventType]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:text-center">
          <p className="section-label-style">{testimonialsSectionContent.label}</p>
          <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
            {testimonialsSectionContent.title}
          </h2>
          <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
            {testimonialsSectionContent.description}
          </p>
        </div>

        <div className="mt-10 mb-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
          </div>
          <Select value={filterService} onValueChange={setFilterService}>
            <SelectTrigger className="w-full sm:w-[180px] input-styles dark:bg-gray-800 dark:text-white">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              {testimonialsSectionContent.filterOptions.services.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterEventType} onValueChange={setFilterEventType}>
            <SelectTrigger className="w-full sm:w-[180px] input-styles dark:bg-gray-800 dark:text-white">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              {testimonialsSectionContent.filterOptions.eventTypes.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className={cn(
              "card-testimonial-styles", 
              testimonial.isFeatured ? "bg-gradient-to-br from-indigo-700 to-indigo-600 dark:from-indigo-600 dark:to-indigo-500 shadow-xl ring-2 ring-indigo-400" : "bg-gray-800 dark:bg-gray-800"
            )}>
              <CardContent className="p-6"> {/* Adjusted padding here */}
                <div className="flex items-center gap-x-4 mb-4">
                  {testimonial.image && (
                    <Image
                      className="h-12 w-12 rounded-full bg-gray-50 object-cover"
                      src={testimonial.image}
                      alt={testimonial.name}
                      data-ai-hint={testimonial.imageHint || "client photo"}
                      width={48}
                      height={48}
                    />
                  )}
                  <div>
                    <div className={cn("font-semibold", testimonial.isFeatured ? "text-white" : "text-indigo-300")}>{testimonial.name}</div>
                    <div className={cn("text-xs", testimonial.isFeatured ? "text-indigo-200" : "text-gray-400")}>
                      {testimonial.eventType} - {testimonial.eventDate}
                    </div>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} color={testimonial.isFeatured ? "text-yellow-300" : "text-yellow-400"} />
                <blockquote className={cn("mt-4 leading-relaxed", testimonial.isFeatured ? "text-gray-100" : "text-gray-300")}>
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>
                <p className={cn("mt-3 text-xs font-medium", testimonial.isFeatured ? "text-indigo-200" : "text-indigo-400")}>
                  Service Used: {testimonial.serviceUsed}
                </p>
              </CardContent>
            </Card>
          ))}
           {filteredTestimonials.length === 0 && (
            <p className="col-span-full text-center body-text-default text-gray-500 dark:text-gray-400">
              {testimonialsSectionContent.noMatchMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
