// components/sections/ImageGallerySection.tsx
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play, Pause, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { imageGalleryContent, type GalleryImage } from '@/content/image-gallery-content';
import { cn } from '@/lib/utils';

export default function ImageGallerySection() {
  // State for lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // State for auto scroll
  const [autoScrollActive, setAutoScrollActive] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1); // 1 = normal, 0.5 = slow, 2 = fast
  
  // State for category filtering
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(imageGalleryContent.images);
  
  // Refs
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Filter images when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredImages(imageGalleryContent.images);
    } else {
      setFilteredImages(imageGalleryContent.images.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory]);
  
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
  
  return (
    <section className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto lg:text-center mb-16">
          <p className="section-label-style">Gallery</p>
          <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
            {imageGalleryContent.title}
          </h2>
          <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
            {imageGalleryContent.description}
          </p>
          
          {/* Category Filter and Auto Scroll Controls */}
          <div className="mt-10 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px] input-styles dark:bg-gray-800 dark:text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {imageGalleryContent.categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2 ml-4">
              <Button 
                onClick={toggleAutoScroll}
                variant="outline"
                size="sm"
                className={cn(
                  "flex items-center gap-1",
                  autoScrollActive ? "bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900 dark:text-indigo-300 dark:border-indigo-700" : ""
                )}
              >
                {autoScrollActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {autoScrollActive ? 'Pause' : 'Auto Scroll'}
              </Button>
              
              {autoScrollActive && (
                <Select value={scrollSpeed.toString()} onValueChange={(value) => setScrollSpeed(Number(value))}>
                  <SelectTrigger className="w-[100px] input-styles dark:bg-gray-800 dark:text-white">
                    <SelectValue placeholder="Speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">Slow</SelectItem>
                    <SelectItem value="1">Normal</SelectItem>
                    <SelectItem value="2">Fast</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>
        
        {/* Gallery Grid with Ref for Auto Scroll */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(100px,auto)] max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          {filteredImages.map((image, index) => (
            <div 
              key={image.id}
              className={`relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
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
              
              {/* Caption overlay */}
              {image.caption && (
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 text-sm">{image.caption}</p>
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
        
        {/* Lightbox Component */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
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
              className="relative max-w-5xl max-h-[90vh] mx-auto" 
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[currentImageIndex].src}
                alt={filteredImages[currentImageIndex].alt}
                width={filteredImages[currentImageIndex].width * 1.5}
                height={filteredImages[currentImageIndex].height * 1.5}
                className="object-contain max-h-[85vh] rounded-lg"
                priority
              />
              
              {filteredImages[currentImageIndex].caption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-4 text-white text-center rounded-b-lg">
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
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
