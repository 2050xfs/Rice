"use client";

import { useRef, useEffect, useState, Children, cloneElement, isValidElement } from 'react';
import { cn } from '@/lib/utils';

interface AnimationSequenceProps {
  children: React.ReactNode;
  className?: string;
  autoPlay?: boolean;
  delay?: number; // Delay between animations in ms
  onComplete?: () => void;
}

export default function AnimationSequence({
  children,
  className,
  autoPlay = true,
  delay = 300,
  onComplete,
}: AnimationSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(autoPlay ? 0 : -1);
  const [isClient, setIsClient] = useState(false);
  const childrenArray = Children.toArray(children);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Handle animation sequence
  useEffect(() => {
    if (!isClient || currentIndex === -1) return;
    
    if (currentIndex >= childrenArray.length) {
      if (onComplete) onComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [currentIndex, childrenArray.length, delay, onComplete, isClient]);
  
  // Start the sequence
  const startSequence = () => {
    if (currentIndex === -1) {
      setCurrentIndex(0);
    }
  };
  
  // Render children with appropriate props
  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      if (!isValidElement(child)) return child;
      
      // Pass props to control animation
      return cloneElement(child, {
        ...child.props,
        autoplay: index <= currentIndex,
        onComplete: index === currentIndex ? () => setCurrentIndex(prev => prev + 1) : undefined,
      });
    });
  };
  
  if (!isClient) {
    return <div className={cn("animation-sequence-placeholder", className)} />;
  }
  
  return (
    <div className={cn("animation-sequence", className)}>
      {autoPlay ? renderChildren() : (
        <>
          <button 
            onClick={startSequence} 
            className="start-sequence-button bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Animation
          </button>
          {currentIndex >= 0 && renderChildren()}
        </>
      )}
    </div>
  );
}
