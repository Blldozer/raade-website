
import { createRoot } from 'react-dom/client'
import React from 'react'  // Explicitly import React
import App from './App.tsx'
import './index.css'

// IMPORTANT: Set React initialization flag to true immediately
if (typeof window !== 'undefined') {
  // Make sure React global is available
  window.React = window.React || React;
  window.__REACT_INITIALIZED = true;
  console.log("Setting initial React initialization flag to true");
  
  // Also set up global error tracking for React context issues
  window.__REACT_CONTEXT_ERROR = false;
  
  // Add global error handler specifically for React context errors
  window.addEventListener('error', (event) => {
    if (event.error && 
        (event.error.toString().includes('useState') || 
         event.error.toString().includes('useContext') || 
         event.error.toString().includes('React hook'))) {
      console.error("React hook/context error detected:", event.error);
      window.__REACT_CONTEXT_ERROR = true;
    }
  });
}

/**
 * Main entry point with improved initialization safety
 * - Sets proper initialization flags for React
 * - Adds comprehensive error handling
 */
function startApp() {
  try {
    console.log("Application startup: Beginning initialization");
    
    // Ensure React is defined in window before proceeding
    if (typeof window !== 'undefined' && !window.React) {
      window.React = React;
      console.log("Explicitly setting window.React");
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

    // Add global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      console.error("Global error caught:", message, error);
      
      // Check for React context errors specifically
      if (message && (message.toString().includes('useState') || 
                    message.toString().includes('useContext') || 
                    message.toString().includes('useRef') ||
                    message.toString().includes('useEffect'))) {
        console.error("React hook error detected. This might be a React context initialization issue.");
        window.__REACT_CONTEXT_ERROR = true;
      }
      
      return false; // Let the default handler run as well
    };
    
    // Create root with explicit ReactDOM API approach
    const root = createRoot(rootElement);
    
    // Render WITHOUT StrictMode to prevent double renders causing issues with framer-motion
    root.render(<App />);
    
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

// Define React globally on window to ensure it's available immediately
if (typeof window !== 'undefined') {
  window.React = React;
}

// Start the application immediately
startApp();

// Add type definition for window global properties
declare global {
  interface Window {
    React: typeof React;
    __REACT_INITIALIZED?: boolean;
    __REACT_CONTEXT_ERROR?: boolean;
  }
}
