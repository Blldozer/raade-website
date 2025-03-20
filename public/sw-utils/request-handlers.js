
/**
 * Request handler functions for the service worker
 */

import { CACHE_NAMES, logDebug, enforceHTTPS } from './cache-utils.js';

/**
 * Check if a request is a navigation request
 */
export const isNavigationRequest = (request) => {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && 
          request.headers.get('accept') && 
          request.headers.get('accept').includes('text/html'));
};

/**
 * Check if a URL is a font file
 */
export const isFontFile = (url) => {
  return url.pathname.includes('.woff') || 
         url.pathname.includes('.woff2') || 
         url.pathname.includes('.ttf') || 
         url.pathname.includes('.otf');
};

/**
 * Check if a URL is a CSS file
 */
export const isCSSFile = (url) => {
  return url.pathname.endsWith('.css');
};

/**
 * Check if a URL is related to Stripe
 */
export const isStripeURL = (url) => {
  return url.hostname === 'js.stripe.com' || 
         url.hostname === 'api.stripe.com' || 
         url.hostname.includes('stripe.com');
};

/**
 * Check if request is for payment API
 */
export const isPaymentRequest = (url) => {
  return url.pathname.includes('payment') || 
         url.pathname.includes('create-payment-intent');
};

/**
 * Check if a URL is an image file
 */
export const isImageRequest = (url) => {
  return url.pathname.includes('/raade-individual-e-board-photos') ||
    url.pathname.includes('/raade-individual-e-board-photos-webp') ||
    /\.(webp|jpg|jpeg|png|gif)$/i.test(url.pathname);
};

/**
 * Handle navigation requests
 */
export const handleNavigationRequest = (event) => {
  logDebug('Navigation request:', new URL(event.request.url).pathname);
  
  return fetch(event.request)
    .catch(() => caches.match('/index.html'));
};

/**
 * Handle font file requests - network first with cache fallback
 */
export const handleFontRequest = async (event) => {
  const requestUrl = new URL(event.request.url);
  logDebug('Font request:', requestUrl.pathname);
  
  try {
    // Try network first
    const response = await fetch(event.request, { cache: 'reload' });
    
    // Cache the fresh font response
    if (response.ok) {
      const clonedResponse = response.clone();
      const cache = await caches.open(CACHE_NAMES.FONT);
      await cache.put(event.request, clonedResponse);
    }
    
    return response;
  } catch (error) {
    logDebug('Font network request failed, using cache');
    
    // Try font cache first
    const cachedResponse = await caches.match(event.request, { cacheName: CACHE_NAMES.FONT });
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Try in other caches as fallback
    return caches.match(event.request);
  }
};

/**
 * Handle CSS file requests - network first with cache fallback
 */
export const handleCSSRequest = async (event) => {
  const requestUrl = new URL(event.request.url);
  logDebug('CSS request:', requestUrl.pathname);
  
  try {
    // Try network first
    const response = await fetch(event.request, { cache: 'reload' });
    
    // Cache the fresh CSS response
    if (response.ok) {
      const clonedResponse = response.clone();
      const cache = await caches.open(CACHE_NAMES.CSS);
      await cache.put(event.request, clonedResponse);
    }
    
    return response;
  } catch (error) {
    logDebug('CSS network request failed, using cache');
    
    // Try CSS cache first
    const cachedResponse = await caches.match(event.request, { cacheName: CACHE_NAMES.CSS });
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Try in other caches as fallback
    return caches.match(event.request);
  }
};

/**
 * Handle Stripe-related requests - never cache on first load
 */
export const handleStripeRequest = async (event) => {
  const requestUrl = new URL(event.request.url);
  logDebug('Stripe request:', requestUrl.pathname);
  
  try {
    // Always use network first for Stripe
    const response = await fetch(event.request);
    
    // Only cache successful responses AFTER first successful load
    if (response.ok && !requestUrl.pathname.includes('payment-intent')) {
      logDebug('Caching Stripe resource:', requestUrl.pathname);
      const responseToCache = response.clone();
      const cache = await caches.open(CACHE_NAMES.STRIPE);
      await cache.put(event.request, responseToCache);
    }
    
    return response;
  } catch (error) {
    logDebug('Stripe network request failed, trying cache:', error);
    // Try to get from cache if offline
    return caches.match(event.request);
  }
};

