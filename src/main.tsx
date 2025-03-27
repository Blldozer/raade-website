
import { createRoot } from 'react-dom/client'
import React from 'react'  // Explicitly import React
import App from './App.tsx'
import './index.css'

// IMPORTANT: Set React initialization flag to false initially
if (typeof window !== 'undefined') {
  window.__REACT_INITIALIZED = false;
  window.__REACT_CONTEXT_ERROR = false;
  console.log("Setting initial React initialization flags");
}

/**
 * Main entry point with improved initialization safety
 * - Ensures fonts are loaded before attempting to render
 * - Sets proper initialization flags for React
 * - Adds comprehensive error handling
 */
function ensureFontsLoaded() {
  console.log("Starting font loading process");
  
  // Add a class to the document to indicate initial loading state
  (document as Document).documentElement.classList.add('fonts-loading');
  
  // Check if the document.fonts API is available
  if ('fonts' in document) {
    // Create a timeout to ensure the app renders even if fonts take too long
    const fontTimeout = setTimeout(() => {
      console.log("Font loading timeout reached, continuing with fallbacks");
      (document as Document).documentElement.classList.add('fonts-timeout');
      (document as Document).documentElement.classList.remove('fonts-loading');
      startApp();
    }, 3000); // 3 second timeout for font loading
    
    // Try to load fonts properly
    document.fonts.ready.then(() => {
      clearTimeout(fontTimeout);
      console.log("All fonts loaded successfully");
      (document as Document).documentElement.classList.add('fonts-loaded');
      (document as Document).documentElement.classList.remove('fonts-loading');
      startApp();
    }).catch(err => {
      clearTimeout(fontTimeout);
      console.error("Error loading fonts:", err);
      (document as Document).documentElement.classList.add('fonts-error');
      (document as Document).documentElement.classList.remove('fonts-loading');
      startApp();
      
      // Try to cache fonts dynamically through the service worker
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        console.log("Requesting service worker to cache fonts");
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_FONT',
          url: '/fonts/Amadine.woff'
        });
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_FONT',
          url: '/fonts/Simula_Book_ImfTVa3.woff'
        });
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_FONT',
          url: '/fonts/Simula_BookItalic_651eMqB.woff'
        });
      }
    });
  } else {
    // Fallback for browsers without document.fonts API
    console.log("Font loading API not available, proceeding with fallbacks");
    (document as Document).documentElement.classList.add('no-font-api');
    (document as Document).documentElement.classList.remove('fonts-loading');
    startApp();
  }
}

// Function to start the application with improved safety
function startApp() {
  try {
    console.log("Application startup: Beginning initialization");
    
    // CRITICAL: Set React global flag to indicate React is initializing
    // This helps components detect if React hooks are available
    if (typeof window !== 'undefined') {
      window.__REACT_HOOK_INITIALIZATION_STARTED = true;
    }
    
    // Get the root element with improved error handling
    const rootElement = document.getElementById("root");

    if (!rootElement) {
      console.error("Fatal error: Failed to find the root element");
      document.body.innerHTML = `
        <div style="
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          padding: 20px;
          margin: 20px;
          border-radius: 5px;
          font-family: system-ui, sans-serif;
        ">
          <h2 style="margin-top: 0;">Application Error</h2>
          <p>Failed to load application: Root element not found.</p>
          <p>Please try refreshing the page or contact support if the issue persists.</p>
        </div>
      `;
      return; // Exit early if no root element
    } 

    console.log("Application startup: Root element found, creating React root");

    // Add global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      console.error("Global error caught:", message, error);
      
      // Check for React context errors specifically
      if (message && (message.toString().includes('useState') || 
                    message.toString().includes('useContext') || 
                    message.toString().includes('useRef') ||
                    message.toString().includes('useEffect'))) {
        console.error("React hook error detected. This might be a React context initialization issue.");
        
        // Set a global flag to indicate React is not properly initialized
        if (typeof window !== 'undefined') {
          window.__REACT_CONTEXT_ERROR = true;
        }
        
        // Insert friendly error message
        document.body.innerHTML = `
          <div style="
            color: #721c24;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            padding: 20px;
            margin: 20px;
            border-radius: 5px;
            font-family: system-ui, sans-serif;
          ">
            <h2 style="margin-top: 0;">React Context Error</h2>
            <p>The application encountered an issue with React hooks or context.</p>
            <p style="font-size: 0.8em; color: #666;">Error details: ${message}</p>
            <button onclick="window.location.reload()" style="
              background-color: #dc3545;
              color: white;
              border: none;
              padding: 8px 16px;
              border-radius: 4px;
              cursor: pointer;
              margin-top: 10px;
            ">Reload Page</button>
          </div>
        `;
      }
      
      return false; // Let the default handler run as well
    };
    
    // Add unhandled promise rejection handler
    window.addEventListener('unhandledrejection', event => {
      console.error("Unhandled promise rejection:", event.reason);
    });
    
    // Handle errors from external resources
    document.addEventListener('error', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'SCRIPT' || target.tagName === 'LINK') {
        // Correctly handle different element types
        const resourceUrl = target.tagName === 'SCRIPT' 
          ? (target as HTMLScriptElement).src 
          : (target as HTMLLinkElement).href;
          
        console.error(`Error loading resource: ${resourceUrl}`);
      }
    }, true); // Use capture phase
    
    // CRITICAL: Set React global flag to true BEFORE rendering
    // This is crucial for preventing the "Cannot read properties of null (reading 'useContext')" error
    if (typeof window !== 'undefined') {
      window.__REACT_INITIALIZED = true;
      console.log("React initialization flag set to true before rendering");
    }
    
    // Create root with explicit ReactDOM API approach
    const root = createRoot(rootElement);
    
    // Render WITHOUT StrictMode to prevent double renders causing issues with framer-motion
    root.render(<App />);
    
    // Mark React hooks as fully initialized after successful render
    if (typeof window !== 'undefined') {
      window.__REACT_HOOK_INITIALIZATION_COMPLETED = true;
      console.log("React hook initialization completed flag set to true");
    }
    
    console.log("Application startup: React rendering completed");
  } catch (error) {
    console.error("Fatal error during application initialization:", error);
    document.body.innerHTML = `
      <div style="
        color: #721c24;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        padding: 20px;
        margin: 20px;
        border-radius: 5px;
        font-family: system-ui, sans-serif;
      ">
        <h2 style="margin-top: 0;">Critical Application Error</h2>
        <p>The application failed to initialize.</p>
        <p style="font-size: 0.8em; color: #666;">Error details: ${error instanceof Error ? error.message : String(error)}</p>
        <button onclick="window.location.reload()" style="
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        ">Reload Page</button>
      </div>
    `;
  }
}

// Start by checking font loading state
ensureFontsLoaded();
