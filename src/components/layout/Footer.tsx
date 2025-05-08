// components/layout/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import { brandLogoUrl } from '@/lib/image-urls';

const footerNavs = [
  {
    label: "Services",
    items: [
      { href: '/services/photo-booths', name: 'Photo Booths' },
      { href: '/services/dj-services', name: 'DJ Services' },
      { href: '/services/event-planning', name: 'Event Planning' },
    ],
  },
  {
    label: "Company",
    items: [
      { href: '/about', name: 'About Us' },
      { href: '/vibo-app', name: 'VIBO App' },
      { href: '/testimonials', name: 'Testimonials' },
      { href: '/faq', name: 'FAQ' },
    ],
  },
  {
    label: "Legal",
    items: [
      { href: '/privacy-policy', name: 'Privacy Policy' },
      { href: '/terms-of-service', name: 'Terms of Service' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Instagram, href: '#', name: 'Instagram' },
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Youtube, href: '#', name: 'YouTube' },
];

const SiteLogoSmall = () => (
  <Link href="/" className="flex items-center">
     <Image 
        src={brandLogoUrl} 
        alt="Rice Entertainment Logo Small" 
        data-ai-hint="brand logo small"
        width={32} 
        height={32} 
      />
  </Link>
);


export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <SiteLogoSmall />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Crafting unforgettable moments with premier DJ services, innovative photo booths, and expert event planning.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <Link key={item.name} href={item.href} className="text-gray-400 hover:text-primary dark:hover:text-indigo-400">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{footerNavs[0].label}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavs[0].items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-indigo-400">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{footerNavs[1].label}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavs[1].items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-indigo-400">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{footerNavs[2].label}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavs[2].items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-indigo-400">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Contact Us</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="mailto:info@riceentertainment.com" className="flex items-center text-sm leading-6 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-indigo-400">
                      <Mail className="h-5 w-5 mr-2" /> info@riceentertainment.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+1234567890" className="flex items-center text-sm leading-6 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-indigo-400">
                      <Phone className="h-5 w-5 mr-2" /> (123) 456-7890
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 dark:border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Rice Entertainment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
