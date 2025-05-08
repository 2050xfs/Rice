// components/layout/Footer.tsx
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext';
import { brandLogoUrl } from '@/lib/image-urls';
import { footerLinkSections, footerLegalLinks } from '@/config/footerNav';

const socialIconsLinks = [
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/ricentertainment?igsh=NTc4MTIwNjQ2YQ==', name: 'Instagram' },
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Youtube, href: '#', name: 'YouTube' },
];

export default function Footer() {
  const { openModal } = useBookingModal();

  return (
    <footer className="bg-brand-navy text-white" aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 sm:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Section - Navigation (8 columns) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerLinkSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors text-sm"
                      >
                        <span className="text-lg leading-none">{link.icon}</span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Section - Instagram & CTA (4 columns) */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-2">Follow Us</h3>
              <Link 
                href="https://www.instagram.com/ricentertainment?igsh=NTc4MTIwNjQ2YQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 text-sm"
              >
                <Instagram className="w-5 h-5" />
                @ricentertainment
              </Link>
            </div>
            <div className="h-[275px] bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              {/* Instagram Embed Placeholder - Replace with actual embed or component if available */}
              {/* The iframe can be problematic for responsiveness and might require a library or specific styling */}
               <iframe
                src="https://www.instagram.com/ricentertainment/embed" 
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                title="Instagram Feed"
                className="bg-gray-800" // Ensure iframe bg matches if content is slow to load
              />
            </div>
            <Button 
              onClick={openModal}
              className="w-full button-primary-styles bg-indigo-500 hover:bg-indigo-400 text-white py-3"
            >
              Book Your Event Now
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Link href="/" className="shrink-0">
               <Image 
                src={brandLogoUrl} 
                alt="Rice Entertainment Logo Inverted" 
                width={140} // Adjusted for better visibility
                height={46} // Adjusted for aspect ratio based on 140 width
                className="h-10 w-auto filter invert brightness-150 contrast-150" // Adjusted filter for better white on dark
                data-ai-hint="brand logo inverted"
              />
            </Link>
            <p className="text-xs text-gray-400 max-w-xs sm:max-w-none">
              Creating unforgettable moments through exceptional entertainment services.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex space-x-5">
              {socialIconsLinks.map((item) => (
                <Link key={item.name} href={item.href} className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-400">
              {footerLegalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
         <div className="max-w-7xl mx-auto px-6 pb-8 text-center md:text-right">
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Rice Entertainment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
