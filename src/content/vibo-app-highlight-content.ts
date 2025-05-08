// src/content/vibo-app-highlight-content.ts
import type { LucideIcon } from 'lucide-react';
import { Music, Edit3, Share2 } from 'lucide-react';
import { viboAppHighlightInterfaceImg } from '@/lib/image-urls';

export interface ViboFeature {
  icon: LucideIcon;
  name: string;
  description: string;
}

export const viboAppHighlightContent = {
  label: "Plan Like a Pro",
  titlePart1: "Effortless Music Planning with ",
  titlePart2Highlight: "VIBO",
  description: "Take control of your event's soundtrack with our exclusive VIBO DJ planning app. It's intuitive, collaborative, and puts the power of music selection at your fingertips.",
  features: [
    {
      icon: Music,
      name: 'Curate Your Playlist',
      description: 'Easily browse and select songs for every moment of your event.',
    },
    {
      icon: Edit3,
      name: 'Personalize Your Event',
      description: 'Add notes, special requests, and do-not-play lists directly in the app.',
    },
    {
      icon: Share2,
      name: 'Collaborate Seamlessly',
      description: 'Share your plans with your DJ and get their expert input for a perfect flow.',
    },
  ] as ViboFeature[],
  ctaButtonText: "Learn More About VIBO",
  imageSrc: viboAppHighlightInterfaceImg,
  imageAlt: "VIBO App interface on a smartphone",
  imageHint: "music app interface",
};
