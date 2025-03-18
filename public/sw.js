
// Service Worker for RAADE Website
const CACHE_NAME = 'raade-cache-v3'; // Incrementing cache version
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

// Stripe-specific cache for better security handling
const STRIPE_CACHE_NAME = 'raade-stripe-cache-v1';

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

// Install event - cache assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Opened cache');
        // Ensure all URLs use HTTPS in production
        const secureUrls = urlsToCache.map(url => enforceHTTPS(url));
        return cache.addAll(secureUrls);
      })
      .catch(error => {
        console.error('Service Worker: Cache install failed:', error);
      })
  );
});

// Message handler for dynamic cache instructions
self.addEventListener('message', event => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'CACHE_IMAGE') {
    // Handle request to cache a specific image
    const imageUrl = enforceHTTPS(event.data.url);
    
    if (imageUrl) {
      event.waitUntil(
        caches.open(IMAGE_CACHE_NAME)
          .then(cache => {
            console.log('Service Worker: Caching image', imageUrl);
            return fetch(imageUrl)
              .then(response => {
                if (!response || response.status !== 200) {
                  throw new Error('Failed to fetch image');
                }
                return cache.put(imageUrl, response);
              })
              .catch(error => {
                console.error('Service Worker: Failed to cache image', imageUrl, error);
              });
          })
      );
    }
  } else if (event.data && event.data.type === 'CLEAR_WS_ERROR') {
    // Clear console logging for WebSocket errors (helps in diagnostic situations)
    console.clear();
    console.log('Service Worker: Cleared WebSocket error messages');
  }
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  
  // Block any WebSocket connection attempts to localhost from production
  if (requestUrl.protocol === 'ws:' || requestUrl.protocol === 'wss:') {
    if (requestUrl.hostname === 'localhost' || requestUrl.hostname === '127.0.0.1') {
      // In production, block these requests entirely
      if (self.location.hostname !== 'localhost' && self.location.hostname !== '127.0.0.1') {
        console.debug('Service Worker: Blocked development WebSocket connection attempt');
        return;
      }
    }
  }
  
  // Special handling for Stripe resources
  if (requestUrl.hostname === 'js.stripe.com' || requestUrl.hostname === 'api.stripe.com') {
    // Always use network-first strategy for Stripe, but cache for offline use
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response for caching
          const responseToCache = response.clone();
          
          // Only cache successful responses
          if (response.ok) {
            caches.open(STRIPE_CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          
          return response;
        })
        .catch(() => {
          // Try to get from cache if offline
          return caches.match(event.request);
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
                console.log('Service Worker: Serving image from cache', requestUrl.pathname);
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
                  console.error('Service Worker: Network fetch failed for image', requestUrl.pathname, error);
                  
                  // For webp images, try falling back to JPG version if available
                  if (requestUrl.pathname.includes('.webp')) {
                    const jpgUrl = event.request.url.replace('.webp', '.jpg');
                    console.log('Service Worker: Trying JPG fallback', jpgUrl);
                    
                    return fetch(jpgUrl)
                      .then(fallbackResponse => {
                        if (!fallbackResponse || fallbackResponse.status !== 200) {
                          throw new Error('Fallback fetch failed too');
                        }
                        return fallbackResponse;
                      })
                      .catch(fallbackError => {
                        console.error('Service Worker: Fallback also failed', fallbackError);
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
          const secureRequest = new Request(
            enforceHTTPS(event.request.url),
            {
              method: event.request.method,
              headers: event.request.headers,
              mode: event.request.mode,
              credentials: event.request.credentials,
              redirect: event.request.redirect
            }
          );
          
          return fetch(secureRequest).then(
            response => {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
        })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  const cacheWhitelist = [CACHE_NAME, IMAGE_CACHE_NAME, STRIPE_CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('Service Worker: Activated');
      
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
