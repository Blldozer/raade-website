
import { useEffect, useState } from "react";
import { preloadTeamImages } from "../utils/imagePreloader";
import { teamMembers } from "./about/TeamData";

/**
 * AppPreloader Component - Preloads critical assets for the application
 * 
 * Features:
 * - Preloads important images for above-the-fold content
 * - Initializes key data before rendering
 * - Tracks loading progress across the application
 */
const AppPreloader = () => {
  const [preloadProgress, setPreloadProgress] = useState(0);
  
  // Preload critical assets when the app initializes
  useEffect(() => {
    // Create a list of promises for different preloading tasks
    const preloadTasks = [
      // Preload team member images for quicker display
      new Promise<void>((resolve) => {
        preloadTeamImages(teamMembers, (loaded, total) => {
          const percentage = Math.floor((loaded / total) * 100);
          setPreloadProgress(prev => Math.max(prev, percentage));
          if (loaded >= total) resolve();
        });
      }),
      
      // Add more preload tasks here as needed
      // e.g., preload hero images, fonts, etc.
    ];
    
    // Wait for all preloading to complete
    Promise.all(preloadTasks)
      .then(() => {
        console.log('All critical assets preloaded successfully');
      })
      .catch(error => {
        console.error('Error preloading assets:', error);
      });
      
    // Register a service worker if available
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.error('ServiceWorker registration failed: ', error);
          });
      });
    }
  }, []);
  
  return null; // This component doesn't render anything, just preloads assets
};

export default AppPreloader;
