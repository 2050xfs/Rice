"use client";

import { useState, useEffect } from 'react';

type ThemeAwareLottieOptions = {
  lightThemeData?: any;
  darkThemeData?: any;
  dataLoader?: () => Promise<any>;
  isDarkMode?: boolean;
};

export function useThemeAwareLottie({
  lightThemeData,
  darkThemeData,
  dataLoader,
  isDarkMode = false
}: ThemeAwareLottieOptions) {
  const [animationData, setAnimationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(!!dataLoader);
  
  // Load animation data
  useEffect(() => {
    if (!dataLoader) {
      // If we have static data, use it based on theme
      if (isDarkMode && darkThemeData) {
        setAnimationData(darkThemeData);
      } else if (lightThemeData) {
        setAnimationData(lightThemeData);
      }
      return;
    }
    
    // Otherwise load data dynamically
    setIsLoading(true);
    dataLoader()
      .then(data => {
        // Apply theme-specific modifications if needed
        if (isDarkMode && data) {
          // Here you could modify colors for dark theme
          // This is a simplified example - actual implementation depends on animation structure
          try {
            const modifiedData = JSON.parse(JSON.stringify(data));
            
            // Example: Adjust colors for dark theme
            // This is a simplified approach - real implementation would need to traverse the Lottie JSON
            if (modifiedData.layers) {
              modifiedData.layers.forEach((layer: any) => {
                if (layer.shapes) {
                  layer.shapes.forEach((shape: any) => {
                    if (shape.it) {
                      shape.it.forEach((item: any) => {
                        // Modify fill colors if they exist
                        if (item.ty === 'fl' && item.c && item.c.k) {
                          // Invert colors for dark theme (simplified example)
                          if (Array.isArray(item.c.k)) {
                            item.c.k = item.c.k.map((val: number, index: number) => {
                              // Don't modify alpha channel (index 3)
                              return index === 3 ? val : 1 - val;
                            });
                          }
                        }
                      });
                    }
                  });
                }
              });
            }
            
            setAnimationData(modifiedData);
          } catch (e) {
            console.error('Error modifying Lottie for dark theme:', e);
            setAnimationData(data);
          }
        } else {
          setAnimationData(data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load Lottie animation:', err);
        setIsLoading(false);
      });
  }, [dataLoader, isDarkMode, lightThemeData, darkThemeData]);
  
  return { animationData, isLoading };
}
