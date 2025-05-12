// src/components/common/Tooltip.tsx
"use client";

import React, { ReactNode, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: ReactNode;
  className?: string;
}

export default function Tooltip({ content, children, className }: TooltipProps) {
  // Generate a random delay for the sparkle animation if needed
  const randomDelay = useMemo(() => Math.random() * 3, []);
  
  return (
    <span 
      className={cn(
        "tooltip-container group", // Added 'group' here
        "mx-1 align-middle",
        className
      )}
      aria-label={content}
      role="tooltip"
      style={{ '--delay': randomDelay } as React.CSSProperties}
    >
      {children}
      
      {/* Tooltip bubble */}
      <span className={cn("tooltip-bubble", "group-hover:opacity-100")}>
        {content}
        {/* Tooltip arrow */}
        <span className="tooltip-arrow" aria-hidden="true" />
      </span>
    </span>
  );
}
