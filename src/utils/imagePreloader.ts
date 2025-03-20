
/**
 * ImagePreloader utility
 * 
 * Provides utilities for preloading images with proper caching
 * - Preloads important images before they're needed in the UI
 * - Handles errors and provides feedback on loading progress
 * - Uses native browser caching to improve performance
 */

/**
 * Preload a single image and return a promise
 * @param src Image source URL
 * @returns Promise that resolves when image is loaded, rejects on error
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      console.log(`Preloaded image: ${src}`);
      resolve(img);
    };
    
    img.onerror = (error) => {
      console.error(`Failed to preload image: ${src}`, error);
      reject(error);
    };
    
    // Set image source to trigger loading
    img.src = src;
  });
};

/**
 * Preload multiple images with progress tracking
 * @param sources Array of image source URLs
 * @param progressCallback Optional callback for tracking progress
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = async (
  sources: string[],
  progressCallback?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> => {
  const total = sources.length;
  let loaded = 0;
  
  const promises = sources.map((src) => 
    preloadImage(src)
      .then(img => {
        loaded++;
        progressCallback?.(loaded, total);
        return img;
      })
      .catch(error => {
        console.warn(`Image preload failed for ${src}`, error);
        // Still increment counter even on failure
        loaded++;
        progressCallback?.(loaded, total);
        // Return a placeholder object for failed images
        return null;
      })
  );
  
  // Wait for all promises to settle, but don't fail if some images fail
  return Promise.all(promises);
};

/**
 * Preload team member images to improve initial page load
 * @param teamMembers Array of team member objects with names
 * @param callback Optional callback for tracking progress
 */
export const preloadTeamImages = (
  teamMembers: Array<{ name: string }>,
  callback?: (loaded: number, total: number) => void
) => {
  console.log('Starting team image preloading...');
  
  // Take only first 6 images for above the fold optimization
  const aboveTheFoldMembers = teamMembers.slice(0, 6);
  
  // Build image sources for each member
  const sources = aboveTheFoldMembers.map(member => 
    `/raade-individual-e-board-photos/${member.name.split(" ").join("-")}-raade-website-image.jpg`
  );
  
  // Try WebP versions first for modern browsers
  const webpSources = aboveTheFoldMembers.map(member => 
    `/raade-individual-e-board-photos-webp/${member.name.split(" ").join("-")}-raade-website-image.webp`
  );
  
  // Preload webp images first, then jpg as fallback
  preloadImages([...webpSources, ...sources], callback)
    .then(() => console.log('Team images preload complete'))
    .catch(error => console.error('Team images preload failed', error));
};
