// components/sections/ImageGallerySection.tsx
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play, Pause, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { imageGalleryContent, type GalleryImage } from '@/content/image-gallery-content';
import { cn } from '@/lib/utils';

interface ImageGallerySectionProps {
  title?: string;
  subtitle?: string; 
  description?: string;
  showControls?: boolean;
  customImages?: GalleryImage[];
  maxHeight?: string;
  className?: string;
}

export default function ImageGallerySection({
  title = imageGalleryContent.title,
  subtitle = "Event Gallery",
  description = imageGalleryContent.description,
  showControls = true,
  customImages,
  maxHeight = "800px",
  className = "",
}: ImageGallerySectionProps) {
  // State for lightbox and touch handling
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // State for auto scroll
  const [autoScrollActive, setAutoScrollActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1); // 1 = normal, 0.5 = slow, 2 = fast
  
  // State for category filtering
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(imageGalleryContent.images);
  
  // Refs
  const galleryRef = useRef<HTMLDivElement>(null);
  const touchThreshold = 50; // minimum distance for swipe
  
  // Filter images when category changes or when customImages changes
  useEffect(() => {
    const imagesToFilter = customImages || imageGalleryContent.images;
    
    if (selectedCategory === "All") {
      setFilteredImages(imagesToFilter);
    } else {
      setFilteredImages(imagesToFilter.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory, customImages]);
  
  // Auto scroll effect
  useEffect(() => {
    if (!autoScrollActive || !galleryRef.current) return;
    
    let lastTime = 0;
    let animationFrameId: number;
    
    const scrollStep = (timestamp: number) => {
      if (!galleryRef.current) return;
      
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      
      // Calculate scroll amount based on speed
      const scrollAmount = (delta * 0.05 * scrollSpeed);
      
      // Scroll the gallery
      galleryRef.current.scrollTop += scrollAmount;
      
      // If we've reached the bottom, loop back to top
      if (galleryRef.current.scrollTop + galleryRef.current.clientHeight >= 
          galleryRef.current.scrollHeight - 10) {
        galleryRef.current.scrollTop = 0;
      }
      
      lastTime = timestamp;
      animationFrameId = requestAnimationFrame(scrollStep);
    };
    
    animationFrameId = requestAnimationFrame(scrollStep);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoScrollActive, scrollSpeed]);
  
  // Pause auto scroll when lightbox is opened
  useEffect(() => {
    if (lightboxOpen && autoScrollActive) {
      setAutoScrollActive(false);
    }
  }, [lightboxOpen, autoScrollActive]);
  
  // Lightbox navigation
  const navigateLightbox = useCallback((direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentImageIndex(prev => (prev + 1) % filteredImages.length);
    } else {
      setCurrentImageIndex(prev => (prev - 1 + filteredImages.length) % filteredImages.length);
    }
  }, [filteredImages.length]);
  
  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          setLightboxOpen(false);
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, navigateLightbox]);
  
  // Toggle auto scroll
  const toggleAutoScroll = () => {
    setAutoScrollActive(prev => !prev);
  };
  
  // Handle touch events for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > touchThreshold;
    const isRightSwipe = distance < -touchThreshold;
    
    if (isLeftSwipe) {
      navigateLightbox('next');
    }
    if (isRightSwipe) {
      navigateLightbox('prev');
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="section-spacing bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Header with updated styling */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">{subtitle}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {description}
          </p>
          
          {/* Optional controls with minimal aesthetic - can be toggled with a prop */}
          {showControls && (
            <div className="flex items-center justify-center gap-3 mt-4 mb-6">
              {/* Pill-Style Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="min-h-0 h-8 bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50 border-0 rounded-full px-3 text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 focus:ring-offset-0 shadow-sm">
                  <Filter className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  {imageGalleryContent.categories.map(category => (
                    <SelectItem key={category} value={category} className="rounded-md text-sm">{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Divider */}
              <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
              
              {/* Icon-Only Toggle for Auto Scroll */}
              <button
                onClick={toggleAutoScroll}
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700",
                  autoScrollActive ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" : "bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                )}
                aria-label={autoScrollActive ? "Pause auto scroll" : "Start auto scroll"}
              >
                {autoScrollActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </button>
              
              {/* Speed Control - Only visible when auto-scroll is active */}
              {autoScrollActive && (
                <Select value={scrollSpeed.toString()} onValueChange={(value) => setScrollSpeed(Number(value))}>
                  <SelectTrigger className="min-h-0 h-8 w-20 bg-gray-50 dark:bg-gray-800/30 border-0 rounded-full px-3 text-xs font-medium text-gray-700 dark:text-gray-300 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 focus:ring-offset-0 shadow-sm">
                    <SelectValue placeholder="Speed" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                    <SelectItem value="0.5" className="text-sm">Slow</SelectItem>
                    <SelectItem value="1" className="text-sm">Normal</SelectItem>
                    <SelectItem value="2" className="text-sm">Fast</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
        </div>
        
        {/* Updated grid layout with improved sizing */}
        <div 
          ref={galleryRef}
          className={cn(
            "grid gap-4",
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
            "auto-rows-[minmax(200px,auto)]",
            "overflow-y-auto scrollbar-thin",
            "scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent overscroll-y-contain",
            className
          )}
          style={{ maxHeight }}
        >
          {filteredImages.map((image, index) => (
            <div 
              key={image.id}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              style={{
                gridColumn: `span ${image.span?.col || 1}`,
                gridRow: `span ${image.span?.row || 1}`,
              }}
              onClick={() => {
                setCurrentImageIndex(index);
                setLightboxOpen(true);
              }}
              onMouseEnter={() => {
                if (autoScrollActive) setAutoScrollActive(false);
              }}
            >
              {/* Lazy loaded image */}
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMWYxZjEiLz48L3N2Zz4="
              />
              
              {/* Simplified caption overlay */}
              {image.caption && (
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-3 text-sm">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
          
          {filteredImages.length === 0 && (
            <p className="col-span-full text-center body-text-default text-gray-500 dark:text-gray-400 py-12">
              No images found for the selected category.
            </p>
          )}
        </div>
        
        {/* Mobile-optimized Lightbox Component with Touch Support */}
        {lightboxOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" 
            onClick={() => setLightboxOpen(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(false);
                }} 
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }} 
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            
            <div 
              className="relative w-full sm:w-auto max-w-5xl max-h-[90vh] mx-auto px-4 sm:px-0" 
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[currentImageIndex].src}
                alt={filteredImages[currentImageIndex].alt}
                width={filteredImages[currentImageIndex].width * 1.5}
                height={filteredImages[currentImageIndex].height * 1.5}
                className="object-contain w-full max-h-[85vh] rounded-lg"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              />
              
              {filteredImages[currentImageIndex].caption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-3 sm:p-4 text-white text-center rounded-b-lg text-sm sm:text-base">
                  <p>{filteredImages[currentImageIndex].caption}</p>
                </div>
              )}
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }} 
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
