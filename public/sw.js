
/**
 * RAADE Service Worker
 * 
 * Provides offline support and optimized image caching
 * for improved performance and reliability
 */

const CACHE_NAME = 'raade-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
];

// Image cache for team members and other important images
const IMAGE_CACHE_NAME = 'raade-images-v1';
const THIRTY_DAYS = 30 * 24 * 60 * 60;

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== IMAGE_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// Helper to determine if a request is for an image
const isImageRequest = (request) => {
  const url = new URL(request.url);
  return request.destination === 'image' || 
    url.pathname.match(/\.(jpe?g|png|gif|webp|svg)$/i);
};

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Handle image requests with special caching
  if (isImageRequest(event.request)) {
    event.respondWith(handleImageRequest(event.request));
    return;
  }
  
  // For other requests, use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        // Clone the request for the fetch call
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response for the cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        });
      })
  );
});

// Handle image requests with special caching
const handleImageRequest = (request) => {
  return caches.match(request)
    .then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(request)
        .then((response) => {
          if (!response || !response.ok) {
            return response;
          }
          
          // Clone the response for caching
          const responseToCache = response.clone();
          
          // Cache the image in the dedicated image cache
          caches.open(IMAGE_CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseToCache);
            });
          
          return response;
        })
        .catch((error) => {
          console.error('[ServiceWorker] Image fetch failed:', error);
          
          // For team member images, try alternate formats if the main one fails
          if (request.url.includes('raade-individual-e-board-photos')) {
            // If WebP fails, try JPG
            if (request.url.includes('.webp')) {
              const jpgUrl = request.url.replace('.webp', '.jpg')
                .replace('raade-individual-e-board-photos-webp', 'raade-individual-e-board-photos');
              return fetch(new Request(jpgUrl));
            }
          }
          
          // Return a fallback image or error
          return Promise.reject('Image not available');
        });
    });
};

// Listen for message from client to cache specific images
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_IMAGE') {
    const { url } = event.data;
    console.log('[ServiceWorker] Received request to cache image:', url);
    
    caches.open(IMAGE_CACHE_NAME)
      .then((cache) => {
        return fetch(url)
          .then((response) => {
            if (response.ok) {
              cache.put(url, response);
              console.log('[ServiceWorker] Cached image:', url);
            } else {
              console.warn('[ServiceWorker] Failed to cache image:', url, response.status);
            }
          })
          .catch((error) => {
            console.error('[ServiceWorker] Error caching image:', url, error);
          });
      });
  }
});
