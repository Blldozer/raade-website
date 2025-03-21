
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Function to ensure fonts are properly loaded and fallbacks are in place
function ensureFontsLoaded() {
  console.log("Starting font loading process");
  
  // Add a class to the document to indicate initial loading state
  (document as Document).documentElement.classList.add('fonts-loading');
  
  // Check if the document.fonts API is available
  if ('fonts' in document) {
    // Create a timeout to ensure the app renders even if fonts take too long
    const fontTimeout = setTimeout(() => {
      console.log("Font loading timeout reached, continuing with fallbacks");
      // Explicitly cast document to Document to ensure TypeScript recognizes documentElement
      (document as Document).documentElement.classList.add('fonts-timeout');
      (document as Document).documentElement.classList.remove('fonts-loading');
      startApp();
    }, 3000); // 3 second timeout for font loading
    
    // Try to load fonts properly
    document.fonts.ready.then(() => {
      clearTimeout(fontTimeout);
      console.log("All fonts loaded successfully");
      // Explicitly cast document to Document
      (document as Document).documentElement.classList.add('fonts-loaded');
      (document as Document).documentElement.classList.remove('fonts-loading');
      startApp();
    }).catch(err => {
      clearTimeout(fontTimeout);
      console.error("Error loading fonts:", err);
      // Explicitly cast document to Document
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
    // Explicitly cast document to Document
    (document as Document).documentElement.classList.add('no-font-api');
    (document as Document).documentElement.classList.remove('fonts-loading');
    startApp();
  }
}

// Main function to start the application
function startApp() {
  try {
    console.log("Application startup: Beginning initialization");
    
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
    } else {
      console.log("Application startup: Root element found, creating React root");
      
      // Add global error handler
      window.onerror = (message, source, lineno, colno, error) => {
        console.error("Global error caught:", message, error);
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
          
          // Try to load it through the service worker cache
          if ('serviceWorker' in navigator && navigator.serviceWorker.controller && resourceUrl) {
            console.log("Requesting service worker to cache external resource:", resourceUrl);
            navigator.serviceWorker.controller.postMessage({
              type: 'CACHE_EXTERNAL',
              url: resourceUrl
            });
          }
        }
      }, true); // Use capture phase
      
      // Cache external resources we know we need
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        console.log("Pre-caching critical external resources");
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_EXTERNAL',
          url: 'https://cdn.gpteng.co/gptengineer.js'
        });
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_EXTERNAL',
          url: 'https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Zilla+Slab+Highlight:wght@400;700&family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Taviraj:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap'
        });
      }
      
      // Create root and render app with error handling
      try {
        // Mark React as initialized globally to help with lazy loading components
        window.__REACT_INITIALIZED = true;
        
        const root = createRoot(rootElement);
        root.render(
          <StrictMode>
            <App />
          </StrictMode>
        );
        console.log("Application startup: React rendering completed");
      } catch (error) {
        console.error("Fatal error: Failed to render the application", error);
        rootElement.innerHTML = `
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
            <p>Failed to load application. Please try refreshing the page.</p>
            <p style="font-size: 0.8em; color: #666;">Error details: ${error instanceof Error ? error.message : String(error)}</p>
          </div>
        `;
      }
    }
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

// Define window.__REACT_INITIALIZED as a global property
interface WindowWithReactInitialized extends Window {
  __REACT_INITIALIZED?: boolean;
}
declare global {
  interface Window {
    __REACT_INITIALIZED?: boolean;
  }
}

// Start by checking font loading state
ensureFontsLoaded();
