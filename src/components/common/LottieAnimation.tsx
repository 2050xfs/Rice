"use client";

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="lottie-placeholder animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md" style={{ width: '100%', height: '100%' }} />
});

interface LottieAnimationProps {
  animationData: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  playOnHover?: boolean;
  playOnVisible?: boolean;
  width?: number | string;
  height?: number | string;
  speed?: number;
  style?: React.CSSProperties;
  darkMode?: boolean;
  lowDataMode?: boolean;
  onComplete?: () => void;
  onTap?: () => void;
}

export default function LottieAnimation({
  animationData,
  className,
  loop = true,
  autoplay = true,
  playOnHover = false,
  playOnVisible = true, // Default to true for battery optimization
  width,
  height,
  speed = 1,
  style,
  darkMode = false,
  lowDataMode = false,
  onComplete,
  onTap,
}: LottieAnimationProps) {
  const lottieRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
    
    // Check connection type for data-saving mode
    if (typeof navigator !== 'undefined' && 'connection' in navigator && (navigator as any).connection) {
      setConnectionType((navigator as any).connection.effectiveType);
      
      const updateConnectionStatus = () => {
        setConnectionType((navigator as any).connection.effectiveType);
      };
      
      (navigator as any).connection.addEventListener('change', updateConnectionStatus);
      return () => {
        (navigator as any).connection.removeEventListener('change', updateConnectionStatus);
      };
    }
  }, []);

  // Handle visibility detection for playOnVisible (battery saving)
  useEffect(() => {
    if (!playOnVisible || !isClient) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [playOnVisible, isClient]);

  // Control animation based on visibility and hover state
  useEffect(() => {
    if (!lottieRef.current || !isClient) return;

    // Data-saving mode - don't play on cellular connections
    const isCellular = connectionType === '2g' || connectionType === '3g' || connectionType === 'cellular';
    if (lowDataMode && isCellular) {
      lottieRef.current.pause();
      return;
    }

    if (isPaused) {
      lottieRef.current.pause();
      return;
    }

    if (playOnVisible && isVisible) {
      lottieRef.current.play();
    } else if (playOnVisible && !isVisible) {
      lottieRef.current.pause();
    }

    if (playOnHover && isHovering) {
      lottieRef.current.play();
    } else if (playOnHover && !isHovering) {
      lottieRef.current.pause();
    }
  }, [isVisible, isHovering, playOnVisible, playOnHover, isPaused, isClient, connectionType, lowDataMode]);

  // Set animation speed
  useEffect(() => {
    if (lottieRef.current && speed !== 1 && isClient) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed, isClient]);

  // Apply dark mode theme adjustments
  useEffect(() => {
    if (!lottieRef.current || !isClient) return;
    
    // Some Lottie animations support theming via color filters
    if (darkMode) {
      // Apply dark mode adjustments if animation supports it
      // This is animation-specific and may require custom handling
    }
  }, [darkMode, isClient]);

  // Handle tap to play/pause for mobile
  const handleTap = () => {
    if (!lottieRef.current || !isClient) return;
    
    setIsPaused(!isPaused);
    
    if (onTap) {
      onTap();
    }
  };

  if (!isClient) {
    return <div className={cn("lottie-placeholder bg-gray-200 dark:bg-gray-700 rounded-md", className)} style={{ width, height, ...style }} />;
  }

  return (
    <div
      ref={containerRef}
      className={cn("lottie-container relative", className)}
      style={{ width, height, ...style }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleTap}
    >
      {!lowDataMode || (connectionType !== '2g' && connectionType !== '3g' && connectionType !== 'cellular') ? (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={loop}
          autoplay={autoplay && !playOnHover && !playOnVisible}
          style={{ width: '100%', height: '100%' }}
          onComplete={onComplete}
        />
      ) : (
        <div className="lottie-data-saving flex items-center justify-center text-xs text-center p-2 bg-gray-200 dark:bg-gray-700 rounded-md h-full">
          Animation disabled to save data. Tap to play.
        </div>
      )}
    </div>
  );
}
