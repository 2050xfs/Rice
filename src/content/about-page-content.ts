// src/content/about-page-content.ts
import type { LucideIcon } from 'lucide-react';
import { Users, Target, Award, Handshake } from 'lucide-react';
import {
  teamMember1Image, teamMember2Image, companyTimelineImage
} from '@/lib/image-urls';

// New image URL for the About page hero section
const aboutHeroImageNew = "https://storage.googleapis.com/msgsndr/iAR0shcsJ7fDRLUy9mAx/media/681c3002e17a08200b292ebf.jpeg";


export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  imageHint: string;
}

export interface CompanyValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const aboutPageContent = {
  hero: {
    label: "Who We Are",
    title: "Meet the Visionary Behind Rice Entertainment",
    description: "Passionate about creating unforgettable experiences through music, entertainment, and meticulous event planning.",
    image: aboutHeroImageNew,
    imageAlt: "Visionary leader planning an event",
    imageHint: "leader planning event",
    ctaButtonText: "Book Your Event",
  },
  story: {
    label: "Our Journey",
    title: "A Personal Approach to Event Entertainment",
    paragraph1: "Driven by a passion for creating unforgettable moments, Brandon founded <strong class=\"text-gradient-highlight\">Rice Entertainment</strong> to bring a personal touch to the world of event DJing. Frustrated by the impersonal approach of larger, multi-DJ companies, he envisioned a service that prioritized individual client needs and visions.",
    paragraph2: "With years of experience packing dance floors across Northern California and beyond, Brandon brings an infectious energy and unwavering professionalism to every event. He understands that each celebration is unique, and he is dedicated to working closely with clients to craft a musical experience that perfectly matches their vision.",
    image: companyTimelineImage,
    imageAlt: "Collage of past Rice Entertainment events or team milestones",
    imageHint: "event collage timeline",
  },
  team: {
    label: "Our Experts",
    title: "Meet the Faces Behind the Fun",
    members: [
      {
        name: 'Alex "DJ RICE" Nguyen',
        role: 'Founder & Lead DJ/MC',
        bio: 'With over a decade of experience, Alex founded Rice Entertainment to bring a new level of professionalism and fun to events. His passion for music and creating unforgettable moments is the driving force behind the company.',
        image: teamMember1Image,
        imageHint: "male portrait professional",
      },
      {
        name: 'Jamie "Nova" Lee',
        role: 'Lead Photo Booth Technician & DJ',
        bio: 'Jamie is a tech enthusiast with an eye for detail. She ensures every photo booth experience is seamless and manages our cutting-edge equipment. Also a talented DJ, she brings versatility to the team.',
        image: teamMember2Image,
        imageHint: "female portrait creative",
      },
    ] as TeamMember[],
  },
  values: {
    label: "Our Philosophy",
    title: "Driven by Our Core Values",
    items: [
      { icon: Target, title: 'Client Focus', description: 'Your vision is our priority. We listen, collaborate, and customize to make your event uniquely yours.' },
      { icon: Award, title: 'Quality & Professionalism', description: 'From top-tier equipment to experienced staff, we deliver excellence in every aspect of our service.' },
      { icon: Handshake, title: 'Integrity & Reliability', description: 'We believe in transparent communication and dependable service you can count on.' },
      { icon: Users, title: 'Fun & Engagement', description: 'Our goal is to create joyful, interactive experiences that leave lasting memories for you and your guests.' },
    ] as CompanyValue[],
  },
  cta: {
    title: "Let's Make Your Next Event Unforgettable",
    description: "Ready to partner with a team that's passionate about making your celebration a success? Get in touch with Rice Entertainment today.",
    button1Text: "Contact Us",
    button1Link: "/contact",
    button2Text: "Explore Our Services",
    button2Link: "/services/dj-services", // Example link, adjust as needed
  }
};
