
// Service Worker for RAADE Website
const CACHE_NAME = 'raade-cache-v5'; // Incremented cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/src/App.tsx',
  '/public/logos/RAADE-logo-final-white.png',
  '/public/logos/RAADE-logo-final-black.png',
  '/public/hero-background.webm',
  '/public/hero-background.mp4',
  // Team member photos folder - will be populated dynamically
  '/public/raade-individual-e-board-photos-webp'
];

// Image-specific cache for better management
const IMAGE_CACHE_NAME = 'raade-images-cache-v2';

// Force HTTPS for all resources
const enforceHTTPS = (url) => {
  // Check if we're in production (not localhost)
  if (self.location.hostname !== 'localhost' && 
      self.location.hostname !== '127.0.0.1' &&
      url.startsWith('http:')) {
    return url.replace('http:', 'https:');
  }
  return url;
};

// Debug flag for logging service worker activity
const DEBUG = true;

// Helper function for conditional logging
const logDebug = (message, ...args) => {
  if (DEBUG) {
    console.log(`SW: ${message}`, ...args);
  }
};

// Install event - cache assets
self.addEventListener('install', event => {
  logDebug('Installing...');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        logDebug('Opened cache');
        // Ensure all URLs use HTTPS in production
        const secureUrls = urlsToCache.map(url => enforceHTTPS(url));
        return cache.addAll(secureUrls);
      })
      .catch(error => {
        console.error('Cache install failed:', error);
      })
  );
});

// Message handler for dynamic cache instructions
self.addEventListener('message', event => {
  logDebug('Message received', event.data);
  
  if (event.data && event.data.type === 'CACHE_IMAGE') {
    // Handle request to cache a specific image
    const imageUrl = enforceHTTPS(event.data.url);
    
    if (imageUrl) {
      event.waitUntil(
        caches.open(IMAGE_CACHE_NAME)
          .then(cache => {
            logDebug('Caching image', imageUrl);
            return fetch(imageUrl)
              .then(response => {
                if (!response || response.status !== 200) {
                  throw new Error('Failed to fetch image');
                }
                return cache.put(imageUrl, response);
              })
              .catch(error => {
                console.error('Failed to cache image', imageUrl, error);
              });
          })
      );
    }
  } else if (event.data && event.data.type === 'CLEAR_CACHE') {
    // Allow clearing specific caches
    const cacheName = event.data.cacheName;
    if (cacheName) {
      event.waitUntil(
        caches.delete(cacheName)
          .then(success => {
            logDebug(`Cache ${cacheName} ${success ? 'deleted' : 'not found'}`);
          })
      );
    }
  }
});

// Helper to check if a request is a navigation request
const isNavigationRequest = (request) => {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && 
          request.headers.get('accept') && 
          request.headers.get('accept').includes('text/html'));
};

// Check if a URL is related to Stripe
const isStripeURL = (url) => {
  return url.hostname === 'js.stripe.com' || 
         url.hostname === 'api.stripe.com' || 
         url.hostname.includes('stripe.com');
};

