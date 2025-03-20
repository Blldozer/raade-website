
/**
 * Service Worker for RAADE Website
 * 
 * Features:
 * - Network-first strategy for fonts and CSS
 * - Separate caches for different asset types
 * - Non-disruptive update notifications
 * - Optimized offline capability
 * - HTTPS enforcement in production
 */

// Import utility modules 
importScripts('/sw-utils/cache-utils.js');
importScripts('/sw-utils/request-handlers.js');
importScripts('/sw-utils/message-handlers.js');

// Use destructuring to access imported functions
const { 
  CACHE_NAMES, 
  DEBUG, 
  logDebug, 
  getCacheAllowlist,
  getUrlsToCache, 
  getFontFilesToCache,
  cacheUrls,
  cacheFontFiles
} = self.cacheUtils;

const {
  isNavigationRequest,
  isFontFile,
  isCSSFile,
  isStripeURL,
  isPaymentRequest,
  isImageRequest,
  handleNavigationRequest,
  handleFontRequest,
  handleCSSRequest,
  handleStripeRequest,
  handlePaymentRequest,
  handleImageRequest,
  handleStandardRequest
} = self.requestHandlers;

const {
  processMessageEvent,
  notifyClientsAboutUpdate
} = self.messageHandlers;

// Install event - cache assets
self.addEventListener('install', event => {
  logDebug('Installing service worker...');
  
  // Do not skip waiting - this helps with gradual rollout
  // self.skipWaiting(); - Removed for gradual rollout
  
  event.waitUntil(
    Promise.all([
      // Cache core app files
      cacheUrls(CACHE_NAMES.MAIN, getUrlsToCache()),
      
      // Explicitly cache font files with network-first strategy
      cacheFontFiles(getFontFilesToCache())
    ])
    .catch(error => {
      console.error('Cache install failed:', error);
    })
  );
});

// Message handler for dynamic cache instructions
self.addEventListener('message', processMessageEvent);

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  try {
    const requestUrl = new URL(event.request.url);
    
    // Block any WebSocket connection attempts to localhost from production
    if (requestUrl.protocol === 'ws:' || requestUrl.protocol === 'wss:') {
      if (requestUrl.hostname === 'localhost' || requestUrl.hostname === '127.0.0.1') {
        // In production, block these requests entirely
        if (self.location.hostname !== 'localhost' && self.location.hostname !== '127.0.0.1') {
          logDebug('Blocked development WebSocket connection attempt');
          return;
        }
      }
    }
    
    // Route request to appropriate handler based on type
    if (isNavigationRequest(event.request)) {
      event.respondWith(handleNavigationRequest(event));
    }
    else if (isFontFile(requestUrl)) {
      event.respondWith(handleFontRequest(event));
    }
    else if (isCSSFile(requestUrl)) {
      event.respondWith(handleCSSRequest(event));
    }
    else if (isStripeURL(requestUrl)) {
      event.respondWith(handleStripeRequest(event));
    }
    else if (isPaymentRequest(requestUrl)) {
      event.respondWith(handlePaymentRequest(event));
    }
    else if (isImageRequest(requestUrl)) {
      event.respondWith(handleImageRequest(event));
    }
    else {
      event.respondWith(handleStandardRequest(event));
    }
  } catch (error) {
    console.error('Critical fetch handler error', error);
    // Return a fallback response
    event.respondWith(
      caches.match('/index.html')
        .then(response => {
          if (response) return response;
          return new Response('Critical error in service worker', { status: 500 });
        })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  logDebug('Activating new service worker...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete any cache not in our allowlist
            if (getCacheAllowlist().indexOf(cacheName) === -1) {
              logDebug('Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        logDebug('Activated and claiming clients');
        
        // Notify clients about the update with non-disruptive toast notification
        return notifyClientsAboutUpdate()
          .then(() => self.clients.claim());
      })
  );
});
