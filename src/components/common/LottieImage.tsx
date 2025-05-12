"use client";

import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamically import LottieAnimation to avoid SSR issues
const LottieAnimation = dynamic(() => import('./LottieAnimation'), { 
  ssr: false,
  loading: () => <div className="lottie-placeholder animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md" style={{ width: '100%', height: '100%' }} />
});

interface LottieImageProps {
  src: string;
  lottieDataLoader?: () => Promise<any>; // Function that loads the Lottie data
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  useLottie?: boolean; // Allow manual override
  playOnVisible?: boolean;
  playOnHover?: boolean;
  lowDataMode?: boolean;
  onTap?: () => void;
  darkMode?: boolean;
}

export default function LottieImage({
  src,
  lottieDataLoader,
  alt,
  width,
  height,
  className,
  priority = false,
  useLottie = true, // Default to using Lottie when available
  playOnVisible = true,
  playOnHover = false,
  lowDataMode = false,
  onTap,
  darkMode = false,
}: LottieImageProps) {
  const [supportsLottie, setSupportsLottie] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(!!lottieDataLoader);
  
  // Check if we're on the client side and load Lottie data
  useEffect(() => {
    setIsClient(true);
    
    // Check for browsers that might have issues with Lottie
    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent;
      const isOldBrowser = 
        /MSIE|Trident/.test(userAgent) || // IE
        (/Safari/.test(userAgent) && !/Chrome/.test(userAgent) && parseInt((userAgent.match(/Version\/(\d+)/) || [])[1] || '15', 10) < 13); // Safari < 13
        
      setSupportsLottie(!isOldBrowser);
    }
    
    // Load Lottie data if we have a loader
    if (lottieDataLoader && supportsLottie && useLottie) {
      setIsLoading(true);
      lottieDataLoader()
        .then(data => {
          setLottieData(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to load Lottie animation:', err);
          setSupportsLottie(false);
          setIsLoading(false);
        });
    }
  }, [lottieDataLoader, supportsLottie, useLottie]);
  
  // If we're still on the server or loading, show a placeholder or the image
  if (!isClient || isLoading) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(className, "transition-opacity")}
        priority={priority}
      />
    );
  }
  
  // If we have Lottie data and browser supports it, use Lottie
  if (lottieData && supportsLottie && useLottie) {
    return (
      <Suspense fallback={
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
        />
      }>
        <LottieAnimation
          animationData={lottieData}
          className={className}
          width={width}
          height={height}
          autoplay={!playOnHover && !playOnVisible}
          playOnHover={playOnHover}
          playOnVisible={playOnVisible}
          loop={true}
          darkMode={darkMode}
          lowDataMode={lowDataMode}
          onTap={onTap}
        />
      </Suspense>
    );
  }
  
  // Fallback to regular image
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
