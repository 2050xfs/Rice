// components/layout/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Briefcase, CalendarDays, Disc3, Camera, Users, Star, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { useBookingModal } from '@/context/BookingModalContext';

interface NavItem {
  name: string;
  href?: string;
  icon?: React.ElementType;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    icon: Briefcase,
    subItems: [
      { name: 'Photo Booths', href: '/services/photo-booths', icon: Camera },
      { name: 'DJ Services', href: '/services/dj-services', icon: Disc3 },
    ],
  },
  {
    name: 'Events',
    icon: CalendarDays,
    subItems: [
      { name: 'Weddings', href: '/events/weddings' },
      { name: 'Corporate', href: '/events/corporate' },
      { name: 'Private Parties', href: '/events/private-parties' },
    ],
  },
  { name: 'VIBO App', href: '/vibo-app', icon: Sparkles },
  { name: 'Testimonials', href: '/testimonials', icon: Star },
  { name: 'Contact', href: '/contact', icon: MessageSquare },
];

const SiteLogo = () => (
  <Link href="/" className="flex items-center gap-2">
    {/* Placeholder for Rice Entertainment Logo. Replace with actual SVG or Image */}
    <svg width="32" height="32" viewBox="0 0 100 100" fill="currentColor" className="text-primary">
      <path d="M50 5C25.167 5 5 25.167 5 50s20.167 45 45 45 45-20.167 45-45S74.833 5 50 5zm0 12.5c17.938 0 32.5 14.563 32.5 32.5S67.938 82.5 50 82.5 17.5 67.938 17.5 50 32.063 17.5 50 17.5zm-7.812 18.75l-4.688 12.5 12.5 4.688 4.688-12.5-12.5-4.688zm15.624 0l-4.688 12.5 12.5 4.688 4.688-12.5-12.5-4.688zM50 53.125c-4.327 0-7.813 3.486-7.813 7.812s3.486 7.813 7.813 7.813 7.813-3.486 7.813-7.813-3.486-7.812-7.813-7.812z"/>
    </svg>
    <span className="text-2xl font-bold text-gray-900 dark:text-white">Rice<span className="text-primary">Ent</span></span>
  </Link>
);


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useBookingModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ item }: { item: NavItem }) => {
    if (item.subItems) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 text-base font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2">
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              {item.name}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ring-1 ring-black/5">
            {item.subItems.map((subItem) => (
              <DropdownMenuItem key={subItem.name} asChild>
                <Link href={subItem.href || '#'} className="flex items-center gap-2">
                  {subItem.icon && <subItem.icon className="h-4 w-4 text-gray-500" />}
                  {subItem.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <Link href={item.href || '#'} className="flex items-center gap-1 text-base font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2">
        {item.icon && <item.icon className="h-4 w-4 mr-1" />}
        {item.name}
      </Link>
    );
  };
  
  const MobileNavLink = ({ item, closeMenu }: { item: NavItem, closeMenu: () => void }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    if (item.subItems) {
      return (
        <div>
          <button 
            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
            className="flex items-center justify-between w-full py-3 px-4 text-left text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <span className="flex items-center">
              {item.icon && <item.icon className="h-5 w-5 mr-3 text-primary" />}
              {item.name}
            </span>
            <ChevronDown className={`h-5 w-5 transition-transform ${isSubMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          {isSubMenuOpen && (
            <div className="pl-8">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.href || '#'}
                  onClick={closeMenu}
                  className="flex items-center py-2 px-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  {subItem.icon && <subItem.icon className="h-4 w-4 mr-2 text-gray-500" />}
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <Link
        href={item.href || '#'}
        onClick={closeMenu}
        className="flex items-center py-3 px-4 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
      >
        {item.icon && <item.icon className="h-5 w-5 mr-3 text-primary" />}
        {item.name}
      </Link>
    );
  };


  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <SiteLogo />
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button onClick={openModal} className="button-primary-styles hidden lg:inline-flex">
              Book Now
            </Button>
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs bg-white dark:bg-gray-900 p-0">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                      <SiteLogo />
                      <SheetTrigger asChild>
                         <Button variant="ghost" size="icon" aria-label="Close menu">
                           <X className="h-6 w-6 text-gray-800 dark:text-white" />
                         </Button>
                      </SheetTrigger>
                    </div>
                    <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                      {navItems.map((item) => (
                        <MobileNavLink key={item.name} item={item} closeMenu={() => setIsMobileMenuOpen(false)} />
                      ))}
                    </nav>
                    <div className="p-4 border-t dark:border-gray-700">
                       <Button onClick={() => { openModal(); setIsMobileMenuOpen(false); }} className="button-primary-styles w-full">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
