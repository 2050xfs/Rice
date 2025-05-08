// app/contact/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Building, CalendarDays, Mail, Phone, User, MessageCircle, Send, Loader2, Camera } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { 
  contactEventGalleryImg1, contactEventGalleryImg2, contactEventGalleryImg3, contactEventGalleryImg4 
} from '@/lib/image-urls';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  eventDate?: string;
}

const initialContactFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  eventDate: '',
};

const faqItems = [
  {
    id: 'faq1',
    question: 'What areas do you serve for events?',
    answer: 'We primarily serve the Greater Anytown Area. However, we are available for travel to surrounding regions and beyond. Travel fees may apply for locations outside our standard service zone. Please contact us with your event details for a specific quote.',
  },
  {
    id: 'faq2',
    question: 'How far in advance should I book your services?',
    answer: 'We recommend booking as early as possible, especially for popular dates like weekends and holidays. For weddings, 6-12 months in advance is typical. For corporate events and private parties, 2-6 months is advisable. However, don\'t hesitate to reach out for last-minute inquiries, as we may have availability.',
  },
  {
    id: 'faq3',
    question: 'What types of music can your DJs play?',
    answer: 'Our DJs are versatile and have extensive music libraries spanning many genres, including Top 40, Pop, Hip Hop, R&B, EDM, Rock, Country, Jazz, Classical, Latin, and more. We work closely with you using our VIBO app to tailor the music selection to your specific tastes and event atmosphere.',
  },
  {
    id: 'faq4',
    question: 'Do your photo booths come with an attendant?',
    answer: 'Yes, most of our photo booth packages include a professional and friendly attendant to ensure everything runs smoothly, assist your guests, and manage the props and equipment. For certain drop-off style social booths, an attendant may be optional.',
  },
  {
    id: 'faq5',
    question: 'What is included in your basic DJ package?',
    answer: 'Our Essential Beats package typically includes up to 4 hours of DJ service, a professional DJ & MC, a sound system suitable for up to 100 guests, basic dance floor lighting, and access to our VIBO music planning app. For detailed package information, please visit our DJ Services page or contact us.',
  },
];

const eventGalleryImages = [
  { src: contactEventGalleryImg1, alt: 'Excited crowd at a wedding reception', hint: 'wedding party dance' },
  { src: contactEventGalleryImg2, alt: 'Professional corporate event setup', hint: 'corporate conference' },
  { src: contactEventGalleryImg3, alt: 'Fun moments at a private party photo booth', hint: 'photo booth fun' },
  { src: contactEventGalleryImg4, alt: 'DJ performing at an outdoor event', hint: 'DJ outdoor event' },
];


