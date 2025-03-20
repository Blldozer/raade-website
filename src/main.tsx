
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Function to ensure fonts are properly loaded and fallbacks are in place
function ensureFontsLoaded() {
  // Check if the document.fonts API is available
  if ('fonts' in document) {
    // Create a timeout to ensure the app renders even if fonts take too long
    const fontTimeout = setTimeout(() => {
      console.log("Font loading timeout reached, continuing with fallbacks");
      document.documentElement.classList.add('fonts-timeout');
      startApp();
    }, 3000); // 3 second timeout for font loading
    
    // Try to load fonts properly
    document.fonts.ready.then(() => {
      clearTimeout(fontTimeout);
      console.log("All fonts loaded successfully");
      document.documentElement.classList.add('fonts-loaded');
      startApp();
    }).catch(err => {
      clearTimeout(fontTimeout);
      console.error("Error loading fonts:", err);
      document.documentElement.classList.add('fonts-error');
      startApp();
    });
  } else {
    // Fallback for browsers without document.fonts API
    console.log("Font loading API not available, proceeding with fallbacks");
    document.documentElement.classList.add('no-font-api');
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

// Start by checking font loading state
ensureFontsLoaded();
