// src/content/event-type-content.ts
import type React from 'react';
import type { LucideIcon } from 'lucide-react';
import { CheckCircle, Sparkles, Gift, Users, Music, Camera, Briefcase, PartyPopper, Settings } from 'lucide-react';
import { 
  weddingsHeroImage, weddingsGalleryImage1, weddingsGalleryImage2, weddingsGalleryImage3,
  corporateHeroImage, corporateGalleryImage1, corporateGalleryImage2, corporateGalleryImage3,
  privatePartiesHeroImage, privatePartiesGalleryImage1, privatePartiesGalleryImage2, privatePartiesGalleryImage3,
  defaultEventHeroImage
} from '@/lib/image-urls';
import type { HeroTitlePart, HeroFeature } from '@/components/sections/PageHero';

export interface GalleryItem {
  src: string;
  alt: string;
  hint: string;
}

export interface ServiceHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface EventTypeDetails {
  title: string; // Used for page title and section headers. The actual H1 in hero is from titleParts
  titleParts: HeroTitlePart[];
  heroImage: string;
  heroImageHint: string;
  badgeText?: string;
  tagline?: string; // Can be part of subtitle or description
  description: string; // This is the main subtitle for the hero
  heroFeatures?: HeroFeature[]; // Pill-style features for hero
  serviceHighlights: ServiceHighlight[];
  gallery?: GalleryItem[];
  ctaText?: string; // Primary CTA for hero
  secondaryCtaText?: string; // Secondary CTA for hero
  whyChooseText: string;
  whyChooseReasons: { name: string; description: string }[];
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaButtonText: string;
}

export const eventTypeContentMap: Record<string, EventTypeDetails> = {
  weddings: {
    title: "Weddings",
    badgeText: "Your Dream Wedding Starts Here",
    titleParts: [
        { text: "Crafting Your", highlight: false },
        { text: "Unforgettable Wedding", highlight: true },
    ],
    description: "Your wedding day is one of the most important days of your life. Rice Entertainment specializes in creating magical wedding experiences with personalized DJ services, elegant photo booths, and seamless coordination. Let us help you make memories that last a lifetime.",
    heroImage: weddingsHeroImage,
    heroImageHint: "wedding reception elegant",
    heroFeatures: [
        { text: "Personalized DJ & MC", icon: Music },
        { text: "Elegant Photo Booths", icon: Camera },
        { text: "VIBO Music Planning", icon: Sparkles },
        { text: "Guest Engagement", icon: Users },
    ],
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
    ctaText: "Plan Your Perfect Wedding Day",
    secondaryCtaText: "View Services",
    whyChooseText: "We bring expertise, passion, and a commitment to excellence to every wedding. Our goal is to make your special day stress-free and unforgettable.",
    whyChooseReasons: [
        { name: 'Experienced Wedding Professionals', description: 'Our team understands the nuances of weddings and knows how to create the perfect flow.' },
        { name: 'Personalized Approach', description: 'We work closely with you to ensure every detail reflects your unique love story.' },
        { name: 'Reliability You Can Trust', description: 'Count on us for flawless execution on the most important day.' },
    ],
    finalCtaTitle: "Ready to Plan Your Dream Wedding?",
    finalCtaDescription: "Let's start creating an unforgettable experience. Contact us today for a personalized consultation and quote.",
    finalCtaButtonText: "Book Your Wedding Consultation",
  },
  corporate: {
    title: "Corporate Events",
    badgeText: "Professional Event Solutions",
    titleParts: [
        { text: "Elevate Your", highlight: false },
        { text: "Corporate Events", highlight: true },
    ],
    description: "From holiday parties and awards galas to conferences and brand activations, Rice Entertainment provides polished and professional DJ and photo booth services that align with your corporate image and objectives.",
    heroImage: corporateHeroImage,
    heroImageHint: "corporate event conference",
    heroFeatures: [
        { text: "Sophisticated DJ/MC", icon: Music },
        { text: "Branded Photo Booths", icon: Camera },
        { text: "AV & Presentation Support", icon: Briefcase },
        { text: "Team Engagement", icon: Users },
    ],
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
    ctaText: "Elevate Your Next Corporate Event",
    secondaryCtaText: "Our Corporate Services",
    whyChooseText: "We understand the importance of professionalism and brand image. Our services are designed to impress clients and energize employees.",
    whyChooseReasons: [
        { name: 'Polished & Professional', description: 'Our team maintains a high standard of presentation and service suitable for corporate settings.' },
        { name: 'Custom Branding Options', description: 'Reinforce your brand identity with custom photo booth experiences and tailored music.' },
        { name: 'Reliable & Punctual', description: 'We ensure seamless execution, allowing you to focus on your event objectives.' },
    ],
    finalCtaTitle: "Plan Your Next Corporate Function?",
    finalCtaDescription: "Enhance your corporate event with professional entertainment. Contact us for customized packages.",
    finalCtaButtonText: "Inquire About Corporate Events",
  },
  'private-parties': {
    title: "Private Parties",
    badgeText: "Celebrate in Style",
     titleParts: [
        { text: "Host Vibrant", highlight: false },
        { text: "Private Parties", highlight: true },
    ],
    description: "Birthdays, anniversaries, graduations, or just a get-together – Rice Entertainment brings the fun! Our versatile DJs and exciting photo booths can turn any private party into a memorable bash.",
    heroImage: privatePartiesHeroImage,
    heroImageHint: "birthday party celebration",
    heroFeatures: [
        { text: "High-Energy DJs", icon: Music },
        { text: "Interactive Photo Booths", icon: Camera },
        { text: "Themed Entertainment", icon: PartyPopper },
        { text: "Custom Packages", icon: Gift },
    ],
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
    ctaText: "Make Your Private Party Epic",
    secondaryCtaText: "Party Services Details",
    whyChooseText: "We know how to throw a party! Let us handle the entertainment so you can enjoy the celebration with your guests.",
    whyChooseReasons: [
        { name: 'Energetic & Fun DJs', description: 'Our DJs specialize in reading the crowd and keeping the party vibe alive.' },
        { name: 'Versatile Music Selection', description: 'From current hits to classic anthems, we have music for every generation.' },
        { name: 'Stress-Free Entertainment', description: 'We manage the setup and operation, letting you be the host.' },
    ],
    finalCtaTitle: "Ready to Plan Your Party?",
    finalCtaDescription: "Make your next private party unforgettable. Contact us to discuss your celebration details.",
    finalCtaButtonText: "Book Your Party Entertainment",
  },
};

