"use client";

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamically import Lottie
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="lottie-placeholder animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md" style={{ width: '100%', height: '100%' }} />
});

interface ScrollLottieProps {
  animationData: any;
  className?: string;
  scrollStart?: number; // Percentage of viewport height to start animation (0-100)
  scrollEnd?: number; // Percentage of viewport height to end animation (0-100)
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

export default function ScrollLottie({
  animationData,
  className,
  scrollStart = 0,
  scrollEnd = 100,
  width,
  height,
  style,
}: ScrollLottieProps) {
  const lottieRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Control animation based on scroll position
  useEffect(() => {
    if (!lottieRef.current || !isClient || !containerRef.current) return;
    
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the element is through the viewport (0 to 1)
      const startTrigger = viewportHeight * (scrollStart / 100);
      const endTrigger = viewportHeight * (scrollEnd / 100);
      const totalScrollDistance = endTrigger - startTrigger;
      
      // Element's position relative to the viewport
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // Calculate progress (0 to 1)
      let progress = 0;
      
      if (elementTop <= startTrigger && elementBottom >= endTrigger) {
        // Element spans the entire trigger area
        progress = (startTrigger - elementTop) / (rect.height - totalScrollDistance);
      } else if (elementTop <= startTrigger) {
        // Element top is above start trigger
        progress = (startTrigger - elementTop) / rect.height;
      } else if (elementBottom >= endTrigger) {
        // Element bottom is below end trigger
        progress = 1 - (elementBottom - endTrigger) / rect.height;
      }
      
      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      
      // Set the animation frame based on progress
      if (lottieRef.current && animationData) {
        const totalFrames = lottieRef.current.getDuration(true);
        const frame = progress * totalFrames;
        lottieRef.current.goToAndStop(frame, true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient, scrollStart, scrollEnd, animationData]);
  
  if (!isClient) {
    return <div className={cn("scroll-lottie-placeholder bg-gray-200 dark:bg-gray-700 rounded-md", className)} style={{ width, height, ...style }} />;
  }
  
  return (
    <div
      ref={containerRef}
      className={cn("scroll-lottie-container", className)}
      style={{ width, height, ...style }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
