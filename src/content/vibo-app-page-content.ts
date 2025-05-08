// src/content/vibo-app-page-content.ts
import type { LucideIcon } from 'lucide-react';
import { CheckCircle, Music, Edit3, Users, Share2, MessageSquare, ListChecks, Smile } from 'lucide-react';
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
    image: viboAppHeroBg,
    imageAlt: "Abstract background representing music and technology",
    imageHint: "music technology abstract",
    ctaButtonText: "Book Services & Get VIBO Access",
  },
  howItWorks: {
    label: "Simple & Powerful",
    title: "How VIBO Elevates Your Music Planning",
    steps: [
      { step: 1, title: 'Access VIBO', description: 'Once you book our DJ services, you\'ll receive exclusive access to your personalized VIBO event planning portal.', image: viboHowItWorksStep1Img, imageHint: 'app login screen' },
      { step: 2, title: 'Curate Playlists', description: 'Browse songs, add to must-play/do-not-play lists, and organize music for different parts of your event.', image: viboHowItWorksStep2Img, imageHint: 'playlist creation interface' },
      { step: 3, title: 'Collaborate & Finalize', description: 'Your DJ reviews your plan, offers suggestions, and ensures everything is set for an amazing event.', image: viboHowItWorksStep3Img, imageHint: 'DJ collaboration chat' },
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
      { icon: MessageSquare, title: 'Timeline Integration', description: 'Coordinate special songs with key moments of your event timeline, like first dance, cake cutting, or grand entrance.' },
    ] as ViboFeature[],
  },
  benefits: {
    label: "The VIBO Advantage",
    title: "Why You'll Love Planning with VIBO",
    description: "VIBO isn't just an app; it's your partner in creating the perfect musical backdrop for your special day. Enjoy a seamless, fun, and collaborative planning experience.",
    items: [
      { icon: Smile, title: 'Stress-Free Planning', description: 'VIBO simplifies music selection, making it a fun and easy part of your event preparation.' },
      { icon: CheckCircle, title: 'Your Event, Your Vibe', description: 'Ensure the music perfectly reflects your style and preferences, creating the atmosphere you envision.' },
      { icon: Users, title: 'Engage Your Guests', description: 'Optional guest request features can make attendees feel more involved and excited for the event.' },
    ] as ViboBenefit[],
    image: viboBenefitsSectionImg,
    imageAlt: "Mobile and tablet screens showing VIBO app interface",
    imageHint: "app interface mobile tablet",
  },
  cta: {
    title: "Ready to Craft Your Perfect Event Soundtrack?",
    description: "Book any of our DJ services and gain exclusive access to the VIBO app. Let's make your event's music unforgettable.",
    buttonText: "Book Now & Plan with VIBO",
  }
};
