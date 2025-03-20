// Service Worker for RAADE Website
const CACHE_NAME = 'raade-cache-v8'; // Incremented cache version
const FONT_CACHE_NAME = 'raade-fonts-cache-v2'; // Separate cache for fonts
const IMAGE_CACHE_NAME = 'raade-images-cache-v4'; // Incremented image cache version
const EXTERNAL_CACHE_NAME = 'raade-external-cache-v1'; // New cache for external resources
const TEAM_IMAGES_CACHE_NAME = 'raade-team-images-v1'; // Special cache just for team images

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
];

// Team image patterns to specially handle
const teamImagePatterns = [
  '/raade-individual-e-board-photos/',
  '/raade-individual-e-board-photos-webp/'
];

// Team image prefixes for common team member names - we'll try to precache these
const teamMemberPrefixes = [
  'John-', 'Jane-', 'Michael-', 'Sarah-', 'David-', 
  'Samuel-', 'Jessica-', 'Emeka-', 'Ngozi-', 'Oluchi-', 
  'Emmanuel-', 'Chioma-', 'Adeola-', 'Joseph-', 'Mary-'
];

// Font files to cache separately with longer expiration
const fontUrlsToCache = [
  '/fonts/Amadine.woff',
  '/fonts/Simula_Book_ImfTVa3.woff',
  '/fonts/Simula_BookItalic_651eMqB.woff',
];