// Check if request is for payment API
const isPaymentRequest = (url) => {
  return url.pathname.includes('payment') || 
         url.pathname.includes('create-payment-intent');
};

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
    
    // Handle navigation requests differently - always go to index.html for SPA
    if (isNavigationRequest(event.request)) {
      logDebug('Navigation request:', requestUrl.pathname);
      event.respondWith(
        fetch(event.request)
          .catch(() => caches.match('/index.html'))
      );
      return;
    }
    
    // Special handling for Stripe resources - NEVER cache on first load
    if (isStripeURL(requestUrl)) {
      logDebug('Stripe request:', requestUrl.pathname);
      
      // Always use network-first strategy for Stripe
      event.respondWith(
        fetch(event.request)
          .then(response => {
            // Only cache successful responses AFTER first successful load
            if (response.ok && !requestUrl.pathname.includes('payment-intent')) {
              logDebug('Caching Stripe resource:', requestUrl.pathname);
              const responseToCache = response.clone();
              caches.open('raade-stripe-cache-v1')
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return response;
          })
          .catch(error => {
            logDebug('Stripe network request failed, trying cache:', error);
            // Try to get from cache if offline
            return caches.match(event.request);
          })
      );
      return;
    }
    
    // Special handling for Payment API requests - NEVER cache
    if (isPaymentRequest(requestUrl)) {
      logDebug('Payment API request:', requestUrl.pathname);
      
      // Never cache payment API requests, always go to network
      event.respondWith(
        fetch(event.request)
          .catch(error => {
            logDebug('Payment API request failed:', error);
            return new Response(JSON.stringify({ 
              error: 'Network error. Please check your connection and try again.' 
            }), { 
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            });
          })
      );
      return;
    }
    
    // Special handling for image requests
    const isImageRequest = 
      requestUrl.pathname.includes('/raade-individual-e-board-photos') ||
      requestUrl.pathname.includes('/raade-individual-e-board-photos-webp') ||
      /\.(webp|jpg|jpeg|png|gif)$/i.test(requestUrl.pathname);
    
    if (isImageRequest) {
      event.respondWith(
        caches.open(IMAGE_CACHE_NAME)
          .then(cache => {
            return cache.match(event.request)
              .then(cachedResponse => {
                if (cachedResponse) {
                  // Return cached image
                  logDebug('Serving image from cache', requestUrl.pathname);
                  return cachedResponse;
                }
                
                // Try network and cache for future use
                return fetch(event.request)
                  .then(networkResponse => {
                    if (!networkResponse || networkResponse.status !== 200) {
                      throw new Error('Bad network response');
                    }
                    
                    // Clone the response before using it
                    const responseToCache = networkResponse.clone();
                    
                    // Cache the successful response
                    cache.put(event.request, responseToCache);
                    
                    return networkResponse;
                  })
                  .catch(error => {
                    console.error('Network fetch failed for image', requestUrl.pathname, error);
                    
                    // For webp images, try falling back to JPG version if available
                    if (requestUrl.pathname.includes('.webp')) {
                      const jpgUrl = event.request.url.replace('.webp', '.jpg');
                      logDebug('Trying JPG fallback', jpgUrl);
                      
                      return fetch(jpgUrl)
                        .then(fallbackResponse => {
                          if (!fallbackResponse || fallbackResponse.status !== 200) {
                            throw new Error('Fallback fetch failed too');
                          }
                          return fallbackResponse;
                        })
                        .catch(fallbackError => {
                          console.error('Fallback also failed', fallbackError);
                          // If all fails, return a placeholder or error response
                          return new Response('Image not available', { status: 404 });
                        });
                    }
                    
                    // If not a webp or fallback fails, return error
                    return new Response('Image not available', { status: 404 });
                  });
              });
          })
      );
    } else {
      // Standard strategy for non-image resources
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            // Cache hit - return response
            if (response) {
              return response;
            }
            
            // Make a fresh network request - ensure HTTPS in production
            let secureRequest;
            try {
              // Fix for TypeError: Failed to construct 'Request': Cannot construct a Request with a RequestInit whose mode member is set as 'navigate'
              const requestOptions = {
                method: event.request.method,
                headers: event.request.headers,
                credentials: event.request.credentials,
                redirect: event.request.redirect
              };
              
              // Don't include mode for navigation requests
              if (event.request.mode !== 'navigate') {
                requestOptions.mode = event.request.mode;
              }
              
              secureRequest = new Request(
                enforceHTTPS(event.request.url),
                requestOptions
              );
            } catch (error) {
              console.error('Error creating secure request', error);
              return fetch(event.request);
            }
            
            return fetch(secureRequest).then(
              response => {
                // Check if we received a valid response
                if(!response || response.status !== 200) {
                  return response;
                }

                // Don't cache non-GET requests
                if (event.request.method !== 'GET') {
                  return response;
                }

                try {
                  // Clone the response
                  const responseToCache = response.clone();
  
                  caches.open(CACHE_NAME)
                    .then(cache => {
                      cache.put(event.request, responseToCache);
                    });
                } catch (error) {
                  console.error('Error caching response', error);
                }

                return response;
              }
            ).catch(error => {
              console.error('Fetch error', error);
              // Return cached index.html for navigation requests as fallback
              if (isNavigationRequest(event.request)) {
                return caches.match('/index.html');
              }
              return new Response('Network error', { status: 500 });
            });
          })
      );
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
  logDebug('Activating...');
  
  const cacheWhitelist = [CACHE_NAME, IMAGE_CACHE_NAME, 'raade-stripe-cache-v1'];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            logDebug('Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      logDebug('Activated and claiming clients');
      
      // Update the client to use HTTPS if needed
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          if (client.url && client.url.startsWith('http:') && 
              self.location.hostname !== 'localhost' && 
              self.location.hostname !== '127.0.0.1') {
            // Inform the client to redirect to HTTPS
            client.postMessage({ 
              type: 'USE_HTTPS', 
              url: client.url.replace('http:', 'https:') 
            });
          }
        });
      });
      
      return self.clients.claim();
    })
  );
});
