// src/content/vibo-app-highlight-content.ts
import type { LucideIcon } from 'lucide-react';
import { Music, Edit3, Share2, ListChecks, Users, CalendarCheck2, Smile, CheckCircle } from 'lucide-react';
import { 
  viboAppPhoneMockup, 
  viboHowItWorksStep1Img, 
  viboHowItWorksStep2Img, 
  viboHowItWorksStep3Img,
  viboBenefitsSectionImg
} from '@/lib/image-urls';

export interface ViboFeature {
  icon: LucideIcon;
  name: string;
  description: string;
}

export interface ViboStep {
  step: number;
  title: string;
  description: string;
  image: string;
  imageHint: string;
}

export interface ViboBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const viboAppHighlightContent = {
  label: "Plan Like a Pro",
  titlePart1: "Effortless Music Planning with ",
  titlePart2Highlight: "VIBO",
  description: "Take control of your event's soundtrack with our exclusive VIBO DJ planning app. It's intuitive, collaborative, and puts the power of music selection at your fingertips.",
  
  // Main features section
  features: [
    {
      icon: Music,
      name: 'Extensive Music Library',
      description: 'Browse millions of songs, curated playlists, and popular charts to find the perfect tracks for every part of your event.',
    },
    {
      icon: ListChecks,
      name: 'Intuitive Playlist Builder',
      description: 'Easily create and organize playlists for different segments like cocktail hour, dinner, and dancing.',
    },
    {
      icon: Edit3,
      name: 'Personalize Your Requests',
      description: 'Add "Must Play", "Play If Possible", and "Do Not Play" lists with specific notes for your DJ.',
    },
    {
      icon: Users,
      name: 'Guest Song Requests',
      description: 'Allow your guests to suggest songs before the event, giving you insight into their preferences (with your final approval).',
    },
    {
      icon: Share2,
      name: 'Seamless DJ Collaboration',
      description: 'Your DJ gets direct access to your VIBO plan, ensuring they understand your vision perfectly.',
    },
    {
      icon: CalendarCheck2,
      name: 'Timeline Integration',
      description: 'Coordinate special songs with key moments of your event timeline, like first dance or grand entrance.',
    },
  ] as ViboFeature[],
  
  // How it works section
  howItWorks: {
    title: "Experience the Vibo DJ App",
    steps: [
      { 
        step: 1, 
        title: 'Music Selection', 
        description: 'Browse and organize your event playlist with ease.', 
        image: viboHowItWorksStep1Img, 
        imageHint: 'music selection interface' 
      },
      { 
        step: 2, 
        title: 'Timeline Planning', 
        description: 'Keep your event perfectly timed and organized.', 
        image: viboHowItWorksStep2Img, 
        imageHint: 'music planning timeline' 
      },
      { 
        step: 3, 
        title: 'Collaborative Tools', 
        description: 'Work directly with your DJ to create the perfect soundtrack.', 
        image: viboHowItWorksStep3Img, 
        imageHint: 'DJ collaboration chat' 
      },
    ] as ViboStep[],
  },
  
  // Benefits section
  benefits: {
    title: "Your Event, Your Music",
    description: "Take control of your event's soundtrack with our powerful DJ planning tools. Create the perfect playlist, set the timeline, and collaborate with your DJ in real-time.",
    items: [
      { 
        icon: Smile, 
        title: 'Stress-Free Planning', 
        description: 'VIBO simplifies music selection, making it a fun and easy part of your event preparation.' 
      },
      { 
        icon: CheckCircle, 
        title: 'Your Event, Your Vibe', 
        description: 'Ensure the music perfectly reflects your style and preferences, creating the atmosphere you envision.' 
      },
      { 
        icon: Users, 
        title: 'Engage Your Guests', 
        description: 'Optional guest request features can make attendees feel more involved and excited for the event.' 
      },
    ] as ViboBenefit[],
    image: viboBenefitsSectionImg,
    imageAlt: "VIBO DJ planning app shown on two side-by-side phone screens",
    imageHint: "app interface mobile comparison",
  },
  
  // Main image
  mainImage: {
    src: viboAppPhoneMockup,
    alt: "VIBO App interface on a smartphone",
    hint: "music app interface",
  },
  
  // CTA
  ctaButtonText: "Book Services & Get VIBO Access",
};
