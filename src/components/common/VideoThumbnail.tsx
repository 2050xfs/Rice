"use client";
import { useState, useRef } from 'react';
import { Play } from 'lucide-react';

interface VideoThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  dataAiHint?: string;
  width?: number;
  height?: number;
  layout?: string;
  objectFit?: string;
  poster?: string; // Added poster prop
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
  poster, // Destructure poster prop
  ...props
}: VideoThumbnailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
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
    <div className={`relative ${className}`} style={layout === "fill" ? { position: "relative", width: "100%", height: "100%" } : {}}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        controls={isPlaying}
        className={`${isPlaying ? 'z-10' : ''} rounded-lg`}
        style={getVideoStyles()}
        data-ai-hint={dataAiHint}
        width={width}
        height={height}
        poster={poster} // Use poster prop
        onEnded={() => setIsPlaying(false)} // Optional: reset play button when video ends
        {...props}
      />
      
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer z-20 rounded-lg" // Added rounded-lg to overlay
          onClick={handlePlayPause}
        >
          <button
            className="bg-white/90 hover:bg-white text-primary p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
            onClick={handlePlayPause}
            aria-label={`Play video: ${alt}`}
          >
            <Play className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;
