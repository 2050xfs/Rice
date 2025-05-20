// src/components/common/ViboBadge.tsx
"use client";
import { Music } from 'lucide-react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import LottieAnimation from './LottieAnimation';
import * as LottieAssets from '@/assets/lottie';

interface ViboBadgeProps {
  className?: string;
  onClick?: () => void;
}

export default function ViboBadge({ className, onClick }: ViboBadgeProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  // Load confetti animation data
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    setIsLoading(true);
    LottieAssets.confetti()
      .then((data: any) => {
        setAnimationData(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        console.error('Failed to load confetti animation:', err);
        setIsLoading(false);
      });
  }, [prefersReducedMotion]);
  
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
    } catch (error) {
      console.error('Error scrolling to VIBO section:', error);
    }
  }, [pathname, router]);

  // Handle touch/mouse interactions
  const handlePressStart = () => setIsPressed(true);
  const handlePressEnd = () => setIsPressed(false);
  
  // Generate optimized confetti pieces with more mobile-friendly animations
  const pieces = useMemo(() => Array.from({ length: 4 }).map(() => ({
    tx: Math.random() * 30 - 15, // Reduced range for better mobile performance (-15px to 15px)
    ty: Math.random() * -25 - 10, // Reduced range for better mobile performance (-10px to -35px)
    delay: Math.random() * 0.2, // Add slight delay variation for more natural effect
    scale: 0.8 + Math.random() * 0.4, // Vary the size slightly
  })), []); // Use useMemo to calculate once per component instance

  return (
    <button 
      className={cn(
        "vibo-badge relative inline-flex items-center gap-2 rounded-full",
        "bg-indigo-100/50 dark:bg-indigo-900/30",
        "px-4 py-2 sm:px-3 sm:py-1", // Larger touch target on mobile
        "text-sm sm:text-xs font-medium",
        "cursor-pointer group",
        "transform transition-all duration-300",
        "hover:scale-105 hover:bg-indigo-100 dark:hover:bg-indigo-900/40",
        "active:scale-95",
        isPressed ? "scale-95" : "",
        className
      )}
      onClick={onClick || scrollToViboSection}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      aria-label="Learn more about VIBO App"
      role="button"
    >
      <Music className="h-4 w-4 sm:h-3 sm:w-3 text-primary" />
      <span className="rainbow-shimmer-text font-semibold tracking-wide">VIBO</span>

      {/* Lottie Confetti Animation */}
      {!prefersReducedMotion && animationData && !isLoading && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <LottieAnimation
            animationData={animationData}
            autoplay={true}
            loop={true}
            className="absolute inset-0"
            playOnVisible={true}
            playOnHover={false}
          />
        </div>
      )}
      
      {/* Fallback CSS confetti for when Lottie is loading or not supported */}
      {(prefersReducedMotion || isLoading || !animationData) && pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "confetti-piece",
            `confetti-piece-${index + 1}`,
            "will-change-transform"
          )}
          style={{
            '--tx': piece.tx,
            '--ty': piece.ty,
            '--delay': piece.delay,
            '--scale': piece.scale,
            background: index % 2 === 0 
              ? 'linear-gradient(45deg, #FBBF24, #F472B6)'
              : 'linear-gradient(45deg, #34D399, #A5B4FC)',
            transform: `scale(${piece.scale})`,
            animationDelay: `${piece.delay}s`
          } as React.CSSProperties}
        />
      ))}
    </button>
  );
}
