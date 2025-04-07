
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AppProviders from "@/components/app/AppProviders";

// Set global flag to indicate React is initialized
// Do this FIRST before any React components are mounted
if (typeof window !== 'undefined') {
  window.__REACT_INITIALIZED = true;
  console.log("React initialization flag set in main.tsx");
}

// Initialize React when DOM is ready
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProviders>
  </React.StrictMode>
);
