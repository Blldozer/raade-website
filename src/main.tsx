import React from 'react';
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AppProviders from "@/components/app/AppProviders";

/**
 * Application Initialization
 * 
 * Sets up React globally and initializes the app with proper providers.
 * Includes React initialization tracking to prevent "React not available" errors.
 * Enhanced with better error handling for React context issues.
 * Uses a systematic approach to ensure all components have access to React.
 */

// IMPORTANT: Set React initialization flag FIRST THING
// This ensures all components know React is available when they render
if (typeof window !== 'undefined') {
  // Set React initialization flag right away
  window.__REACT_INITIALIZED = true;
  
  // Make React globally accessible for emergency fallback access
  window.React = React;
  
  console.log("React initialization flag set in main.tsx");
}

// Define React initialization in a function to ensure it's only done once
const initializeApp = () => {
  // Log React initialization for debugging
  console.log("Initializing React app with version:", React.version);
  
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Could not find root element!");
    return;
  }
  
  try {
    // Initialize React when DOM is ready
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <AppProviders>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppProviders>
      </React.StrictMode>
    );
    
    console.log("React app initialized successfully");
  } catch (error) {
    console.error("Critical error initializing React app:", error);
    
    // Provide a fallback UI in case of catastrophic failure
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; text-align: center;">
        <h1>Application Error</h1>
        <p>There was a problem initializing the application. Please try refreshing the page.</p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; background: #274675; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    `;
  }
};

// Run initialization with minimal delay to ensure React global flag is set first
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // If already loaded, run immediately
  initializeApp();
}
