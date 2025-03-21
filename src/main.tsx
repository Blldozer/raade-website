
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Global variable to track initialization status
let isAppInitializing = false;
let initializationAttempts = 0;
const MAX_ATTEMPTS = 2;

// Create a simplified fallback UI when React fails to load
function createFallbackUI(rootElement: HTMLElement, message: string) {
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
      <p>${message}</p>
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

// Function to ensure fonts are properly loaded and fallbacks are in place
function ensureFontsLoaded() {
  console.log("Starting font loading process");
  
  // Add a class to the document to indicate initial loading state
  document.documentElement.classList.add('fonts-loading');
  
  // Check if the document.fonts API is available
  if ('fonts' in document) {
    // Create a timeout to ensure the app renders even if fonts take too long
    const fontTimeout = setTimeout(() => {
      console.log("Font loading timeout reached, continuing with fallbacks");
      document.documentElement.classList.add('fonts-timeout');
      document.documentElement.classList.remove('fonts-loading');
      startApp();
    }, 2000); // Reduced timeout for mobile devices
    
    // Try to load fonts properly
    document.fonts.ready.then(() => {
      clearTimeout(fontTimeout);
      console.log("All fonts loaded successfully");
      document.documentElement.classList.add('fonts-loaded');
      document.documentElement.classList.remove('fonts-loading');
      startApp();
    }).catch(err => {
      clearTimeout(fontTimeout);
      console.error("Error loading fonts:", err);
      document.documentElement.classList.add('fonts-error');
      document.documentElement.classList.remove('fonts-loading');
      startApp();
    });
  } else {
    // Fallback for browsers without document.fonts API
    console.log("Font loading API not available, proceeding with fallbacks");
    document.documentElement.classList.add('no-font-api');
    document.documentElement.classList.remove('fonts-loading');
    startApp();
  }
}

// Function to safely detect mobile devices without React hooks
function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e) {
    console.error("Error detecting mobile device:", e);
    return false;
  }
}

// Main function to start the application
function startApp() {
  // Prevent multiple initialization attempts
  if (isAppInitializing) {
    console.log("App initialization already in progress, skipping duplicate call");
    return;
  }
  
  isAppInitializing = true;
  initializationAttempts++;
  
  try {
    console.log("Application startup: Beginning initialization (attempt " + initializationAttempts + ")");
    
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
      return;
    } 
    
    console.log("Application startup: Root element found, creating React root");
    
    // Add global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      console.error("Global error caught:", message, error);
      
      // If we detect a React initialization error
      if (message && (
          message.toString().includes("Cannot read properties of null") || 
          message.toString().includes("useEffect")
      )) {
        console.warn("Possible critical error during initialization, trying recovery");
        
        // Only attempt recovery once
        if (initializationAttempts <= MAX_ATTEMPTS) {
          isAppInitializing = false;
          
          // Use a simple timeout to try again
          setTimeout(() => {
            // Try one more time with a simplified initialization
            if (rootElement && initializationAttempts < MAX_ATTEMPTS) {
              startApp();
            } else {
              // If we've tried multiple times and failed, show a static fallback
              createFallbackUI(rootElement, "Failed to initialize the application. Please try again on a different browser or device.");
            }
          }, 1000);
        }
      }
      
      return false; // Let the default handler run as well
    };
    
    // Check for React availability
    if (typeof React === 'undefined' || !React) {
      console.error("React is not defined - critical initialization error");
      createFallbackUI(rootElement, "Failed to load required resources. Please check your internet connection and try again.");
      return;
    }
    
    // Add unhandled promise rejection handler
    window.addEventListener('unhandledrejection', event => {
      console.error("Unhandled promise rejection:", event.reason);
    });
    
    // Mark React as initialized globally to help with lazy loading components
    window.__REACT_INITIALIZED = true;
    
    // Different initialization approach for mobile vs desktop
    try {
      const root = createRoot(rootElement);
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
      console.log("Application startup: React rendering completed");
      isAppInitializing = false;
    } catch (error) {
      console.error("Fatal error: Failed to render the application", error);
      
      if (initializationAttempts < MAX_ATTEMPTS) {
        console.log("Retrying with simplified initialization...");
        isAppInitializing = false;
        setTimeout(startApp, 500);
      } else {
        createFallbackUI(rootElement, "Failed to load application. Please try refreshing the page.");
      }
    }
  } catch (error) {
    console.error("Fatal error during application initialization:", error);
    isAppInitializing = false;
    
    const rootElement = document.getElementById("root");
    if (rootElement) {
      createFallbackUI(rootElement, "The application failed to initialize.");
    } else {
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
