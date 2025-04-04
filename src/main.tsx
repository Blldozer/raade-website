
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AppProviders from "@/components/app/AppProviders";

// Set global flag to indicate React is initialized
// This needs to happen BEFORE any components are rendered
if (typeof window !== 'undefined') {
  // Create React initialization flag
  window.__REACT_INITIALIZED = true;
  
  // Add React to window for emergency fallback access
  window.React = React;
  
  console.log("React initialization flag set in main.tsx");
}

// Define React initialization in a function to ensure it's only done once
const initializeApp = () => {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    console.error("Could not find root element!");
    return;
  }
  
  // Initialize React when DOM is ready
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppProviders>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviders>
    </React.StrictMode>
  );
};

// Run initialization
initializeApp();
