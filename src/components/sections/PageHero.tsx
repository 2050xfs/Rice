// src/components/sections/PageHero.tsx
"use client";

import Image from 'next/image';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeroFeature {
  text: string;
  icon: LucideIcon;
}

export interface HeroTitlePart {
  text: string;
  highlight?: boolean;
}

export interface PageHeroProps {
  badgeText?: string;
  titleParts: HeroTitlePart[];
  subtitle: string;
  features?: HeroFeature[];
  primaryCta: {
    text: string;
    action: (() => void) | LinkProps['href']; 
  };
  secondaryCta?: {
    text: string;
    action: (() => void) | LinkProps['href']; 
  };
  imageSrc: string;
  imageAlt: string;
  imageHint?: string;
}

export default function PageHero({
  badgeText,
  titleParts,
  subtitle,
  features,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  imageHint,
}: PageHeroProps) {
  const renderCtaButton = (
    cta: { text: string; action: (() => void) | LinkProps['href'] },
    variant: 'default' | 'outline',
    isPrimary: boolean
  ) => {
    const commonClasses = cn(
      "w-full sm:w-auto",
      isPrimary ? "button-primary-styles" : "button-secondary-styles"
    );

    if (typeof cta.action === 'string') {
      return (
        <Link href={cta.action} passHref legacyBehavior>
          <Button size="lg" variant={variant} className={commonClasses}>
            {cta.text}
          </Button>
        </Link>
      );
    }
    return (
      <Button size="lg" variant={variant} onClick={cta.action} className={commonClasses}>
        {cta.text}
      </Button>
    );
  };

  return (
    <div className="relative bg-background text-foreground pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-x-8 px-4 sm:px-6 lg:px-8">
        {/* Text Content Area (Left Column) */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center sm:text-left md:max-w-2xl md:mx-auto lg:mx-0 lg:text-left z-20">
          <div> {/* Inner div for content grouping */}
            {badgeText && (
              <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary dark:bg-primary/20 dark:text-indigo-300 border-none px-4 py-1.5 text-sm font-semibold rounded-full">
                {badgeText}
              </Badge>
            )}
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              {titleParts.map((part, index) => (
                <span
                  key={index}
                  className={cn(
                    part.highlight ? "text-primary dark:text-indigo-400" : "text-gray-900 dark:text-white",
                    "block xl:inline" // Ensure text flows naturally and wraps if needed
                  )}
                >
                  {part.text}{' '} {/* Add space for natural word separation only if not last part or part.highlight */}
                </span>
              ))}
            </h1>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
              {subtitle}
            </p>
            {features && features.length > 0 && (
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-3.5 py-2 rounded-full text-sm font-medium bg-indigo-50 dark:bg-gray-800 text-indigo-700 dark:text-indigo-300"
                  >
                    <feature.icon className="h-5 w-5 mr-2 opacity-80" />
                    {feature.text}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              {renderCtaButton(primaryCta, 'default', true)}
              {secondaryCta && renderCtaButton(secondaryCta, 'outline', false)}
            </div>
          </div>
        </div>

        {/* Image Area (Right Column) */}
        <div className="mt-12 lg:mt-0 lg:col-span-6 relative"> {/* Column will stretch due to lg:items-stretch */}
          {/* Gradient: Fades from left (background color) to transparent, covering the left part of the image column */}
          <div
            className="hidden lg:block absolute inset-y-0 left-0 w-2/5 md:w-1/3 bg-gradient-to-r from-background to-transparent z-10"
            aria-hidden="true"
          />
          
          {/* Image Container: Takes full height of its column */}
          <div className="relative w-full h-full rounded-lg overflow-hidden">
             {/* Mobile-specific gradient (for when image is centered below text) */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-background to-transparent lg:hidden z-20" aria-hidden="true" />
            <Image
                src={imageSrc}
                alt={imageAlt}
                data-ai-hint={imageHint}
                layout="fill"
                objectFit="cover"
                className="z-0" // Ensure image is behind the desktop gradient
                priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
