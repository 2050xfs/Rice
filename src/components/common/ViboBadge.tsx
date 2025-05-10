// src/components/common/ViboBadge.tsx
"use client";
import { Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

export default function ViboBadge() {
  
  const scrollToViboSection = () => {
    const viboSection = document.getElementById('vibo-app-highlight-section');
    if (viboSection) {
      viboSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback or console log if the section isn't found,
      // especially if ViboBadge is used on pages without ViboAppHighlight.
      // For now, we'll assume it's primarily used where the section exists.
      console.warn("ViboAppHighlight section not found for scrolling.");
    }
  };
  
  // Generate random translate values for confetti pieces - updated for 4 pieces
  const pieces = React.useMemo(() => Array.from({ length: 4 }).map(() => ({
    tx: Math.random() * 40 - 20, // Random horizontal translation (-20px to 20px)
    ty: Math.random() * -30 - 10, // Random upward vertical translation (-10px to -40px)
  })), []); // Use useMemo to calculate once per component instance

  return (
    <div 
      className="vibo-badge relative inline-flex items-center gap-1.5 rounded-full bg-indigo-100/50 dark:bg-indigo-900/30 px-3 py-1 text-xs font-medium cursor-pointer group transform transition-transform hover:scale-105 active:scale-95"
      onClick={scrollToViboSection}
      title="Learn more about VIBO App"
    >
      <Music className="h-3 w-3 text-primary" />
      <span className="rainbow-shimmer-text font-semibold">VIBO</span>

      {/* CSS Confetti Pieces - referencing generated styles */}
      <div
        className="confetti-piece confetti-piece-1"
        style={{ '--tx': pieces[0].tx, '--ty': pieces[0].ty } as React.CSSProperties}
      />
      <div
        className="confetti-piece confetti-piece-2"
        style={{ '--tx': pieces[1].tx, '--ty': pieces[1].ty, background: 'linear-gradient(45deg, #FBBF24, #F472B6)' } as React.CSSProperties} // Different color
      />
       <div
        className="confetti-piece confetti-piece-3"
        style={{ '--tx': pieces[2].tx, '--ty': pieces[2].ty } as React.CSSProperties}
      />
        <div
        className="confetti-piece confetti-piece-4" // Added 4th piece
        style={{ '--tx': pieces[3].tx, '--ty': pieces[3].ty, background: 'linear-gradient(45deg, #34D399, #A5B4FC)' } as React.CSSProperties} // Different color
      />
      {/* ::before and ::after confetti are handled purely in CSS */}
    </div>
  );
}
