
// Service Worker for RAADE Website
const CACHE_NAME = 'raade-cache-v2';
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
const IMAGE_CACHE_NAME = 'raade-images-cache-v1';

// Install event - cache assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Opened cache');
        return cache.addAll(urlsToCache);
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
    const imageUrl = event.data.url;
    
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
  }
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  // Don't intercept WebSocket connections
  if (event.request.url.startsWith('ws:') || event.request.url.startsWith('wss:')) {
    return;
  }
  
  const requestUrl = new URL(event.request.url);
  
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
    // Don't intercept API or WebSocket requests
    if (
      requestUrl.pathname.includes('/api/') || 
      requestUrl.pathname.includes('/.netlify/') ||
      requestUrl.pathname.includes('/socket.io/')
    ) {
      return;
    }
    
    // Standard strategy for non-image resources
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request).then(
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
  
  const cacheWhitelist = [CACHE_NAME, IMAGE_CACHE_NAME];
  
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
      return self.clients.claim();
    })
  );
});
