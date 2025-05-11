"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

interface EndlessCarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
  onImageClick?: (index: number) => void;
}

export default function EndlessCarousel({
  images,
  autoPlay = false,
  interval = 3000,
  showControls = true,
  showIndicators = true,
  className,
  onImageClick
}: EndlessCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate the total number of images
  const totalImages = images.length;

  // Handle navigation
  const goToSlide = useCallback((index: number) => {
    // Ensure the index wraps around for endless effect
    const newIndex = ((index % totalImages) + totalImages) % totalImages;
    setCurrentIndex(newIndex);
  }, [totalImages]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Auto play functionality
  useEffect(() => {
    if (isPlaying && !isTouching) {
      autoPlayRef.current = setTimeout(() => {
        nextSlide();
      }, interval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [isPlaying, isTouching, nextSlide, interval]);

  // Toggle auto play
  const toggleAutoPlay = () => {
    setIsPlaying(prev => !prev);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    
    // Determine if it was a swipe (minimum 50px movement)
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (diff > minSwipeDistance) {
      // Swipe left, go to next slide
      nextSlide();
    } else if (diff < -minSwipeDistance) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Handle image click
  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index);
    }
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-lg",
        className
      )}
      ref={carouselRef}
    >
      {/* Carousel container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${totalImages * 100}%`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div 
            key={`carousel-image-${index}`}
            className="relative w-full h-full flex-shrink-0"
            style={{ width: `${100 / totalImages}%` }}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="w-full h-full object-contain cursor-pointer"
              priority={index === currentIndex}
              loading={index === currentIndex ? "eager" : "lazy"}
            />
            {image.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2 text-white text-center">
                <p className="text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      {showControls && totalImages > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && totalImages > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {Array.from({ length: totalImages }).map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto play control */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={toggleAutoPlay}
          variant="outline"
          size="sm"
          className="bg-black/30 hover:bg-black/50 text-white border-none"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
