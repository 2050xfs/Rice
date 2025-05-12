// src/config/nav.ts
import type { ElementType } from 'react';
import { Disc3, Camera, Home, Users, Phone, Lightbulb } from 'lucide-react';

export interface NavItem {
  name: string;
  href?: string;
  icon?: ElementType; // For mobile/dropdown if needed
  subItems?: NavItem[];
}

export const navItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Users }, // Added About link
  {
    name: 'Services',
    icon: Disc3, // Example, can be different for parent
    subItems: [
      { name: 'Photo Booths', href: '/services/photo-booths', icon: Camera },
      { name: 'DJ Services', href: '/services/dj-services', icon: Disc3 },
      { name: 'Lighting', href: '/services/lighting', icon: Lightbulb }, // Added Lighting
    ],
  },
  {
    name: 'Events',
    icon: Users, // Example, can be different for parent
    subItems: [
      { name: 'Weddings', href: '/events/weddings' },
      { name: 'Corporate', href: '/events/corporate' },
      { name: 'Private Parties', href: '/events/private-parties' },
    ],
  },
  { name: 'Contact', href: '/contact', icon: Phone },
];
