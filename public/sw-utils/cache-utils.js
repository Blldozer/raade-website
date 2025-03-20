
/**
 * Cache utility functions for the service worker
 */

// Cache names for different asset types with content-based versioning
export const CACHE_NAMES = {
  MAIN: 'raade-cache-v7', // Increment version for clear updates
  FONT: 'raade-fonts-cache-v2',
  CSS: 'raade-css-cache-v2',
  IMAGE: 'raade-images-cache-v2',
  STRIPE: 'raade-stripe-cache-v1'
};

// Debug flag for logging
export const DEBUG = false; // Disable debug logs in production

/**
 * Conditional logging helper
 */
export const logDebug = (message, ...args) => {
  if (DEBUG) {
    console.log(`SW: ${message}`, ...args);
  }
};

/**
 * Force HTTPS for all resources in production
 */
export const enforceHTTPS = (url) => {
  // Check if we're in production (not localhost)
  if (self.location.hostname !== 'localhost' && 
      self.location.hostname !== '127.0.0.1' &&
      url.startsWith('http:')) {
    return url.replace('http:', 'https:');
  }
  return url;
};

/**
 * Returns list of all caches to preserve during cleanup
 */
export const getCacheAllowlist = () => [
  CACHE_NAMES.MAIN, 
  CACHE_NAMES.IMAGE, 
  CACHE_NAMES.FONT, 
  CACHE_NAMES.CSS, 
  CACHE_NAMES.STRIPE
];

/**
 * Get the core URLs to cache during installation
 */
export const getUrlsToCache = () => [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/src/App.tsx',
  '/public/logos/RAADE-logo-final-white.png',
  '/public/logos/RAADE-logo-final-black.png',
  '/public/hero-background.webm',
  '/public/hero-background.mp4',
  '/public/raade-individual-e-board-photos-webp'
];

/**
 * Get font files to explicitly cache
 */
export const getFontFilesToCache = () => [
  '/fonts/Simula_Book_ImfTVa3.woff',
  '/fonts/Simula_BookItalic_651eMqB.woff',
  '/fonts/Amadine.woff'
];

/**
 * Cache a list of URLs with the specified cache name
 */
export const cacheUrls = async (cacheName, urls) => {
  const cache = await caches.open(cacheName);
  logDebug(`Opened cache: ${cacheName}`);
  
  // Ensure all URLs use HTTPS in production
  const secureUrls = urls.map(url => enforceHTTPS(url));
  return cache.addAll(secureUrls);
};

/**
 * Explicitly cache font files with network-first strategy
 */
export const cacheFontFiles = async (fontFiles) => {
  const cache = await caches.open(CACHE_NAMES.FONT);
  logDebug('Caching font files explicitly');
  
  return Promise.all(
    fontFiles.map(fontFile => 
      fetch(fontFile, { cache: 'reload' })
        .then(response => {
          if (response.ok) {
            return cache.put(fontFile, response);
          }
          logDebug('Failed to fetch font:', fontFile);
        })
        .catch(err => logDebug('Font fetch error:', fontFile, err))
    )
  );
};