export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialContactFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Contact Form Data Submitted:", formData);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setFormData(initialContactFormData); 
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out! We'll get back to you as soon as possible.",
      variant: "default",
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="h1-style text-gray-900 dark:text-white">Get in Touch</h1>
          <p className="mt-4 body-text-large text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're excited to hear about your event! Fill out the form below or use our direct contact details for any questions or booking inquiries.
          </p>
        </div>
      </div>

      {/* Contact Form and Info Section */}
      <div className="relative bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-5 lg:gap-x-8">
          {/* Contact Information & Event Gallery */}
          <div className="bg-gray-50 dark:bg-gray-800 py-16 px-6 lg:col-span-2 lg:px-8 lg:py-16 xl:pr-12 rounded-lg shadow-md">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">Contact Details</h2>
              <p className="mt-3 body-text-default text-gray-500 dark:text-gray-400">
                Reach out to us for a quick response. We're here to help plan your perfect event.
              </p>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="sr-only">Phone number</dt>
                  <dd className="flex items-center text-base text-gray-500 dark:text-gray-300">
                    <Phone className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-gray-500 mr-3" aria-hidden="true" />
                    <a href="tel:+1234567890" className="hover:text-primary dark:hover:text-indigo-400">(123) 456-7890</a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd className="flex items-center text-base text-gray-500 dark:text-gray-300">
                    <Mail className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-gray-500 mr-3" aria-hidden="true" />
                    <a href="mailto:info@riceentertainment.com" className="hover:text-primary dark:hover:text-indigo-400">info@riceentertainment.com</a>
                  </dd>
                </div>
              </dl>

              {/* Event Gallery Carousel */}
              <div className="mt-12">
                <h3 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    <Camera className="w-6 h-6 mr-3 text-primary" /> Event Showcase
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {eventGalleryImages.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md group">
                      <Image 
                        src={image.src} 
                        alt={image.alt} 
                        data-ai-hint={image.hint}
                        layout="fill" 
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                       <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                        <p className="text-white text-xs font-medium">{image.alt}</p>
                      </div>
                    </div>
                  ))}
                </div>
                 <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                  A glimpse of the unforgettable moments we help create!
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="py-16 px-6 lg:col-span-3 lg:py-16 lg:px-8 xl:pl-12 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="max-w-lg mx-auto lg:max-w-none">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                <div>
                  <Label htmlFor="name" className="label-styles flex items-center"><User className="w-4 h-4 mr-2 opacity-70" /> Full Name</Label>
                  <Input type="text" name="name" id="name" autoComplete="name" value={formData.name} onChange={handleChange} className="input-styles mt-1" required />
                </div>
                <div>
                  <Label htmlFor="email" className="label-styles flex items-center"><Mail className="w-4 h-4 mr-2 opacity-70" /> Email</Label>
                  <Input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={handleChange} className="input-styles mt-1" required />
                </div>
                <div>
                  <Label htmlFor="phone" className="label-styles flex items-center"><Phone className="w-4 h-4 mr-2 opacity-70" /> Phone (Optional)</Label>
                  <Input type="tel" name="phone" id="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className="input-styles mt-1" />
                </div>
                 <div>
                  <Label htmlFor="company" className="label-styles flex items-center"><Building className="w-4 h-4 mr-2 opacity-70" /> Company (If applicable)</Label>
                  <Input type="text" name="company" id="company" autoComplete="organization" value={formData.company} onChange={handleChange} className="input-styles mt-1" />
                </div>
                <div>
                  <Label htmlFor="subject" className="label-styles flex items-center"><MessageCircle className="w-4 h-4 mr-2 opacity-70" /> Subject</Label>
                   <Select name="subject" value={formData.subject} onValueChange={handleSelectChange}>
                    <SelectTrigger className="select-styles mt-1"><SelectValue placeholder="Select a subject" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Booking Inquiry">Booking Inquiry</SelectItem>
                      <SelectItem value="DJ Services Question">DJ Services Question</SelectItem>
                      <SelectItem value="Photo Booth Question">Photo Booth Question</SelectItem>
                      <SelectItem value="VIBO App Support">VIBO App Support</SelectItem>
                      <SelectItem value="Partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="General Feedback">General Feedback/Question</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div>
                  <Label htmlFor="eventDate" className="label-styles flex items-center"><CalendarDays className="w-4 h-4 mr-2 opacity-70" /> Potential Event Date (Optional)</Label>
                  <Input type="date" name="eventDate" id="eventDate" value={formData.eventDate ?? ''} onChange={handleChange} className="input-styles mt-1" />
                </div>
                <div>
                  <Label htmlFor="message" className="label-styles flex items-center"><MessageCircle className="w-4 h-4 mr-2 opacity-70" /> Message</Label>
                  <Textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className="input-styles mt-1 min-h-[120px]" required />
                </div>
                <div>
                  <Button type="submit" disabled={isSubmitting} className="w-full button-primary-styles py-3 text-base">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24 mt-16 sm:mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="h2-style text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 body-text-large text-gray-600 dark:text-gray-300">
              Find answers to common questions about our services and booking process.
            </p>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item) => (
                <AccordionItem value={item.id} key={item.id} className="bg-gray-50 dark:bg-gray-800 p-0 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-left px-6 py-4 text-lg font-medium text-gray-700 dark:text-gray-200 hover:no-underline hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-t-lg transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0 text-base text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
