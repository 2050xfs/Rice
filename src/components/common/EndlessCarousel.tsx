"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EndlessCarouselProps {
  items: React.ReactNode[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
}

export default function EndlessCarousel({
  items,
  className = "",
  autoPlay = false,
  interval = 5000,
  showArrows = true,
  showDots = true,
}: EndlessCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchThreshold = 50; // minimum distance for swipe

  // Clone items for endless effect
  const extendedItems = [...items.slice(-1), ...items, ...items.slice(0, 1)];

  // Handle auto play
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      if (!isDragging) {
        handleNext();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, isDragging]);

  // Reset to actual items after transition
  useEffect(() => {
    if (!isTransitioning || !containerRef.current) return;

    const resetTimeout = setTimeout(() => {
      setIsTransitioning(false);
      if (currentIndex >= items.length) {
        setCurrentIndex(0);
      } else if (currentIndex < 0) {
        setCurrentIndex(items.length - 1);
      }
    }, 500); // Match this with CSS transition duration

    return () => clearTimeout(resetTimeout);
  }, [currentIndex, isTransitioning, items.length]);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  }, []);

  // Touch and mouse event handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - (containerRef.current?.offsetLeft || 0);
    const distance = (x - startX);
    
    if (Math.abs(distance) > touchThreshold) {
      if (distance > 0) {
        handlePrev();
      } else {
        handleNext();
      }
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Calculate transform based on current index
  const getTransform = () => {
    const baseTransform = -100 * (currentIndex + 1);
    return `translateX(${baseTransform}%)`;
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Main carousel container */}
      <div
        ref={containerRef}
        className="relative w-full h-full touch-pan-y"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className={cn(
            "flex w-full h-full transition-transform duration-500",
            isTransitioning ? "" : "duration-0"
          )}
          style={{
            transform: getTransform(),
            width: `${extendedItems.length * 100}%`,
          }}
        >
          {extendedItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full"
              style={{ width: `${100 / extendedItems.length}%` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Navigation dots */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(index);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-white w-4"
                  : "bg-white/60 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile swipe hint - shows briefly when component mounts */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full opacity-0 animate-fade-out pointer-events-none">
        Swipe to navigate
      </div>
    </div>
  );
}
