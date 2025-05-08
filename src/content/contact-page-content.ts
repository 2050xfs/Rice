// src/content/contact-page-content.ts
import type { LucideIcon } from 'lucide-react';
import { Phone, Mail, Camera } from 'lucide-react';
import { 
  contactEventGalleryImg1, contactEventGalleryImg2, contactEventGalleryImg3, contactEventGalleryImg4 
} from '@/lib/image-urls';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface EventGalleryImage {
  src: string;
  alt: string;
  hint: string;
}

export const contactPageContent = {
  pageTitle: "Get in Touch",
  pageDescription: "We're excited to hear about your event! Fill out the form below or use our direct contact details for any questions or booking inquiries.",
  contactDetails: {
    title: "Contact Details",
    description: "Reach out to us for a quick response. We're here to help plan your perfect event.",
    phone: {
      icon: Phone,
      number: "(123) 456-7890",
      href: "tel:+1234567890",
    },
    email: {
      icon: Mail,
      address: "info@riceentertainment.com",
      href: "mailto:info@riceentertainment.com",
    },
  },
  eventGallery: {
    title: "Event Showcase",
    icon: Camera,
    images: [
      { src: contactEventGalleryImg1, alt: 'Excited crowd at a wedding reception', hint: 'wedding party dance' },
      { src: contactEventGalleryImg2, alt: 'Professional corporate event setup', hint: 'corporate conference' },
      { src: contactEventGalleryImg3, alt: 'Fun moments at a private party photo booth', hint: 'photo booth fun' },
      { src: contactEventGalleryImg4, alt: 'DJ performing at an outdoor event', hint: 'DJ outdoor event' },
    ] as EventGalleryImage[],
    caption: "A glimpse of the unforgettable moments we help create!",
  },
  form: {
    submitButtonText: "Send Message",
    submittingText: "Sending...",
    successToastTitle: "Message Sent!",
    successToastDescription: "Thanks for reaching out! We'll get back to you as soon as possible.",
    placeholders: {
      name: "e.g., Jane Doe",
      email: "e.g., jane.doe@example.com",
      phone: "e.g., (555) 123-4567",
      message: "Tell us about your event, what services you're interested in, and any specific questions you have.",
    }
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about our services and booking process.",
    items: [
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
    ] as FaqItem[],
  },
};
