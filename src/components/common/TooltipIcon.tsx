// src/components/common/TooltipIcon.tsx
"use client";

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import Tooltip from './Tooltip';

interface TooltipIconProps {
  icon: LucideIcon;
  tooltip: string;
  className?: string;
}

export default function TooltipIcon({ icon: Icon, tooltip, className }: TooltipIconProps) {
  // Generate a random delay for the sparkle animation
  const randomDelay = useMemo(() => Math.random() * 3, []);
  
  const iconContainer = (
    <span 
      className={cn(
        // Mobile styles (default)
        "w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm",
        // Desktop styles (sm and above)
        "sm:w-9 sm:h-9 sm:bg-white sm:dark:bg-gray-800 sm:shadow-sm",
        "transition-all duration-300 hover:scale-110",
        "inline-flex items-center justify-center",
        className
      )}
      style={{ '--delay': randomDelay } as React.CSSProperties}
    >
      {/* Confetti animation elements */}
      <span className="absolute w-1 h-1 rounded-full opacity-0 bg-gradient-to-r from-brand-indigo-400 to-brand-indigo-300 animate-sparkle" 
            style={{ top: '10%', left: '10%', animationDelay: `${randomDelay}s` }}></span>
      <span className="absolute w-1 h-1 rounded-full opacity-0 bg-gradient-to-r from-brand-indigo-500 to-brand-indigo-400 animate-sparkle" 
            style={{ bottom: '10%', right: '10%', animationDelay: `${randomDelay + 0.2}s` }}></span>
      
      <Icon className="w-5 h-5 sm:w-5 sm:h-5 text-white sm:text-brand-indigo-600 sm:dark:text-brand-indigo-600 drop-shadow-utility transition-transform duration-150" />
    </span>
  );
  
  return (
    <Tooltip content={tooltip}>
      {iconContainer}
    </Tooltip>
  );
}
