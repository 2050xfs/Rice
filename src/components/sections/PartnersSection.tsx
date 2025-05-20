"use client";

import Image from 'next/image';
import { partnersSectionContent } from '@/content/partners-section-content';

export default function PartnersSection() {
  return (
    <section className="section-spacing bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
          <h2 className="h2-style text-gray-900 dark:text-white">
            {partnersSectionContent.title}
          </h2>
        </div>

        {/* Partners Logo Grid - Responsive for all screen sizes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
          {partnersSectionContent.partners.map((partner, index) => (
            <div 
              key={index}
              className="w-full flex items-center justify-center p-4 transition-all duration-300 hover:scale-105"
            >
              <div className="relative w-full h-16 sm:h-20 md:h-24">
                <Image
                  src={partner.imageUrl}
                  alt={partner.name}
                  fill
                  className="object-contain filter dark:invert-[0.15] dark:brightness-90"
                  sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 200px"
                  priority={index < 5} // Load first 5 images with priority
                  unoptimized // Use this for external images
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
