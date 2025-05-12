"use client";

import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useThemeAwareLottie } from '@/hooks/use-theme-aware-lottie';
import LottieAnimation from './LottieAnimation';
import * as LottieAssets from '@/assets/lottie';

export default function LottieScrollIndicator() {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    setIsLoading(true);
    LottieAssets.scrollIndicator()
      .then((data: any) => {
        setAnimationData(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        console.error('Failed to load scroll indicator animation:', err);
        setIsLoading(false);
      });
  }, [prefersReducedMotion]);
  
  if (prefersReducedMotion || isLoading) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-white/70"
      >
        <path d="M12 5v14"></path>
        <path d="m19 12-7 7-7-7"></path>
      </svg>
    );
  }
  
  return (
    <LottieAnimation
      animationData={animationData}
      width={24}
      height={24}
      className="text-white/70"
      autoplay={true}
      loop={true}
      playOnVisible={true}
      playOnHover={false}
      lowDataMode={isMobile}
    />
  );
}
