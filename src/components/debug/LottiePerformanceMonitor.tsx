"use client";

import { useState, useEffect } from 'react';
import { useDataSaving } from '@/context/DataSavingContext';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number | null;
  loadTime: number;
  renderTime: number;
}

export default function LottiePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: null,
    loadTime: 0,
    renderTime: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const { isLowDataMode } = useDataSaving();
  
  useEffect(() => {
    if (!isVisible) return;
    
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;
    
    // Measure FPS
    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      
      if (now - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round(frameCount * 1000 / (now - lastTime)),
        }));
        
        frameCount = 0;
        lastTime = now;
      }
      
      rafId = requestAnimationFrame(measureFps);
    };
    
    // Start measuring
    measureFps();
    
    // Measure memory usage if available
    if ((performance as any).memory) {
      const memoryInterval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: (performance as any).memory.usedJSHeapSize / (1024 * 1024),
        }));
      }, 2000);
      
      return () => {
        cancelAnimationFrame(rafId);
        clearInterval(memoryInterval);
      };
    }
    
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);
  
  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-100"
        aria-label="Show performance metrics"
      >
        FPS
      </button>
    );
  }
  
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Performance Metrics</h3>
        <button
          onClick={toggleVisibility}
          className="text-gray-400 hover:text-white"
          aria-label="Hide performance metrics"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-1 text-sm">
        <p>FPS: <span className={metrics.fps < 30 ? 'text-red-400' : 'text-green-400'}>{metrics.fps}</span></p>
        {metrics.memoryUsage !== null && (
          <p>Memory: <span>{metrics.memoryUsage.toFixed(1)} MB</span></p>
        )}
        <p>Data Saving: <span>{isLowDataMode ? 'Enabled' : 'Disabled'}</span></p>
      </div>
    </div>
  );
}
