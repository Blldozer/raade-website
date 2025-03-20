
/**
 * Font Loading Utility
 * 
 * Provides focused functions to manage font loading with error recovery strategies.
 * This utility employs a progressive enhancement approach to ensure content remains
 * visible even if custom fonts fail to load.
 */

// Font loading status type
type FontLoadingStatus = 'loading' | 'loaded' | 'failed';

// Centralized font status
let fontStatus: FontLoadingStatus = 'loading';

// Critical font families that need to be loaded
const CRITICAL_FONTS = ['Simula Book', 'Amadine', 'Lora'];

/**
 * Tests if the Font Loading API is available in this browser
 */
const isFontLoadingApiSupported = (): boolean => {
  return 'fonts' in document;
};

/**
 * Check if fonts have loaded successfully using the Font Loading API
 */
const checkFontsWithApi = async (): Promise<boolean> => {
  try {
    // Try to load all critical fonts
    await Promise.all(
      CRITICAL_FONTS.map(font => document.fonts.load(`1em "${font}"`))
    );
    
    return true;
  } catch (error) {
    console.error('Font loading error:', error);
    return false;
  }
};

/**
 * Fallback method to check font loading for browsers without the Font Loading API
 */
const checkFontsFallback = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Set a timeout to check if fonts are loaded
    setTimeout(() => {
      // Create test element to measure font
      const testElement = document.createElement('span');
      testElement.style.fontFamily = 'Simula Book, serif';
      testElement.style.fontSize = '16px';
      testElement.style.visibility = 'hidden';
      testElement.textContent = 'Test Font Loading';
      
      document.body.appendChild(testElement);
      
      // Measure width with custom font
      const width = testElement.offsetWidth;
      
      // Switch to fallback font
      testElement.style.fontFamily = 'serif';
      
      // Compare widths to determine if custom font loaded
      const fontsLoaded = width !== testElement.offsetWidth;
      
      // Clean up
      document.body.removeChild(testElement);
      
      resolve(fontsLoaded);
    }, 2000); // Check after 2 seconds
  });
};

/**
 * Updates document classes based on font loading status
 */
const updateDocumentClasses = (loaded: boolean): void => {
  fontStatus = loaded ? 'loaded' : 'failed';
  document.documentElement.classList.add(loaded ? 'fonts-loaded' : 'fonts-failed');
  
  if (!loaded) {
    console.warn('Font loading test indicates fonts may not have loaded correctly');
  }
};

/**
 * Check if fonts have loaded successfully
 */
export const checkFontsLoaded = async (): Promise<boolean> => {
  // If status is already determined, return result
  if (fontStatus !== 'loading') {
    return fontStatus === 'loaded';
  }
  
  // Use appropriate detection method based on browser support
  const fontsLoaded = isFontLoadingApiSupported() 
    ? await checkFontsWithApi()
    : await checkFontsFallback();
  
  // Update document with result
  updateDocumentClasses(fontsLoaded);
  
  return fontsLoaded;
};

/**
 * Attempt to recover from font loading failures
 */
const attemptFontRecovery = (): void => {
  console.warn('Font loading timed out, attempting recovery');
  
  // Force reload of font files with cache busting
  const fontFiles = [
    '/fonts/Simula_Book_ImfTVa3.woff',
    '/fonts/Simula_BookItalic_651eMqB.woff',
    '/fonts/Amadine.woff'
  ];
  
  // Force browser to reload each font file
  fontFiles.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = `${fontUrl}?reload=${Date.now()}`;
    link.as = 'font';
    link.type = 'font/woff';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
  
  // Notify service worker to clear font cache
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'CLEAR_CACHE',
      cacheName: 'raade-fonts-cache-v1'
    });
  }
};

/**
 * Monitor fonts and attempt recovery if needed
 */
export const setupFontMonitoring = (): void => {
  // Set a timeout for font loading
  const fontTimeoutId = setTimeout(() => {
    if (fontStatus === 'loading') {
      // Mark as failed and attempt recovery
      fontStatus = 'failed';
      document.documentElement.classList.add('fonts-failed');
      attemptFontRecovery();
    }
  }, 3000);
  
  // If fonts load successfully, clear the timeout
  checkFontsLoaded().then(loaded => {
    if (loaded) {
      clearTimeout(fontTimeoutId);
    }
  });
};

/**
 * Check for recent page refresh and adjust cache strategy if needed
 */
const handleRecentRefresh = (): void => {
  const lastRefresh = sessionStorage.getItem('lastRefresh');
  const now = Date.now();
  
  if (lastRefresh && (now - parseInt(lastRefresh)) < 30000) {
    console.log('Recent page refresh detected, forcing network fetch of fonts');
    
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CLEAR_CACHE',
        cacheName: 'raade-fonts-cache-v1'
      });
    }
  }
  
  // Update last refresh time
  sessionStorage.setItem('lastRefresh', now.toString());
};

/**
 * Initialize the font loading system
 */
export const initFontLoading = (): void => {
  setupFontMonitoring();
  handleRecentRefresh();
};
