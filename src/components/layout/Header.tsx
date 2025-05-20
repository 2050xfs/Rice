// components/layout/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { ElementType } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { useBookingModal } from '@/context/BookingModalContext';
import { brandLogoUrl } from '@/lib/image-urls';
import { navItems, type NavItem } from '@/config/nav';
import ViboBadge from '@/components/common/ViboBadge';
import { usePathname, useRouter } from 'next/navigation';

const SiteLogo = () => (
  <Link href="/" className="flex items-center shrink-0 mr-auto">
    <div className="logo-container w-[200px] sm:w-[280px] h-[66px] sm:h-[93px]"> {/* Responsive sizing */}
      <Image
        src={brandLogoUrl}
        alt="Rice Entertainment Logo"
        data-ai-hint="brand logo main"
        layout="fill"
        className="logo-image"
        priority
      />
    </div>
  </Link>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useBookingModal();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToViboSection = useCallback(() => {
    try {
      const targetId = 'vibo-app-highlight-section';
      if (pathname === '/') {
        const viboSection = document.getElementById(targetId);
        if (viboSection) {
          viboSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.warn(`${targetId} section not found for scrolling.`);
        }
      } else {
        // Redirect to home page with hash to trigger scroll on home page
        router.push(`/#${targetId}`);
      }
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error scrolling to VIBO section:', error);
    }
  }, [pathname, router, isMobileMenuOpen]);


  const NavLink = ({ item }: { item: NavItem }) => {
    if (item.subItems) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="text-base font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 flex items-center gap-2 whitespace-nowrap shadow-none focus:ring-0 focus:ring-offset-0"
            >
              {item.name}
              {/* <ChevronDown className="h-4 w-4 shrink-0" /> Removed ChevronDown */}
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
      <Link href={item.href || '#'} className="flex items-center gap-1 text-base font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary px-3 py-2 whitespace-nowrap">
        {item.name}
      </Link>
    );
  };

  const MobileNavLink = ({ item }: { item: NavItem }) => {
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
                <SheetClose asChild key={subItem.name}>
                  <Link
                    href={subItem.href || '#'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center py-2 px-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    {subItem.icon && <subItem.icon className="h-4 w-4 mr-2 text-gray-500" />}
                    {subItem.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <SheetClose asChild>
        <Link
          href={item.href || '#'}
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center py-3 px-4 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        >
          {item.icon && <item.icon className="h-5 w-5 mr-3 text-primary" />}
          {item.name}
        </Link>
      </SheetClose>
    );
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <SiteLogo />

          <nav className="hidden lg:flex items-center space-x-2 mx-auto">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            <div className="hidden lg:flex items-center gap-2">
               <ViboBadge onClick={scrollToViboSection} />
              <Button onClick={openModal} className="button-primary-styles shrink-0">
                Book Now
              </Button>
            </div>

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
                    </div>
                    <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                      {navItems.map((item) => (
                        <MobileNavLink key={item.name} item={item} />
                      ))}
                      <div className="pt-4 flex flex-col items-center gap-2">
                         <ViboBadge onClick={scrollToViboSection} />
                        <Button onClick={() => { openModal(); setIsMobileMenuOpen(false); }} className="button-primary-styles w-full">
                          Book Now
                        </Button>
                      </div>
                    </nav>
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
