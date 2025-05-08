// src/components/common/ViboBadge.tsx
"use client";
import { Music } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ViboBadge() {
  // Generate random translate values for confetti pieces
  const pieces = Array.from({ length: 4 }).map(() => ({
    tx: Math.random() * 40 - 20, // Random horizontal translation (-20px to 20px)
    ty: Math.random() * -30 - 10, // Random upward vertical translation (-10px to -40px)
  }));

  return (
    <div className="vibo-badge relative inline-flex items-center gap-1.5 rounded-full bg-indigo-100/50 dark:bg-indigo-900/30 px-3 py-1 text-xs font-medium cursor-pointer group transform transition-transform hover:scale-105 active:scale-95"
         > {/* Removed style={{ transform: 'translateY(4px)' }} */}
      <Music className="h-3 w-3 text-primary" />
      <span className="rainbow-shimmer-text font-semibold">VIBO</span>

      {/* CSS Confetti Pieces */}
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
        className="confetti-piece confetti-piece-4" // Using pseudo-element rule implicitly
        style={{ '--tx': pieces[3].tx, '--ty': pieces[3].ty, background: 'linear-gradient(45deg, #34D399, #A5B4FC)' } as React.CSSProperties} // Different color
      />
    </div>
  );
}