export const defaultEventTypeContent: EventTypeDetails = {
  title: "Custom Event Solutions",
  badgeText: "Tailored Entertainment",
  titleParts: [
      { text: "Bespoke Solutions for", highlight: false },
      { text: "Your Unique Event", highlight: true },
  ],
  description: "Have a unique event in mind? Rice Entertainment provides flexible and customizable DJ and photo booth services for a wide range of occasions. Contact us to discuss your specific needs.",
  heroImage: defaultEventHeroImage,
  heroImageHint: "versatile event setup",
  heroFeatures: [
    { text: "Adaptable DJ Services", icon: Music },
    { text: "Versatile Photo Booths", icon: Camera },
    { text: "Customized Solutions", icon: Settings },
  ],
  serviceHighlights: [
    { icon: Music, title: "Adaptable DJ Services", description: "Music and MCing for any theme or atmosphere." },
    { icon: Camera, title: "Versatile Photo Booths", description: "A range of booth options to suit any event type." },
    { icon: Sparkles, title: "Customized Solutions", description: "We work with you to create the perfect entertainment package." },
  ],
  ctaText: "Discuss Your Unique Event",
  secondaryCtaText: "Learn More",
  whyChooseText: "No matter the occasion, we bring expertise, passion, and a commitment to excellence. Let us tailor our services for your unique event.",
    whyChooseReasons: [
        { name: 'Flexible & Creative', description: 'We love unique challenges and adapt our services to fit any event concept.' },
        { name: 'Experienced Professionals', description: 'Our team has the expertise to handle diverse event requirements.' },
        { name: 'Collaborative Planning', description: 'We partner with you to understand your vision and bring it to life.' },
    ],
    finalCtaTitle: "Have a Unique Event Idea?",
    finalCtaDescription: "Let's discuss how Rice Entertainment can make your special occasion exceptional.",
    finalCtaButtonText: "Contact Us for Custom Events",
};
