
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Set global flag to indicate React is initialized
if (typeof window !== 'undefined') {
  // This helps components detect if React context is available
  window.__REACT_INITIALIZED = true;
}

// SafeMount function to provide better error handling during initial render
const safeMount = () => {
  try {
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("Root element not found");
      return;
    }
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    
    console.log("Application mounted successfully");
  } catch (error) {
    console.error("Failed to mount application:", error);
    
    // Display fallback UI when mounting fails
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 2rem;">
          <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">Application Error</h1>
          <p style="margin-bottom: 1.5rem;">The application failed to load. Please try refreshing the page.</p>
          <button style="background: #274675; color: white; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;"
                  onclick="window.location.reload()">
            Refresh Page
          </button>
        </div>
      `;
    }
  }
};

// Execute the mount function
safeMount();
