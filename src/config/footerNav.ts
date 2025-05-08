// src/config/footerNav.ts

export interface FooterLinkItem {
  name: string;
  href: string;
  icon: string; // Emoji
  isExternal?: boolean;
}

export interface FooterLinkSection {
  title: string;
  items: FooterLinkItem[];
}

// Based on the old footer structure provided by the user
export const footerLinkSections: FooterLinkSection[] = [
  {
    title: "Company",
    items: [
      { name: 'About Us', href: '/about', icon: '🏠' },
    ],
  },
  {
    title: "Services",
    items: [
      { name: 'DJ & Emcee Services', href: '/services/dj-services', icon: '🎵' },
      { name: 'Photo Booths', href: '/services/photo-booths', icon: '📷' },
      // { name: 'Lighting', href: '/services/lighting', icon: '💡' }, // Kept from old, can be uncommented if page exists
      // { name: 'Event Planning', href: '/services/event-planning', icon: '📋' }, // Kept from old
    ],
  },
  {
    title: "Events",
    items: [
      { name: 'Weddings', href: '/events/weddings', icon: '💍' },
      { name: 'Corporate Events', href: '/events/corporate', icon: '🏢' },
      { name: 'Private Parties', href: '/events/private-parties', icon: '🎉' },
    ],
  },
  {
    title: "Support",
    items: [
      { name: 'Contact Us', href: '/contact', icon: '📞'},
      { name: 'WeddingWire Reviews', href: 'https://www.weddingwire.com/biz/rice-entertainment/1a65b13516e02ef4.html', icon: '📝', isExternal: true },
      { name: 'Zola Reviews', href: 'https://www.zola.com/wedding-vendors/wedding-bands-djs/rice-entertainment', icon: '📝', isExternal: true },
      { name: 'The Knot Reviews', href: 'https://www.theknot.com/marketplace/rice-entertainment-hercules-ca-2062592', icon: '📝', isExternal: true },
    ],
  },
];

export const footerLegalLinks: Omit<FooterLinkItem, 'icon' | 'isExternal'>[] = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Client Portal', href: '#' }, // Placeholder, update href when page exists
];