// External resources to allow through CSP and potentially cache
const externalResources = [
  'https://cdn.gpteng.co/gptengineer.js',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

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

// Helper to check if a URL is an external resource
const isExternalResource = (url) => {
  if (typeof url === 'string') {
    return externalResources.some(resource => url.startsWith(resource));
  }
  
  try {
    const urlObj = new URL(url.url);
    return externalResources.some(resource => {
      try {
        const resourceHost = new URL(resource).hostname;
        return urlObj.hostname === resourceHost;
      } catch (e) {
        return url.url.includes(resource);
      }
    });
  } catch (e) {
    // If URL parsing fails, just do a string check
    return externalResources.some(resource => url.url.includes(resource));
  }
};

// Helper to check if a URL is a team member image
const isTeamImage = (url) => {
  if (typeof url === 'string') {
    return teamImagePatterns.some(pattern => url.includes(pattern));
  }
  
  try {
    const urlObj = new URL(url.url || url);
    return teamImagePatterns.some(pattern => urlObj.pathname.includes(pattern));
  } catch (e) {
    return teamImagePatterns.some(pattern => (url.url || url).includes(pattern));
  }
};

// Install event - cache assets
self.addEventListener('install', event => {
  logDebug('Installing...');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(Promise.all([
    // Cache regular assets
    caches.open(CACHE_NAME)
      .then(cache => {
        logDebug('Opened main cache');
        // Ensure all URLs use HTTPS in production
        const secureUrls = urlsToCache.map(url => enforceHTTPS(url));
        return cache.addAll(secureUrls);
      })
      .catch(error => {
        console.error('Main cache install failed:', error);
      }),
    
    // Cache font assets with a separate cache
    caches.open(FONT_CACHE_NAME)
      .then(cache => {
        logDebug('Opened font cache');
        const secureFontUrls = fontUrlsToCache.map(url => enforceHTTPS(url));
        return cache.addAll(secureFontUrls);
      })
      .catch(error => {
        console.error('Font cache install failed:', error);
      }),
      
    // Initialize team images cache
    caches.open(TEAM_IMAGES_CACHE_NAME)
      .then(cache => {
        logDebug('Initialized team images cache');
        // Try to pre-cache some common team member image patterns
        const teamImageUrls = [];
        
        // Generate some likely team member image URLs to pre-cache
        teamImagePatterns.forEach(pattern => {
          teamMemberPrefixes.forEach(prefix => {
            teamImageUrls.push(`${pattern}${prefix}raade-website-image.jpg`);
            teamImageUrls.push(`${pattern}${prefix}raade-website-image.webp`);
          });
        });
        
        // No need to await this - just try to cache in background
        teamImageUrls.forEach(url => {
          fetch(url, { mode: 'no-cors' })
            .then(response => {
              if (response.ok) {
                return cache.put(url, response);
              }
            })
            .catch(() => {
              // Ignore fetch errors for these preloads
            });
        });
        
        return Promise.resolve();
      }),
      
    // Initialize external resources cache
    caches.open(EXTERNAL_CACHE_NAME)
      .then(cache => {
        logDebug('Initialized external resources cache');
        // We don't pre-cache external resources, just initialize the cache
        return Promise.resolve();
      })
  ]));
});

// Message handler for dynamic cache instructions
self.addEventListener('message', event => {
  logDebug('Message received', event.data);
  
  if (event.data && event.data.type === 'CACHE_IMAGE') {
    // Handle request to cache a specific image
    const imageUrl = enforceHTTPS(event.data.url);
    
    if (imageUrl) {
      // Determine which cache to use based on URL
      const cacheName = isTeamImage(imageUrl) ? TEAM_IMAGES_CACHE_NAME : IMAGE_CACHE_NAME;
      
      event.waitUntil(
        caches.open(cacheName)
          .then(cache => {
            logDebug(`Caching image in ${cacheName}`, imageUrl);
            
            // Create a request with cache-busting for fresh content
            const cacheHeaders = new Headers();
            cacheHeaders.append('Cache-Control', 'no-cache');
            const imageRequest = new Request(imageUrl, { 
              headers: cacheHeaders,
              cache: 'reload' 
            });
            
            return fetch(imageRequest)
              .then(response => {
                if (!response || response.status !== 200) {
                  throw new Error('Failed to fetch image');
                }
                
                // Clone response before using it
                const responseToCache = response.clone();
                return cache.put(imageUrl, responseToCache)
                  .then(() => {
                    logDebug(`Successfully cached ${imageUrl}`);
                    // Try to also cache the alternative format
                    let alternateUrl = imageUrl;
                    if (imageUrl.includes('.webp')) {
                      alternateUrl = imageUrl.replace('.webp', '.jpg');
                    } else if (imageUrl.includes('.jpg')) {
                      alternateUrl = imageUrl.replace('.jpg', '.webp');
                    }
                    
                    if (alternateUrl !== imageUrl) {
                      return fetch(alternateUrl, { cache: 'reload' })
                        .then(altResponse => {
                          if (altResponse && altResponse.status === 200) {
                            return cache.put(alternateUrl, altResponse);
                          }
                        })
                        .catch(() => {
                          // Ignore errors for alternate format
                        });
                    }
                  });
              })
              .catch(error => {
                console.error('Failed to cache image', imageUrl, error);
              });
          })
      );
    }
  } else if (event.data && event.data.type === 'CACHE_FONT') {
    // Handle request to cache a specific font
    const fontUrl = enforceHTTPS(event.data.url);
    
    if (fontUrl) {
      event.waitUntil(
        caches.open(FONT_CACHE_NAME)
          .then(cache => {
            logDebug('Caching font', fontUrl);
            return fetch(fontUrl)
              .then(response => {
                if (!response || response.status !== 200) {
                  throw new Error('Failed to fetch font');
                }
                return cache.put(fontUrl, response);
              })
              .catch(error => {
                console.error('Failed to cache font', fontUrl, error);
              });
          })
      );
    }
  } else if (event.data && event.data.type === 'CACHE_EXTERNAL') {
    // Handle request to cache an external resource
    const resourceUrl = event.data.url;
    
    if (resourceUrl) {
      event.waitUntil(
        caches.open(EXTERNAL_CACHE_NAME)
          .then(cache => {
            logDebug('Caching external resource', resourceUrl);
            return fetch(resourceUrl, { mode: 'no-cors' }) // Use no-cors mode for cross-origin resources
              .then(response => {
                return cache.put(resourceUrl, response);
              })
              .catch(error => {
                console.error('Failed to cache external resource', resourceUrl, error);
              });
          })
      );
    }
  } else if (event.data && event.data.type === 'SKIP_WAITING') {
    // Skip waiting when requested (for immediate updates)
    self.skipWaiting();
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

// Check if a URL is a font request
const isFontRequest = (url) => {
  return url.pathname.includes('.woff') || 
         url.pathname.includes('.woff2') || 
         url.pathname.includes('.ttf') || 
         url.pathname.includes('.otf') ||
         url.hostname.includes('fonts.googleapis.com') ||
         url.hostname.includes('fonts.gstatic.com');
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

// Check if a URL is for a JS script
const isScriptRequest = (url) => {
  return url.pathname.endsWith('.js') || 
         url.pathname.includes('/gptengineer.js') ||
         url.pathname.includes('cdn.gpteng.co');
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
    
    // Special handling for external resources like gptengineer.js
    if (isExternalResource(event.request)) {
      logDebug('External resource request:', requestUrl.pathname);
      
      // Network-first strategy with cache fallback for external resources
      event.respondWith(
        fetch(event.request)
          .then(response => {
            // Clone the response to cache it
            const responseToCache = response.clone();
            
            // Cache the response for future use
            caches.open(EXTERNAL_CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                logDebug('Cached external resource:', requestUrl.pathname);
              })
              .catch(err => {
                console.error('Failed to cache external resource:', err);
              });
            
            return response;
          })
          .catch(error => {
            logDebug('External resource fetch failed, trying cache:', error);
            
            return caches.open(EXTERNAL_CACHE_NAME)
              .then(cache => {
                return cache.match(event.request)
                  .then(cachedResponse => {
                    if (cachedResponse) {
                      logDebug('Serving external resource from cache');
                      return cachedResponse;
                    }
                    
                    // For scripts like gptengineer.js, provide a fallback that won't break the site
                    if (isScriptRequest(requestUrl)) {
                      logDebug('Creating empty script fallback');
                      // Return an empty script
                      return new Response('console.log("Script fallback loaded");', {
                        headers: { 'Content-Type': 'application/javascript' }
                      });
                    }
                    
                    // For other external resources like fonts, return an appropriate fallback
                    if (isFontRequest(requestUrl)) {
                      logDebug('Font request failed, using system fonts');
                      // Let the browser use system fonts
                      return new Response('/* Font not available */', {
                        status: 200,
                        headers: { 'Content-Type': 'text/css' }
                      });
                    }
                    
                    // Default fallback
                    console.error('No fallback available for:', requestUrl.pathname);
                    return new Response('Resource not available', { status: 404 });
                  });
              });
          })
      );
      return;
    }
    
    // Special handling for font requests - cache first strategy with network fallback
    if (isFontRequest(requestUrl)) {
      logDebug('Font request:', requestUrl.pathname);
      
      event.respondWith(
        caches.open(FONT_CACHE_NAME)
          .then(cache => {
            return cache.match(event.request)
              .then(cachedResponse => {
                if (cachedResponse) {
                  // Return cached font
                  logDebug('Serving font from cache', requestUrl.pathname);
                  return cachedResponse;
                }
                
                // Not in cache, try network
                return fetch(event.request)
                  .then(networkResponse => {
                    if (!networkResponse || networkResponse.status !== 200) {
                      throw new Error('Bad network response for font');
                    }
                    
                    // Clone the response before using it
                    const responseToCache = networkResponse.clone();
                    
                    // Cache the successful response
                    cache.put(event.request, responseToCache);
                    logDebug('Font cached after network fetch', requestUrl.pathname);
                    
                    return networkResponse;
                  })
                  .catch(error => {
                    console.error('Network fetch failed for font', requestUrl.pathname, error);
                    throw error;
                  });
              });
          })
          .catch(error => {
            console.error('Font cache error:', error);
            // If cache fails, try network as last resort
            return fetch(event.request);
          })
      );
      return;
    }
    
    // Special handling for team member images
    if (isTeamImage(requestUrl)) {
      logDebug('Team member image request:', requestUrl.pathname);
      
      event.respondWith(
        caches.open(TEAM_IMAGES_CACHE_NAME)
          .then(cache => {
            return cache.match(event.request)
              .then(cachedResponse => {
                if (cachedResponse) {
                  logDebug('Serving team image from cache:', requestUrl.pathname);
                  return cachedResponse;
                }
                
                // If not in cache, try to fetch with a timeout
                logDebug('Team image not in cache, fetching:', requestUrl.pathname);
                
                // Create a timeout Promise that rejects after 3 seconds
                const timeoutPromise = new Promise((_, reject) => {
                  setTimeout(() => reject(new Error('Image fetch timeout')), 3000);
                });
                
                // Try the network with a timeout
                return Promise.race([
                  fetch(event.request.clone()).then(networkResponse => {
                    // Clone the response before using it
                    const responseToCache = networkResponse.clone();
                    
                    // Cache the response for future use
                    cache.put(event.request, responseToCache);
                    
                    return networkResponse;
                  }),
                  timeoutPromise
                ])
                .catch(error => {
                  logDebug('Team image fetch failed:', error.message);
                  
                  // If fetch fails, try alternate format (.jpg instead of .webp or vice versa)
                  let alternateUrl = requestUrl.href;
                  let alternateRequest;
                  
                  if (requestUrl.pathname.includes('.webp')) {
                    // Try JPG instead
                    alternateUrl = requestUrl.href.replace('.webp', '.jpg');
                    alternateRequest = new Request(alternateUrl, event.request);
                    
                    logDebug('Trying JPG instead of WebP:', alternateUrl);
                  } else if (requestUrl.pathname.includes('.jpg')) {
                    // Try WebP instead
                    alternateUrl = requestUrl.href.replace('.jpg', '.webp');
                    alternateRequest = new Request(alternateUrl, event.request);
                    
                    logDebug('Trying WebP instead of JPG:', alternateUrl);
                  }
                  
                  if (alternateRequest) {
                    // Try to match the alternate format in cache
                    return cache.match(alternateRequest)
                      .then(altCachedResponse => {
                        if (altCachedResponse) {
                          logDebug('Serving alternate format from cache:', alternateUrl);
                          return altCachedResponse;
                        }
                        
                        // If not in cache, fetch the alternate format
                        return fetch(alternateRequest)
                          .then(altNetworkResponse => {
                            // Cache the response
                            cache.put(alternateRequest, altNetworkResponse.clone());
                            return altNetworkResponse;
                          })
                          .catch(() => {
                            // If all else fails, return a fallback image or 404
                            logDebug('All image formats failed, returning fallback');
                            return new Response('Image not found', { status: 404 });
                          });
                      });
                  }
                  
                  // No alternate format to try, return a fallback
                  return new Response('Image not found', { status: 404 });
                });
              });
          })
      );
      return;
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
  
  const cacheWhitelist = [
    CACHE_NAME, 
    IMAGE_CACHE_NAME, 
    FONT_CACHE_NAME, 
    EXTERNAL_CACHE_NAME,
    TEAM_IMAGES_CACHE_NAME,
    'raade-stripe-cache-v1'
  ];
  
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
