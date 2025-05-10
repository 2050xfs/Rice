// src/content/dj-services-page-content.ts
import type { LucideIcon } from 'lucide-react';
import { Disc3, Zap, Music, Users, CalendarCheck2, CheckCircle, Headphones, Speaker, Lightbulb, Mic } from 'lucide-react';
import { 
  djServicesHeroBg, djPackageEssentialBeatsImg, djPackagePremiumSoundImg, djPackageUltimateExperienceImg,
  djProfileDjRiceImg, viboAppDjPageImg
} from '@/lib/image-urls';
import type { HeroTitlePart, HeroFeature } from '@/components/sections/PageHero';


export interface DjPackage {
  name: string;
  icon: LucideIcon;
  priceInfo: string;
  features: string[];
  image: string;
  imageHint: string;
}

export interface DjProfile {
  name: string;
  specialties: string[];
  bio: string;
  image: string;
  imageHint: string;
}

export const djServicesPageContent = {
  hero: {
    badgeText: "Expert DJ & MC Services",
    titleParts: [
      { text: "Set The Mood with", highlight: false },
      { text: "Professional DJ Services", highlight: true },
    ] as HeroTitlePart[],
    description: "Our experienced DJs bring the perfect energy and soundtrack to any event. From elegant weddings to high-energy corporate parties, we tailor the music to your unique style and guests.",
    features: [
        { text: "Pro Sound Systems", icon: Speaker },
        { text: "Dynamic Lighting", icon: Lightbulb },
        { text: "Engaging MCs", icon: Mic },
        { text: "VIBO Music Planning", icon: Music },
    ] as HeroFeature[],
    image: djServicesHeroBg,
    imageAlt: "DJ mixing console with vibrant lights",
    imageHint: "DJ console lights",
    ctaButtonText: "Get a DJ Quote",
    secondaryCtaText: "View Packages",
    secondaryCtaLink: "#dj-packages-section", // Anchor link to packages section
  },
  packages: {
    label: "Our Offerings",
    title: "DJ Packages for Every Occasion",
    description: "Choose from our curated DJ packages, or let us customize one to perfectly match your event's needs and budget.",
    items: [
      {
        name: 'Essential Beats',
        icon: Disc3,
        priceInfo: 'Perfect for smaller gatherings & budgets',
        features: [
          'Up to 4 hours of DJ service',
          'Professional DJ & MC',
          'Sound system for up to 100 guests',
          'Basic dance floor lighting',
          'VIBO App for music planning',
        ],
        image: djPackageEssentialBeatsImg,
        imageHint: "DJ setup small event",
      },
      {
        name: 'Premium Sound & Light',
        icon: Zap,
        priceInfo: 'Ideal for weddings & mid-sized events',
        features: [
          'Up to 5 hours of DJ service',
          'Experienced DJ & engaging MC',
          'Upgraded sound system for up to 200 guests',
          'Enhanced intelligent lighting package',
          'Wireless microphone for speeches',
          'VIBO App Pro access',
        ],
        image: djPackagePremiumSoundImg,
        imageHint: "wedding DJ lights",
      },
      {
        name: 'Ultimate Experience',
        icon: Music,
        priceInfo: 'For large events & the ultimate party',
        features: [
          'Up to 6 hours of DJ service (or full event coverage)',
          'Top-tier DJ, MC & event coordinator',
          'Concert-grade sound system (200+ guests)',
          'Customized intelligent lighting & effects (e.g., uplighting, monogram)',
          'Multiple wireless microphones',
          'Ceremony sound system (if applicable)',
          'VIBO App Premium & personal consultation',
        ],
        image: djPackageUltimateExperienceImg,
        imageHint: "large event DJ concert",
      },
    ] as DjPackage[],
    ctaButtonText: "Select Package",
  },
  vibo: {
    label: "Your Music, Your Way",
    title: "Plan with VIBO - Our Exclusive Music App",
    description: "All our DJ packages include access to the VIBO app, allowing you to easily plan your music, make requests, and collaborate with your DJ. No more endless email chains or spreadsheets!",
    features: [
      { icon: CalendarCheck2, text: 'Organize your event timeline and music cues.' },
      { icon: Music, text: 'Browse popular song choices and build your playlists.' },
      { icon: Users, text: 'Invite guests to make song requests (optional).' },
    ],
    ctaButtonText: "Explore VIBO App Features",
    ctaButtonLink: "/vibo-app",
    image: viboAppDjPageImg,
    imageAlt: "VIBO App screenshot on a tablet",
    imageHint: "music planning app tablet",
  },
  equipmentAndDjs: {
    equipment: {
        label: "Quality Sound & Presentation",
        title: "Our Equipment & Approach",
        description: "We invest in top-of-the-line audio and lighting equipment to ensure crystal-clear sound and a visually stunning atmosphere. Our DJs are professionals who dress appropriately for your event and work seamlessly with other vendors.",
        points: [
            'State-of-the-art sound systems (QSC, JBL, EV).',
            'Professional DJ controllers and mixers (Pioneer, Rane).',
            'Intelligent DMX lighting, uplighting, and custom effects.',
            'Clean and professional booth setups.',
            'Extensive music library spanning all genres and eras.',
        ],
        pointIcon: CheckCircle,
    },
    djs: {
        label: "Meet Our Talent",
        title: "Our Professional DJs",
        description: "Our team of skilled DJs are passionate about music and dedicated to creating the perfect vibe for your event.",
        profiles: [
         {
            name: 'DJ RICE',
            specialties: ['Weddings', 'Corporate', 'Top 40', 'Hip Hop'],
            bio: 'With over 10 years of experience, DJ RICE knows how to read a crowd and keep the energy high. His seamless transitions and diverse music knowledge make him a versatile choice for any event.',
            image: djProfileDjRiceImg,
            imageHint: "DJ portrait",
          }
        ] as DjProfile[],
    }
  },
  cta: {
    title: "Let's Get Your Party Started!",
    description: "Ready to discuss your event's music and entertainment needs? Our team is here to help you choose the perfect DJ and package.",
    buttonText: "Book a DJ Consultation",
  }
};
