// src/components/sections/PageHero.tsx
"use client";

import Image from 'next/image';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import TooltipIcon from '@/components/common/TooltipIcon';

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
    action: (() => void) | string; 
  };
  secondaryCta?: {
    text: string;
    action: (() => void) | string; 
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
    cta: { text: string; action: (() => void) | string },
    variant: 'default' | 'outline',
    isPrimary: boolean
  ) => {
    const commonClasses = cn(
      "w-full sm:w-auto",
      isPrimary ? "button-primary-styles" : "button-secondary-styles"
    );

    const ButtonComponent = (
      <Button 
        size="lg" 
        variant={variant} 
        className={commonClasses}
        onClick={typeof cta.action === 'function' ? cta.action : undefined}
      >
        {cta.text}
      </Button>
    );

    if (typeof cta.action === 'string') {
      return (
        <Link href={cta.action}>
          {ButtonComponent}
        </Link>
      );
    }

    return ButtonComponent;
  };

  // Function to render subtitle with tooltip icons in a separate row
  const renderSubtitleWithTooltips = () => {
    if (!features || features.length === 0) {
      return <p className="mt-4 text-base text-white sm:mt-5 md:mt-5 sm:text-lg md:text-xl font-medium drop-shadow-utility">{subtitle}</p>;
    }

    return (
      <div className="mt-4 sm:mt-5 md:mt-5 space-y-2">
        <p className="text-base text-white sm:text-lg md:text-xl font-medium drop-shadow-utility">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start my-4">
          {features.map((feature, index) => (
            <TooltipIcon 
              key={index}
              icon={feature.icon}
              tooltip={feature.text}
              className="tooltip-icon-highlight"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-background text-foreground pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-0">
      {/* Full-bleed background image for mobile and tablet */}
      <div className="absolute inset-0 w-full h-full lg:hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          data-ai-hint={imageHint}
          fill
          className="object-cover object-center scale-105" // Added scale to prevent white edges during iOS bounce
          sizes="100vw"
          priority
          quality={90} // Increased quality for hero image
        />
      </div>

      <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-x-8 px-4 sm:px-6 lg:px-8">
        {/* Text Content Area with lighter frosted glass effect for mobile and tablet */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center sm:text-left md:max-w-2xl md:mx-auto lg:mx-0 lg:text-left relative z-20 py-8">
          {/* Frosted glass container with charcoal-gray overlay for mobile and tablet */}
          <div className="lg:hidden backdrop-blur-2xl bg-black/50 rounded-2xl p-6 sm:p-8 pb-8 border border-white/30 dark:border-gray-700/40 shadow-lg mb-6">
            {badgeText && (
              <Badge variant="secondary" className="mb-5 bg-primary text-white pill-padding text-sm font-semibold rounded-full drop-shadow-utility">
                {badgeText}
              </Badge>
            )}
            <h1 className="hero-heading text-white drop-shadow-utility">
              {titleParts.map((part, index) => (
                <span
                  key={index}
                  className={cn(
                    part.highlight ? "text-primary dark:text-indigo-400" : "",
                    "block xl:inline" // Ensure text flows naturally and wraps if needed
                  )}
                >
                  {part.text}{' '} {/* Add space for natural word separation only if not last part or part.highlight */}
                </span>
              ))}
            </h1>
            
            {/* Subtitle with inline tooltip icons */}
            {renderSubtitleWithTooltips()}
          </div>

          {/* Desktop content (no frosted glass) */}
          <div className="hidden lg:block">
            {badgeText && (
              <Badge variant="secondary" className="mb-3 bg-primary text-white pill-padding text-sm font-semibold rounded-full drop-shadow-utility">
                {badgeText}
              </Badge>
            )}
            <h1 className="hero-heading">
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
            <div className="mt-3 sm:mt-5 md:mt-5">
              <p className="text-base text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl">
                {subtitle}
              </p>
              {features && features.length > 0 && (
                <div className="flex flex-wrap gap-4 items-center justify-start mt-4 mb-2">
                  {features.map((feature, index) => (
                    <TooltipIcon 
                      key={index}
                      icon={feature.icon}
                      tooltip={feature.text}
                      className="desktop-tooltip-icon"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons - Simplified layout with reduced spacing */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
            {renderCtaButton(primaryCta, 'default', true)}
            {secondaryCta && renderCtaButton(secondaryCta, 'outline', false)}
          </div>
        </div>

        {/* Image Area (Right Column) - Desktop Only */}
        <div className="hidden lg:block lg:mt-0 lg:col-span-6 relative">
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-background to-transparent z-10" aria-hidden="true" />
          <div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              data-ai-hint={imageHint}
              fill
              className="object-cover object-right-top z-0"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
