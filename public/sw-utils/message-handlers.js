
/**
 * Message handler functions for the service worker
 */

import { CACHE_NAMES, logDebug, enforceHTTPS } from './cache-utils.js';

/**
 * Handle cache image message from client
 */
export const handleCacheImageMessage = async (event) => {
  const imageUrl = enforceHTTPS(event.data.url);
  
  if (imageUrl) {
    try {
      const cache = await caches.open(CACHE_NAMES.IMAGE);
      logDebug('Caching image', imageUrl);
      
      const response = await fetch(imageUrl);
      if (!response || response.status !== 200) {
        throw new Error('Failed to fetch image');
      }
      
      await cache.put(imageUrl, response);
    } catch (error) {
      console.error('Failed to cache image', imageUrl, error);
    }
  }
};

/**
 * Handle clear cache message from client
 */
export const handleClearCacheMessage = async (event) => {
  const cacheName = event.data.cacheName;
  if (cacheName) {
    try {
      const success = await caches.delete(cacheName);
      logDebug(`Cache ${cacheName} ${success ? 'deleted' : 'not found'}`);
    } catch (error) {
      console.error('Error clearing cache', error);
    }
  }
};

/**
 * Handle skip waiting message from client
 */
export const handleSkipWaitingMessage = () => {
  self.skipWaiting();
};

/**
 * Handle VERSION check message from client
 */
export const handleVersionCheckMessage = (event) => {
  // Send back current version info
  if (event.source) {
    event.source.postMessage({
      type: 'VERSION_INFO',
      version: CACHE_NAMES.MAIN
    });
  }
};

/**
 * Process message event from clients
 */
export const processMessageEvent = (event) => {
  logDebug('Message received', event.data);
  
  if (!event.data || !event.data.type) {
    return;
  }
  
  switch (event.data.type) {
    case 'CACHE_IMAGE':
      event.waitUntil(handleCacheImageMessage(event));
      break;
      
    case 'CLEAR_CACHE':
      event.waitUntil(handleClearCacheMessage(event));
      break;
      
    case 'SKIP_WAITING':
      handleSkipWaitingMessage();
      break;
      
    case 'CHECK_VERSION':
      handleVersionCheckMessage(event);
      break;
      
    default:
      logDebug('Unknown message type:', event.data.type);
  }
};

/**
 * Notify clients about service worker updates
 * Uses a non-disruptive approach with toast notification
 */
export const notifyClientsAboutUpdate = async () => {
  const clients = await self.clients.matchAll();
  
  clients.forEach(client => {
    // Notify clients that the service worker has been updated
    // Using toast instead of alert
    client.postMessage({ 
      type: 'SW_UPDATED',
      version: CACHE_NAMES.MAIN,
      silent: true  // Flag for silent update notification
    });
    
    // Force HTTPS if needed
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
};
