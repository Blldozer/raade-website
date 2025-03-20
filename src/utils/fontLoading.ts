
/**
 * Font Loading Utility
 * 
 * This utility provides functions to help manage font loading,
 * detect font loading failures, and provide fallback strategies.
 */

// Font loading status
type FontLoadingStatus = 'loading' | 'loaded' | 'failed';

// Track font loading status
let fontStatus: FontLoadingStatus = 'loading';

/**
 * Check if fonts have loaded successfully
 */
export const checkFontsLoaded = async (): Promise<boolean> => {
  if (fontStatus !== 'loading') {
    return fontStatus === 'loaded';
  }
  
  // If the browser supports the Font Loading API
  if ('fonts' in document) {
    try {
      // Try to load critical fonts
      await Promise.all([
        document.fonts.load('1em "Simula Book"'),
        document.fonts.load('1em Amadine'),
        document.fonts.load('1em Lora')
      ]);
      
      fontStatus = 'loaded';
      document.documentElement.classList.add('fonts-loaded');
      console.log('All critical fonts loaded successfully');
      return true;
    } catch (error) {
      console.error('Font loading error:', error);
      fontStatus = 'failed';
      document.documentElement.classList.add('fonts-failed');
      return false;
    }
  }
  
  // For browsers without font loading API, use timeout approach
  return new Promise((resolve) => {
    // Set a timeout to check if fonts are loaded
    setTimeout(() => {
      // Check for a known font feature
      const testElement = document.createElement('span');
      testElement.style.fontFamily = 'Simula Book, serif';
      testElement.style.fontSize = '16px';
      testElement.style.visibility = 'hidden';
      testElement.textContent = 'Test Font Loading';
      
      document.body.appendChild(testElement);
      
      // Measure the width - if the custom font is loaded, the width should be different
      // than the default system font
      const width = testElement.offsetWidth;
      
      // Switch to known fallback font
      testElement.style.fontFamily = 'serif';
      
      // If widths are the same, custom font likely didn't load
      const fontsLoaded = width !== testElement.offsetWidth;
      
      // Clean up
      document.body.removeChild(testElement);
      
      // Update status
      fontStatus = fontsLoaded ? 'loaded' : 'failed';
      document.documentElement.classList.add(fontsLoaded ? 'fonts-loaded' : 'fonts-failed');
      
      if (!fontsLoaded) {
        console.warn('Font loading test indicates fonts may not have loaded correctly');
      }
      
      resolve(fontsLoaded);
    }, 2000); // Check after 2 seconds
  });
};

/**
 * Monitor fonts and attempt recovery if needed
 */
export const setupFontMonitoring = (): void => {
  // Set a timeout for font loading
  const fontTimeoutId = setTimeout(() => {
    if (fontStatus === 'loading') {
      fontStatus = 'failed';
      document.documentElement.classList.add('fonts-failed');
      console.warn('Font loading timed out after 3 seconds, using fallback fonts');
      
      // Attempt recovery - force reload of font files
      const fontFiles = [
        '/fonts/Simula_Book_ImfTVa3.woff',
        '/fonts/Simula_BookItalic_651eMqB.woff',
        '/fonts/Amadine.woff'
      ];
      
      // Force browser to reload font files
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
 * Initialize the font loading system
 */
export const initFontLoading = (): void => {
  setupFontMonitoring();
  
  // If page was refreshed within the last 30 seconds, force network
  // fetch of font resources to avoid issues with caching
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
