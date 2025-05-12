"use client";
import { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  dataAiHint?: string;
  width?: number;
  height?: number;
  layout?: string;
  objectFit?: string;
  poster?: string;
  preload?: "none" | "metadata" | "auto"; // Add preload option for mobile optimization
  quality?: "auto" | "low" | "medium" | "high"; // Add quality option
  autoPlayOnVisible?: boolean; // Add option to autoplay when video is visible
}

const VideoThumbnail = ({
  src,
  alt,
  className = "",
  dataAiHint,
  width,
  height,
  layout,
  objectFit,
  poster,
  preload = "metadata", // Default to metadata for faster initial load
  quality = "auto",
  autoPlayOnVisible = false,
  ...props
}: VideoThumbnailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle visibility changes for autoplay
  useEffect(() => {
    if (!autoPlayOnVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !isPlaying) {
          handlePlayPause();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [autoPlayOnVisible, isPlaying]);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    try {
      setError(null);
      setIsLoading(true);

      if (isPlaying) {
        await videoRef.current.pause();
        setIsPlaying(false);
      } else {
        // Set quality before playing
        if (videoRef.current.querySelector('source')) {
          (videoRef.current.querySelector('source') as HTMLSourceElement).setAttribute('sizes', quality);
        }
        
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to play video');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle video errors
  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setError('Failed to load video');
    setIsLoading(false);
    setIsPlaying(false);
  };

  // Handle video loaded
  const handleLoaded = () => {
    setIsLoading(false);
    setError(null);
  };

  // Calculate styles based on layout and objectFit props
  const getVideoStyles = () => {
    const styles: React.CSSProperties = {};
    
    if (layout === "fill") {
      styles.position = "absolute";
      styles.top = 0;
      styles.left = 0;
      styles.width = "100%";
      styles.height = "100%";
    }
    
    if (objectFit) {
      styles.objectFit = objectFit as "cover" | "contain" | "fill" | "none" | "scale-down";
    }
    
    return styles;
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`} 
      style={layout === "fill" ? { position: "relative", width: "100%", height: "100%" } : {}}
    >
      {/* Video Element with Error Boundary */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          preload={preload}
          muted
          playsInline
          controls={isPlaying}
          className={cn(
            'w-full rounded-lg transition-opacity duration-300',
            isPlaying ? 'z-10' : '',
            isLoading ? 'opacity-50' : 'opacity-100'
          )}
          style={getVideoStyles()}
          data-ai-hint={dataAiHint}
          width={width}
          height={height}
          poster={poster}
          onEnded={() => setIsPlaying(false)}
          onError={handleError}
          onLoadedData={handleLoaded}
          {...props}
        >
          <source src={src} type="video/mp4" sizes={quality} />
          Your browser does not support the video tag.
        </video>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
            <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          </div>
        )}
      </div>
      
      {/* Play Button Overlay */}
      {!isPlaying && !isLoading && !error && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer z-20 rounded-lg"
          onClick={handlePlayPause}
        >
          <button
            className="bg-white/90 hover:bg-white text-primary p-5 sm:p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 active:scale-95"
            onClick={handlePlayPause}
            aria-label={`Play video: ${alt}`}
          >
            <Play className="h-8 w-8 sm:h-6 sm:w-6" />
          </button>
        </div>
      )}

      {/* Mobile Touch Hint - shows briefly when component mounts */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full opacity-0 animate-fade-out pointer-events-none">
        Tap to play
      </div>
    </div>
  );
};

export default VideoThumbnail;
