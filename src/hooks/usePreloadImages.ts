
import { useState, useEffect } from 'react';
import { preloadImages } from '../utils/imagePreloader';

interface PreloadOptions {
  /**
   * Only preload when the component is visible in viewport
   * @default false
   */
  onlyWhenVisible?: boolean;
  
  /**
   * Number of concurrent requests to make
   * @default 4
   */
  concurrency?: number;
  
  /**
   * Priority level for preloading
   * @default 'normal'
   */
  priority?: 'high' | 'normal' | 'low';
}

/**
 * usePreloadImages hook - Handles preloading images with progress tracking
 * 
 * @param sources Array of image URLs to preload
 * @param options Configuration options for preloading
 * @returns Object with loading state information
 */
export function usePreloadImages(
  sources: string[],
  options: PreloadOptions = {}
) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Default options
  const {
    onlyWhenVisible = false,
    concurrency = 4,
    priority = 'normal'
  } = options;
  
  useEffect(() => {
    if (!sources.length) {
      setIsComplete(true);
      return;
    }
    
    // Skip preloading if we're waiting for visibility
    if (onlyWhenVisible && !hasStarted) {
      return;
    }
    
    let isMounted = true;
    
    const preloadWithConcurrency = async () => {
      const totalCount = sources.length;
      let completedCount = 0;
      
      // Helper to update progress
      const updateProgress = (loaded: number, total: number) => {
        if (!isMounted) return;
        const percentage = Math.round((loaded / total) * 100);
        setProgress(percentage);
        
        if (loaded >= total && isMounted) {
          setIsComplete(true);
        }
      };
      
      // Process in batches for concurrency control
      const processBatch = async (batch: string[]) => {
        await preloadImages(batch, (loaded, _) => {
          completedCount += loaded;
          updateProgress(completedCount, totalCount);
        });
      };
      
      // Create batches based on concurrency
      const batches: string[][] = [];
      for (let i = 0; i < sources.length; i += concurrency) {
        batches.push(sources.slice(i, i + concurrency));
      }
      
      // Process each batch
      for (const batch of batches) {
        if (!isMounted) break;
        await processBatch(batch);
      }
    };
    
    // Start preloading with appropriate priority
    if (priority === 'high') {
      // High priority: start immediately
      preloadWithConcurrency();
    } else {
      // Normal/low priority: yield to more important tasks first
      const delay = priority === 'low' ? 1000 : 100;
      const timer = setTimeout(() => {
        preloadWithConcurrency();
      }, delay);
      
      return () => clearTimeout(timer);
    }
    
    return () => {
      isMounted = false;
    };
  }, [sources, onlyWhenVisible, hasStarted, concurrency, priority]);
  
  // Function to manually start preloading when needed
  const startPreloading = () => {
    setHasStarted(true);
  };
  
  return {
    progress,
    isComplete,
    hasStarted,
    startPreloading
  };
}