/**
 * Handle payment API requests - never cache
 */
export const handlePaymentRequest = async (event) => {
  const requestUrl = new URL(event.request.url);
  logDebug('Payment API request:', requestUrl.pathname);
  
  try {
    // Never cache payment API requests, always go to network
    return await fetch(event.request);
  } catch (error) {
    logDebug('Payment API request failed:', error);
    return new Response(JSON.stringify({ 
      error: 'Network error. Please check your connection and try again.' 
    }), { 
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

/**
 * Handle image requests with dedicated image cache
 */
export const handleImageRequest = async (event) => {
  const requestUrl = new URL(event.request.url);
  const cache = await caches.open(CACHE_NAMES.IMAGE);
  
  // Try cache first
  const cachedResponse = await cache.match(event.request);
  if (cachedResponse) {
    logDebug('Serving image from cache', requestUrl.pathname);
    return cachedResponse;
  }
  
  // Try network and cache for future
  try {
    const networkResponse = await fetch(event.request);
    if (!networkResponse || networkResponse.status !== 200) {
      throw new Error('Bad network response');
    }
    
    // Clone the response before using it
    const responseToCache = networkResponse.clone();
    
    // Cache the successful response
    await cache.put(event.request, responseToCache);
    
    return networkResponse;
  } catch (error) {
    console.error('Network fetch failed for image', requestUrl.pathname, error);
    
    // For webp images, try falling back to JPG version
    if (requestUrl.pathname.includes('.webp')) {
      const jpgUrl = event.request.url.replace('.webp', '.jpg');
      logDebug('Trying JPG fallback', jpgUrl);
      
      try {
        const fallbackResponse = await fetch(jpgUrl);
        if (!fallbackResponse || fallbackResponse.status !== 200) {
          throw new Error('Fallback fetch failed too');
        }
        return fallbackResponse;
      } catch (fallbackError) {
        console.error('Fallback also failed', fallbackError);
      }
    }
    
    // If all fails, return a placeholder or error response
    return new Response('Image not available', { status: 404 });
  }
};

/**
 * Handle all other requests with cache-then-network strategy
 */
export const handleStandardRequest = async (event) => {
  // Try cache first
  const cachedResponse = await caches.match(event.request);
  if (cachedResponse) {
    // Start a background fetch to update the cache
    const fetchPromise = fetch(event.request)
      .then(networkResponse => {
        if (networkResponse.ok) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAMES.MAIN)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
      })
      .catch(() => {
        // Silently fail the background fetch
      });
    
    // Don't wait for the background fetch
    setTimeout(() => fetchPromise, 0);
    
    return cachedResponse;
  }
  
  // Make a fresh network request - ensure HTTPS in production
  try {
    let secureRequest;
    // Fix for TypeError with 'navigate' mode
    const requestOptions = {
      method: event.request.method,
      headers: event.request.headers,
      credentials: event.request.credentials,
      redirect: event.request.redirect,
      cache: 'reload' // Force validation with server
    };
    
    // Don't include mode for navigation requests
    if (event.request.mode !== 'navigate') {
      requestOptions.mode = event.request.mode;
    }
    
    secureRequest = new Request(
      enforceHTTPS(event.request.url),
      requestOptions
    );
    
    const response = await fetch(secureRequest);
    
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
      const cache = await caches.open(CACHE_NAMES.MAIN);
      await cache.put(event.request, responseToCache);
    } catch (error) {
      console.error('Error caching response', error);
    }

    return response;
  } catch (error) {
    console.error('Fetch error', error);
    
    // Return cached index.html for navigation requests as fallback
    if (isNavigationRequest(event.request)) {
      return caches.match('/index.html');
    }
    
    return new Response('Network error', { status: 500 });
  }
};
