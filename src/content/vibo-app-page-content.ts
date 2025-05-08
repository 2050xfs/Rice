// src/content/vibo-app-page-content.ts
import type { LucideIcon } from 'lucide-react';
import { CheckCircle, Music, Edit3, Users, Share2, MessageSquare, ListChecks, Smile, CalendarCheck2 } from 'lucide-react'; // Added CalendarCheck2
import {
  viboAppHeroBg, viboHowItWorksStep1Img, viboHowItWorksStep2Img, viboHowItWorksStep3Img,
  viboBenefitsSectionImg
} from '@/lib/image-urls';

export interface ViboStep {
  step: number;
  title: string;
  description: string;
  image: string;
  imageHint: string;
}

export interface ViboFeature {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface ViboBenefit {
    icon: LucideIcon;
    title: string;
    description: string;
}

export const viboAppPageContent = {
  hero: {
    icon: Music,
    title: "VIBO: Your Personal Event Music Planner",
    description: "Take full control of your event's soundtrack with VIBO, our exclusive, easy-to-use music planning app. Craft the perfect atmosphere for every moment.",
    image: viboAppHeroBg, // Using placeholder, could use vibomusoc_planning_app_group... if better
    imageAlt: "Abstract background representing music and technology",
    imageHint: "music technology abstract",
    ctaButtonText: "Book Services & Get VIBO Access",
  },
  howItWorks: {
    label: "Simple & Powerful",
    title: "Experience the Vibo DJ App", // Updated Title
    steps: [
      { step: 1, title: 'Music Selection', description: 'Browse and organize your event playlist with ease.', image: viboHowItWorksStep2Img, imageHint: 'music selection interface' }, // Using music_selection image
      { step: 2, title: 'Timeline Planning', description: 'Keep your event perfectly timed and organized.', image: viboHowItWorksStep3Img, imageHint: 'music planning timeline' }, // Using music_planning_timeline image
      { step: 3, title: 'Collaborative Tools', description: 'Work directly with your DJ to check the perfect soundtrack.', image: viboHowItWorksStep1Img, imageHint: 'DJ collaboration chat' }, // Using placeholder for collab
    ] as ViboStep[],
  },
  features: {
    label: "Packed with Features",
    title: "Everything You Need for Perfect Event Music",
    items: [
      { icon: Music, title: 'Extensive Music Library', description: 'Browse millions of songs, curated playlists, and popular charts to find the perfect tracks for every part of your event.' },
      { icon: ListChecks, title: 'Intuitive Playlist Builder', description: 'Easily create and organize playlists for different segments like cocktail hour, dinner, and dancing. Drag and drop songs with ease.' },
      { icon: Edit3, title: 'Personalize Your Requests', description: 'Add "Must Play", "Play If Possible", and "Do Not Play" lists. Leave specific notes for your DJ on certain songs or moments.' },
      { icon: Users, title: 'Guest Song Requests (Optional)', description: 'Allow your guests to suggest songs before the event, giving you insight into their preferences (you have final approval).' },
      { icon: Share2, title: 'Seamless DJ Collaboration', description: 'Your DJ gets direct access to your VIBO plan, ensuring they understand your vision perfectly. No miscommunications!' },
      { icon: CalendarCheck2, title: 'Timeline Integration', description: 'Coordinate special songs with key moments of your event timeline, like first dance, cake cutting, or grand entrance.' }, // Changed icon
    ] as ViboFeature[],
  },
  benefits: {
    label: "The VIBO Advantage",
    title: "Your Event, Your Music", // Updated Title
    description: "Take control of your event's soundtrack with our powerful DJ planning tools. Create the perfect playlist, set the timeline, and collaborate with your DJ in real-time.", // Updated Description
    items: [
      { icon: Smile, title: 'Stress-Free Planning', description: 'VIBO simplifies music selection, making it a fun and easy part of your event preparation.' },
      { icon: CheckCircle, title: 'Your Event, Your Vibe', description: 'Ensure the music perfectly reflects your style and preferences, creating the atmosphere you envision.' },
      { icon: Users, title: 'Engage Your Guests', description: 'Optional guest request features can make attendees feel more involved and excited for the event.' },
    ] as ViboBenefit[],
    image: viboBenefitsSectionImg, // Updated via image-urls.ts
    imageAlt: "VIBO DJ planning app shown on two side-by-side phone screens",
    imageHint: "app interface mobile comparison",
  },
  cta: {
    title: "Ready to Craft Your Perfect Event Soundtrack?",
    description: "Book any of our DJ services and gain exclusive access to the VIBO app. Let's make your event's music unforgettable.",
    buttonText: "Book Now & Plan with VIBO",
  }
};
