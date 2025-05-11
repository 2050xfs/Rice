// src/content/lighting-services-page-content.ts
import { Lightbulb, Palette, Sparkles, SunMoon, Building, CheckCircle, ShieldCheck, Zap, Settings, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  lightingHeroBg, uplightingImg, danceFloorLightingImg, specialtyEffectsImg, outdoorLightingImg,
  architecturalLightingImg, lightingGalleryImg1, lightingGalleryImg2, lightingGalleryImg3, lightingGalleryImg4,
  pinspotLightingImg
} from '@/lib/image-urls';
import type { HeroTitlePart, HeroFeature } from '@/components/sections/PageHero';

export interface LightingOffering {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageHint: string;
}

export interface LightingPackage {
  name: string;
  perfectFor: string;
  includes: string[];
  priceTier?: string;
}

export interface TechSpecItem {
  icon: LucideIcon;
  title: string;
  details: string[];
}

export interface ClientBenefitItem {
  icon: LucideIcon;
  title: string;
}

export interface GalleryImage {
    src: string;
    alt: string;
    hint: string;
}

export const lightingPageContent = {
  hero: {
    badgeText: "New: Cold Sparkler Effects",
    titleParts: [
        { text: "Transform Your Event with", highlight: false },
        { text: "Stunning Lighting Design", highlight: true },
    ] as HeroTitlePart[],
    subheading: "From elegant uplighting to dynamic effects and safe indoor sparklers, our professional lighting solutions create the perfect atmosphere for any occasion.",
    features: [
        { text: "Custom Uplighting", icon: Palette },
        { text: "Dance Floor Effects", icon: Sparkles },
        { text: "Cold Sparklers", icon: Zap },
        { text: "Gobo Projections", icon: Settings },
    ] as HeroFeature[],
    primaryCtaText: "Schedule a Demo",
    secondaryCtaText: "View Gallery",
    backgroundImage: lightingHeroBg,
    backgroundImageAlt: "Outdoor event with cold sparkler effects",
    backgroundImageHint: "cold sparklers fireworks",
  },
  demoForm: {
    title: "Request a Lighting Demo",
    eventTypes: ["Wedding", "Corporate Event", "Private Party", "Concert/Performance", "Other"],
    venueTypes: ["Indoor", "Outdoor", "Both Indoor & Outdoor"],
    submitButtonText: "Request Lighting Demo",
    successMessage: "Demo request submitted! We'll contact you shortly.",
    errorMessage: "Failed to submit demo request. Please try again.",
  },
  offerings: {
    label: "Our Capabilities",
    title: "Comprehensive Lighting Solutions",
    items: [
      {
        icon: Palette,
        title: 'Ambient Uplighting',
        description: 'Create stunning atmosphere with customizable color uplighting that transforms your venue walls, pillars, and architectural features.',
        features: [
          'Color-customizable LED fixtures',
          'DMX programmable for color changes',
          'Wireless operation for clean installation',
          'Battery-powered options available',
        ],
        image: uplightingImg,
        imageHint: 'venue uplighting purple',
      },
      {
        icon: Sparkles,
        title: 'Dance Floor Lighting',
        description: 'Dynamic, music-responsive lighting that creates the perfect dance floor atmosphere and keeps the energy high.',
        features: [
          'Intelligent lighting fixtures',
          'Music-responsive programming',
          'Pattern customization options',
          'Fog/haze enhancement available',
        ],
        image: danceFloorLightingImg,
        imageHint: 'dance floor lights party',
      },
      {
        icon: Lightbulb, 
        title: 'Specialty Effects',
        description: 'Unique lighting effects to add dramatic moments and visual interest to your event.',
        features: [
          'Pin spotting for centerpieces/cake',
          'Gobo projections (monograms/patterns)',
          'Cold sparkler fountains (indoor safe)',
          'Dancing on clouds effect (low fog)',
        ],
        image: pinspotLightingImg,
        imageHint: 'pin spot lighting effect centerpiece',
      },
      {
        icon: SunMoon,
        title: 'Outdoor/Landscape Lighting',
        description: "Extend your event's ambiance to outdoor spaces with elegant and durable outdoor lighting solutions.",
        features: [
          'Weather-resistant fixtures',
          'String light canopies',
          'Tree uplighting effects',
          'Pathway marking and safety',
        ],
        image: outdoorLightingImg,
        imageHint: 'outdoor string lights night',
      },
      {
        icon: Building,
        title: 'Architectural Lighting',
        description: 'Highlight venue features and create dramatic backdrops with targeted architectural lighting.',
        features: [
          'Wall washing techniques',
          'Ceiling textures and patterns',
          'Structure highlighting focus',
          'Color-changing capabilities',
        ],
        image: architecturalLightingImg,
        imageHint: 'building facade lighting',
      },
    ] as LightingOffering[],
  },
  packages: {
    label: "Tailored Solutions",
    title: "Popular Lighting Packages",
    items: [
      {
        name: 'Essential Lighting Package',
        perfectFor: 'Smaller venues & intimate gatherings',
        includes: [
          '10 Uplights (Custom Colors)',
          'Basic Dance Floor Lighting (Sound Active)',
          'Professional Setup & Teardown',
          'Onsite Technician',
        ],
        priceTier: "Standard",
      },
      {
        name: 'Premium Lighting Package',
        perfectFor: 'Medium-sized events & wedding receptions',
        includes: [
          '20 Uplights (Custom Colors, DMX Controlled)',
          'Enhanced Dance Floor Lighting (Intelligent Fixtures)',
          'Custom Color Programming',
          'Choice of 2 Specialty Effects (Pin Spotting, Gobo, String Lights)',
          'Dedicated Lighting Technician',
        ],
         priceTier: "Premium",
      },
      {
        name: 'Ultimate Lighting Experience',
        perfectFor: 'Large venues & luxury events',
        includes: [
          '30+ Uplights (Full Venue Coverage)',
          'Comprehensive Dance Floor Lighting Package',
          'Custom Programmed Lighting Sequences',
          'Choice of 4 Specialty Effects (All options)',
          'Cold Sparkler Fountains (2 units)',
          'Dancing on Clouds Effect',
          'Dedicated Lighting Production Team',
        ],
         priceTier: "Luxury",
      },
    ] as LightingPackage[],
    ctaButtonText: "Get a Custom Quote",
  },
  techSpecs: {
    label: "Quality & Safety",
    title: "Technical Specifications",
    items: [
        {
            icon: Lightbulb,
            title: "Equipment Quality",
            details: [
                "Professional-grade LED fixtures (ADJ, Chauvet DJ, etc.)",
                "DMX-controlled intelligent lighting systems",
                "Redundant backup systems for critical components",
                "Energy-efficient designs"
            ]
        },
        {
            icon: ShieldCheck,
            title: "Safety Standards",
            details: [
                "All equipment UL listed and regularly inspected",
                "Use of flame-retardant materials and cabling",
                "Strict trip-hazard prevention protocols",
                "Certified operators for cold sparkler effects"
            ]
        },
        {
            icon: Zap,
            title: "Power Requirements",
            details: [
                "Battery-operated wireless options for flexibility",
                "Low-power LED technology minimizes draw",
                "Generator options for remote or outdoor locations",
                "Proper electrical load distribution planning"
            ]
        }
    ] as TechSpecItem[]
  },
  gallery: {
    title: "Lighting Gallery",
    description: "See how our lighting transforms events.",
    images: [
        { src: lightingGalleryImg1, alt: 'Elegant wedding uplighting', hint: 'wedding uplighting purple' },
        { src: lightingGalleryImg2, alt: 'Dynamic dance floor lighting', hint: 'dance floor party lights' },
        { src: lightingGalleryImg3, alt: 'Cold sparkler grand entrance', hint: 'cold sparklers entrance' },
        { src: lightingGalleryImg4, alt: 'Outdoor string light canopy', hint: 'string lights canopy night' },
    ] as GalleryImage[]
  },
  benefits: {
    label: "Why Choose Us?",
    title: "Benefits of Professional Lighting",
    items: [
      { icon: CheckCircle, title: 'Dramatic Venue Transformation' },
      { icon: CheckCircle, title: 'Customized Color Schemes' },
      { icon: CheckCircle, title: 'Atmosphere Enhancement for Photos/Video' },
      { icon: CheckCircle, title: 'Professional & Reliable Technicians' },
      { icon: CheckCircle, title: 'Safe & Insured Operation' },
    ] as ClientBenefitItem[],
    description: "Our expert lighting design and execution add a layer of magic and sophistication that elevates the entire event experience for you and your guests."
  },
  cta: {
    title: "Ready to Illuminate Your Event?",
    description: "Let Rice Entertainment design the perfect lighting solution to match your vision and venue. Contact us today to discuss your needs.",
    buttonText: "Get a Lighting Quote",
  }
};
